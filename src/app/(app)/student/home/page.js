import { Suspense } from "react";
import DailyMission from "@/components/home/DailyMission";
import Streak from "@/components/home/Streak";
import UpcomingContests from "@/components/home/UpcomingContests";
import WelcomeBack from "@/components/home/WelcomeBack";
import Leaderboard from "@/components/ui/Leaderboard";
import UpcomingContestsSkeleton from "@/components/Skeletons/UpcomingContestSkeleton";
import StreakSkeleton from "@/components/Skeletons/StreakSkeleton";
import DailyMissionSkeleton from "@/components/Skeletons/DailyMissionSkeleton";
import { getProfile } from "@/lib/services/student_profile.service";

export default async function HomePage() {
  let profile = null;

  try {
    profile = await getProfile();
    // console.log('profile: ', profile);
  } catch (err) {
    console.error("Failed to load profile:", err);
  }

  const name = profile?.first_name || "Student";

  return (
    <div className="mx-auto px-base md:px-md xl:px-xl3">
      <div className="grid grid-cols-1 gap-base md:grid-cols-[1fr_258px] lg:grid-cols-[1fr_350px]  2xl:grid-cols-[1fr_435px] 2xl:gap-md">
        <div className="md:col-span-2 xl:col-span-1 xl:col-start-1 xl:row-start-1 xl:row-end-3">
          <WelcomeBack name={name} />
        </div>
        <div className="xl:col-start-1 xl:row-start-3 xl:row-end-7">
          <Suspense fallback={<DailyMissionSkeleton />}>
            <DailyMission />
          </Suspense>
        </div>
        <div className="md:col-start-2 md:row-start-2 xl:col-start-2 xl:row-start-1 xl:row-end-4">
          <Suspense fallback={<StreakSkeleton />}>
            <Streak />
          </Suspense>
        </div>
        <div className="md:col-span-2 xl:col-span-1 xl:col-start-1 xl:row-start-7">
          <Suspense fallback={<UpcomingContestsSkeleton />}>
            <UpcomingContests />
          </Suspense>
        </div>
        <div className="md:col-span-2 xl:col-span-1 xl:col-start-2 xl:row-start-4 xl:row-end-11">
          <Leaderboard />
        </div>
      </div>
    </div>
  );
}
