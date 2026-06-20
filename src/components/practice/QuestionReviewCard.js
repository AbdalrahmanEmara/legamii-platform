// import ReusableWindow from "../ui/ReusableWindow";
// import AiTutorModal from "./AiTutorModal";
// import ButtonSecondary from "../ui/ButtonSecondary";
// import { StatusBadge } from "../ui/StatusBadge";
// import { useState } from "react";

// const LETTERS = ["A)", "B)", "C)", "D)"];
// const arrange = ["a", "b", "c", "d"];
// function QuestionReviewCard({ question, index, userAnswer }) {
//   const [showTutor, setShowTutor] = useState(false);

//   return (
//     <>
//       <ReusableWindow title={`QUESTION_${index + 1}.SYS`} className="w-[1032px] p-px">
//         <div className="p-base">
//           {/* Title + difficulty badge */}
//           <div className="flex items-center justify-between">
//             <h3 className="heading-h5-primary font-semibold tracking-wider uppercase">
//               QUESTION_{index + 1}
//             </h3>
//             {question?.difficulty && (
//               <StatusBadge status={question.difficulty.toUpperCase()} />
//             )}
//           </div>

//           <div className="my-md">
//             {/* Question text */}
//             <p className="body-1 text-text mb-sm">{question?.questionText}</p>

//             {/* Tags */}
//             {question?.tags && question.tags.length > 0 && (
//               <div className="gap-xs flex flex-wrap mt-sm mb-sm">
//                 {question.tags.map((tag) => (
//                   <span
//                     key={tag}
//                     className="bg-neutral-50 py-xs px-sm body-3 font-medium text-neutral-500 rounded-sm border border-neutral-200"
//                   >
//                     {tag}
//                   </span>
//                 ))}
//               </div>
//             )}
//           </div>

//           {/* Options */}
//           <div className="gap-sm flex flex-col items-stretch">
//             <ul className="flex flex-col gap-sm">
//               {Object.values(question?.options ?? {}).map((opt, oi) => {
//                 return (
//                   <li key={oi} className={`${question?.answer === arrange[oi] ? "border-green-600 shadow-md shadow-green-600" : ""} ${userAnswer === arrange[oi] ? userAnswer !== question?.answer ? "border-red-600 shadow-md shadow-red-600" : "border-green-600 shadow-md shadow-green-600" : ""} flex items-center gap-xs border p-4 shadow`}>
//                     <span className="font-semibold">{LETTERS[oi]}</span>
//                     <p className="body-2">{opt}</p>
//                   </li>
//                 )
//               })}
//             </ul>
//           </div>
//         </div>
//         {/* SPACE BEFORE TIP */}
//         <div className="mt-lg border-t border-black">
//           {/* TIP BAR */}
//           <div className="w-full bg-neutral-50 py-6">
//             <div className="flex items-start gap-6 px-8">
//               {/* LEFT SIDE (icon + text) */}
//               <div className="flex flex-1 items-start gap-6">
//                 {/* Icon */}
//                 <div className="flex h-14 w-14 flex-shrink-0 items-center justify-center bg-[#E1D5E7]">
//                   <img src="/images/lamp.png" alt="tip icon" className="h-8 w-8 object-contain" />
//                 </div>

//                 {/* Text Block */}
//                 <div className="flex flex-col">
//                   <p className="mb-xxs label-2 text-text font-semibold">TIP!</p>

//                   <p className="mt-xxs body-2 text-text font-medium">{question?.tip}</p>
//                 </div>
//               </div>

//               {/* RIGHT SIDE (button only takes its width) */}
//               <div className="flex-shrink-0">
//                 <ButtonSecondary
//                   text="Explain More"
//                   onClick={() => {
//                     setShowTutor(true);
//                     console.log("clicked");
//                   }}
//                 />
//               </div>
//             </div>
//           </div>
//         </div>
//       </ReusableWindow>

//       {showTutor && <AiTutorModal question={question} onClose={() => setShowTutor(false)} />}
//     </>
//   );
// }

// export default QuestionReviewCard;


import ReusableWindow from "../ui/ReusableWindow";
import AiTutorModal from "./AiTutorModal";
import ButtonSecondary from "../ui/ButtonSecondary";
import { StatusBadge } from "../ui/StatusBadge";
import { useState } from "react";

const LETTERS = ["A)", "B)", "C)", "D)"];
const arrange = ["a", "b", "c", "d"];
function QuestionReviewCard({ question, index, userAnswer ,   width = "w-[1032px]", }) {
  const [showTutor, setShowTutor] = useState(false);

  return (
    <>
      <ReusableWindow title={`QUESTION_${index + 1}.SYS`}   className={`${width} p-px`}>
        <div className="p-base">
          {/* Title + difficulty badge */}
          <div className="flex items-center justify-between">
            <h3 className="heading-h5-primary font-semibold tracking-wider uppercase">
              QUESTION_{index + 1}
            </h3>
            {question?.difficulty && (
              <StatusBadge status={question.difficulty.toUpperCase()} />
            )}
          </div>

          <div className="my-md">
            {/* Question text */}
            <p className="body-1 text-text mb-sm">{question?.questionText}</p>

            {/* Tags */}
            {question?.tags && question.tags.length > 0 && (
              <div className="gap-xs flex flex-wrap mt-sm mb-sm">
                {question.tags.map((tag) => (
                  <span
                    key={tag}
                    className="bg-neutral-50 py-xs px-sm body-3 font-medium text-neutral-500 rounded-sm border border-neutral-200"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Options */}
          <div className="gap-sm flex flex-col items-stretch">
            <ul className="flex flex-col gap-sm">
              {Object.values(question?.options ?? {}).map((opt, oi) => {
                return (
                  <li key={oi} className={`${question?.answer === arrange[oi] ? "border-green-600 shadow-md shadow-green-600" : ""} ${userAnswer === arrange[oi] ? userAnswer !== question?.answer ? "border-red-600 shadow-md shadow-red-600" : "border-green-600 shadow-md shadow-green-600" : ""} flex items-center gap-xs border p-4 shadow`}>
                    <span className="font-semibold">{LETTERS[oi]}</span>
                    <p className="body-2">{opt}</p>
                  </li>
                )
              })}
            </ul>
          </div>
        </div>
        {/* SPACE BEFORE TIP */}
        <div className="mt-lg border-t border-black">
          {/* TIP BAR */}
          <div className="w-full bg-neutral-50 py-6">
            <div className="flex items-start gap-6 px-8">
              {/* LEFT SIDE (icon + text) */}
              <div className="flex flex-1 items-start gap-6">
                {/* Icon */}
                <div className="flex h-14 w-14 flex-shrink-0 items-center justify-center bg-[#E1D5E7]">
                  <img src="/images/lamp.png" alt="tip icon" className="h-8 w-8 object-contain" />
                </div>

                {/* Text Block */}
                <div className="flex flex-col">
                  <p className="mb-xxs label-2 text-text font-semibold">TIP!</p>

                  <p className="mt-xxs body-2 text-text font-medium">{question?.tip}</p>
                </div>
              </div>

              {/* RIGHT SIDE (button only takes its width) */}
              <div className="flex-shrink-0">
                <ButtonSecondary
                  text="Explain More"
                  onClick={() => {
                    setShowTutor(true);
                    console.log("clicked");
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </ReusableWindow>

      {showTutor && <AiTutorModal question={question} onClose={() => setShowTutor(false)} />}
    </>
  );
}

export default QuestionReviewCard;
