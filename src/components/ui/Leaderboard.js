// This is a Server Component by default (no "use client")
// If later you add interactivity → then add "use client"
"use client";
import Image from "next/image";
import ReusableWindow from "./ReusableWindow";
import CustomScroll from "./CustomScroll";

// 🔹 Fake Data (Replace later with API data)
// const leaderboardData = [
//   {
//     id: 1,
//     name: "HELENA",
//     level: 20,
//     avatar: "/avatars/a1.png", // 🔸 Replace with your real images
//   },
//   {
//     id: 2,
//     name: "TYHHYT",
//     level: 20,
//     avatar: "/avatars/a2.png",
//   },
//   {
//     id: 3,
//     name: "FARAH",
//     level: 20,
//     avatar: "/avatars/a3.png",
//   },
//   {
//     id: 4,
//     name: "HENNA",
//     level: 20,
//     avatar: "/avatars/a4.png",
//   },
//   {
//     id: 5,
//     name: "SALMA",
//     level: 20,
//     avatar: "/avatars/a5.png",
//   },
//   {
//     id: 6,
//     name: "YOU",
//     level: 8,
//     avatar: "/avatars/a6.png",
//   },
//   {
//     id: 7,
//     name: "ALI",
//     level: 20,
//     avatar: "/avatars/a7.png",
//   },
//   {
//     id: 8,
//     name: "HELENA",
//     level: 20,
//     avatar: "/avatars/a1.png", // 🔸 Replace with your real images
//   },
//   {
//     id: 9,
//     name: "TYHHYT",
//     level: 20,
//     avatar: "/avatars/a2.png",
//   },
//   {
//     id: 10,
//     name: "FARAH",
//     level: 20,
//     avatar: "/avatars/a3.png",
//   },
//   {
//     id: 11,
//     name: "HENNA",
//     level: 20,
//     avatar: "/avatars/a4.png",
//   },
//   {
//     id: 12,
//     name: "SALMA",
//     level: 20,
//     avatar: "/avatars/a5.png",
//   },
// ];

export default function Leaderboard({ students = [] }) { 
  return (
    <ReusableWindow
      className="flex h-[1004px] w-[413px] flex-col items-start items-stretch"
      title="Global_Leaderboard.sys"
    >
      <CustomScroll>
        {students.map((user, index) => {
          const isTopOne = index === 0;
          const isTopTwo = index === 1;
          const isTopThree = index === 2;
          // const isYou = `${user.firstName} ${user.lastName}` === "YOU";
          const isYou = false;

          return (
            <div
              key={user.id}
              className={`px-sm py-base gap-base flex self-stretch ${
                isTopOne
                  ? "bg-primary-300" // 🔸 Replace with exact Figma purple
                  : isTopTwo
                    ? "bg-primary-200"
                    : isTopThree
                      ? "bg-primary-50"
                      : "bg-white"
              } ${isYou ? "border-y-2 border-black shadow-inner" : ""}`}
            >
              {/* Rank */}
              {/* <div className="label-1 w-10 font-bold">#{user.id}</div> */}
              <div className="label-1 w-10 font-bold">#{index+1}</div>

              {/* Avatar */}
              <div className="border-border relative h-[50.304px] w-[50.304px] self-stretch">
                <Image
                  src={user.avatarUrl}
                  alt={`${user.firstName} ${user.lastName}`}
                  fill
                  className="rounded-full object-cover"
                />
              </div>

              {/* Name + Level */}
              <div className="gap-xxs flex flex-col items-start justify-center">
                <span className="label-1 font-bold">{`${user.firstName} ${user.lastName}`}</span>

                <span className="body-2">Lvl {user.level}</span>
              </div>
            </div>
          );
        })}
      </CustomScroll>

      {/* ================= FOOTER ================= */}
      {/* <div className="p-sm border-border flex items-center justify-between self-stretch bg-black font-bold">
        <span className="label-1 font-bold text-neutral-50">Your Rank</span>
        <span className="text-primary-300 label-1 font-bold">
          # {students.findIndex((user) => `${user.firstName} ${user.lastName}` === "YOU") + 1}
        </span>
      </div> */}
    </ReusableWindow>
  );
}

/*****************************************8 */
// export default function Leaderboard() {
//   return (
//     <div className="/* 🔸 Update width from Figma */ /* 🔸 Update height from Figma */ /* 🔸 Outer background color */ h-[792px] w-[328px] overflow-hidden rounded-2xl border border-neutral-800 bg-neutral-900 shadow-lg">
//       {/* ================= HEADER ================= */}
//       <div className="/* 🔸 Header padding from Figma */ border-b border-neutral-700 px-6 py-4 text-lg font-bold text-white">
//         LEADERBOARD.SYS
//       </div>

//       {/* ================= LIST ================= */}
//       <div className="h-[520px] overflow-y-auto">
//         {/* 🔸 Adjust height based on header + footer */}
//         {leaderboardData.map((user, index) => {
//           const isTopOne = index === 0;
//           const isTopTwo = index === 1;
//           const isTopThree = index === 2;
//           const isYou = user.name === "YOU";

//           return (
//             <div
//               key={user.id}
//               className={`/* 🔸 Row padding */ flex items-center gap-4 border-b border-neutral-200 px-6 py-4 ${
//                 isTopOne
//                   ? "bg-primary-300" // 🔸 Replace with exact Figma purple
//                   : isTopTwo
//                     ? "bg-primary-200"
//                     : isTopThree
//                       ? "bg-primary-50"
//                       : "bg-white"
//               } ${isYou ? "border-y-2 border-black shadow-inner" : ""} `}
//             >
//               {/* Rank */}
//               <div className="w-10 label-1">#{user.id}</div>

//               {/* Avatar */}
//               <div className="relative h-12 w-12">
//                 <Image
//                   src={user.avatar}
//                   alt={user.name}
//                   fill
//                   className="rounded-full object-cover"
//                 />
//               </div>

//               {/* Name + Level */}
//               <div className="flex flex-col">
//                 <span
//                   className={`font-bold tracking-wide ${index < 3 ? "text-white" : "text-black"} `}
//                 >
//                   {user.name}
//                 </span>

//                 <span className={`text-sm ${index < 3 ? "text-white/80" : "text-gray-500"} `}>
//                   Lvl {user.level}
//                 </span>
//               </div>
//             </div>
//           );
//         })}
//       </div>

//       {/* ================= FOOTER ================= */}
//       <div className="flex items-center justify-between bg-black px-6 py-4 font-bold text-white">
//         <span>Your Rank</span>
//         <span className="text-purple-400"># {}</span>
//         {/* 🔸 Replace purple color with Figma color token */}
//       </div>
//     </div>
//   );
// }
