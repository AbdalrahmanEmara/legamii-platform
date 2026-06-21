import ReusableWindow from "../ui/ReusableWindow";

/**
 * Skeleton fallback for <UpcomingContests />.
 * Must mirror the real component's DOM shape (same wrapper, same spacing,
 * same card count) so there's no layout shift when the real data swaps in.
 */
function ContestCardSkeleton() {
  return (
    <div className="p-base flex flex-col 2xl:flex-row gap-sm border border-border rounded-lg animate-pulse">
      <div className="flex flex-col gap-xs w-full">
        {/* Status pill */}
        <div className="w-20 h-5 bg-sec-el rounded-lg" />

        <div className="grid grid-cols-[auto_1fr] grid-rows-[auto_auto] gap-xs">
          {/* Icon */}
          <div className="row-span-1 col-span-1 md:row-span-2 w-12 h-12 bg-sec-el rounded-lg" />

          {/* Title */}
          <div className="row-span-1 col-span-1 flex items-center">
            <div className="h-6 w-48 bg-sec-el rounded" />
          </div>

          {/* Info pills */}
          <div className="flex gap-sm md:gap-base flex-wrap col-span-2 row-span-1 md:col-span-1 md:row-span-1">
            <div className="h-5 w-16 bg-sec-el rounded" />
            <div className="h-5 w-16 bg-sec-el rounded" />
            <div className="h-5 w-20 bg-sec-el rounded" />
          </div>
        </div>
      </div>

      {/* Button */}
      <div className="h-9 w-28 bg-sec-el rounded-lg shrink-0" />
    </div>
  );
}

export default function UpcomingContestsSkeleton() {
  return (
    <ReusableWindow title="upcoming_contests.sys" className="w-full">
      <div className="p-base flex flex-col gap-base">
        <h2 className="text-text font-bold font-primary leading-6 text-base md:text-xl 2xl:text-2xl 2xl:leading-8 uppercase">
          Upcoming Contests
        </h2>
        <div className="flex flex-col gap-base">
          {/* 3 placeholder cards is usually enough to read as "loading" without
              guessing the real count and causing a height jump either way */}
          <ContestCardSkeleton />
          <ContestCardSkeleton />
          <ContestCardSkeleton />

          <div className="flex justify-center md:justify-end">
            <div className="h-9 w-36 bg-sec-el rounded-lg animate-pulse" />
          </div>
        </div>
      </div>
    </ReusableWindow>
  );
}