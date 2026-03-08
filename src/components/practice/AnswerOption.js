// function AnswerOption({ letter, text, selected, onClick, reviewMode, isCorrect, isUserPick }) {
//   const base = "w-full text-left rounded-lg px-4 py-3 mb-2 font-mono text-sm flex items-center gap-3 border-2 transition-all duration-200 outline-none";

//   let containerCls = "bg-white border-gray-200 shadow-[2px_2px_0px_#e5e7eb] text-gray-600";
//   let badgeCls = "bg-gray-100 text-gray-500";

//   if (reviewMode) {
//     if (isCorrect) {
//       containerCls = "bg-green-50 border-green-300 shadow-[2px_2px_0_#86efac] text-green-700";
//       badgeCls = "bg-green-600 text-white";
//     } else if (isUserPick) {
//       containerCls = "bg-red-50 border-red-300 shadow-[2px_2px_0_#fca5a5] text-red-600";
//       badgeCls = "bg-red-500 text-white";
//     }
//   } else if (selected) {
//     containerCls = "bg-purple-50 border-purple-600 shadow-[4px_4px_0px_#7c3aed] text-purple-800 -translate-x-0.5 -translate-y-0.5";
//     badgeCls = "bg-purple-600 text-white";
//   }

//   return (
//     <button
//       onClick={reviewMode ? undefined : onClick}
//       className={`${base} ${containerCls} ${!selected && !reviewMode ? "hover:border-purple-300 hover:shadow-[3px_3px_0px_#c4b5fd]" : ""} ${reviewMode ? "cursor-default" : "cursor-pointer"}`}
//     >
//       <span className={`inline-flex items-center justify-center w-6 h-6 rounded flex-shrink-0 text-xs font-bold transition-all duration-200 ${badgeCls}`}>
//         {letter}
//       </span>
//       <span className="flex-1">{text}</span>
//       {reviewMode && isCorrect && <span className="text-green-600 text-sm font-bold ml-auto">✓</span>}
//       {reviewMode && isUserPick && !isCorrect && <span className="text-red-400 text-xs ml-auto whitespace-nowrap">✗ your answer</span>}
//     </button>
//   );
// }
// import "../../../src/app/globals.css";
function AnswerOption({ letter, text, selected, onClick, reviewMode, isCorrect, isUserPick }) {
  const base =
    "w-full flex items-center gap-xs self-stretch p-sm rounded-[2px] border transition-all duration-200 text-left";

  // Default (not chosen – quiz mode)
  let containerCls = "border-neutral-400 bg-neutral-50";

  // Review mode
  if (reviewMode) {
    if (isCorrect) {
      containerCls = "border-green-600 shadow-[2px_3px_4px_0_#00993D]";
    } else if (isUserPick) {
      containerCls = "border-red-500 bg-neutral-50";
    }
  }

  // Selected (quiz mode only)
  else if (selected) {
    containerCls = "border-[#020203] bg-neutral-50 shadow-[2px_3px_4px_0_#000]";
  }

  return (
    <button
      onClick={reviewMode ? undefined : onClick}
      className={` ${base} ${containerCls} ${!reviewMode && !selected ? "hover:border-black" : ""} ${reviewMode ? "cursor-default" : "cursor-pointer"} `}
    >
      <span className="body-2 font-medium">{letter}</span>

      <span className="body-2 flex-1 font-medium">{text}</span>

      {reviewMode && isCorrect && <span className="ml-auto font-bold text-green-600">✓</span>}

      {reviewMode && isUserPick && !isCorrect && (
        <span className="ml-auto text-sm text-red-500">✗ your answer</span>
      )}
    </button>
  );
}

export default AnswerOption;
