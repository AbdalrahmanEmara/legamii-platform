export default function ContestQuestionList({ questions, currentIndex }) {
  return (
    <div className="flex h-full w-[230px] flex-col border-[#020203] bg-el-bg">
      <div className="bg-color-white flex items-center justify-center border-b border-[#020203] px-6 py-2">
        <span className="font-primary text-text text-sm leading-[24px] font-normal">
          Question List
        </span>
      </div>
      <div className="flex flex-1 flex-col gap-2 overflow-y-auto bg-el-bg px-6 py-2">
        <div className="mb-2 flex items-center gap-2">
          <div className="h-3 w-3 rounded-sm bg-black"></div>
          <span className="text-sm font-medium"> ■ Questions </span>
        </div>

        {questions.map((q, i) => {
          const isSkipped = i <= currentIndex;
          const isCurrent = i === currentIndex;
          return (
            <div
              key={q.questionId || i}
              className={`mb-0.5 cursor-default rounded px-1 py-0.5 pl-4 font-mono text-xs transition-all duration-200 ${isCurrent ? "bg-purple-100 text-purple-600" : isSkipped ? "text-gray-400 line-through" : "text-gray-600"}`}
            >
              #{`Question_${i + 1}`}
            </div>
          );
        })}
      </div>
    </div>
  );
}
