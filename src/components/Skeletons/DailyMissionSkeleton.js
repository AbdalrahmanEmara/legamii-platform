import ReusableWindow from "../ui/ReusableWindow";

function MissionCardSkeleton() {
  return (
    <div className="gap-xs p-sm flex flex-col rounded-sm border border-neutral-200 bg-neutral-50">
      <div className="gap-xs flex items-center">
        <div className="size-4 rounded-sm bg-sec-el" />
        <div className="h-5 flex-1 rounded bg-sec-el" />
      </div>

      <div className="gap-xxs pl-base flex flex-col">
        <div className="h-[16px] w-full rounded bg-sec-el" />
        <div className="flex items-center justify-between">
          <div className="h-4 w-12 rounded bg-sec-el" />
          <div className="h-4 w-10 rounded bg-sec-el" />
        </div>
      </div>
    </div>
  );
}

export default function DailyMissionSkeleton() {
  return (
    <ReusableWindow title="daily_mission.sys" className="w-full">
      <div className="gap-base p-sm md:p-base flex flex-col animate-pulse">
        <div className="flex items-center justify-between">
          <div className="h-6 w-36 rounded bg-sec-el md:h-7 2xl:h-8" />
          <div className="h-6 w-16 rounded-sm bg-sec-el" />
        </div>

        <div className="gap-sm 2xl:gap-base flex flex-col">
          <MissionCardSkeleton />
          <MissionCardSkeleton />
          <MissionCardSkeleton />
        </div>
      </div>
    </ReusableWindow>
  );
}
