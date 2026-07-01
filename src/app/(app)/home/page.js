import { Suspense } from "react";
import DailyMission from "@/components/home/DailyMission";
import Streak from "@/components/home/Streak";
import UpcomingContests from "@/components/home/UpcomingContests";
import WelcomeBack from "@/components/home/WelcomeBack";
import Leaderboard from "@/components/ui/Leaderboard";
import UpcomingContestsSkeleton from "@/components/Skeletons/UpcomingContestSkeleton";
import { getGlobalLeaderboardAction } from "@/lib/actions/leaderboard.action";
import GlobalLeaderboard from "@/components/home/GlobalLeaderboard";

export default async function HomePage() {
  // Load the first 100 students before rendering the page.
  // This gives us an immediate leaderboard without waiting for the socket.
  const leaderboardRes = await getGlobalLeaderboardAction(1, 100);
    console.log(leaderboardRes);
  return (
    <div className="mx-auto px-base md:px-md xl:px-xl3">
      {/*
       * Mobile  (< 768): 1 col, stack in DOM order
       * iPad    (md 768): 2 col [1fr 258px] — WelcomeBack/UpcomingContests/Leaderboard span both, DailyMission+Streak side by side
       * Desktop (xl 1280): 2 col [1fr 435px] — left col: Welcome→Daily→Upcoming; right col: Streak row1, Leaderboard rows 2-3
       */}
      <div className="grid grid-cols-1 gap-base md:grid-cols-[1fr_258px] lg:grid-cols-[1fr_350px]  2xl:grid-cols-[1fr_435px] 2xl:gap-md">
        <div className="md:col-span-2 xl:col-span-1 xl:col-start-1 xl:row-start-1 xl:row-end-3">
          {/* <Suspense fallback={<WelcomeBackSkeleton />}> */}
          <WelcomeBack />
          {/* </Suspense> */}
        </div>
        <div className="xl:col-start-1 xl:row-start-3 xl:row-end-7">
          {/* <Suspense fallback={<DailyMissionSkeleton />}> */}
          <DailyMission />
          {/* </Suspense> */}
        </div>
        <div className="md:col-start-2 md:row-start-2 xl:col-start-2 xl:row-start-1 xl:row-end-4">
          {/* <Suspense fallback={<StreakSkeleton />}> */}
          <Streak />
          {/* </Suspense> */}
        </div>
        <div className="md:col-span-2 xl:col-span-1 xl:col-start-1 xl:row-start-7">
          <Suspense fallback={<UpcomingContestsSkeleton />}>
            <UpcomingContests />
          </Suspense>
        </div>
        <div className="md:col-span-2 xl:col-start-2 xl:row-start-4 xl:row-end-11">
          {/* <Suspense fallback={<LeaderboardSkeleton />}> */}
          <GlobalLeaderboard
            initialStudents={leaderboardRes.data.leaderboard}
          />
          {/* </Suspense> */}
        </div>
      </div>
    </div>
  );
}