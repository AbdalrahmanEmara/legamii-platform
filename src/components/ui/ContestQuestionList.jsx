import "../../app/globals.css";
import { FlagIcon } from "../icons/FlagIcon";



export default function ContestQuestionList({
  questions,
  currentIndex,
  onQuestionClick,
}) {
  return (
    <div className="flex h-full w-[230px] flex-col  border-[#020203] bg-el-bg">
      {/* Header Tab-like */}
      <div className="bg-color-white flex items-center justify-center border-b border-[#020203] px-6 py-2">
        <span className="font-primary text-text text-sm leading-[24px] font-normal tracking-[0]">
          Question List
        </span>
      </div>
      {/* Body */}
      <div className="flex flex-1 flex-col gap-2 overflow-y-auto  bg-el-bg px-6 py-2">
        {/* Questions label */}
        <div className="mb-4 flex items-center gap-2">
          <div className="h-4 w-4 rounded-sm bg-black"></div>
          <span className="text-sm font-medium font-mono"> Questions </span>
        </div>

        {/* Tree structure */}
        <div className="relative pl-2">
          {/* Vertical line connecting the items */}
          <div className="absolute left-[8px] top-[12px] bottom-0 w-[1px] bg-gray-300"></div>

          {questions.map((q, i) => {
            const isCurrent = i === currentIndex;
            const isAnswered = q.isAnswered;

            return (
              <div key={q.questionId} className="relative mb-3 flex items-center">
                {/* Horizontal line */}
                <div className="absolute left-[-8px] w-[16px] h-[1px] bg-gray-300"></div>

                <button
                  onClick={() => onQuestionClick(i)}
                  className={`ml-3 flex w-full items-center justify-between rounded px-1 body-3 transition-all duration-200
          ${isCurrent
                      ? "font-bold text-black"
                      : isAnswered
                        ? "text-gray-400 line-through"
                        : "text-gray-600"
                    }`}
                >
                  <span>{`Question_${i + 1}`}</span>

                  {q.isFlaged && (
                    <FlagIcon className="shrink-0 w-[24px] h-[24px]" />
                  )}
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}