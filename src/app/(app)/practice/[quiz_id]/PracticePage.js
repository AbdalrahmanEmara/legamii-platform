"use client";

import AnswerOption from "@/components/practice/AnswerOption";
import QuestionList from "@/components/ui/QuestionList";
import ReusableWindow from "@/components/ui/ReusableWindow";
import Timer from "@/components/ui/Timer";
import SummaryPage from "@/components/practice/SummaryPage";
import ProgressBar from "@/components/ui/ProgressBar";
import SystemLoading from "@/components/ui/SystemLoading";
import { useEffect, useState } from "react";
import { finishQuizAction, getQuestionAction, solveQuestionAction } from "@/lib/actions/quiz.actions";

const QUIZ_DURATION = 90;
const LETTERS = ["A)", "B)", "C)", "D)"];

function PracticePage({ questions, quiz_id }) {
  const [questionsData, setQuestionsData] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchQuestion() {
      setLoading(true);
      try {
        const question = await getQuestionAction(quiz_id, questions[currentIndex].questionId)
        setCurrentQuestion(question);
        setQuestionsData((prev) => [...prev, question]);
      } finally {
        setLoading(false);
      }
    }
    fetchQuestion()
  }, [currentIndex])

  const [selected, setSelected] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [timeLeft, setTimeLeft] = useState(QUIZ_DURATION);
  const [finished, setFinished] = useState(false);

  // ✅ Derived — no useState or useEffect needed
  const timeTaken = QUIZ_DURATION - timeLeft;
  const isLast = currentIndex === questions.length - 1;
  // const answeredCount = Object.keys(answers).length;
  const q = currentQuestion?.data;
  const opts = currentQuestion?.data?.options;
  const options = opts ? Object?.values(opts) : [];

  // ✅ Timer — setFinished inside the setter callback, not the effect body
  useEffect(() => {
    if (finished) return;
    const id = setInterval(() => {
      setTimeLeft((t) => {
        if (t <= 1) {
          finishQuizAction(quiz_id);
          setFinished(true);
          return 0;
        }
        return t - 1;
      });
    }, 1000);
    return () => clearInterval(id);
  }, [finished]);

  const handleSelect = (letter) => {
    // Optimistic UI update
    setSelected(letter);
  };

  const handleNext = async () => {
    if (selected) {
      try {
        const res = await solveQuestionAction(quiz_id, questions[currentIndex].questionId, { answer: selected });
        console.log(res);
      } catch (error) {
        console.error("Failed to solve question:", error);
        return;
      }
    }

    if (isLast) {
      await finishQuizAction(quiz_id);
      setFinished(true);
    } else {
      setCurrentIndex((i) => i + 1);
    }
    setAnswers((prev) => [...prev, selected])
    setSelected(null);
  };

  const handleSkip = () => {
    if (!isLast) setCurrentIndex((i) => i + 1);
  };

  if (finished) {
    return <SummaryPage key={quiz_id} quiz_id={quiz_id} />;
  }

  if (loading) return <SystemLoading />;
  else
    return (
    <div>
      <ReusableWindow title="AI_TUTOR.SYS" className="m-auto flex w-[1384px] max-w-full flex-col">
        <div className="flex flex-1 self-stretch">
          {/* Left Sidebar */}
          <QuestionList questions={questions} currentIndex={currentIndex}  />

          {/* Right Side */}
          <div className="flex flex-1 flex-col border-l border-border">
            {/* Subject Header */}
            <div className="flex w-full items-center justify-between border-b border-[#020203] px-6 py-4">
              <h2 className="heading-h5-primary font-bold">Math Quiz</h2>
              <Timer seconds={timeLeft} />
            </div>

            {/* Question + Options Area */}
            <div className="p-base gap-base flex flex-1 flex-col overflow-y-auto">
              <div className="gap-4xl flex flex-col items-stretch">
                {/* Question + Options */}
                <div className="gap-base flex flex-1 flex-col">
                  <div className="label-1 text-text font-medium">Question_{currentIndex + 1}</div>
                  <div className="body-1 text-text font-medium">{q?.questionText}</div>
                  <div className="gap-sm flex flex-col items-stretch">
                    {options.map((opt, oi) => {
                      const answerLetters = ["a", "b", "c", "d"];
                      const currentLetter = answerLetters[oi];
                      return (
                        <AnswerOption
                          key={oi}
                          answer={currentLetter}
                          letter={LETTERS[oi]}
                          text={opt}
                          selected={selected === currentLetter}
                          onClick={() => handleSelect(answerLetters[oi])}
                        />
                      );
                    })}
                  </div>
                </div>

                {/* Navigation row: back + skip */}
                <div className="mt-xl flex items-center justify-between">

                  {!isLast && (
                    <button
                      onClick={handleSkip}
                      className="border-border px-sm py-xs2 label-1 hover:border-primary-200 flex items-center justify-center rounded-md border font-medium transition-all"
                    >
                      SKIP &gt;|
                    </button>
                  )}
                </div>
              </div>

              {/* Bottom row: progress bar + next/finish button */}
              <div className="border-border pt-base gap-base mt-auto flex w-full items-center border-t">
                <div className="flex-1">
                  <ProgressBar
                    progress={
                      isLast && selected !== null
                        ? 100
                        : (currentIndex / questions.length) * 100
                    }
                  />
                </div>
                <button
                  onClick={handleNext}
                  className="label-1 bg-primary-500 px-md py-sm flex flex-shrink-0 items-center justify-center rounded-md border border-black font-bold tracking-wide text-white shadow-[2px_3px_4px_0_#000]"
                >
                  {isLast ? "FINISH" : "Next →"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </ReusableWindow>
    </div>
  );
}

export default PracticePage;
