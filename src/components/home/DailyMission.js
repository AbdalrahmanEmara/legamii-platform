import ReusableWindow from "../ui/ReusableWindow";

const missions = [
  { id: 1, title: "Complete 3 practice quizzes", current: 2, max: 3, xp: 40, completed: false },
  { id: 2, title: "Answer 20 question correctly", current: 2, max: 3, xp: 120, completed: true },
  { id: 3, title: "Maintain your streak", current: 1, max: 1, xp: 30, completed: true },
  { id: 4, title: "Practice for 30 minutes", current: 17, max: 30, xp: 50, completed: false },
];

function DecorativeBlock({ size, rotation, color, borderWidth }) {
  return (
    <div
      className="shrink-0"
      style={{
        width: size,
        height: size,
        border: `${borderWidth}px solid ${color}`,
        transform: `rotate(${rotation}deg)`,
      }}
    />
  );
}

export default function DailyMission() {
  return (
    <ReusableWindow title="daily_mission.sys" className="w-full">
      <div className="gap-base p-sm md:p-base flex flex-col">
        <div className="flex items-center justify-between">
          <h2 className="text-text font-bold font-primary leading-6 text-base md:text-xl 2xl:text-2xl 2xl:leading-8 uppercase">Daily Missions</h2>
          <div className="px-sm py-xs2 outline-secondary-500 flex -rotate-3 items-center justify-center rounded-sm shadow-[2px_3px_2px_#0047CC] outline-[1.60px] outline-offset-[-1.60px]">
            <span className="font-primary text-label-2 text-secondary-500 leading-5">Active</span>
          </div>
        </div>

        <div className="gap-sm 2xl:gap-base flex flex-col">
          {missions.map((mission) => (
            <MissionCard key={mission.id} {...mission} />
          ))}
        </div>
      </div>
    </ReusableWindow>
  );
}

function MissionCard({ title, current, max, xp, completed }) {
  return (
    <div
      className={`gap-xs p-sm flex flex-col rounded-sm border ${
        completed
          ? "border-green-300 bg-[rgba(153,255,194,0.15)]"
          : "border-neutral-200 bg-neutral-50"
      }`}
    >
      <div className="gap-xs flex items-center">
        <DecorativeBlock
          size={13.61}
          rotation={4}
          color={completed ? "#22FF7B" : "#E5E5E5"}
          borderWidth={3}
        />
        <DecorativeBlock
          size={3.58}
          rotation={-5}
          color={completed ? "#00993D" : "#A3A3A3"}
          borderWidth={2.5}
        />
        <DecorativeBlock
          size={3.58}
          rotation={-5}
          color={completed ? "#22FF7B" : "#E5E5E5"}
          borderWidth={2.5}
        />
        <span className="font-secondary text-body-1 text-text flex-1 leading-7">{title}</span>
      </div>

      <div className="gap-xxs pl-base flex flex-col">
        <div className="relative h-[16px]">
          <div
            className="absolute"
            style={{
              width: 6.59,
              height: 6.59,
              left: 1.45,
              top: 1.12,
              background: completed ? "#00993D" : "#791A7F",
            }}
          />
          <div
            className="absolute"
            style={{
              width: 6.59,
              height: 6.59,
              left: 0.44,
              top: 0.12,
              background: completed ? "#22FF7B" : "#D865E0",
            }}
          />
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
