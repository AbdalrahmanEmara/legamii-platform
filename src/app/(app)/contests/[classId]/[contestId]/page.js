import Leaderboard from "@/components/ui/Leaderboard";
import ContestLobbyCard from "@/components/ui/ContestLobbyCard";

export default async function ContestPage({ searchParams }) {
  const resolvedParams = await searchParams; // No need to await since searchParams is already resolved
  const contestId = resolvedParams?.contestId;
  const classId = resolvedParams?.classId;
  return (
    <div className="flex min-h-screen w-full items-start justify-center gap-8 p-4 pt-12 md:p-8">
      <Leaderboard />
      <ContestLobbyCard classId={classId} contestId={contestId} />
    </div>
  );
}
