import CustomScroll from "@/components/ui/CustomScroll";
import ReusableWindow from "@/components/ui/ReusableWindow";
import { getContests } from "@/lib/services/student_contest.service";
import ContestFilters from "@/components/ui/ContestFilters";
import ContestList from "@/components/contest/ContestList";

export default async function ContestsPage({ searchParams }) {
  const resolvedParams = await searchParams;
  console.log("Resolved Params:", resolvedParams);

  const status = resolvedParams?.status || "UPCOMING"; // This can be dynamic based on user selection
  let contestsData = [];
  try {
    contestsData = await getContests(null, status);
    if (!contestsData.data) {
      throw new Error("No data");
    }
  } catch (error) {
    console.error(error);
  }

  console.log(contestsData);
  console.log(contestsData?.data);

  return (
    <ReusableWindow
      title="Contests_Challenges.sys"
      className="m-auto flex h-[777px] w-[1384px] max-w-full flex-col overflow-hidden"
    >
      <div className="flex flex-1 overflow-hidden">
        {/* ── Sidebar ───────────────────────────────────────────────── */}
        <aside className="border-text bg-el-bg flex w-[240px] shrink-0 flex-col border-r">
          <div className="border-border py-xs2 px-base flex items-center justify-center self-stretch border font-bold">
            <span className="heading-h7 text-text font-primary font-normal">Filter</span>
          </div>

          <ContestFilters current={status} />
        </aside>

        {/* ── Main Content Area (unchanged) ────────────────────────── */}
        <div className="relative flex flex-1 flex-col overflow-hidden bg-neutral-50">
          <div className="border-text p-base z-10 flex items-center justify-between border-b bg-white">
            <h1 className="heading-h5-primary text-text m-0 leading-none uppercase">Contests</h1>
            <div className="gap-xs flex items-center">
              <button className="border-secondary-500 px-sm py-xs2 font-primary text-secondary-500 rounded border-2 text-sm font-bold shadow-[2px_2px_0px_0px_#0059ff] transition-transform hover:-translate-y-0.5">
                {status}
              </button>
            </div>
          </div>
          <CustomScroll className="p-base">
            <ContestList contestsData={contestsData?.data || []} className="p-base" />
          </CustomScroll>
        </div>
      </div>
    </ReusableWindow>
  );
}