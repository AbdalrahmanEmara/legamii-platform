import Leaderboard from "@/components/ui/Leaderboard";
import ContestLobbyCard from "@/components/ui/ContestLobbyCard";
import { getContestLobby } from "@/lib/services/student_contest.service";

export default async function LobbyPage({ params }) {
  const resolvedParams = await params;
  const { contestId, classId } = resolvedParams;

  try {
    console.log(classId);
    console.log(contestId);
    const lobby = await getContestLobby(classId, contestId);
    console.log(lobby);
  } catch (err) {
    console.error(err);
  }

  return (
    <div className="flex min-h-screen w-full items-start justify-center gap-8 p-4 pt-12 md:p-8">
      <Leaderboard />
      <ContestLobbyCard classId={classId} contestId={contestId} />
    </div>
  );
}
