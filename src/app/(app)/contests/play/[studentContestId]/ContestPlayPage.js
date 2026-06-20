"use client";

import { useEffect, useState } from "react";
import AnswerOption from "@/components/practice/AnswerOption";
import ContestQuestionList from "@/components/ui/ContestQuestionList";
import ReusableWindow from "@/components/ui/ReusableWindow";
import Timer from "@/components/ui/Timer";
import ProgressBar from "@/components/ui/ProgressBar";
import SystemLoading from "@/components/ui/SystemLoading";
import ContestLeaderboard from "@/components/ui/ContestLeaderboard";
import { useRouter } from "next/navigation";

const LETTERS = ["A)", "B)", "C)", "D)"];

// --- FAKE DATA ---
const FAKE_QUESTIONS = Array.from({ length: 10 }).map((_, i) => ({
  questionId: `q-${i + 1}`,
  questionText:
    i === 9
      ? "When a flashlight is turned on, which energy transfer happens first?"
      : `Fake Question ${i + 1}: What is the correct answer?`,
  options: {
    a: i === 9 ? "Light energy → electrical energy" : "Option A is wrong",
    b: i === 9 ? "Electrical energy → light energy" : "Option B is correct", // Let's assume B is always correct for testing
    c: i === 9 ? "Sound energy → light energy" : "Option C is wrong",
    d: i === 9 ? "Heat energy → electrical energy" : "Option D is wrong",
  },
  correctAnswer: "b",
}));

const INITIAL_LEADERBOARD = [
  { id: "u1", firstName: "HELENA", lastName: "", level: 20, avatarUrl: "/avatars/avatar1.png", score: 200 },
  { id: "u2", firstName: "TYMMYT", lastName: "", level: 20, avatarUrl: "/avatars/avatar2.png", score: 180 },
  { id: "u3", firstName: "FARAH", lastName: "", level: 20, avatarUrl: "/avatars/avatar3.png", score: 160 },
  { id: "u4", firstName: "MENNA", lastName: "", level: 20, avatarUrl: "/avatars/avatar4.png", score: 140 },
  { id: "u5", firstName: "SALMA", lastName: "", level: 20, avatarUrl: "/avatars/avatar5.png", score: 100 },
  { id: "you", firstName: "YOU", lastName: "", level: 8, avatarUrl: "/avatars/avatar6.png", score: 90 },
  { id: "u7", firstName: "ALI", lastName: "", level: 20, avatarUrl: "/avatars/avatar7.png", score: 80 },
  { id: "u8", firstName: "YZMN", lastName: "", level: 20, avatarUrl: "/avatars/avatar8.png", score: 60 },
  { id: "u9", firstName: "FRIENISTRASH", lastName: "", level: 20, avatarUrl: "/avatars/avatar9.png", score: 40 },
];

export default function ContestPlayPage({ studentContestId }) {
  const router = useRouter();

  const [currentIndex, setCurrentIndex] = useState(0);
  const [selected, setSelected] = useState(null);
  const [timeLeft, setTimeLeft] = useState(600); // 00:29 basically
  const [finished, setFinished] = useState(false);

  const [leaderboard, setLeaderboard] = useState(INITIAL_LEADERBOARD);
  const [scoreAnimationAmount, setScoreAnimationAmount] = useState(0);
  const [scoreAnimationUserId, setScoreAnimationUserId] = useState(null);

  const isLast = currentIndex === FAKE_QUESTIONS.length - 1;
  const currentQuestion = FAKE_QUESTIONS[currentIndex];
  const options = Object.values(currentQuestion.options);
  const optionKeys = ["a", "b", "c", "d"];

  // Timer logic
  useEffect(() => {
    if (finished) return;
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
  }, [finished]);

  // If finished, navigate to summary (since we use fake data, we can just push to a fake route or just show a message)
  useEffect(() => {
    if (finished) {
      router.push(`/contests/summary/${studentContestId}`);
    }
  }, [finished, router, studentContestId]);

  const handleSelect = (letter) => {
    setSelected(letter);
  };

  const processAnswer = () => {
    // Check if correct
    if (selected === currentQuestion.correctAnswer) {
      // Add 20 points to YOU
      const points = 20;
      setLeaderboard((prev) =>
        prev.map((user) =>
          user.id === "you" ? { ...user, score: user.score + points } : user
        )
      );

      // Trigger animation
      setScoreAnimationUserId("you");
      setScoreAnimationAmount(points);

      // Reset animation after 2s
      setTimeout(() => {
        setScoreAnimationAmount(0);
        setScoreAnimationUserId(null);
      }, 2000);
    }

    if (isLast) {
      // Delay finishing by 1.5s so the user can see the score animation if they got it right
      setTimeout(() => {
        setFinished(true);
      }, 1500);
    } else {
      setCurrentIndex((i) => i + 1);
      setSelected(null);
    }
  };

  const handleSkip = () => {
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
        scoreAnimationAmount={scoreAnimationAmount}
        scoreAnimationUserId={scoreAnimationUserId}
      />

      {/* RIGHT: CONTEST CHALLENGE WINDOW */}
      <ReusableWindow
        title="CONTESTS_CHALLENGES/CONTEST/SCIENCE FAIR PREP.SYS"
        className="m-auto flex w-[1384px] max-w-full flex-col"
      >
        <div className="flex flex-1 self-stretch">
          {/* Sidebar */}
          <ContestQuestionList questions={FAKE_QUESTIONS} currentIndex={currentIndex} />

          {/* Main Content Area */}
          <div className="flex flex-1 flex-col border-l border-border">
            {/* Subject Header */}
            <div className="flex w-full items-center justify-between border-b border-[#020203] px-6 py-4">
              <h2 className="heading-h5-primary uppercase">
                Science Fair Prep
              </h2>
              <Timer seconds={timeLeft} />
            </div>

            {/* Question + Options Area */}
            <div className="flex flex-1 flex-col p-8 overflow-y-auto">
              <div className="gap-4xl flex flex-col items-stretch">
                {/* Question + Options */}
                <div className="gap-base flex flex-1 flex-col">
                  <div className="label-1 text-text font-medium">
                    Question_{currentIndex + 1}
                  </div>
                  <div className="body-1 text-text font-medium">
                    {currentQuestion.questionText}
                  </div>

                  <div className="gap-sm flex flex-col items-stretch">
                    {options.map((opt, oi) => {
                      const currentLetter = optionKeys[oi];
                      return (
                        <AnswerOption
                          key={oi}
                          answer={currentLetter}
                          letter={LETTERS[oi]}
                          text={opt}
                          selected={selected === currentLetter}
                          onClick={() => handleSelect(currentLetter)}
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
                      {currentIndex + 1}/{FAKE_QUESTIONS.length}
                    </div>
                    <div className="flex-1">
                      <ProgressBar
                        progress={
                          isLast && selected !== null
                            ? 100
                            : (currentIndex / FAKE_QUESTIONS.length) * 100
                        }
                      />
                    </div>
                  </div>
                </div>

                <button
                  onClick={processAnswer}
                  disabled={!selected && !isLast} // optionally disable if nothing selected
                  className={`label-1 bg-primary-500 px-md py-sm flex flex-shrink-0 items-center justify-center rounded-md border border-black font-bold tracking-wide text-white shadow-[2px_3px_4px_0_#000] ${selected ? "bg-primary-300 text-black hover:bg-primary-400" : "bg-gray-200 text-gray-500 cursor-not-allowed"
                    }`}
                >
                  {isLast ? "FINISH" : "SUBMIT"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </ReusableWindow >
    </div >
  );
}
