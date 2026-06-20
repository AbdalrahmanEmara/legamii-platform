

import Leaderboard from "@/components/ui/Leaderboard";
import ContestLobbyCard from "@/components/ui/ContestLobbyCard";

import { getContestLobbyAction } from "@/lib/actions/contests.actions";

export default async function ContestPage({ params }) {
  const { classId, contestId } = await params;



  const contest = await getContestLobbyAction(
    classId,
    contestId
  );

  // const contest = contestRes?.data;

  console.log(contest);

  return (
    <div className="flex min-h-screen w-full items-start justify-center gap-8 p-4 pt-12 md:p-8">
      <Leaderboard users={contest?.registeredStudents || []} />

      {/* <ContestLobbyCard contest={contest} /> */}
      <ContestLobbyCard
        contest={contest}
        classId={classId}
        contestId={contestId}
      />
    </div>
  );
}