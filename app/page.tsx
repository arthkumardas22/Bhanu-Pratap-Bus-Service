import BackgroundVideo from "@/components/BackgroundVideo";
import GrainOverlay from "@/components/GrainOverlay";
import TopRow from "@/components/TopRow";
import BusServiceLogo from "@/components/BusServiceLogo";
import MusicPlayer from "@/components/MusicPlayer";
import TruckHorn from "@/components/TruckHorn";
import SpotifyButton from "@/components/SpotifyButton";

export default function Page() {
  return (
    <main className="relative flex min-h-dvh h-dvh flex-1 flex-col items-center justify-between overflow-hidden select-none">
      <BackgroundVideo />
      <GrainOverlay />
      <TopRow />

      {/* Center windshield logo: Bhanu Pratap Bus Service */}
      <BusServiceLogo />

      {/* Bottom dashboard cluster */}
      <div className="safe-bottom relative z-20 flex w-full flex-col items-center gap-2 sm:gap-3 pb-1 sm:pb-2">
        <MusicPlayer />
        <div className="flex items-center gap-2 sm:gap-2.5 px-3 sm:px-4 w-full max-w-xl justify-center">
          <TruckHorn />
          <SpotifyButton />
        </div>
      </div>

      {/* Bottom left footer link - hidden on mobile to prevent blocking player controls */}
      <div className="safe-bottom safe-left fixed z-30 hidden lg:flex items-center">
        <a
          href="https://www.instagram.com/arth_kumar_das?igsh=MXh0aW8wdXRmbjBjbg==&igsi=MXh0aW8wdXRmbjBjbg=="
          target="_blank"
          rel="noopener noreferrer"
          className="glass glass-edge flex items-center gap-1.5 rounded-full px-3 py-1 text-[11.5px] font-medium text-cream/70 hover:text-accent-glow hover:bg-white/10 transition-all shadow-lg active:scale-95"
          title="Creator @arth_kumar_das on Instagram"
        >
          <span className="text-accent/80 font-bold">@</span>
          <span>arth_kumar_das</span>
        </a>
      </div>
    </main>
  );
}
