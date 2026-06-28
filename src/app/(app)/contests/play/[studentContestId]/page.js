import ContestPlayPage from "./ContestPlayPage";
import { getContestQuestionsAction, getContestRankAction } from "@/lib/actions/student_contest.action";

export default async function Page({ params, searchParams }) {
  const resolvedParams = await params;

  const studentContestId = resolvedParams.studentContestId;

  const questionsResponse =
    await getContestQuestionsAction(studentContestId);

  const questionsMetadata =
    questionsResponse?.data ?? [];
  /*let initialLeaderboard = await getContestRankAction(studentContestId);

  if (!questionsMetadata) {
    return <div className="p-8 text-center text-white">Failed to load contest questions.</div>;
  }
  if (!initialLeaderboard) {
    initialLeaderboard = [];
  }

  console.log("initialLeaderboard", initialLeaderboard);
  console.log("type", typeof initialLeaderboard);
  console.log("isArray", Array.isArray(initialLeaderboard));
  // Map first_name to firstName for the leaderboard
  const mappedLeaderboard = (initialLeaderboard?.data ?? []).map((user) => ({
    ...user,
    firstName: user.first_name || user.firstName,
  }));
*/

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
        initialQuestionsMetadata={questionsMetadata}
        initialLeaderboard={mappedLeaderboard}
        timeLimit={timeLimit}
      />
    </div>
  );
}