"use client";

import React from "react";
import { useRouter } from "next/navigation";
import ReusableWindow from "@/components/ui/ReusableWindow";
import ContestLeaderboard from "@/components/ui/ContestLeaderboard";

export default function ContestSummaryPage({ params }) {
  const router = useRouter();
  // const { studentContestId } = params; // Not used for fake data, but would be used for fetching

  // Fake Data based on the provided API response shape
  const summaryData = {
    finalScore: 214,
    speedBonus: 15,
    xpGained: 240,
    skillImpacted: [
      { skill: "Phisics", accuracy: "+13%" },
      { skill: "Scientific Skills", accuracy: "+23%" },
    ],
  };

  const currentUserId = "you-uuid";

  // Fake Leaderboard Data matching the rank endpoint structure
  const leaderboardData = [
    {
      id: "1",
      firstName: "HELENA",
      lastName: "",
      avatarUrl: "/avatars/avatar1.png",
      score: 300,
      level: 20,
    },
    {
      id: "2",
      firstName: "TYMMYT",
      lastName: "",
      avatarUrl: "/avatars/avatar2.png",
      score: 280,
      level: 20,
    },
    {
      id: "3",
      firstName: "FARAH",
      lastName: "",
      avatarUrl: "/avatars/avatar3.png",
      score: 260,
      level: 20,
    },
    {
      id: "4",
      firstName: "MENNA",
      lastName: "",
      avatarUrl: "/avatars/avatar4.png",
      score: 250,
      level: 20,
    },
    {
      id: currentUserId,
      firstName: "YOU", // Will be rendered as YOU anyway
      lastName: "",
      avatarUrl: "/avatars/avatar6.png",
      score: 214,
      level: 8,
    },
    {
      id: "6",
      firstName: "SALMA",
      lastName: "",
      avatarUrl: "/avatars/avatar5.png",
      score: 200,
      level: 20,
    },
    {
      id: "7",
      firstName: "ALI",
      lastName: "",
      avatarUrl: "/avatars/avatar7.png",
      score: 180,
      level: 20,
    },
    {
      id: "8",
      firstName: "YZMN",
      lastName: "",
      avatarUrl: "/avatars/avatar8.png",
      score: 150,
      level: 20,
    },
    {
      id: "9",
      firstName: "FRIENISTRASH",
      lastName: "",
      avatarUrl: "/avatars/avatar9.png",
      score: 100,
      level: 20,
    },
  ];

  return (
    <div className="flex w-full items-start justify-center gap-xl p-xl">
      {/* Left side: Leaderboard */}
      <ContestLeaderboard
        students={leaderboardData}
        currentUserId={currentUserId}
      />

      {/* Right side: Summary Window */}
      <ReusableWindow
        title="CONTESTS_CHALLENGES/CONTEST/SCIENCE FAIR PREP.SYS"
        className="flex-1 max-w-[800px]"
      >
        <div className="flex flex-col items-center gap-md py-base pt-md mx-base">
          {/* Header */}
          <div className="flex flex-col items-center gap-base text-center">
            <h2 className="heading-h5-primary flex items-center gap-xs font-bold uppercase text-text">
              CONTEST <span className="text-primary-500">FINISHED!</span> 🎉
            </h2>
            <p className="body-1 font-medium text-text">
              You Have Successfully Finished The Contest. Great Job!
            </p>
          </div>

          {/* Stats Grid */}
          <div className="grid w-full grid-cols-3 gap-md self-stretch">
            {[
              { label: "FINAL SCORE", value: summaryData.finalScore, color: "text-green-600" },
              { label: "SPEED BONUS", value: `+${summaryData.speedBonus}`, color: "text-yellow-600" },
              { label: "XP GAINED", value: `+${summaryData.xpGained} XP`, color: "text-primary-600" },
            ].map((stat, idx) => (
              <div
                key={idx}
                className="flex flex-col items-center justify-center gap-xs rounded-md bg-neutral-100 p-base shadow-[2px_3px_0px_0px_rgba(0,0,0,0.05)]"
              >
                <span className="label-3 uppercase text-text">{stat.label}</span>
                <span className={`heading-h5-primary ${stat.color}`}>
                  {stat.value}
                </span>
              </div>
            ))}
          </div>

          {/* Skills Impacted */}
          <div className="flex w-full flex-col gap-sm py-base">
            <h3 className="label-1 font-bold uppercase text-text">SKILL IMPACTED</h3>
            <div className="flex flex-wrap gap-base">
              {summaryData.skillImpacted.map((skill, index) => (
                <div
                  key={index}
                  className="flex items-center gap-xs bg-neutral-100 px-sm py-sm"
                >
                  <span className="body-1 font-medium text-neutral-500">{skill.skill}</span>
                  <span className="body-2 font-bold text-primary-500">{skill.accuracy}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Notification Banner */}
          <div className="flex items-start gap-md rounded-md border bg-neutral-50 p-base">
            <div className="mt-1 text-blue-500">
              {/* Clock Icon */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="12" cy="12" r="10"></circle>
                <polyline points="12 6 12 12 16 14"></polyline>
              </svg>
            </div>
            <div className="flex flex-col gap-xs">
              <h4 className="label-2 font-bold uppercase text-text">ANSWERS ARE COMING!</h4>
              <p className="body-3 font-medium text-neutral-500">
                Detailed solutions and correct answers will show when the contest time ends for everyone. Check your notifications later today!
              </p>
            </div>
          </div>

          {/* Action Button */}
          <button
            onClick={() => router.push("/home")}
            className="label-1 w-full rounded border border-border bg-white py-sm px-md font-medium text-text transition-colors hover:bg-neutral-50"
          >
            Return Home
          </button>
        </div>
      </ReusableWindow>
    </div>
  );
}