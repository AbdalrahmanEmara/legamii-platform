import { Medal } from "lucide-react";
import { MegaphoneIcon, AlarmIcon, FireIcon } from "../icons/NotificationIcons";
import { getTimeAgo } from "@/lib/utils";

function getIcon(type) {
  switch (type) {
    case "CONTEST_CLARIFICATION":
      // return <Megaphone className="h-6 w-6 text-primary-500 fill-primary-500" />;
      return <MegaphoneIcon />;
    case "QUIZ":
      // return <AlarmClock className="h-6 w-6 text-neutral-800" />;
      return <AlarmIcon />;
    case "BADGE":
      return <Medal className="fill-yellow-500 text-yellow-500" />;
    case "FRIEND_REQUEST":
      return <FireIcon />;
    case "SYSTEM":
      // return (
      //   <div className="h-6 w-6">
      //     <FireIcon />
      //   </div>
      // );
      return <FireIcon />;
    default:
      return <MegaphoneIcon />;
  }
}
export function NotificationItem({ notification, onClick, disabled }) {
  return (
    <div
      onClick={disabled ? undefined : onClick}
      className={`radius-md px-sm py-sm md:px-md xl:px-lg mb-sm flex w-full items-start gap-3 rounded md:gap-6 ${!notification.is_read
        ? "border-primary-500 bg-primary-50 border shadow-[2px_3px_4px_0_#501155]"
        : "bg-element-background border border-neutral-200"
        }`}
    >
      <div className="flex shrink-0 self-center items-center justify-center size-8 xl:size-10 [&_svg]:size-full">
        {getIcon(notification.type)}
      </div>

      <div className="flex flex-col gap-y-1">
        <h3 className="font-secondary text-text text-lg md:text-xl xl:text-2xl font-semibold">{notification.title}</h3>
        <p className="font-secondary text-text/80 text-sm">{notification.message}</p>

        <div className="mt-1">
          {notification.time === "NOW" ? (
            <span className="bg-primary-600 font-primary inline-block px-2 py-0.5 text-[10px] text-white">
              NOW
            </span>
          ) : (
              <span className="font-primary text-text/50 text-[10px] tracking-wide uppercase">
              {getTimeAgo(notification.created_at)}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
