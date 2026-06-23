import ContestCard from "./ContestCard";

export default function ContestList({ contestsData, className }) {
  return (
    <div className={`p-base flex flex-col gap-base ${className}`}>
      {contestsData.map((contest) => (
        <ContestCard key={contest.contestId} contest={contest} />
      ))}
    </div>

  )
}