import Welcome from "@/components/homePage/Welcome";
import CheckIcon from "@/components/icons/CheckIcon";
import ProgressBar from "@/components/ui/ProgressBar";
import ReusableWindow from "@/components/ui/ReusableWindow";

export default function HomePage() {
  const user = {
    name: "Ali",
  }
  const missions = [
    {
      name: "Complete 3 practice quizzes",
      totalXP: 40,
      numberOfTasks: 3,
      completed: false,
    },
    {
      name: "Answer 20 question correctly",
      totalXP: 120,
      numberOfTasks: 3,
      completed: true,

    },
    {
      name: "Maintain your streak",
      totalXP: 30,
      numberOfTasks: 1,
      completed: true,
    },
    {
      name: "Practice for 30 minutes",
      totalXP: 50,
      numberOfTasks: 30,
      completed: false,
    }
  ]

  return (
    <div className="flex flex-col gap-md">
      <Welcome name={user.name} />
      <div className="mt-6.5 grid grid-cols-[2fr_1fr] gap-13.5">
        <div className="flex flex-col gap-md">
          <ReusableWindow title="daily_mission.sys">
            <div className="p-base">
              <div className="flex justify-between">
                <p className="text-text text-2xl font-bold font-primary leading-8 uppercase">Daily missions</p>
                <p className="flex justify-center items-center text-secondary-500 text-sm font-normal font-primary leading-5 border-2 border-secondary-500 px-3.75 py-2.75 rounded-sm -rotate-3 shadow-[2px_3px_2px_0px_rgba(0,71,204,1.00)] ">Active</p>
              </div>
              <ul className="flex flex-col gap-base">
                {missions.map((mis, i) => <li key={i} className={`p-sm flex flex-col gap-xl ${mis.completed ? 'bg-[#99FFC226] border border-green-300 ' : 'bg-neutral-50 border border-neutral-200 '}`}>
                  <div className="flex gap-xs">
                    <CheckIcon size={22} className={`${mis.completed ? 'text-green-500' : 'text-neutral-200'}`} />
                    <p className="text-text text-lg font-normal font-secondary leading-6">{mis.name}</p>
                  </div>
                  <div className="relative ml-base flex flex-col gap-1">
                    <ProgressBar width={200} height={3} progress={50} color={`${mis.completed ? 'green-500' : 'primary-500'}`} borderColor={`${mis.completed ? 'green-700' : 'primary-700'}`} />

                    <span className={`absolute -top-1 -left-1 w-2 h-2 bg-${mis.completed ? 'green-500' : 'primary-500'}`}>

                      <span className={`absolute -top-0.5 -left-0.5 w-2 h-2 bg-${mis.completed ? 'green-700' : 'primary-700'}`}></span>
                    </span>
                  </div>
                </li>)}
              </ul>
            </div>
          </ReusableWindow>
          <ReusableWindow title="upcoming_contests.sys">

          </ReusableWindow>
        </div>
        <div className="flex flex-col gap-md">
          <ReusableWindow title="daily_streak.sys"></ReusableWindow>
          <ReusableWindow title="global_leaderboard.sys"></ReusableWindow>
        </div>
      </div>
    </div>
  );
}
