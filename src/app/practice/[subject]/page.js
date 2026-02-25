import Background from "@/components/ui/Background";
import ContentBox from "@/components/ui/ContentBox";
import QuestionList from "@/components/ui/QuestionList";
import ReusableWindow from "@/components/ui/ReusableWindow"


function page() {
    return (
        <Background>
      <div>
        <ReusableWindow
          title=" AI_TUTOR.SYS"
          className="mt-8 ml-16 flex h-[777px] w-[1384px] flex-col"
        >
          {/**Heading */}
          {/* <div className="border-border px-base py-sm flex w-full items-center justify-between border-b bg-primary-50">
            <div className="heading-h5-primary">PRACTICE ON MATHS</div>
          </div> */}

            {/* <div className="flex p-0 items-start gap-0 flex-1 self-stretch">
    
                <QuestionList />
              <div className="flex px-6 py-4 justify-between self-stretch border-b border-[#262626]">
                Header section
                <div className="border-border py-sm flex w-full  justify-between border-b bg-white">
                    Quiz
                </div>
              </div>
                
            </div> */}
            <div className="flex flex-1 self-stretch">

  {/* Left Sidebar */}
  <QuestionList />

  {/* Right Side (fills remaining space) */}
  <div className="flex flex-col flex-1">

    {/* Subject Header */}

 <div className="flex 
                w-full
                px-6 py-4
                justify-between 
                items-center 
                border-b border-border">

  <h2 className="heading-h5-primary font-bold">
    Math Quiz
  </h2>

  <span className="text-sm">
    Question 1 of 10
  </span>

</div>

    {/* Question + Options Area */}
    <div className="flex flex-col flex-1 p-6 gap-6 overflow-y-auto">
      
      <h3 className="text-lg font-medium">
        What is the value of x in 2x + 3 = 7?
      </h3>

      <div className="flex flex-col gap-4">
        <button className="border p-4 text-left">A. 1</button>
        <button className="border p-4 text-left">B. 2</button>
        <button className="border p-4 text-left">C. 3</button>
        <button className="border p-4 text-left">D. 4</button>
      </div>

    </div>

  </div>
</div>
        </ReusableWindow>
      </div>
    </Background>
  );
}

export default page
// flex items-start gap-[var(--spacing-base)] self-stretch bg-white p-[24px] h-screen