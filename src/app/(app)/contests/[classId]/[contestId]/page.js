import Leaderboard from "@/components/ui/Leaderboard";
import ContestLobbyCard from "@/components/ui/ContestLobbyCard";

export default function ContestPage({ params }) {
  return (
    <div className="flex min-h-screen w-full items-start justify-center gap-8 p-4 pt-12 md:p-8">
      <Leaderboard />
      <ContestLobbyCard />
    </div>
  );
}
