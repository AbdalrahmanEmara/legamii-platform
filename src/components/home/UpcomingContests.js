"use client";

import { useRouter } from "next/navigation";
import { Terminal, Target } from "lucide-react";
import ReusableWindow from "../ui/ReusableWindow";
import ButtonSecondary from "../ui/ButtonSecondary";

const contestData = [
  {
    id: 1,
    title: "Science Fair Prep",
    subject: "Science",
    level: "Grade Level",
    players: "100 Player",
    status: "Live",
    time: null,
    friends: 0,
    icon: Terminal,
    classId: 1,
    contestId: 1,
  },
  {
    id: 2,
    title: "Calculus Blitz: Derivative Dash",
    subject: "Math",
    level: "Global 8-11",
    players: "1120 Player",
    status: "Upcoming",
    time: "Tomorrow, 8:00 PM",
    friends: 3,
    icon: Target,
    classId: 1,
    contestId: 2,
  },
  {
    id: 3,
    title: "History Heroes: Renaissance Era",
    subject: "History",
    level: "Class Level",
    players: "110 Player",
    status: "Upcoming",
    time: "Tomorrow, 9:00 PM",
    friends: 5,
    icon: Target,
    classId: 1,
    contestId: 3,
  },
];

export default function UpcomingContests() {
  const router = useRouter();

  return (
    <ReusableWindow title="upcoming_contests.sys" className="w-full">
      <div className="flex flex-col gap-sm p-sm md:p-base">
        {contestData.map((contest) => (
          <div
            key={contest.id}
            className="border-text flex w-full items-center justify-between rounded-lg border bg-white p-sm shadow-[2px_3px_4px_0_rgba(0,0,0,1)]"
          >
            <div className="gap-base flex items-center">
              <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded bg-secondary-50 md:h-[100px] md:w-[100px]">
                <contest.icon className="text-secondary-500 h-8 w-8 md:h-12 md:w-12" strokeWidth={1.5} />
              </div>
              <div className="gap-xs2 flex flex-col">
                {contest.status === "Live" ? (
                  <div className="inline-flex w-fit items-center justify-center bg-green-600 px-xs py-1 text-white">
                    <span className="font-primary text-xs tracking-wider">LIVE</span>
                  </div>
                ) : (
                  <div className="font-primary text-secondary-500 text-xs tracking-wider uppercase">
                    {contest.time}
                  </div>
                )}
                <h3 className="font-secondary text-text text-sm font-bold md:text-lg md:leading-6">
                  {contest.title}
                </h3>
                <div className="gap-xs flex items-center">
                  <span className="bg-neutral-100 text-sec-text font-secondary px-xs2 py-1 text-xs">
                    {contest.level}
                  </span>
                  <span className="bg-neutral-100 text-sec-text font-secondary px-xs2 py-1 text-xs">
                    {contest.subject}
                  </span>
                  <span className="bg-neutral-100 text-sec-text font-secondary px-xs2 py-1 text-xs">
                    {contest.players}
                  </span>
                </div>
                {contest.friends > 0 && (
                  <div className="gap-xs2 mt-1 flex items-center">
                    <div className="flex -space-x-2">
                      {[...Array(3)].map((_, i) => (
                        <div
                          key={i}
                          className="border-text bg-primary-200 h-5 w-5 rounded-full border"
                        />
                      ))}
                    </div>
                    <span className="font-secondary text-sec-text text-xs">
                      +{contest.friends} Friends Joining
                    </span>
                  </div>
                )}
              </div>
            </div>
            <button
              onClick={() => router.push(`/contests/${contest.classId}/${contest.contestId}`)}
              className="bg-primary-500 border-text rounded border px-md py-sm text-sm font-bold uppercase text-white shadow-[2px_3px_4px_0_rgba(0,0,0,1)] transition-colors hover:bg-primary-600"
            >
              {contest.status === "Live" ? "JOIN NOW" : "REGISTER"}
            </button>
          </div>
        ))}
        <div className="flex justify-center md:justify-end">
          <ButtonSecondary text="View All Contests" onClick={() => router.push("/contests")} />
        </div>
      </div>
    </ReusableWindow>
  );
}
