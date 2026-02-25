// This is a Server Component by default (no "use client")
// If later you add interactivity → then add "use client"

import Image from "next/image";

// 🔹 Fake Data (Replace later with API data)
const leaderboardData = [
  {
    id: 1,
    name: "HELENA",
    level: 20,
    avatar: "/avatars/a1.png", // 🔸 Replace with your real images
  },
  {
    id: 2,
    name: "TYHHYT",
    level: 20,
    avatar: "/avatars/a2.png",
  },
  {
    id: 3,
    name: "FARAH",
    level: 20,
    avatar: "/avatars/a3.png",
  },
  {
    id: 4,
    name: "HENNA",
    level: 20,
    avatar: "/avatars/a4.png",
  },
  {
    id: 5,
    name: "SALMA",
    level: 20,
    avatar: "/avatars/a5.png",
  },
  {
    id: 6,
    name: "YOU",
    level: 8,
    avatar: "/avatars/a6.png",
  },
  {
    id: 7,
    name: "ALI",
    level: 20,
    avatar: "/avatars/a7.png",
  },
];

export default function Leaderboard() {
  return (
    <div className="/* 🔸 Update width from Figma */ /* 🔸 Update height from Figma */ /* 🔸 Outer background color */ h-[792px] w-[328px] overflow-hidden rounded-2xl border border-neutral-800 bg-neutral-900 shadow-lg">
      {/* ================= HEADER ================= */}
      <div className="/* 🔸 Header padding from Figma */ border-b border-neutral-700 px-6 py-4 text-lg font-bold text-white">
        LEADERBOARD.SYS
      </div>

      {/* ================= LIST ================= */}
      <div className="h-[520px] overflow-y-auto">
        {/* 🔸 Adjust height based on header + footer */}
        {leaderboardData.map((user, index) => {
          const isTopOne = index === 0;
          const isTopTwo = index === 1;
          const isTopThree = index === 2;
          const isYou = user.name === "YOU";

          return (
            <div
              key={user.id}
              className={`/* 🔸 Row padding */ flex items-center gap-4 border-b border-neutral-200 px-6 py-4 ${
                isTopOne
                  ? "bg-purple-500" // 🔸 Replace with exact Figma purple
                  : isTopTwo
                    ? "bg-purple-400"
                    : isTopThree
                      ? "bg-purple-300"
                      : "bg-white"
              } ${isYou ? "border-y-2 border-black shadow-inner" : ""} `}
            >
              {/* Rank */}
              <div className="w-10 font-bold text-black">#{user.id}</div>

              {/* Avatar */}
              <div className="relative h-12 w-12">
                <Image
                  src={user.avatar}
                  alt={user.name}
                  fill
                  className="rounded-full object-cover"
                />
              </div>

              {/* Name + Level */}
              <div className="flex flex-col">
                <span
                  className={`font-bold tracking-wide ${index < 3 ? "text-white" : "text-black"} `}
                >
                  {user.name}
                </span>

                <span className={`text-sm ${index < 3 ? "text-white/80" : "text-gray-500"} `}>
                  Lvl {user.level}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* ================= FOOTER ================= */}
      <div className="flex items-center justify-between bg-black px-6 py-4 font-bold text-white">
        <span>Your Rank</span>
        <span className="text-purple-400"># {}</span>
        {/* 🔸 Replace purple color with Figma color token */}
      </div>
    </div>
  );
}
