import ContestSummaryPage from "./ContestSummaryPage";
import {
  getContestSummaryAction,
  getContestRankAction,
} from "@/lib/actions/student_contest.action";

export default async function Page({ params, searchParams }) {
  const { studentContestId } = await params;
  const { contestId } = await searchParams;

  const [summaryRes, rankRes] = await Promise.all([
    getContestSummaryAction(studentContestId),
    getContestRankAction(studentContestId),
  ]);

  return (
    <ContestSummaryPage
      studentContestId={studentContestId}
      contestId={contestId}
      summaryData={summaryRes?.data}
      leaderboardData={rankRes?.data || []}
    />
  );
}
