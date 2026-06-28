import ReusableWindow from "../ui/ReusableWindow";

export default function StreakSkeleton() {
  return (
    <ReusableWindow title="streak.sys" className="w-full">
      <div className="flex flex-col gap-base p-base animate-pulse">
        <h2 className="text-text font-bold font-primary leading-6 text-base md:text-xl 2xl:text-2xl 2xl:leading-8 uppercase">
          Streak
        </h2>

        <div className="flex flex-col items-center gap-sm">
          <div className="size-[56px] md:size-[64px] 2xl:size-24 bg-sec-el rounded-full" />

          <div className="flex flex-col items-center gap-xs2">
            <div className="h-6 w-12 bg-sec-el rounded md:h-8 md:w-16 2xl:h-10 2xl:w-20" />
            <div className="h-4 w-28 bg-sec-el rounded" />
          </div>

          <div className="w-full flex items-center justify-center gap-2 flex-wrap">
            {Array.from({ length: 7 }).map((_, i) => (
              <div key={i} className="h-6 w-9 bg-sec-el rounded-lg" />
            ))}
          </div>

          <div className="w-full flex items-center justify-center gap-3 flex-wrap">
            <div className="h-10 w-full bg-sec-el rounded" />
            <div className="h-10 w-full bg-sec-el rounded" />
          </div>
        </div>
      </div>
    </ReusableWindow>
  );
}
