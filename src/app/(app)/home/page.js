import DailyMission from "@/components/home/DailyMission";
import Streak from "@/components/home/Streak";
import UpcomingContests from "@/components/home/UpcomingContests";
import WelcomeBack from "@/components/home/WelcomeBack";
import Leaderboard from "@/components/ui/Leaderboard";

export default function HomePage() {
  return (
    <div className="mx-auto max-w-[1512px] px-base md:px-md xl:px-xl3">
      {/*
       * Mobile  (< 768): 1 col, stack in DOM order
       * iPad    (md 768): 2 col [1fr 258px] — WelcomeBack/UpcomingContests/Leaderboard span both, DailyMission+Streak side by side
       * Desktop (xl 1280): 2 col [1fr 435px] — left col: Welcome→Daily→Upcoming; right col: Streak row1, Leaderboard rows 2-3
       */}
      <div className="grid grid-cols-1 gap-base md:grid-cols-[1fr_258px] lg:grid-cols-[1fr_350px]  xl:grid-cols-[1fr_435px] xl:gap-md">
        <div className="md:col-span-2 xl:col-span-1 xl:col-start-1 xl:row-start-1 xl:row-end-3">
          <WelcomeBack />
        </div>
        <div className="xl:col-start-1 xl:row-start-3 xl:row-end-7">
          <DailyMission />
        </div>
        <div className="md:col-start-2 md:row-start-2 xl:col-start-2 xl:row-start-1 xl:row-end-4">
          <Streak />
        </div>
        <div className="md:col-span-2 xl:col-span-1 xl:col-start-1 xl:row-start-7">
          <UpcomingContests />
        </div>
        <div className="md:col-span-2 xl:col-start-2 xl:row-start-4 xl:row-end-11">
          <Leaderboard />
        </div>
      </div>
    </div>
  );
}
