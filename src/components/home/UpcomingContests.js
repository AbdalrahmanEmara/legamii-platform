"use client";

import { useRouter } from "next/navigation";
import { Dot } from "lucide-react";
import ReusableWindow from "../ui/ReusableWindow";
import ButtonSecondary from "../ui/ButtonSecondary";
import Btn1 from "../ui/Btn1";
import HistoryIcon from "../icons/subjects/HistoryIcon";
import MathsIcon from "../icons/subjects/MathsIcon";
import ScienceIcon from "../icons/subjects/ScienceIcon";
import { getRelativeTime } from "@/lib/utils";

const contestData = [
  {
    "contestId": "9bfbbe4d-26fb-4497-b19c-31424c8f39a2",
    "title": "English Weekly Challenge #182",
    "startTime": "2026-06-23T07:02:07.915Z",
    "classId": "2ebfbeda-cda9-4a37-bbfb-d6505abda14c",
    "classNumber": "2",
    "grade": "Grade 10",
    "subject": "Science",
    "difficulty": "easy",
    "status": "UPCOMING",
    "playersCount": 14,
    "isRegistered": false,
    "joinedFriends": []
  }
];

const SubjectIcons = {
  "History": <HistoryIcon />,
  "Maths": <MathsIcon />,
  "Science": <ScienceIcon />,
}

export default function UpcomingContests() {
  const router = useRouter();

  return (
    <ReusableWindow title="upcoming_contests.sys" className="w-full">
      <div className="p-base flex flex-col gap-base">

        <h2 className="text-text font-bold font-primary leading-6 text-base md:text-xl 2xl:text-2xl 2xl:leading-8 uppercase">Upcoming Contests</h2>
        <div className="flex flex-col gap-base">
          {contestData.map((contest) => (
            <div key={contest.contestId} className={`p-base flex flex-col 2xl:flex-row gap-sm border border-border rounded-lg `}>
              <div className="flex flex-col gap-xs">
                {/* Status */}
                <div className="w-fit bg-sec-el flex items-center rounded-lg">
                  {contest.status === "LIVE" && <Dot className="text-green-500" stroke-width="9" />}
                  <span className={`text-[10px] 2xl:text-xs font-normal font-primary leading-4 px-xs2 py-xxs ${contest.status === "LIVE" ? "text-green-600" : "text-blue-500"}`}>{contest.status} {getRelativeTime(contest.startTime)}</span>
                </div>
                <div className="grid grid-cols-[auto_1fr] grid-rows-[auto_auto] gap-xs">
                  {/* Icon */}
                  <div className={`flex justify-center items-center p-sm row-span-1 col-span-1 md:row-span-2 ${contest.subject === "Maths" ? 'bg-red-100' : contest.subject === "Science" ? 'bg-blue-50' : 'bg-yellow-50'} rounded-lg`}>
                    {SubjectIcons[contest.subject]}
                  </div>
                  {/* Name */}
                  <div className="text-text text-lg md:text-xl 2xl:text-2xl font-medium font-secondary leading-6 md:leading-7 row-span-1 col-span-1">
                    {contest.title}
                  </div>
                  {/* Info */}
                  <div className="flex gap-sm md:gap-base flex-wrap text-sec-text text-xs font-medium font-secondary col-span-2 row-span-1 md:col-span-1 md:row-span-1">
                    <div className="bg-sec-el p-xs2 leading-4 ">
                      {contest.grade}
                    </div>
                    <div className="bg-sec-el p-xs2 leading-4 ">
                      {contest.subject}
                    </div>
                    <div className="bg-sec-el p-xs2 leading-4">
                      {contest.playersCount} Players
                    </div>
                  </div>
                </div>
                {/* Friends */}
                {contest.joinedFriends.length > 0 && (
                  <div className="flex gap-sm md:gap-base flex-wrap text-sec-text text-xs font-medium font-secondary col-span-2 row-span-1 md:col-span-1 md:row-span-1">
                    {contest.joinedFriends.map((friend) => (
                      <div key={friend.id} className="bg-sec-el p-xs2 leading-4 ">
                        {friend.avatar}
                      </div>
                    ))}
                  </div>
                )}
                <div>

                </div>
              </div>
              <Btn1 title={contest.status === "Live" ? "Join Now" : "Register"} />
            </div>
          ))}
          <div className="flex justify-center md:justify-end">
            <ButtonSecondary text="View All Contests"
              onClick={() => router.push("/contests")}
            />
          </div>
        </div>
      </div>

    </ReusableWindow>
  );
}
