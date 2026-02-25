import ContentBox from "@/components/ui/ContentBox";
import ReusableWindow from "@/components/ui/ReusableWindow";
import "../globals.css";
import Background from "@/components/ui/Background";
import CustomScroll from "@/components/ui/CustomScroll";
import Button from "@/components/ui/Button";
const data = [
  { title: "Math", description: "Content 1" },
  { title: "History", description: "Content 2" },
  { title: "Physics", description: "Content 3" },
  {
    title: "Biology",
    description:
      "Contentknkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk                    4jhbbbbbbbbbbbbbbbbbbbbbbbbbbbbb",
  },
  { title: "Chemistry", description: "Content 5" },
  { title: "Math", description: "Contmdvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvnsklkkkkkkkkkkccccdvefnverfiofnreinoermoeent 2" },
  {
    title: "History",
    description:
      "Contmdvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvnsklkkkkkkkkkkccccdvefnverfiofnreinoermoeent 2",
  },
  { title: "Physics", description: "Content 3" },
  { title: "Biology", description: "Content 4" },
  { title: "Chemistry", description: "Content 5" },
  { title: "Chemistry", description: "Content 5" },
];

function page() {
  return (
    <Background>
      <div>
        <ReusableWindow
          title=" AI_TUTOR.SYS"
          className="mt-8 ml-16 flex h-[777px] w-[1384px] flex-col"
        >
          {/**Heading */}
          <div className="border-border px-base py-sm flex w-full items-center justify-between border-b bg-white">
            <div className="heading-h5-primary font-bold">PRACTICE</div>
          </div>

          <CustomScroll className="min-h-0 flex-1 overflow-auto">
            {/* <div className="grid grid-cols-2 items-start gap-[var(--spacing-base)] self-stretch bg-white p-[var(--spacing-base)]"> */}
            <div className="grid grid-cols-2 items-start gap-[var(--spacing-base)] self-stretch bg-white p-[24px]">
              {data.map((item, index) => (
                // <ContentBox key={index} className="w-full p-[var(--spacing-base)]">
                <ContentBox key={index} className="w-full p-[24px]">
                  {/**content Container */}
                  <div className="mb-[32px]">
                    <h2 className="text-xl font-bold">{item.title}</h2>
                    <p className="text-muted-foreground break-all">{item.description}</p>
                  </div>
                  {/**Button */}
                  <Button className="mt-auto">
                    <span className="label-1 text-base font-bold text-text">START QUIZ</span>
                  </Button>
                </ContentBox>
              ))}
            </div>
          </CustomScroll>
        </ReusableWindow>
      </div>
    </Background>
  );
}

export default page;
