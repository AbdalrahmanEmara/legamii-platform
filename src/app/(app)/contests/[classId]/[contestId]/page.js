import Leaderboard from "@/components/ui/Leaderboard";
import ContestLobbyCard from "@/components/ui/ContestLobbyCard";

export default function ContestPage({ params }) {
  return (
    <div className="min-h-screen w-full p-4 md:p-8 flex gap-8 justify-center items-start pt-12">
      <Leaderboard />
      <ContestLobbyCard />
    </div>
  );
}
