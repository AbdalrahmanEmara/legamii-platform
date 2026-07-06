"use client";

import { useEffect, useState, useCallback } from "react";
import { useContestSocket } from "@/app/(app)/hooks/useContestSocket";
import AnswerOption from "@/components/practice/AnswerOption";
import ContestQuestionList from "@/components/ui/ContestQuestionList";
import ReusableWindow from "@/components/ui/ReusableWindow";
import Timer from "@/components/ui/Timer";
import ProgressBar from "@/components/ui/ProgressBar";
import SystemLoading from "@/components/ui/SystemLoading";
import ContestLeaderboard from "@/components/ui/ContestLeaderboard";
import { useRouter } from "next/navigation";
import { getContestQuestionAction, submitContestAnswerAction, finishContestAction } from "@/lib/actions/student_contest.action";
import { X } from "lucide-react";
import toast from "react-hot-toast";
import { getSessionAction } from "@/lib/actions/auth.actions";

const LETTERS = ["A)", "B)", "C)", "D)"];
// const optionKeys = ["a", "b", "c", "d"];

export default function ContestPlayPage({ studentContestId, contestId, initialQuestionsMetadata, initialLeaderboard }) {
  const router = useRouter();

  const [currentIndex, setCurrentIndex] = useState(0);
  const [selected, setSelected] = useState(null);
  const [timeLeft, setTimeLeft] = useState(600);
  const [finished, setFinished] = useState(false);

  const [leaderboard, setLeaderboard] = useState(initialLeaderboard);
  const [questionsMetadata] = useState(initialQuestionsMetadata);

  const [token, setToken] = useState(null);
  const [currentUserId, setCurrentUserId] = useState("you");
  const [clarifications, setClarifications] = useState([]);
  const [finishReason, setFinishReason] = useState(null);

  const [currentQuestionDetail, setCurrentQuestionDetail] = useState(null);
  const [isLoadingQuestion, setIsLoadingQuestion] = useState(true);

  // Fetch session token
  useEffect(() => {
    const fetchToken = async () => {
      const res = await getSessionAction();
      if (!res.success) return;
      setToken(res.token);
      if (res.user?.id) setCurrentUserId(res.user.id);
    };
    fetchToken();
  }, []);

  const isLast = currentIndex === questionsMetadata.length - 1;

  // Real-time socket connection
  useContestSocket({
    token,
    contestId,
    studentContestId,
    onJoined: (data) => {
      if (data.remainingSeconds) setTimeLeft(data.remainingSeconds);
    },
    onStarted: (data) => {
      const remaining = Math.floor((new Date(data.endsAt).getTime() - Date.now()) / 1000);
      if (remaining > 0) setTimeLeft(remaining);
    },
    onLeaderboard: (data) => setLeaderboard(data.leaderboard),
    onClarification: (data) => setClarifications((prev) => [...prev, data]),
    onFinished: (data) => {
      setFinishReason(data.reason);
      setFinished(true);
    },
    onError: (msg) => console.error("Socket error:", msg),
  });

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
    if (!finished) return;

    const isTimeExpired = finishReason === "TIME_EXPIRED";
    toast.success(
      isTimeExpired ? "Time expired!" : "Contest Finished!",
      { duration: 3000 }
    );

    const finishContest = async () => {
      try {
        await finishContestAction(studentContestId);
        await new Promise((r) => setTimeout(r, 1500));
        router.push(
          `/student/contests/detailed-summary/${studentContestId}`
        );
      } catch (error) {
        console.error("Error finishing contest:", error);
      }
    };

    finishContest();
  }, [finished, finishReason, studentContestId, router]);



  const handleSelect = (answerText) => {
    setSelected(answerText);
  };

  const processAnswer = async () => {
    if (!selected && !isLast) return;

    if (selected && currentQuestionDetail) {
      // console.log({
      //   studentContestId,
      //   questionId: currentQuestionDetail.questionId,
      //   answer: selected,
      // });
      // console.log("currentQuestionDetail",currentQuestionDetail);
      console.log("=== SUBMIT ===");
      console.log("studentContestId:", studentContestId);
      console.log("questionId:", currentQuestionDetail.questionId);
      await submitContestAnswerAction(
        studentContestId,
        currentQuestionDetail.questionId,
        {
          answer: selected,
        }
      );
      console.log("currentQuestionDetail", currentQuestionDetail);
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
        currentUserId={currentUserId}
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

            {/* Clarification banner */}
            {clarifications.length > 0 && (
              <div className="flex flex-col">
                {clarifications.map((c) => (
                  <div
                    key={c.id}
                    className="flex items-center gap-3 bg-yellow-100 border-b border-yellow-300 px-6 py-3 text-sm"
                  >
                    <span className="font-bold shrink-0">📢</span>
                    <span className="flex-1">{c.message}</span>
                    <button
                      onClick={() =>
                        setClarifications((prev) =>
                          prev.filter((item) => item.id !== c.id)
                        )
                      }
                    >
                      <X size={16} />
                    </button>
                  </div>
                ))}
              </div>
            )}

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
                      </div>
                    </div>

                    {/* Skip button right-aligned */}
                    <div className="mt-xl flex items-center justify-between">
                      <button
                        onClick={() =>
                          setCurrentIndex((i) =>
                            Math.max(0, i - 1)
                          )
                        }
                        disabled={currentIndex === 0}
                      >
                        {"<"}
                      </button>

                      <button
                        onClick={handleSkip}
                      >
                        SKIP  |&gt;
                      </button>
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

                    {/** 2- rank up */}
                    <div className="w-[180px] flex justify-center">
                      {/* score animation */}
                    </div>

                    {/** 3- Submit button */}

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