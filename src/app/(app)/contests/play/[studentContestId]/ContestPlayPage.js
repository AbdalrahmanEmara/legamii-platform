"use client";

import { useEffect, useState, useCallback } from "react";
import AnswerOption from "@/components/practice/AnswerOption";
import ContestQuestionList from "@/components/ui/ContestQuestionList";
import ReusableWindow from "@/components/ui/ReusableWindow";
import Timer from "@/components/ui/Timer";
import ProgressBar from "@/components/ui/ProgressBar";
import SystemLoading from "@/components/ui/SystemLoading";
import ContestLeaderboard from "@/components/ui/ContestLeaderboard";
import { useRouter } from "next/navigation";
import { getContestQuestionAction, submitContestAnswerAction, finishContestAction } from "@/lib/actions/contests.actions";

const LETTERS = ["A)", "B)", "C)", "D)"];
const optionKeys = ["a", "b", "c", "d"];

export default function ContestPlayPage({ studentContestId, initialQuestionsMetadata, initialLeaderboard }) {
  const router = useRouter();

  const [currentIndex, setCurrentIndex] = useState(0);
  const [selected, setSelected] = useState(null);
  const [timeLeft, setTimeLeft] = useState(600); // 00:29 basically
  const [finished, setFinished] = useState(false);

  const [leaderboard] = useState(initialLeaderboard);
  const [questionsMetadata] = useState(initialQuestionsMetadata);
  
  const [currentQuestionDetail, setCurrentQuestionDetail] = useState(null);
  const [isLoadingQuestion, setIsLoadingQuestion] = useState(true);

  const isLast = currentIndex === questionsMetadata.length - 1;

  // Load current question detail
  const fetchCurrentQuestion = useCallback(async () => {
    const meta = questionsMetadata[currentIndex];
    if (!meta) return;
    setIsLoadingQuestion(true);
    const res = await getContestQuestionAction(studentContestId, meta.questionId);
    if (res) {
      setCurrentQuestionDetail(res);
      setSelected(res.answer || null); // if previously answered
    }
    setIsLoadingQuestion(false);
  }, [currentIndex, questionsMetadata, studentContestId]);

  useEffect(() => {
    fetchCurrentQuestion();
  }, [fetchCurrentQuestion]);

  // Timer logic
  useEffect(() => {
    if (finished || isLoadingQuestion) return;
    const id = setInterval(() => {
      setTimeLeft((t) => {
        if (t <= 1) {
          setFinished(true);
          return 0;
        }
        return t - 1;
      });
    }, 1000);
    return () => clearInterval(id);
  }, [finished, isLoadingQuestion]);

  useEffect(() => {
    if (finished) {
      const finishContest = async () => {
        await finishContestAction(studentContestId);
        router.push(`/contests/summary/${studentContestId}`);
      };
      finishContest();
    }
  }, [finished, router, studentContestId]);

  const handleSelect = (letter) => {
    setSelected(letter);
  };

  const processAnswer = async () => {
    if (selected && currentQuestionDetail) {
      await submitContestAnswerAction(studentContestId, currentQuestionDetail.questionId, { answer: selected });
    }

    if (isLast) {
      setFinished(true);
    } else {
      setCurrentIndex((i) => i + 1);
      setSelected(null);
    }
  };

  const handleSkip = async () => {
    if (isLast) {
      setFinished(true);
    } else {
      setCurrentIndex((i) => i + 1);
      setSelected(null);
    }
  };

  return (
    <div className="flex w-full max-w-[1384px] items-start justify-center gap-6 m-auto">
      {/* LEFT: LEADERBOARD WINDOW */}
      <ContestLeaderboard
        students={leaderboard}
        currentUserId="you"
      />

      {/* RIGHT: CONTEST CHALLENGE WINDOW */}
      <ReusableWindow
        title="CONTESTS_CHALLENGES/CONTEST/SCIENCE FAIR PREP.SYS"
        className="m-auto flex w-[1384px] max-w-full flex-col h-[760px]"
      >
        <div className="flex flex-1 self-stretch h-full overflow-hidden">
          {/* Sidebar */}
          <ContestQuestionList questions={questionsMetadata} currentIndex={currentIndex} />

          {/* Main Content Area */}
          <div className="flex flex-1 flex-col border-l border-border h-full">
            {/* Subject Header */}
            <div className="flex w-full items-center justify-between border-b border-[#020203] px-6 py-4">
              <h2 className="heading-h5-primary uppercase">
                Science Fair Prep
              </h2>
              <Timer seconds={timeLeft} />
            </div>

            {/* Question + Options Area */}
            <div className="flex flex-1 flex-col p-8 overflow-y-auto">
              {isLoadingQuestion || !currentQuestionDetail ? (
                <div className="flex-1 flex items-center justify-center">
                   <SystemLoading />
                </div>
              ) : (
                <>
                  <div className="gap-4xl flex flex-col items-stretch flex-1">
                    {/* Question + Options */}
                    <div className="gap-base flex flex-1 flex-col">
                      <div className="label-1 text-text font-medium">
                        Question_{currentIndex + 1}
                      </div>
                      <div className="body-1 text-text font-medium">
                        {currentQuestionDetail.questionText}
                      </div>

                      <div className="gap-sm flex flex-col items-stretch">
                        {optionKeys.map((optKey, oi) => {
                          const optText = currentQuestionDetail.options[optKey];
                          if (!optText) return null;
                          return (
                            <AnswerOption
                              key={oi}
                              answer={optKey}
                              letter={LETTERS[oi]}
                              text={optText}
                              selected={selected === optKey}
                              onClick={() => handleSelect(optKey)}
                            />
                          );
                        })}
                      </div>
                    </div>

                    {/* Skip button right-aligned */}
                    <div className="mt-xl flex items-center justify-between">
                      <button
                        onClick={handleSkip}
                        className="border-border px-sm py-xs2 label-1 hover:border-primary-200 flex items-center justify-center rounded-md border font-medium transition-all"
                      >
                        SKIP &gt;|
                      </button>
                    </div>
                  </div>

                  {/* Bottom row: progress bar + finish button */}
                  <div className="mt-8 flex w-full items-center gap-6 border-t border-gray-300 pt-6">
                    <div className="flex-1">
                      <div className="flex items-center gap-4">
                        <div className="font-mono text-xs text-gray-500">
                          {currentIndex + 1}/{questionsMetadata.length}
                        </div>
                        <div className="flex-1">
                          <ProgressBar
                            progress={
                              isLast && selected !== null
                                ? 100
                                : (currentIndex / questionsMetadata.length) * 100
                            }
                          />
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={processAnswer}
                      disabled={!selected && !isLast} 
                      className={`label-1 bg-primary-500 px-md py-sm flex flex-shrink-0 items-center justify-center rounded-md border border-black font-bold tracking-wide text-white shadow-[2px_3px_4px_0_#000] ${selected ? "bg-primary-300 text-black hover:bg-primary-400" : "bg-gray-200 text-gray-500 cursor-not-allowed"
                        }`}
                    >
                      {isLast ? "FINISH" : "SUBMIT"}
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </ReusableWindow>
    </div>
  );
}
