"use client";

import { useEffect, useState, useRef, memo } from "react";

function ListenerCount() {
  const [count, setCount] = useState<number>(1);
  const [tripNumber, setTripNumber] = useState<number>(4829);
  const sessionIdRef = useRef<string>("");
  const isPlayingRef = useRef<boolean>(false);

  useEffect(() => {
    // Generate or retrieve session ID for this browser tab
    let sid = "";
    try {
      sid = sessionStorage.getItem("bhanu_listener_id") || "";
      if (!sid) {
        sid = `listener_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
        sessionStorage.setItem("bhanu_listener_id", sid);
      }
    } catch {
      sid = `listener_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
    }
    sessionIdRef.current = sid;

    // Persistent trip counter in localStorage
    try {
      const stored = localStorage.getItem("bhanu_bus_trips");
      const currentTrips = stored ? parseInt(stored, 10) : 4829;
      const nextTrips = currentTrips + 1;
      localStorage.setItem("bhanu_bus_trips", nextTrips.toString());
      setTripNumber(nextTrips);
    } catch {
      // ignore
    }

    let inFlight = false;
    let debounceTimer: ReturnType<typeof setTimeout> | null = null;

    const sendHeartbeat = async (action: "heartbeat" | "leave" = "heartbeat") => {
      if (action === "heartbeat" && inFlight) return;
      try {
        const payload = JSON.stringify({
          sessionId: sessionIdRef.current,
          isPlaying: isPlayingRef.current,
          action,
        });

        if (action === "leave" && typeof navigator !== "undefined" && navigator.sendBeacon) {
          const blob = new Blob([payload], { type: "application/json" });
          navigator.sendBeacon("/api/listeners", blob);
          return;
        }

        inFlight = true;
        const res = await fetch("/api/listeners", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: payload,
          keepalive: action === "leave",
        });

        if (res.ok) {
          const data = await res.json();
          if (typeof data.liveCount === "number") {
            setCount(data.liveCount);
          }
        }
      } catch (err) {
        console.warn("Live listener heartbeat error:", err);
      } finally {
        inFlight = false;
      }
    };

    // Initial heartbeat
    sendHeartbeat("heartbeat");

    // Efficient heartbeat interval every 12 seconds
    const interval = setInterval(() => {
      if (document.visibilityState === "visible") {
        sendHeartbeat("heartbeat");
      }
    }, 12000);

    // Handle visibility change
    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible") {
        sendHeartbeat("heartbeat");
      }
    };
    document.addEventListener("visibilitychange", handleVisibilityChange);

    // Listen for music player state changes with slight debounce
    const handlePlayerState = (e: Event) => {
      const customEvent = e as CustomEvent<{ isPlaying: boolean }>;
      const playing = Boolean(customEvent.detail?.isPlaying);
      if (isPlayingRef.current === playing) return;
      isPlayingRef.current = playing;
      if (debounceTimer) clearTimeout(debounceTimer);
      debounceTimer = setTimeout(() => {
        sendHeartbeat("heartbeat");
      }, 500);
    };
    window.addEventListener("bhanu:player_state", handlePlayerState);

    // Clean up on tab close
    const handleUnload = () => {
      sendHeartbeat("leave");
    };
    window.addEventListener("beforeunload", handleUnload);
    window.addEventListener("pagehide", handleUnload);

    return () => {
      clearInterval(interval);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      window.removeEventListener("bhanu:player_state", handlePlayerState);
      window.removeEventListener("beforeunload", handleUnload);
      window.removeEventListener("pagehide", handleUnload);
      sendHeartbeat("leave");
    };
  }, []);

  return (
    <div
      className="glass glass-edge flex items-center justify-center gap-2 rounded-full px-3 py-1 text-[11.5px] text-cream/75 shadow-sm transition-all min-w-[110px] sm:min-w-[125px]"
      title={`Trip #${tripNumber.toLocaleString("en-IN")} • Real-time live highway listener stream`}
    >
      <div className="relative flex h-2 w-2 items-center justify-center">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
        <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_6px_rgba(52,211,153,0.9)]" />
      </div>
      <span className="tabular-nums font-semibold text-cream transition-all duration-300">
        {count.toLocaleString("en-IN")}
      </span>
      <span className="text-white/60">
        {count === 1 ? "listener live" : "listeners live"}
      </span>
    </div>
  );
}

export default memo(ListenerCount);
