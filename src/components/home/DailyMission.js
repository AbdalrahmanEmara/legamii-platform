import DoneIcon from "../icons/DoneIcon";
import ReusableWindow from "../ui/ReusableWindow";
import { getDailyMissions, claimMission } from "@/lib/services/missions.service";

export default async function DailyMission() {
  let res;
  try {
    res = await getDailyMissions();

    const missions = res?.data || [];

    for (const mission of missions) {
      if (mission.completed && !mission.claimed) {
        try {
          await claimMission(mission.id);
        } catch (err) {
          console.error("Failed to claim mission:", err);
        }
      }
    }
    res = await getDailyMissions();
  } catch (err) {
    console.error("Failed to load missions: ", err);
  }

  const missions = res?.data || [];


  return (
    <ReusableWindow title="daily_mission.sys" className="w-full">
      <div className="gap-base p-sm md:p-base flex flex-col">
        <div className="flex items-center justify-between">
          <h2 className="text-text font-primary text-base leading-6 font-bold uppercase md:text-xl 2xl:text-2xl 2xl:leading-8">
            Daily Missions
          </h2>
          <div className="px-sm py-xs2 outline-secondary-500 flex -rotate-3 items-center justify-center rounded-sm shadow-[2px_3px_2px_#0047CC] outline-[1.60px] outline-offset-[-1.60px]">
            <span className="font-primary text-label-2 text-secondary-500 leading-5">Active</span>
          </div>
        </div>

        {missions.length === 0 ? (
          <EmptyState />
        ) : (
            <div className="gap-sm 2xl:gap-base flex flex-col">
              {missions.map((mission) => (
                <MissionCard
                  key={mission.id}
                  title={mission.title}
                  current={mission.progress}
                  max={mission.targetValue}
                  xp={mission.rewardPoints}
                  completed={mission.completed}
                  percent={
                    mission.targetValue > 0
                      ? Math.min((mission.progress / mission.targetValue) * 100, 100)
                      : 0
                  }
                />
              ))}
            </div>
        )}
      </div>
    </ReusableWindow>
  );
}

function MissionCard({ title, current, max, xp, completed, percent }) {
  return (
    <div
      className={`gap-xs p-sm flex flex-col rounded-sm border ${
        completed
          ? "border-green-300 bg-[rgba(153,255,194,0.15)]"
          : "border-neutral-200 bg-neutral-50"
      }`}
    >
      <div className="gap-xs flex items-center">
        <DoneIcon color={completed ? "#99ffc2" : "#e5e5e5"} />
        <span className="font-secondary text-text flex-1 text-sm leading-7">{title}</span>
      </div>

      <div className="gap-xxs pl-base flex flex-col">
        <div className="relative h-[16px]">
          <div
            className={`absolute inset-0 top-[-1.5] left-[-1.5] h-[6.59px] w-[6.59px] ${completed ? "bg-green-500" : "bg-primary-500"} border border-white`}
          />
          <div
            className={`h-[60%] w-full border ${completed ? "border-green-500 bg-[#99FFC226]" : "border-primary-500 bg-neutral-50"}`}
          >
            <div
              className={`h-full ${completed ? "bg-green-500" : "bg-primary-500"}`}
              style={{
                width: `${percent}%`,
              }}
            ></div>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <span className="font-secondary text-caption-1 text-sec-text leading-none">
            {current} / {max}
          </span>
          <span
            className="font-primary text-label-2 leading-none"
            style={{ color: completed ? "#19C25D" : "#D865E0" }}
          >
            +{xp} XP
          </span>
        </div>
      </div>
    </div>
  );
}

function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center py-10">
      <span className="font-primary text-sec-text text-sm tracking-wider uppercase">
        No missions for today
      </span>
    </div>
  );
}
