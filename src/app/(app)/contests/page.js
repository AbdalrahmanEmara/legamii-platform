// import CustomScroll from "@/components/ui/CustomScroll";
// import ReusableWindow from "@/components/ui/ReusableWindow";
// import ContestCard from "@/components/ui/ContestCard";
// import { Terminal, Target, Trophy, Swords, Zap } from "lucide-react";

// export default function ContestsPage() {
//   const filters = [
//     { id: "all", label: "All Contests", active: true },
//     { id: "live", label: "Live Now", active: false },
//     { id: "upcoming", label: "Upcoming", active: false },
//     { id: "registered", label: "Registered", active: false },
//     { id: "history", label: "History", active: false },
//   ];

// const mockContests = [
//   {
//     id: 1,
//     title: "Science Fair Prep",
//     tags: ["Grade Level", "Science", "100 Player"],
//     icon: Terminal, // Using terminal for now, or beaker if available
//     iconBg: "bg-secondary-50",
//     iconColor: "text-secondary-500",
//     status: "Live",
//     friendsJoining: 0,
//   },
//   {
//     id: 2,
//     title: "Calculus Blitz: Derivative Dash",
//     tags: ["Global 8-11", "Calculus", "1120 Player"],
//     icon: Target,
//     iconBg: "bg-red-100", // Pinkish background
//     iconColor: "text-red-500",
//     status: "Upcoming",
//     timeText: "Tomorrow, 8:00 PM",
//     friendsJoining: 3,
//   },
//   {
//     id: 3,
//     title: "Algorithm Mastery Weekly #42",
//     tags: ["Global", "Algorithms", "2000 Player"],
//     icon: Trophy,
//     iconBg: "bg-cyan-50",
//     iconColor: "text-cyan-500",
//     status: "Upcoming",
//     timeText: "Oct 24, 6:00 PM",
//     friendsJoining: 12,
//   },
// ];

//   return (
//     <ReusableWindow title="Contests_Challenges.sys" className="m-auto flex h-[777px] w-[1384px] overflow-hidden max-w-full flex-col">
//       <div className="flex flex-1 overflow-hidden">
//         {/* Sidebar */}
//         <aside className="flex w-[240px] shrink-0 flex-col border-r border-text bg-el-bg">
//           <div className="flex font-bold justify-center items-center self-stretch border-border border py-xs2 px-base">
//             <span className="heading-h7 font-normal text-text font-primary">Filter</span>
//           </div>
//           <nav className="flex flex-1 flex-col p-xs gap-y-1">
//             {filters.map((filter) => (
//               <button
//                 key={filter.id}
//                 className={`flex w-full items-center justify-between rounded px-sm py-xs2 text-left transition-colors ${filter.active
//                   ? "bg-primary-500 font-bold text-white shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] outline outline-2 outline-text"
//                   : "text-sec-text hover:bg-neutral-200 hover:text-text"
//                   }`}
//               >
//                 <span className="font-primary text-sm uppercase">{filter.label}</span>
//               </button>
//             ))}
//           </nav>
//         </aside>

//         {/* Main Content Area */}
//         <div className="flex flex-1 flex-col bg-neutral-50 overflow-hidden relative">
//           {/* Subtle grid background pattern */}
//           <div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: "linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)", backgroundSize: "20px 20px" }}></div>

//           <div className="z-10 flex items-center justify-between border-b border-text bg-white p-base">
//             <h1 className="heading-h5-primary text-text uppercase m-0 leading-none">Contests</h1>
//             <div className="flex items-center gap-xs">
//               <button className="rounded border-2 border-secondary-500 px-sm py-xs2 font-primary text-sm font-bold text-secondary-500 shadow-[2px_2px_0px_0px_#0059ff] transition-transform hover:-translate-y-0.5">
//                 ALL
//               </button>
//             </div>
//           </div>

//           <CustomScroll className="flex-1 p-base lg:p-lg z-10">
//             <div className="flex flex-col gap-base p-base">
//               {mockContests.map((contest) => (
//                 <ContestCard key={contest.id} {...contest} />
//               ))}
//             </div>
//           </CustomScroll>
//         </div>
//       </div>
//     </ReusableWindow>
//   );
// }

/////////////////////////////////////////////////////
// import Leaderboard from "../_components/ui/Leaderboard";

// import CustomScroll from "@/components/ui/CustomScroll";
// import Leaderboard from "@/components/ui/Leaderboard";
// import ReusableWindow from "@/components/ui/ReusableWindow";

// function page() {
//   return (
//     <ReusableWindow title="Contests_challenges.sys" className="m-auto flex h-[777px] w-[1384px] overflow-hidden max-w-full flex-col">
//       <aside className="w-[250px] h-[1004px] flex flex-col items-start items-stretch border-border border-r">
//         <div className="flex font-bold justify-center items-center self-stretch border-border border py-xs2 px-base">
//           <span className="heading-h7 font-normal text-text font-primary">Filter</span>
//         </div>
//       </aside>
//       <CustomScroll>
//         <div className="flex-1 bg-secondary-300">
//           {/* Main content for contests/challenges goes here */}
//         </div>
//       </CustomScroll>

//     </ReusableWindow>
//   );
// }

// export default page;

///////////////////////////////////////////////////////////////////////

// "use client";

// import { useState } from "react";
import CustomScroll from "@/components/ui/CustomScroll";
import ReusableWindow from "@/components/ui/ReusableWindow";
import ContestCard from "@/components/ui/ContestCard";
import { Terminal, Target, Trophy, Swords, Zap } from "lucide-react";
import { getContests } from "@/lib/services/student_contest.service";
import ContestFilters from "@/components/ui/ContestFilters";


export default async function ContestsPage({
  searchParams,
}) {

  const params = await searchParams;

  const status =
    params?.status || "ONGOING";

  const contestsData =
    await getContests(status);

  console.log(contestsData);
  console.log(contestsData.data);
  console.log(contestsData.data.data);

  const contests =
    contestsData.data.map((contest) => ({
      contestId: contest.contestId,
      classId: contest.classId,

      title: contest.title,

      tags: [
        contest.gradeLevel,
        contest.subject,
        `${contest.playersCount} Player`,
      ],

      status: contest.status,
      isRegistered: contest.isRegistered,

      timeText: contest.startTime,

      friendsJoining:
        contest.friendsJoining || 0,
    }));


  return (
    <ReusableWindow title="Contests_Challenges.sys" className="m-auto flex h-[777px] w-[1384px] overflow-hidden max-w-full flex-col">
      <div className="flex flex-1 overflow-hidden">

        {/* ── Sidebar ───────────────────────────────────────────────── */}
        <aside className="flex w-[240px] shrink-0 flex-col border-r border-text bg-el-bg">
          <div className="flex font-bold justify-center items-center self-stretch border-border border py-xs2 px-base">
            <span className="heading-h7 font-normal text-text font-primary">Filter</span>
          </div>

          <ContestFilters current={status} />
        </aside>

        {/* ── Main Content Area (unchanged) ────────────────────────── */}
        <div className="flex flex-1 flex-col bg-neutral-50 overflow-hidden relative">
          <div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: "linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)", backgroundSize: "20px 20px" }}></div>
          <div className="z-10 flex items-center justify-between border-b border-text bg-white p-base">
            <h1 className="heading-h5-primary text-text uppercase m-0 leading-none">Contests</h1>
            <div className="flex items-center gap-xs">
              <button className="rounded border-2 border-secondary-500 px-sm py-xs2 font-primary text-sm font-bold text-secondary-500 shadow-[2px_2px_0px_0px_#0059ff] transition-transform hover:-translate-y-0.5">
                {status}
              </button>
            </div>
          </div>
          <CustomScroll className="flex-1 p-base lg:p-lg z-10">
            <div className="flex flex-col gap-base p-base">
              {contests.map((contest) => (
                <ContestCard key={contest.contestId} {...contest} />

              ))}
            </div>
          </CustomScroll>
        </div>

      </div>
    </ReusableWindow>
  );
}