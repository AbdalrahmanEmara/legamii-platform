import ContestPlayPage from "./ContestPlayPage";
import { getContestQuestionsAction, getContestRankAction } from "@/lib/actions/student_contest.action";

export default async function Page({ params, searchParams }) {
  const resolvedParams = await params;
  const resolvedSearchParams = await searchParams;

  const studentContestId = resolvedParams.studentContestId;
  const contestId = resolvedSearchParams.contestId;

  const questionsResponse =
    await getContestQuestionsAction(studentContestId);

  const questionsMetadata =
    questionsResponse?.data ?? [];

  let initialLeaderboard = await getContestRankAction(studentContestId);

  initialLeaderboard = initialLeaderboard?.data ?? [];

  const mappedLeaderboard = initialLeaderboard.map(user => ({
    ...user,
    firstName: user.first_name || user.firstName,
  }));

  return (
    <div className="w-full flex h-full items-center justify-center p-8 bg-transparent">
      <ContestPlayPage
        studentContestId={studentContestId}
        contestId={contestId}
        initialQuestionsMetadata={questionsMetadata}
        initialLeaderboard={mappedLeaderboard}
      />
    </div>
  );
}