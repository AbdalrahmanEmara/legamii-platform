import { Medal } from "lucide-react";
import { CustomScroll } from "../ui/CustomScroll";
import {
  MegaphoneIcon,
  AlarmIcon,
  FireIcon,
} from "../icons/NotificationIcons";
import { getTimeAgo } from "@/lib/utils";

function getIcon(type) {
  switch (type) {
    case "CONTEST_CLARIFICATION":
      // return <Megaphone className="h-6 w-6 text-primary-500 fill-primary-500" />;
      return <MegaphoneIcon />
    case "QUIZ":
      // return <AlarmClock className="h-6 w-6 text-neutral-800" />;
      return <AlarmIcon />
    case "BADGE":
      return <Medal className="h-6 w-6 text-yellow-500 fill-yellow-500" />;
    case "FRIEND_REQUEST":
      return <FireIcon />;
    case "SYSTEM":
      // return (
      //   <div className="h-6 w-6">
      //     <FireIcon />
      //   </div>
      // );
      return <FireIcon />
    default:
      return <MegaphoneIcon />;
  }
}
export function NotificationItem({ notification, onClick }){
  return (
    <div
      onClick={onClick}
      className={`flex w-[1066px] items-start radius-md p-sm gap-xs mb-sm ${!notification.is_read
        ? "border border-primary-500 bg-primary-50 shadow-[2px_3px_4px_0_#501155]"
        : "border border-neutral-200 bg-element-background"
        }`}
    >
      <div className="mt-1 w-[92px] flex justify-center self-stretch flex-shrink-0">{getIcon(notification.type)}</div>

      <div className="flex flex-col gap-y-1">
        <h3 className="font-secondary text-base font-semibold text-text">
          {notification.title}
        </h3>
        <p className="font-secondary text-sm text-text/80">
          {notification.message}
        </p>

        <div className="mt-1">
          {notification.time === "NOW" ? (
            <span className="inline-block bg-primary-600 px-2 py-0.5 font-primary text-[10px] text-white">
              NOW
            </span>
          ) : (
            <span className="font-primary text-[10px] text-text/50 uppercase tracking-wide">
              {getTimeAgo(notification.created_at)}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
