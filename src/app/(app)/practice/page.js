import ContentBox from "@/components/ui/ContentBox";
import ReusableWindow from "@/components/ui/ReusableWindow";
import "..//../globals.css";
import CustomScroll from "@/components/ui/CustomScroll";
import ProgressBar from "@/components/ui/ProgressBar";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { getQuizList } from "@/lib/services/quiz.service";
import FireIcon from "@/components/icons/FireIcon";
import StartQuizButton from "@/components/practice/StartQuizButton";
import { getAllGradesAction } from "@/lib/actions/grade.actions";
import { getQuizListAction } from "@/lib/actions/quiz.actions";

async function page() {
  let subject;
  let subjects;
  try {
    subject = await getQuizListAction();
    subjects = subject.map((item) => {
      return {
        name: item.subject.name,
        id: item.subject.id,
        lastAttemptAccuracy: item.lastAttemptAccuracy,
        attempted: item.attempted,
        streak: item.streak,
        masteryLevel: item.totalMasteryLevel,
        status: item.status,
        tags: item.subjectTagsMasteryLevel.map((tag) => {
          return {
            tagName: tag.tagName,
            tagId: tag.tagId,
            masteryLevel: tag.masteryLevel,
          };
        }),
      };
    });
  } catch (err) {
    console.error(err);
    return null;
  }


  const grades = await getAllGradesAction();
  console.log(grades);


  console.log(subject);

  return (
    <div> 
      <ReusableWindow
        title=" AI_TUTOR.SYS"
        className="m-auto flex h-[777px] w-[1384px] max-w-full flex-col overflow-hidden"
      >
        {/**Heading */}
        <div className="px-base py-sm border-border flex w-full items-center justify-between border-b bg-white">
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
                      {/* <img src={item.icon} alt={item.name} className="p-sm" /> */}
                    </div>
                    <h2 className="heading-h5-primary font-normal">{item.name}</h2>
                  </div>
                  <StatusBadge status={item.status} />
                </div>
                <div className="flex-column gap-xs pt-base flex items-start self-stretch">
                  <ContentBox className="p-sm bg-el-bg flex items-center justify-center gap-[16px] rounded-md border text-center shadow-none">
                    <div className="flex-none">
                      <p className="body-2 font-medium">{Math.round(item.lastAttemptAccuracy)}%</p>
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
                    <FireIcon />
                    <div className="flex-none">
                      <p className="body-2 font-medium">{item.streak} Days</p>
                      <p className="body-4 font-medium text-neutral-500">Streak</p>
                    </div>
                  </ContentBox>
                </div>

                {/* <div className="gap-sm my-xl2 flex w-[360px] flex-col items-start"> */}
                <div className="gap-sm my-base flex w-[360px] flex-col items-start">
                  {item.tags.map((tag) => (
                    <div key={tag.tagId} className="gap-xs2 flex w-full flex-col">
                      <div className="body-3 flex justify-between font-medium">
                        <span>{tag.tagName}</span>
                      </div>

                      <ProgressBar progress={tag.masteryLevel} />
                    </div>
                  ))}
                </div>

                <div className="gap-xs2 my-base flex w-full flex-col items-start self-stretch">
                  <div className="body-1 flex justify-between font-medium">
                    <span>Mastery level {Math.round(item.masteryLevel * 100)}%</span>
                  </div>

                  <ProgressBar progress={Math.round(item.masteryLevel * 100)} />
                </div>
                {/* Button */}
                <div className="flex justify-end">
                  <StartQuizButton
                    subject_id={item.id}
                    difficulty={Number(0)}
                    subjectTagsMasteryLevel={item.tags}
                  />
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
