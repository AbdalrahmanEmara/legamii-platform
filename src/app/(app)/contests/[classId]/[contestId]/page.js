

import Leaderboard from "@/components/ui/Leaderboard";
import ContestLobbyCard from "@/components/ui/ContestLobbyCard";

import { getContestLobbyAction } from "@/lib/actions/contests.actions";

export default async function ContestPage({ params }) {
  const { classId, contestId } = await params;
  console.log("start")
  console.log(classId, contestId);
  console.log(params)
  console.log("End")


  // const contest = await getContestLobbyAction(
  //   classId,
  //   contestId
  // );
  const res = await getContestLobbyAction(
  classId,
  contestId
);

const contest = res?.data;

  console.log(contest);
  // const contest = {
  //   contestStatus: "ONGOING",
  //   contestTitle: "Test Contest",
  //   difficulty: "easy",
  //   subject: "Science",
  //   skills: ["Physics"],
  //   contestTimeLimit: 60,
  //   contestStartingTime: new Date().toISOString(),
  //   xpGained: 100,
  //   isRegistered: true,
  //   joinedFriends: [],
  //   registeredStudents: [],
  // };

  // const contest = contestRes?.data;



  return (
    <div className="flex min-h-screen w-full items-start justify-center gap-8 p-4 pt-12 md:p-8">
      <Leaderboard users={contest?.registeredStudents || []} />

      {/* <ContestLobbyCard contest={contest} /> */}
      <ContestLobbyCard
        contest={contest}
        classId={classId}
        contestId={contestId}
      />
    </div>
  );
}