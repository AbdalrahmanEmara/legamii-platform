import ReusableWindow from "../ui/ReusableWindow";

function ContestCardSkeleton() {
  return (
    <div className="p-base flex flex-col 2xl:flex-row gap-sm border border-border rounded-lg">
      <div className="flex flex-col gap-xs w-full">
        <div className="w-20 h-5 bg-sec-el rounded-lg" />

        <div className="grid grid-cols-[auto_1fr] grid-rows-[auto_auto] gap-xs">
          <div className="row-span-1 col-span-1 md:row-span-2 w-12 h-12 bg-sec-el rounded-lg" />

          <div className="row-span-1 col-span-1 flex items-center">
            <div className="h-6 w-48 bg-sec-el rounded" />
          </div>

          <div className="flex gap-sm md:gap-base flex-wrap col-span-2 row-span-1 md:col-span-1 md:row-span-1">
            <div className="h-5 w-16 bg-sec-el rounded" />
            <div className="h-5 w-16 bg-sec-el rounded" />
            <div className="h-5 w-20 bg-sec-el rounded" />
          </div>
        </div>
      </div>

      <div className="h-9 w-28 bg-sec-el rounded-lg shrink-0" />
    </div>
  );
}

export default function UpcomingContestsSkeleton() {
  return (
    <ReusableWindow title="upcoming_contests.sys" className="w-full">
      <div className="p-base flex flex-col gap-base animate-pulse">
        <h2 className="text-text font-bold font-primary leading-6 text-base md:text-xl 2xl:text-2xl 2xl:leading-8 uppercase">
          Upcoming Contests
        </h2>
        <div className="flex flex-col gap-base">
          <ContestCardSkeleton />
          <ContestCardSkeleton />
          <ContestCardSkeleton />

          <div className="flex justify-center md:justify-end">
            <div className="h-9 w-36 bg-sec-el rounded-lg" />
          </div>
        </div>
      </div>
    </ReusableWindow>
  );
}