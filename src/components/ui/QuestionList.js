// function QuestionList() {
//   return (
//     <div className="flex h-[724] w-[196] flex-col items-start gap-6 self-stretch border-r border-[#262626] p-0">
//       {/**Header */}
//       <div className="flex items-center justify-center gap-[10px] self-stretch border-b border-[#262626] px-6 py-2">
//         Title
//       </div>
//       <p> Salma hossam</p>
//     </div>
//   );
// }

// export default QuestionList;

import "../../app/globals.css";
export default function QuestionList() {
  return (
    //  true w : 196 
    <div className="flex h-full w-[230px] flex-col border-r border-border bg-white"> 
      {/* Header */}
      <div className="flex items-center justify-center border-b border-border px-6 py-2 bg-color-white">
        <span className="font-primary text-sm leading-[24px] font-normal tracking-[0] text-text">
          Question List
        </span>
      </div>
      {/* Body */}
      <div className="flex flex-1 flex-col gap-2 overflow-y-auto px-6 py-2 bg-white">
        {/* Questions label */}
        <div className="mb-2 flex items-center gap-2">
          <div className="h-3 w-3 rounded-sm bg-black"></div>
          <span className="text-sm font-medium">- Questions</span>
        </div>

        {/* Questions list */}
        {Array.from({ length: 10 }).map((_, i) => (
          <button key={i} className="text-left text-sm hover:underline ">
            <p>|</p>
            <span>|-----</span>
            #Question_{i + 1}
            {/* <br /> */}
          </button>
        ))}
      </div>
    </div>
  );
}
