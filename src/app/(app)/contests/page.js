import CustomScroll from "@/components/ui/CustomScroll";
import ReusableWindow from "@/components/ui/ReusableWindow";
import ContestCard from "@/components/ui/ContestCard";
import { Terminal, Target, Trophy, Swords, Zap } from "lucide-react";

export default function ContestsPage() {
  const filters = [
    { id: "all", label: "All Contests", active: true },
    { id: "live", label: "Live Now", active: false },
    { id: "upcoming", label: "Upcoming", active: false },
    { id: "registered", label: "Registered", active: false },
    { id: "history", label: "History", active: false },
  ];

  const mockContests = [
    {
      id: 1,
      title: "Science Fair Prep",
      tags: ["Grade Level", "Science", "100 Player"],
      icon: Terminal, // Using terminal for now, or beaker if available
      iconBg: "bg-secondary-50",
      iconColor: "text-secondary-500",
      status: "Live",
      friendsJoining: 0,
    },
    {
      id: 2,
      title: "Calculus Blitz: Derivative Dash",
      tags: ["Global 8-11", "Calculus", "1120 Player"],
      icon: Target,
      iconBg: "bg-red-100", // Pinkish background
      iconColor: "text-red-500",
      status: "Upcoming",
      timeText: "Tomorrow, 8:00 PM",
      friendsJoining: 3,
    },
    {
      id: 3,
      title: "Algorithm Mastery Weekly #42",
      tags: ["Global", "Algorithms", "2000 Player"],
      icon: Trophy,
      iconBg: "bg-cyan-50",
      iconColor: "text-cyan-500",
      status: "Upcoming",
      timeText: "Oct 24, 6:00 PM",
      friendsJoining: 12,
    },
  ];

  return (
    <ReusableWindow
      title="Contests_challenges.sys"
      className="m-auto flex h-[85vh] w-[95vw] max-w-[1400px] flex-col overflow-hidden"
    >
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <aside className="flex w-[240px] shrink-0 flex-col border-r border-text bg-el-bg">
          <div className="border-b border-text p-sm">
            <h2 className="heading-h6 font-primary text-text">Filter</h2>
          </div>
          <nav className="flex flex-1 flex-col p-xs gap-y-1">
            {filters.map((filter) => (
              <button
                key={filter.id}
                className={`flex w-full items-center justify-between rounded px-sm py-xs2 text-left transition-colors ${
                  filter.active
                    ? "bg-primary-500 font-bold text-white shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] outline outline-2 outline-text"
                    : "text-sec-text hover:bg-neutral-200 hover:text-text"
                }`}
              >
                <span className="font-primary text-sm uppercase">{filter.label}</span>
              </button>
            ))}
          </nav>
        </aside>

        {/* Main Content Area */}
        <div className="flex flex-1 flex-col bg-neutral-50 overflow-hidden relative">
          {/* Subtle grid background pattern */}
          <div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: "linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)", backgroundSize: "20px 20px" }}></div>
          
          <div className="z-10 flex items-center justify-between border-b border-text bg-white p-base">
            <h1 className="title-3 text-text uppercase m-0 leading-none">Contests & Challenges</h1>
            <div className="flex items-center gap-xs">
              <span className="font-primary text-sm text-sec-text">VIEW:</span>
              <button className="rounded border-2 border-secondary-500 px-sm py-xs2 font-primary text-sm font-bold text-secondary-500 shadow-[2px_2px_0px_0px_#0059ff] transition-transform hover:-translate-y-0.5">
                ALL
              </button>
            </div>
          </div>

          <CustomScroll className="flex-1 p-base lg:p-lg z-10">
            <div className="mx-auto flex max-w-5xl flex-col gap-base pb-lg">
              {mockContests.map((contest) => (
                <ContestCard key={contest.id} {...contest} />
              ))}
            </div>
          </CustomScroll>
        </div>
      </div>
    </ReusableWindow>
  );
}
