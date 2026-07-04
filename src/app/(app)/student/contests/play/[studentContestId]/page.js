import ContestPlayPage from "./ContestPlayPage";
import { getContestQuestionsAction, getContestRankAction } from "@/lib/actions/student_contest.action";

export default async function Page({ params, searchParams }) {
  searchParams = await searchParams;

  const title = searchParams.title;
  const start = searchParams.start;
  const duration = Number(searchParams.duration);


  const resolvedParams = await params;

  const studentContestId = resolvedParams.studentContestId;

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
        initialQuestionsMetadata={questionsMetadata}
        initialLeaderboard={mappedLeaderboard}
        title={title}
        start={start}
        duration={duration}
      />
    </div>
  );
}