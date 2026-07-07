import Leaderboard from "@/components/ui/Leaderboard";
import ContestLobbyCard from "@/components/ui/ContestLobbyCard";

import { getContestLobby } from "@/lib/services/student_contest.service";

export default async function ContestPage({ params }) {
  const { classId, contestId } = await params;

  const res = await getContestLobby(
    classId,
    contestId
  );

  const contest = res?.data;

  console.log(contest);

  return (
    <div className="flex min-h-screen w-full items-start justify-center gap-8 p-4 pt-12 md:p-8">
      <Leaderboard students={contest?.registeredStudents || []} />

      <ContestLobbyCard
        contest={contest}
        classId={classId}
        contestId={contestId}
      />
    </div>
  );
}