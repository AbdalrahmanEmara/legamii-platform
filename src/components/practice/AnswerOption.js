"use client";

import { solveQuestionAction } from "@/lib/actions/quiz.action";

function AnswerOption({ quiz_id, question_id, answer, text, selected, onClick }) {
  const handleSelect = async () => {
    // Optimistically update UI via the parent's onClick
    onClick();

    // Call the server action to save the answer
    try {
      await solveQuestionAction(quiz_id, question_id, answer);
    } catch (error) {
      console.error("Failed to solve question:", error);
    }
  };

  const base = "w-full flex items-center gap-xs self-stretch p-sm rounded-[2px] border transition-all duration-200 text-left";
  const containerCls = selected
    ? "border-[#020203] bg-neutral-50 shadow-[2px_3px_4px_0_#000]"
    : "border-neutral-400 bg-neutral-50 hover:border-black";

  return (
    <button
      onClick={handleSelect}
      className={`${base} ${containerCls}`}
    >
      <span className="body-2 font-medium uppercase">{answer})</span>
      <span className="body-2 flex-1 font-medium">{text}</span>
    </button>
  );
}

export default AnswerOption;
