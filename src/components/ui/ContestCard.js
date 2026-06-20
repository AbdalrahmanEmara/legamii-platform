"use client";

import { Trophy, ArrowRight } from "lucide-react";
import Button from "./Button";
import { useRouter } from "next/navigation";


export default function ContestCard({
  classId,
  contestId,
  title,
  tags = [],
  icon: Icon = Trophy,
  iconBg = "bg-secondary-50",
  iconColor = "text-secondary-500",
  status = "Live",
  isRegistered = false,
  timeText,
  // friendsJoining = 0,
  joinedFriends = [],
  
}) {
  const friendsJoining = joinedFriends.length;
  const router = useRouter();
  //Helper function to get status of contests appeared
  const normalizedStatus = status.toUpperCase();

  const isOngoing = normalizedStatus === "ONGOING";

  const isUpcoming = normalizedStatus === "UPCOMING";

  // const isFinished = normalizedStatus === "FINISHED";
  const isHistory = normalizedStatus === "HISTORY";

  let buttonText = "";

  if (isOngoing) {
    buttonText = "JOIN NOW";
  } else if (isUpcoming && isRegistered) {
    buttonText = "REGISTERED";
  } else if (isUpcoming) {
    buttonText = "REGISTER";
  } else if (isHistory) {
    buttonText = "VIEW RESULT";
  }

  const isDisabled = isUpcoming && isRegistered;

  function handleContestClick() {
    router.push(`/contests/${classId}/${contestId}`);
  }
  return (
    <div className="border-text p-base flex w-full items-center justify-between rounded-lg border-[1.5px] bg-white shadow-[2px_3px_4px_0_rgba(0,0,0,1)]">
      <div className="gap-base flex items-center">
        {/* Icon Square */}
        <div
          className={`flex h-[100px] w-[100px] shrink-0 items-center justify-center rounded-sm ${iconBg}`}
        >
          <Icon className={`h-12 w-12 ${iconColor}`} strokeWidth={1.5} />
        </div>

        {/* Content Area */}
        <div className="gap-xs2 flex flex-col">
          {/* Top Badge or Time */}
          {/*{normalizedStatus === "ONGOING" ? (
            <div className="inline-flex w-fit items-center justify-center bg-green-600 px-xs py-1 text-white">
              <span>
                {normalizedStatus === "ONGOING"
                  ? "LIVE"
                  : normalizedStatus}
              </span>
            </div>
          ) : (
            <div className="font-primary text-xs tracking-wider text-secondary-500 uppercase">
              {timeText}
            </div>
          )}*/}
          {isOngoing ? (
            <div className="px-xs inline-flex w-fit items-center justify-center bg-green-600 py-1 text-white">
              <span className="font-primary text-xs tracking-wider">LIVE</span>
            </div>
          ) : isUpcoming && isRegistered ? (
            <div className="bg-secondary-500 px-xs inline-flex w-fit items-center justify-center py-1 text-white">
              <span className="font-primary text-xs tracking-wider">REGISTERED</span>
            </div>
          ) : (
            <div className="font-primary text-secondary-500 text-xs tracking-wider uppercase">
              {timeText}
            </div>
          )}

          {/* Title */}
          <h3 className="heading-h5 font-secondary text-text sm:heading-h4 font-bold">{title}</h3>

          {/* Tags */}
          <div className="gap-xs flex items-center">
            {tags.map((tag, index) => (
              <span
                key={index}
                className="px-xs2 font-secondary text-sec-text bg-neutral-100 py-1 text-sm"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Avatars Area (if friends joining) */}
          {friendsJoining > 0 && (
            <div className="mt-xs2 gap-xs2 flex items-center">
              <div className="flex -space-x-2">
                {joinedFriends.slice(0, 3).map((friend) => (
                  <img
                    key={friend.id}
                    src={friend.avatarUrl}
                    alt={friend.first_name}
                    className="border-text h-6 w-6 rounded-full border object-cover"
                  />
                ))}
              </div>
              <span className="font-secondary text-sec-text text-xs">
                +{friendsJoining} Friends Joining
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Action Button */}
      <Button
        onClick={handleContestClick}
        disabled={isDisabled}
        className="px-md py-sm hover:bg-primary-600 transition-colors"
      >
        {/* <span className="label-1 font-primary uppercase text-white tracking-widest">
          {status.toLowerCase() === "live" ? "JOIN NOW" : "REGISTER"}
        </span> */}
        {buttonText}
      </Button>
    </div>
  );
}

{
  /* <Button
  disabled={isDisabled}
  className="px-md py-sm transition-colors hover:bg-primary-600"
></Button> */
}
