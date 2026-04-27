import { Trophy, ArrowRight } from "lucide-react";
import Button from "./Button";

export default function ContestCard({
  title,
  tags = [],
  icon: Icon = Trophy,
  iconBg = "bg-secondary-50",
  iconColor = "text-secondary-500",
  status = "Live",
  timeText,
  friendsJoining = 0,
}) {
  return (
    <div className="flex w-full items-center justify-between rounded-lg border-[1.5px] border-text bg-white p-base shadow-[2px_3px_4px_0_rgba(0,0,0,1)]">
      <div className="flex items-center gap-base">
        {/* Icon Square */}
        <div
          className={`flex h-[100px] w-[100px] shrink-0 items-center justify-center rounded-sm ${iconBg}`}
        >
          <Icon className={`h-12 w-12 ${iconColor}`} strokeWidth={1.5} />
        </div>

        {/* Content Area */}
        <div className="flex flex-col gap-xs2">
          {/* Top Badge or Time */}
          {status.toLowerCase() === "live" ? (
            <div className="inline-flex w-fit items-center justify-center bg-green-600 px-xs py-1 text-white">
              <span className="font-primary text-xs tracking-wider capitalize">{status}</span>
            </div>
          ) : (
            <div className="font-primary text-xs tracking-wider text-secondary-500 uppercase">
              {timeText}
            </div>
          )}

          {/* Title */}
          <h3 className="heading-h5 font-secondary font-bold text-text sm:heading-h4">
            {title}
          </h3>

          {/* Tags */}
          <div className="flex items-center gap-xs">
            {tags.map((tag, index) => (
              <span
                key={index}
                className="bg-neutral-100 px-xs2 py-1 font-secondary text-sm text-sec-text"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Avatars Area (if friends joining) */}
          {friendsJoining > 0 && (
            <div className="mt-xs2 flex items-center gap-xs2">
              <div className="flex -space-x-2">
                {[...Array(3)].map((_, i) => (
                  <div
                    key={i}
                    className="h-6 w-6 rounded-full border border-text bg-primary-200"
                  />
                ))}
              </div>
              <span className="font-secondary text-xs text-sec-text">
                +{friendsJoining} Friends Joining
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Action Button */}
      <Button className="px-md py-sm hover:bg-primary-600 transition-colors">
        <span className="label-1 font-primary uppercase text-white tracking-widest">
          {status.toLowerCase() === "live" ? "JOIN NOW" : "REGISTER"}
        </span>
      </Button>
    </div>
  );
}
