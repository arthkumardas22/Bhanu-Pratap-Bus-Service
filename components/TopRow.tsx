import ClockWidget from "./ClockWidget";
import ListenerCount from "./ListenerCount";
import SocialLinks from "./SocialLinks";

export default function TopRow() {
  return (
    <div className="safe-top safe-left safe-right fixed z-30 flex h-8 sm:h-9 w-[calc(100%-1.5rem)] sm:w-[calc(100%-2rem)] items-center justify-between gap-1 sm:gap-2">
      <ClockWidget />
      <ListenerCount />
      <SocialLinks />
    </div>
  );
}
