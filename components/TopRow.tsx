import ClockWidget from "./ClockWidget";
import ListenerCount from "./ListenerCount";
import SocialLinks from "./SocialLinks";

export default function TopRow() {
  return (
    <div className="safe-top safe-left safe-right fixed z-30 flex w-[calc(100%-2rem)] items-center justify-between">
      <ClockWidget />
      <ListenerCount />
      <SocialLinks />
    </div>
  );
}
