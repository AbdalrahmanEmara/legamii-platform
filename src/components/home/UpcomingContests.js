import ReusableWindow from "../ui/ReusableWindow";
import { getContests } from "@/lib/services/student_contest.service";
import Link from "next/link";
import ContestList from "../contest/ContestList";

export default async function UpcomingContests() {
  const data = await getContests(null, "UPCOMING");
  const contestData = data?.data?.slice(0, 3) || [];

  return (
    <ReusableWindow title="upcoming_contests.sys" className="w-full">
      <div className="p-base flex flex-col gap-base">

        <h2 className="text-text font-bold font-primary leading-6 text-base md:text-xl 2xl:text-2xl 2xl:leading-8 uppercase">Upcoming Contests</h2>
        <div className="flex flex-col gap-base">
          <ContestList contestsData={contestData} />
          <Link href="/contests" className="flex justify-center align-center text-text text-xs md:text-sm md:leading-5 2xl:text-base font-normal font-primary leading-4 py-sm px-[32px] border border-border rounded-lg">
            View All Contests
          </Link>
        </div>
      </div>  
    </ReusableWindow>
  );
}
