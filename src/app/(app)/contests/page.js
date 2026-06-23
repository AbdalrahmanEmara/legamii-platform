import ReusableWindow from "@/components/ui/ReusableWindow";
import MainContestPage from "@/components/contest/MainContestPage";
import { getContests } from "@/lib/services/student_contest.service";

export default async function ContestsPage({ searchParams }) {
  const resolvedParams = await searchParams;
  const status = resolvedParams?.status || "UPCOMING";
  let contestData = [];

  try {
    console.log(status);
    const data = await getContests(null, status);
    if (!data?.data) throw new Error("Error fetching contests, status: ", status, data.error);
    contestData = data?.data || [];
  } catch (error) {
    console.error(error);
  }

  return (
    <ReusableWindow
      title="Contests_Challenges.sys"
      className="mx-auto flex h-[777px] max-w-full flex-col overflow-hidden "
    >
      <MainContestPage status={status} contestsData={contestData} />
    </ReusableWindow>
  );
}