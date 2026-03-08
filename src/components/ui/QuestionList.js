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
export default function QuestionList({ questions, currentIndex, answers }) {
  return (
    //  true w : 196
    <div className="flex h-full w-[230px] flex-col border-r border-[#020203] bg-white">
      {/* Header */}
      <div className="bg-color-white flex items-center justify-center border-b border-[#020203] px-6 py-2">
        <span className="font-primary text-text text-sm leading-[24px] font-normal tracking-[0]">
          Question List
        </span>
      </div>
      {/* Body */}
      <div className="border-border flex flex-1 flex-col gap-2 overflow-y-auto border bg-white px-6 py-2">
        {/* Questions label */}
        <div className="mb-2 flex items-center gap-2">
          <div className="h-3 w-3 rounded-sm bg-black"></div>
          <span className="text-sm font-medium"> ■ Questions </span>
        </div>

        {questions.map((q, i) => {
          const answered = answers[i] !== undefined;
          const isCurrent = i === currentIndex;
          return (
            <div
              key={q.id}
              className={`mb-0.5 cursor-default rounded px-1 py-0.5 pl-4 font-mono text-xs transition-all duration-200 ${isCurrent ? "bg-purple-100 text-purple-600" : answered ? "text-gray-400 line-through" : "text-gray-600"}`}
            >
              #{`Question_${i + 1}`}
            </div>
          );
        })}
      </div>
    </div>
  );
}

// unction QuestionList({ questions, currentIndex, answers }) {
//   return (
//     <aside className="w-40 flex-shrink-0 bg-purple-50 border-r-2 border-purple-100 py-5 overflow-y-auto">
//       <div className="font-mono text-xs font-bold text-purple-600 uppercase tracking-wider px-4 pb-3 border-b border-purple-100 mb-2">
//         Question List
//       </div>
//       <div className="px-3">
//         <div className="font-mono text-xs font-bold text-purple-900 mb-1.5 pl-1">■ Questions</div>
//         {questions.map((q, i) => {
//           const answered = answers[i] !== undefined;
//           const isCurrent = i === currentIndex;
//           return (
//             <div
//               key={q.id}
//               className={`font-mono text-xs px-1 pl-4 py-0.5 rounded mb-0.5 cursor-default transition-all duration-200
//                 ${isCurrent ? "bg-purple-100 text-purple-600" : answered ? "text-gray-400 line-through" : "text-gray-600"}`}
//             >
//               #{`Question_${i + 1}`}
//             </div>
//           );
//         })}
//       </div>
//     </aside>
//   );
