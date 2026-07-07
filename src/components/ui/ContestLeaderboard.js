"use client";
import Image from "next/image";
import ReusableWindow from "./ReusableWindow";
import CustomScroll from "./CustomScroll";
import { User } from "lucide-react";

export default function ContestLeaderboard({ students = [], currentUserId, scoreAnimationAmount = 0, scoreAnimationUserId = null, variant = "default", }) {
  // Sort students by score to determine rank
  const sortedStudents = [...students].sort((a, b) => b.score - a.score);

  const isDetailedSummary = variant === "detailed-summary";

  const containerClass = isDetailedSummary
    ? "flex h-[508px] w-[566px] flex-col"
    : "flex h-[760px] w-[290px] flex-col";

  const rowClass = isDetailedSummary
    ? "h-[84px]"
    : "";

  return (
    // <ReusableWindow
    //   className="flex h-[760px] w-[290px] flex-col items-start items-stretch"
    //   title="LEADERBOARD.SYS"
    // >
    <ReusableWindow
      className={containerClass}
      title="LEADERBOARD.SYS"
    >
      <div className="flex-1 overflow-hidden flex flex-col">
        <CustomScroll>
          {sortedStudents.map((user, index) => {
            const isTopOne = index === 0;
            const isTopTwo = index === 1;
            const isTopThree = index === 2;
            const isYou = user.id === currentUserId;

            return (
              <div
                key={user.id}
                className={`
    ${rowClass}
    px-sm py-base gap-base flex items-center self-stretch border-b border-[#020203]
    ${isTopOne
                    ? "bg-primary-300"
                    : isTopTwo
                      ? "bg-primary-200"
                      : isTopThree
                        ? "bg-primary-50"
                        : "bg-white"
                  }
    ${isYou ? "border-y-2 border-black shadow-inner" : ""}
  `}
              >
                {/* Rank */}
                <div className="label-1 w-8 font-bold">#{index + 1}</div>

                {/* Avatar */}
                <div className="border-border relative h-[40px] w-[40px] flex-shrink-0">
                  {/*<Image
                    src={user.avatarUrl}
                    alt={`${user.firstName} ${user.lastName}`}
                    fill
                    className="rounded-full object-cover border border-black"
                  />*/}
                  {user.avatarUrl ? (
                    <Image
                      src={user.avatarUrl}
                      alt={`${user.firstName} ${user.lastName}`}
                      fill
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center rounded-full bg-gray-200">
                      <User className="h-5 w-5" />
                    </div>
                  )}
                </div>

                {/* Name + Level */}
                <div className="gap-xxs flex flex-1 flex-col items-start justify-center overflow-hidden">
                  <span className="label-1 font-bold truncate w-full">{isYou ? "YOU" : `${user.firstName} ${user.lastName}`.toUpperCase()}</span>
                  <span className="body-2 text-xs">Lvl {user.level}</span>
                </div>

                {/* Score Animation */}
                {scoreAnimationUserId === user.id && scoreAnimationAmount > 0 && (
                  <div className="text-green-500 font-bold label-1 animate-bounce">
                    +{scoreAnimationAmount}
                  </div>
                )}
              </div>
            );
          })}
        </CustomScroll>
      </div>

      {/* ================= FOOTER ================= */}
      <div className="p-sm border-t border-border flex items-center justify-between self-stretch bg-black font-bold h-[48px]">
        <span className="label-1 font-bold text-neutral-50">Your Rank</span>
        <span className="text-primary-300 label-1 font-bold">
          #{sortedStudents.findIndex((user) => user.id === currentUserId) + 1}
        </span>
      </div>
    </ReusableWindow>
  );
}