import DetailedSummaryPage from "./DetailedSummaryPage";
import {
  getContestDetailedSummaryAction,
  getContestRankAction,
} from "@/lib/actions/student_contest.action";

export default async function Page({ params }) {
  const { studentContestId } = await params;

  const [summaryRes, rankRes] = await Promise.all([
    getContestDetailedSummaryAction(studentContestId),
    getContestRankAction(studentContestId),
  ]);

  return (
    <DetailedSummaryPage
      summary={summaryRes.data}
      leaderboard={rankRes.data}
    />
  );
}

