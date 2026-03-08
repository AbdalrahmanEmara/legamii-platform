import ContentBox from "@/components/ui/ContentBox";
import ReusableWindow from "@/components/ui/ReusableWindow";
import "..//../globals.css";
import CustomScroll from "@/components/ui/CustomScroll";
import ProgressBar from "@/components/ui/ProgressBar";
import { StatusBadge } from "@/components/ui/StatusBadge";
import Btn1 from "@/components/ui/Btn1";
export const subjects = [
  {
    id: 1,
    name: "Mathematics",
    icon: "Fx",
    grade: "F",
    status: "NEEDS WORK",
    lastAccuracy: 68,
    attempted: 4,
    streak: 1,
    masteryLevel: 62,
    topics: [
      { name: "Calculus", progress: 35 },
      { name: "Trigonometry", progress: 22 },
      { name: "Algebra", progress: 60 },
    ],
  },
  {
    id: 2,
    name: "History",
    icon: "Book",
    grade: "A",
    status: "STRONG",
    lastAccuracy: 88,
    attempted: 35,
    streak: 17,
    masteryLevel: 80,
    topics: [
      { name: "World War", progress: 70 },
      { name: "Renaissance", progress: 65 },
    ],
  },
  {
    id: 3,
    name: "Physics",
    icon: "Atom",
    grade: "B",
    status: "GOOD",
    lastAccuracy: 74,
    attempted: 18,
    streak: 5,
    masteryLevel: 71,
    topics: [
      { name: "Mechanics", progress: 58 },
      { name: "Electricity", progress: 44 },
      { name: "Optics", progress: 63 },
    ],
  },
  {
    id: 4,
    name: "Chemistry",
    icon: "Flask",
    grade: "C",
    status: "IMPROVING",
    lastAccuracy: 69,
    attempted: 22,
    streak: 3,
    masteryLevel: 66,
    topics: [
      { name: "Organic", progress: 52 },
      { name: "Inorganic", progress: 40 },
      { name: "Thermochemistry", progress: 61 },
    ],
  },
];

function page() {
  return (
    <div>
      <ReusableWindow
        title=" AI_TUTOR.SYS"
        className="m-auto flex h-[777px] w-[1384px] overflow-hidden max-w-full flex-col"
      >
        {/**Heading */}
        <div className="px-base py-sm flex w-full items-center justify-between border-b border-border bg-white">
          <div className="heading-h5-primary font-bold">PRACTICE</div>
        </div>

        <CustomScroll className="flex-1 overflow-auto rounded-lg">
          {/* <div className="grid grid-cols-2 items-start gap-[var(--spacing-base)] self-stretch bg-white p-[var(--spacing-base)]"> */}
          <div className="p-base grid grid-cols-2 items-start gap-[var(--spacing-base)] self-stretch bg-white">
            {subjects.map((item, index) => (
              // <ContentBox key={index} className="w-full p-[var(--spacing-base)]">
              <ContentBox key={index} className="p-base w-full">
                {/**content Container */}
                {/* Top row: icon + name + badge */}
                <div className="flex w-full items-center justify-between">
                  <div className="gap-xs flex items-center">
                    <div className="flex items-center justify-center rounded-md">
                      <img src={item.icon} alt={item.name} className="p-sm" />
                    </div>
                    <h2 className="heading-h5-primary font-normal">{item.name}</h2>
                  </div>
                  <StatusBadge status={item.status} />
                </div>
                <div className="flex-column gap-xs pt-base flex items-start self-stretch">
                  <ContentBox className="p-sm bg-el-bg flex items-center justify-center gap-[16px] rounded-md border text-center shadow-none">
                    <div className="flex-none">
                      <p className="body-2 font-medium">{item.lastAccuracy}%</p>
                      <p className="body-4 font-medium text-neutral-500">Last Accuracy</p>
                    </div>
                  </ContentBox>

                  <ContentBox className="p-sm bg-el-bg flex items-center justify-center gap-[16px] rounded-md border text-center shadow-none">
                    <div className="flex-none">
                      <p className="body-2 items-center font-medium">{item.attempted}</p>
                      <p className="body-4 font-medium text-neutral-500">attempted</p>
                    </div>
                  </ContentBox>

                  <ContentBox
                    className="p-sm bg-el-bg items-center justify-center gap-4 rounded-md border text-center shadow-none"
                    direction="row"
                  >
                    {/* <!-- Fire Icon --> */}
                    <img
                      src="YOUR_IMAGE_SRC_HERE"
                      alt="fire icon"
                      className="aspect-square h-6 w-6"
                    />
                    <div className="flex-none">
                      <p className="body-2 font-medium">{item.streak} Days</p>
                      <p className="body-4 font-medium text-neutral-500">Streak</p>
                    </div>
                  </ContentBox>
                </div>

                {/* <div className="gap-sm my-xl2 flex w-[360px] flex-col items-start"> */}
                <div className="gap-sm my-base flex w-[360px] flex-col items-start">
                  {item.topics.map((topic, index) => (
                    <div key={index} className="gap-xs2 flex w-full flex-col">
                      <div className="body-3 flex justify-between font-medium">
                        <span>{topic.name}</span>
                      </div>

                      {/* <div className="h-2 w-full overflow-hidden rounded-full bg-neutral-200 flex">
                            <div
                              className="bg-primary-500 h-full rounded-full transition-all duration-300"
                              style={{ width: `${topic.progress}%` }}
                            />
                          </div> */}
                      <ProgressBar progress={topic.progress} />
                    </div>
                  ))}
                </div>

                <div className="gap-xs2 my-base flex w-full flex-col items-start self-stretch">
                  <div className="body-1 flex justify-between font-medium">
                    <span>Mastery level {item.masteryLevel}%</span>
                  </div>

                  {/* <div className="h-2 w-full overflow-hidden rounded-full bg-neutral-200 flex"> */}
                  {/* <div
                              className="bg-primary-500 h-full rounded-full transition-all duration-300"
                              style={{ width: `${item.masteryLevel}%` }}
                            /> */}
                  <ProgressBar progress={item.masteryLevel} />
                  {/* </div> */}
                </div>
                {/* Button */}
                <div className="flex justify-end">
                  <Btn1 title={"Start Quiz"} className={"w-fit"} />
                  {/* <Button className="mt-auto flex-none">
                    <span className="label-1 text-text text-base font-bold">START QUIZ</span>
                  </Button> */}
                </div>
              </ContentBox>
            ))}
          </div>
        </CustomScroll>
      </ReusableWindow>
    </div>
  );
}

export default page;
