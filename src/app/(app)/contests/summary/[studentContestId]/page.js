import ContestSummaryPage from "./ContestSummaryPage";
import {
  getContestSummaryAction,
  getContestRankAction,
} from "@/lib/actions/student_contest.action";

export default async function Page({ params }) {
  const { studentContestId } = await params;

  const [summaryRes, rankRes] = await Promise.all([
    getContestSummaryAction(studentContestId),
    getContestRankAction(studentContestId),
  ]);

  return (
    <ContestSummaryPage
      studentContestId={studentContestId}
      summaryData={summaryRes?.data}
      leaderboardData={rankRes?.data || []}
    />
  );
}