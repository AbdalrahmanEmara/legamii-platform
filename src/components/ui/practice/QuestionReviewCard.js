import ReusableWindow from "../ReusableWindow";
import AnswerOption from "./AnswerOption";
import AiTutorModal from "./AiTutorModal";
import ButtonSecondary from "../ButtonSecondary";
import { StatusBadge } from "../StatusBadge";
import { useState } from "react";

// const DIFFICULTY_STYLES = {
//   EASY: "bg-green-100 text-green-700 border border-green-300",
//   INTERMEDIATE: "bg-yellow-100 text-yellow-800 border border-yellow-300",
//   HARD: "bg-red-100 text-red-600 border border-red-300",
// };
const LETTERS = ["A)", "B)", "C)", "D)"];
function QuestionReviewCard({ question, index, userAnswer }) {
  const [showTutor, setShowTutor] = useState(false);

  // const diffStyle = DIFFICULTY_STYLES[question.difficulty] || DIFFICULTY_STYLES.EASY;

  return (
    <>
      <ReusableWindow title={`QUESTION_${index + 1}.SYS`} className="mb-sm w-[1032px] p-px">
        <div className="p-base">
          {/* Title + difficulty badge */}
          <div className="flex items-center justify-between">
            <h3 className="heading-h5-primary font-semibold tracking-wider uppercase">
              QUESTION_{index + 1}
            </h3>
            {/* <span
              className={`rounded px-3 py-1 font-mono text-xs font-bold tracking-widest ${diffStyle}`}
            >
              {question.difficulty}
            </span> */}
            <StatusBadge status={question.difficulty} />
          </div>

          <div className="my-md">
            {/* Question text */}
            <p className="body-1 text-text mb-sm">{question.text}</p>

            {/* Tags */}
            <div className="gap-base flex flex-wrap">
              {question.tags.map((tag) => (
                <span
                  key={tag}
                  className="bg-sec-el py-xs2 px-sm body-2 font-regular text-sec-text rounded-sm border border-gray-200"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Options */}
          <div className="gap-sm flex flex-col items-stretch">
            {question.options.map((opt, oi) => (
              <AnswerOption
                key={oi}
                letter={LETTERS[oi]}
                text={opt}
                reviewMode
                isCorrect={oi === question.correct}
                isUserPick={oi === userAnswer}
              />
            ))}
          </div>
</div>
          {/* SPACE BEFORE TIP */}
          <div className="mt-lg border-t border-black" >

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
                  <p className="mb-xxs label-2 font-semibold text-text">TIP!</p>

                  <p className="mt-xxs body-2 text-text font-medium">{question.tip}</p>
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
