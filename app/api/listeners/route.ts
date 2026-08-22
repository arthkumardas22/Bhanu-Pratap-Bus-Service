import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";
export const revalidate = 0;

interface ListenerSession {
  lastSeen: number;
  isPlaying: boolean;
}

// In-memory active sessions store
// Node.js process / warm serverless instance scope
const activeSessions = new Map<string, ListenerSession>();
const HEARTBEAT_TIMEOUT_MS = 15000; // 15 seconds expiration window

function cleanExpiredSessions() {
  const now = Date.now();
  for (const [id, session] of activeSessions.entries()) {
    if (now - session.lastSeen > HEARTBEAT_TIMEOUT_MS) {
      activeSessions.delete(id);
    }
  }
}

export async function GET() {
  cleanExpiredSessions();

  let playingCount = 0;
  for (const session of activeSessions.values()) {
    if (session.isPlaying) playingCount++;
  }

  const liveCount = Math.max(activeSessions.size, 1);

  return NextResponse.json(
    {
      success: true,
      liveCount,
      playingCount,
      timestamp: Date.now(),
    },
    {
      headers: {
        "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate",
        Pragma: "no-cache",
        Expires: "0",
      },
    }
  );
}

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => ({}));
    const { sessionId, isPlaying = false, action = "heartbeat" } = body;

    cleanExpiredSessions();

    if (sessionId && typeof sessionId === "string") {
      if (action === "leave") {
        activeSessions.delete(sessionId);
      } else {
        activeSessions.set(sessionId, {
          lastSeen: Date.now(),
          isPlaying: Boolean(isPlaying),
        });
      }
    }

    let playingCount = 0;
    for (const session of activeSessions.values()) {
      if (session.isPlaying) playingCount++;
    }

    const liveCount = Math.max(activeSessions.size, 1);

    return NextResponse.json(
      {
        success: true,
        liveCount,
        playingCount,
        timestamp: Date.now(),
      },
      {
        headers: {
          "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate",
          Pragma: "no-cache",
          Expires: "0",
        },
      }
    );
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: "Failed to process listener heartbeat",
        liveCount: 1,
      },
      { status: 500 }
    );
  }
}
