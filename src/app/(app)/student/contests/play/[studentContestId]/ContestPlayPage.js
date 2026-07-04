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
import { getContestQuestionAction, submitContestAnswerAction, finishContestAction, toggleQuestionFlagAction } from "@/lib/actions/student_contest.action";
import { FlagIcon } from "@/components/icons/FlagIcon";

const LETTERS = ["A)", "B)", "C)", "D)"];
const optionKeys = ["a", "b", "c", "d"];

export default function ContestPlayPage({ studentContestId, initialQuestionsMetadata, initialLeaderboard, title, start, duration }) {
  const router = useRouter();

  const [currentIndex, setCurrentIndex] = useState(0);
  const [selected, setSelected] = useState(null);
  const [timeLeft, setTimeLeft] = useState(0);
  const [finished, setFinished] = useState(false);

  const [leaderboard] = useState(initialLeaderboard);
  const [questionsMetadata, setQuestionsMetadata] = useState(
    initialQuestionsMetadata
  );

  const [currentQuestionDetail, setCurrentQuestionDetail] = useState(null);
  const [isLoadingQuestion, setIsLoadingQuestion] = useState(true);

  const isLast = currentIndex === questionsMetadata.length - 1;
  const isAlreadyAnswered = currentQuestionDetail?.answer !== null;

  // Load current question detail
  const fetchCurrentQuestion = useCallback(async () => {
    const meta = questionsMetadata[currentIndex];
    if (!meta) return;
    setIsLoadingQuestion(true);
    // console.log("current meta : ", meta)
    const res = await getContestQuestionAction(studentContestId, meta.questionId);
    // console.log("whole response : res.data : ")
    // console.log(JSON.stringify(res.data, null, 2))
    // console.log("res.data is : ",res.data);
    if (res) {
      setCurrentQuestionDetail(res.data);
      setSelected(res.data.answer || null); // if previously answered
    }
    setIsLoadingQuestion(false);
  }, [currentIndex, questionsMetadata, studentContestId]);

  useEffect(() => {
    fetchCurrentQuestion();
  }, [fetchCurrentQuestion]);

  // Timer logic
  // useEffect(() => {
  //   if (finished || isLoadingQuestion) return;
  //   const id = setInterval(() => {
  //     setTimeLeft((t) => {
  //       if (t <= 1) {
  //         setFinished(true);
  //         return 0;
  //       }
  //       return t - 1;
  //     });
  //   }, 1000);
  //   return () => clearInterval(id);
  // }, [finished, isLoadingQuestion]);

  useEffect(() => {
    if (!start || !duration) return;

    const startDate = new Date(start);

    let interval;

    const updateRemaining = async () => {
      const elapsed = Math.floor(
        (Date.now() - startDate.getTime()) / 1000
      );

      const remaining = Math.max(0, Number(duration) * 60 - elapsed);

      setTimeLeft(remaining);

      if (remaining === 0) {
        clearInterval(interval);

        await finishContestAction(studentContestId);

        router.push(
          `/student/contests/detailed-summary/${studentContestId}`
        );
      }
    };

    updateRemaining();

    interval = setInterval(() => {
      updateRemaining();
    }, 1000);

    return () => clearInterval(interval);
  }, [start, duration, studentContestId, router]);

  /*useEffect(() => {
    if (!finished) return;

    const finishContest = async () => {
      try {
        await finishContestAction(studentContestId);

        if (timeLeft === 0) {
          router.push(`/student/contests/summary/${studentContestId}`);
        } else {
          router.push(`/student/contests/detailed-summary/${studentContestId}`);
        }
      } catch (error) {
        console.error("Error finishing contest:", error);
      }
    };

    finishContest();
  }, [finished, timeLeft, studentContestId, router]);*/



  const handleSelect = (answerText) => {
    setSelected(answerText);
  };

  const processAnswer = async () => {
    console.log("SUBMIT CLICKED");
    if (!selected && !isLast) return;

    if (selected && currentQuestionDetail) {
      console.log("=== SUBMIT ===");
      console.log("studentContestId:", studentContestId);
      console.log("questionId:", currentQuestionDetail.questionId);
      const res = await submitContestAnswerAction(
        studentContestId,
        currentQuestionDetail.questionId,
        {
          answer: selected,
        }
      );

      if (res) {
        setQuestionsMetadata((prev) =>
          prev.map((q) =>
            q.questionId === currentQuestionDetail.questionId
              ? {
                ...q,
                isAnswered: true,
              }
              : q
          )
        );
      }

      if (isLast) {
        await finishContestAction(studentContestId);

        router.push(`/student/contests/summary/${studentContestId}`);

        return;
      } else {
        setCurrentIndex((i) => i + 1);
        setSelected(null);
      }
    };
  }
  const handleSkip = async () => {
    if (isLast) {
      setFinished(true);
    } else {
      setCurrentIndex((i) => i + 1);
      setSelected(null);
    }
  };

  const handleFlagQuestion = async () => {
    console.log({
      studentContestId,
      questionId: currentQuestionDetail.questionId,
    });
    try {
      await toggleQuestionFlagAction(studentContestId, currentQuestionDetail.questionId);
      // Update the flag status in the local state
      setQuestionsMetadata((prev) =>
        prev.map((q) =>
          q.questionId === currentQuestionDetail.questionId
            ? {
              ...q,
              isFlaged: !q.isFlaged,
            }
            : q
        )
      );
      // Toggle the flag status on the current question detail as well
      setCurrentQuestionDetail((prev) => ({
        ...prev,
        isFlaged: !prev.isFlaged,
      }));
    } catch (error) {
      console.error("Error flagging question:", error);
    }
  };

  console.log("QUESTION DETAIL", currentQuestionDetail);
  return (
    <div className="flex w-full max-w-[1384px] items-start justify-center gap-6 m-auto">
      {/* LEFT: LEADERBOARD WINDOW */}
      <ContestLeaderboard
        students={leaderboard}
        //currentUserId={currentUser?.id}
        currentUserId="you"
      />

      {/* RIGHT: CONTEST CHALLENGE WINDOW */}
      <ReusableWindow
        title={`CONTESTS_CHALLENGES/CONTEST/${title}`}
        className="m-auto flex w-[1384px] max-w-full flex-col h-[760px]"
      >
        <div className="flex flex-1 self-stretch h-full overflow-hidden">
          {/* Sidebar */}
          <ContestQuestionList
            questions={questionsMetadata}
            currentIndex={currentIndex}
            onQuestionClick={(index) => setCurrentIndex(index)}
          />

          {/* Main Content Area */}
          <div className="flex flex-1 flex-col border-l border-border h-full">
            {/* Subject Header */}
            <div className="flex w-full items-center justify-between border-b border-[#020203] px-6 py-4">
              <h2 className="heading-h5-primary uppercase">
                {title}
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
                      <div className="flex items-start justify-between">
                        <div className="label-1 text-text font-medium">
                          Question_{currentIndex + 1}
                        </div>

                        <button className="flex justify-center py-xxs px-[8px] border border-border rounded-base" onClick={handleFlagQuestion}>
                          <FlagIcon />
                        </button>
                      </div>
                      <div className="body-1 text-text font-medium">
                        {currentQuestionDetail.questionText}
                      </div>

                      <div className="gap-sm flex flex-col items-stretch">
                        {currentQuestionDetail?.options?.map((option, index) => (
                          <AnswerOption
                            key={index}
                            answer={option}
                            letter={LETTERS[index]}
                            text={option}
                            selected={selected === option}
                            onClick={() => handleSelect(option)}
                          />
                        ))}
                        {console.log("QUESTION DETAIL", currentQuestionDetail)}

                      </div>
                    </div>

                    {/* Skip button right-aligned */}
                    <div className="mt-xl flex items-center justify-between">
                      <button
                        onClick={() => setCurrentIndex((i) => Math.max(0, i - 1))}
                        disabled={currentIndex === 0}
                        className="flex h-10 w-10 items-center justify-center rounded border border-black disabled:opacity-40 font-primary "
                      >
                        {"<"}
                      </button>

                      {!isLast && (
                        <button
                          onClick={handleSkip}
                          className="font-primary text-sm uppercase text-text border border-black p-xs rounded"
                        >
                          SKIP |&gt;
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Bottom row: progress bar + finish button */}
                  <div className="mt-8 flex w-full items-center gap-6 border-t border-gray-300 pt-6">
                    {/** 1- Progress bar */}
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


                    {/** 3- Submit button */}

                    <button
                      onClick={processAnswer}
                      disabled={!isLast && (isAlreadyAnswered || !selected)}
                      className={`label-1 bg-primary-500 px-md py-sm flex flex-shrink-0 items-center justify-center rounded-md border border-black font-bold tracking-wide text-white shadow-[2px_3px_4px_0_#000] ${!isAlreadyAnswered && selected
                        ? "bg-primary-300 text-black hover:bg-primary-400"
                        : "bg-gray-200 text-gray-500 cursor-not-allowed"}
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