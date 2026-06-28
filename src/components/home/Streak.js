import ReusableWindow from "../ui/ReusableWindow";
import FireIcon from "../icons/FireIcon";
import { getStreak } from "@/lib/services/streak.service";

const solvedClass = "text-text text-caption-1 2xl:text-xs font-bold font-primary leading-4 bg-primary-500 px-xs2 py-xs2 2xl:px-sm rounded-lg shadow-[2px_3px_4px_0px_rgba(0,0,0,1.00)] outline outline-offset-[-1px] outline-border";

const missedClass = "text-sec-text text-caption-1 2xl:text-xs font-bold font-primary leading-4 bg-el-bg px-xs2 py-xs2 2xl:px-sm rounded-lg outline outline-offset-[-1px] outline-border";

export default async function Streak() {
  let data = null;
  try {
    data = await getStreak();
    console.log(data);
  } catch (err) {
    console.error("Failed to load streak:", err);
  }
  const activeDays = data?.weekActivity;

  return (
    <ReusableWindow title="streak.sys" className="w-full">
      <div className="flex flex-col gap-base p-base">
        <h2 className="text-text font-bold font-primary leading-6 text-base md:text-xl 2xl:text-2xl 2xl:leading-8 uppercase">Streak</h2>

        <div className="flex flex-col items-center gap-sm">
          <FireIcon className="size-[56px] md:size-[64px] 2xl:size-24" /> 

          <div className="flex flex-col items-center gap-xs2">
            <span className="text-neutral-950 text-base font-normal font-primary leading-6 md:text-xl 2xl:text-2xl 2xl:leading-8">{data?.currentStreak}</span>
            <span className="text-neutral-600 text-xs font-medium font-secondary leading-4 2xl:text-sm 2xl:leading-5">
              Consecutive Days
            </span>
          </div>

          <div className="w-full flex items-center justify-center gap-2 flex-wrap">
            {activeDays?.map((day, index) => (
              <div key={index} className={day?.active ? solvedClass : missedClass}>
                {day?.day.slice(0, 1)}
              </div>
            ))}
          </div>

          <div className="w-full flex items-center justify-center gap-3 flex-wrap">
            <div className="w-full bg-neutral-50 border border-neutral-200 text-text p-sm flex justify-between font-normal leading-4">
              <span className="text-xs 2xl:text-sm font-secondary">Best Streak</span>
              <span className="text-caption-1 2xl:text-sm font-primary">{data?.bestStreak}</span>
            </div>
            <div className="w-full bg-neutral-50 border border-neutral-200 text-text p-sm flex justify-between font-normal leading-4">
              <span className="text-xs 2xl:text-sm font-secondary">Total Days</span>
              <span className="text-caption-1 2xl:text-sm font-primary">{data?.totalActiveDays}</span>
            </div>
          </div>
        </div>

      </div>
    </ReusableWindow>
  );
}