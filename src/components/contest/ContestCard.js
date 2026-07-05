import { Dot } from "lucide-react";
import Image from "next/image";
import Btn1 from "../ui/Btn1";
import HistoryIcon from "../icons/subjects/HistoryIcon";
import MathsIcon from "../icons/subjects/MathsIcon";
import ScienceIcon from "../icons/subjects/ScienceIcon";
import { getRelativeTime } from "@/lib/utils";

const SubjectIcons = {
  "History": <HistoryIcon />,
  "Maths": <MathsIcon />,
  "Science": <ScienceIcon />,
}

export default function ContestCard({ contest }) {
  const normalizedStatus = contest.status?.toUpperCase();
  const isRegistered = contest.isRegistered;
  const isOngoing = normalizedStatus === "ONGOING";

  const isUpcoming = normalizedStatus === "UPCOMING";

  const isFinished = normalizedStatus === "HISTORY";

  let buttonText = "";

  if (isOngoing) {
    buttonText = "JOIN NOW";
  } else if (isUpcoming && isRegistered) {
    buttonText = "VIEW DETAILS";
  } else if (isUpcoming) {
    buttonText = "REGISTER";
  } else if (isFinished ) {
    buttonText = "VIEW RESULT";
  }
  else{
    buttonText = "VIEW DETAILS";
  }

  return (
    <div key={contest.contestId} className={`p-base flex flex-col 2xl:flex-row justify-between gap-sm border border-border rounded-lg shadow-[2px_3px_4px_0px_rgba(0,0,0,1.00)]`}>
      <div className="flex flex-col gap-xs">
        {/* Status */}
        <div className="w-fit bg-sec-el flex items-center rounded-lg">
          {contest.status === "LIVE" && <Dot className="text-green-500" stroke-width={9} />}
          <span className={`text-[10px] 2xl:text-xs font-normal font-primary leading-4 px-xs2 py-xxs ${contest.status === "LIVE" ? "text-green-600" : "text-blue-500"}`}>{contest.status} {getRelativeTime(contest.startTime)}</span>
        </div>
        <div className="grid grid-cols-[auto_1fr] grid-rows-[auto_auto] gap-xs">
          {/* Icon */}
          <div className={`flex justify-center items-center p-sm row-span-1 col-span-1 md:row-span-2 ${contest.subject === "Maths" ? 'bg-red-100' : contest.subject === "Science" ? 'bg-blue-50' : 'bg-yellow-50'} rounded-lg`}>
            {SubjectIcons[contest.subject] ?? SubjectIcons["History"]}
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
            {contest.joinedFriends.length > 0 && contest.joinedFriends.map((friend) => (
              <div key={friend.id} className="bg-sec-el p-xs2 leading-4 ">
                <Image src={friend.avatar} alt={friend.name} width={24} height={24} className="rounded-full" />
              </div>
            ))}
          </div>
        )}
        <div>

        </div>
      </div>
      <Btn1
        link={contest.status === "HISTORY" ? `/student/contests/detailed-summary/${contest.studentContestId}` : `/student/contests/${contest.classId}/${contest.contestId}`}
        // title={contest.status === "LIVE" ? "Join Now" : contest.isRegistered ? "View Details" : "Register"}
        title={buttonText}
        className="2xl:self-end 2xl:justify-self-end"
      />
    </div>)
}