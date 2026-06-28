import "../../app/globals.css";
export default function QuestionList({ questions, currentIndex }) {
  return (
    <div className="flex h-full w-full flex-col border-[#020203] bg-el-bg md:w-[230px]">
      {/* Header */}
      <div className="bg-color-white flex items-center justify-center border-b border-[#020203] px-6 py-2">
        <span className="font-primary text-text text-sm leading-[24px] font-normal tracking-[0]">
          Question List
        </span>
      </div>
      {/* Body */}
      <div className="flex flex-1 flex-row gap-2 overflow-x-auto bg-el-bg px-4 py-2 md:flex-col md:overflow-y-auto md:px-6">
        {/* Questions label - hidden on mobile */}
        <div className="mb-2 hidden items-center gap-2 md:flex">
          <div className="h-3 w-3 rounded-sm bg-black"></div>
          <span className="text-sm font-medium"> ■ Questions </span>
        </div>

        {questions.map((q, i) => {
          const isSkipped = i <= currentIndex;
          const isCurrent = i === currentIndex;
          return (
            <div
              key={q.questionId}
              className={`shrink-0 cursor-default rounded px-1 py-0.5 font-mono text-xs transition-all duration-200 md:pl-4 ${
                isCurrent
                  ? "bg-purple-100 text-purple-600"
                  : isSkipped
                    ? "text-gray-400 line-through"
                    : "text-gray-600"
              } ${isCurrent ? "border-purple-600 border md:border-0" : ""}`}
            >
              #{`Q_${i + 1}`}
            </div>
          );
        })}
      </div>
    </div>
  );
}
