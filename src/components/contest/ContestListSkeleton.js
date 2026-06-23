function ContestCardSkeleton() {
  return (
    <div className="p-base flex flex-col 2xl:flex-row justify-between gap-sm border border-border rounded-lg shadow-[2px_3px_4px_0px_rgba(0,0,0,1.00)] animate-pulse">
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
      <div className="h-9 w-28 bg-sec-el rounded-lg shrink-0 2xl:self-end" />
    </div>
  );
}

export default function ContestListSkeleton() {
  return (
    <div className="flex flex-col gap-base p-base">
      <ContestCardSkeleton />
      <ContestCardSkeleton />
      <ContestCardSkeleton />
    </div>
  );
}
