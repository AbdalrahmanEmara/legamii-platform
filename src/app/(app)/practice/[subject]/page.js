"use client";

import AnswerOption from "@/components/practice/AnswerOption";
import QuestionList from "@/components/ui/QuestionList";
import ReusableWindow from "@/components/ui/ReusableWindow";
import Timer from "@/components/ui/Timer";
import SummaryPage from "@/components/practice/SummaryPage";
import ProgressBar from "@/components/ui/ProgressBar";
import { useEffect, useState } from "react";

/**Data */
const QUESTIONS = [
  {
    id: 1,
    text: "What is the powerhouse of the cell?",
    options: ["Nucleus", "Mitochondria", "Ribosome", "Golgi apparatus"],
    correct: 1,
    difficulty: "EASY",
    tags: ["Biology", "Cell Science"],
    tip: "Mitochondria produce ATP through cellular respiration — the cell's main energy currency.",
  },
  {
    id: 2,
    text: "What force keeps planets in orbit around the Sun?",
    options: ["Magnetism", "Nuclear force", "Gravity", "Friction"],
    correct: 2,
    difficulty: "EASY",
    tags: ["Physics", "Astronomy"],
    tip: "Gravity is a fundamental force — Isaac Newton described it as an attraction between masses.",
  },
  {
    id: 3,
    text: "What is the chemical symbol for water?",
    options: ["WA", "HO", "H₂O", "O₂H"],
    correct: 2,
    difficulty: "EASY",
    tags: ["Chemistry"],
    tip: "Water = 2 Hydrogen atoms + 1 Oxygen atom, written H₂O.",
  },
  {
    id: 4,
    text: "How many bones are in the adult human body?",
    options: ["196", "206", "216", "226"],
    correct: 1,
    difficulty: "INTERMEDIATE",
    tags: ["Biology", "Anatomy"],
    tip: "Babies have ~270 bones; many fuse together as we grow, leaving adults with 206.",
  },
  {
    id: 5,
    text: "What gas do plants absorb during photosynthesis?",
    options: ["Oxygen", "Nitrogen", "Carbon Dioxide", "Hydrogen"],
    correct: 2,
    difficulty: "EASY",
    tags: ["Biology", "Scientific Skills"],
    tip: "Plants take in CO₂ and release O₂ — the opposite of what animals do when breathing.",
  },
  {
    id: 6,
    text: "What is the speed of light (approx.) in a vacuum?",
    options: ["300,000 km/s", "150,000 km/s", "30,000 km/s", "3,000 km/s"],
    correct: 0,
    difficulty: "INTERMEDIATE",
    tags: ["Physics"],
    tip: "Light travels at ~3×10⁸ m/s — fast enough to circle Earth 7 times in one second.",
  },
  {
    id: 7,
    text: "Which planet is known as the Red Planet?",
    options: ["Venus", "Jupiter", "Saturn", "Mars"],
    correct: 3,
    difficulty: "EASY",
    tags: ["Astronomy"],
    tip: "Mars gets its red colour from iron oxide (rust) on its surface.",
  },
  {
    id: 8,
    text: "What is the atomic number of Carbon?",
    options: ["4", "6", "8", "12"],
    correct: 1,
    difficulty: "INTERMEDIATE",
    tags: ["Chemistry"],
    tip: "Atomic number = number of protons. Carbon has 6 protons, so its atomic number is 6.",
  },
  {
    id: 9,
    text: "What type of wave is sound?",
    options: ["Transverse", "Electromagnetic", "Longitudinal", "Surface"],
    correct: 2,
    difficulty: "HARD",
    tags: ["Physics", "Scientific Skills"],
    tip: "Sound compresses and rarefies particles in the direction it travels — that's longitudinal.",
  },
  {
    id: 10,
    text: "When a flashlight is turned on, which energy transfer happens first?",
    options: [
      "Light energy → electrical energy",
      "Electrical energy → light energy",
      "Sound energy → light energy",
      "Heat energy → electrical energy",
    ],
    correct: 1,
    difficulty: "HARD",
    tags: ["Physics", "Scientific Skills"],
    tip: "When you turn on a flashlight, electrical energy from the battery starts moving where it is converted into light energy.",
  },
];

const QUIZ_DURATION = 90;
const LETTERS = ["A)", "B)", "C)", "D)"];

function PracticePage() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [timeLeft, setTimeLeft] = useState(QUIZ_DURATION);
  const [finished, setFinished] = useState(false);

  // ✅ Derived — no useState or useEffect needed
  const selected = answers[currentIndex];
  const timeTaken = QUIZ_DURATION - timeLeft;
  const isLast = currentIndex === QUESTIONS.length - 1;
  const answeredCount = Object.keys(answers).length;
  const q = QUESTIONS[currentIndex];

  // ✅ Timer — setFinished inside the setter callback, not the effect body
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

  const handleSelect = (oi) => {
    setAnswers((prev) => ({ ...prev, [currentIndex]: oi }));
  };

  const handleNext = () => {
    if (isLast) {
      setFinished(true);
    } else {
      setCurrentIndex((i) => i + 1);
    }
  };

  const handleBack = () => {
    if (currentIndex > 0) setCurrentIndex((i) => i - 1);
  };

  const handleSkip = () => {
    if (!isLast) setCurrentIndex((i) => i + 1);
  };

  if (finished) {
    return <SummaryPage questions={QUESTIONS} answers={answers} timeTaken={timeTaken} />;
  }

  return (
    <div>
      <ReusableWindow title="AI_TUTOR.SYS" className="m-auto flex w-[1384px] max-w-full flex-col">
        <div className="flex flex-1 self-stretch">
          {/* Left Sidebar */}
          <QuestionList questions={QUESTIONS} currentIndex={currentIndex} answers={answers} />

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
                  <div className="body-1 text-text font-medium">{q.text}</div>
                  <div className="gap-sm flex flex-col items-stretch">
                    {q.options.map((opt, oi) => (
                      <AnswerOption
                        key={oi}
                        letter={LETTERS[oi]}
                        text={opt}
                        selected={selected === oi}
                        onClick={() => handleSelect(oi)}
                      />
                    ))}
                  </div>
                </div>

                {/* Navigation row: back + skip */}
                <div className="mt-xl flex items-center justify-between">
                  <button
                    onClick={handleBack}
                    disabled={currentIndex === 0}
                    className={`border-border px-sm py-xs2 label-1 flex items-center justify-center rounded-md border font-medium transition-all ${
                      currentIndex === 0
                        ? "cursor-not-allowed border-gray-200 text-gray-300"
                        : "hover:border-primary-200 cursor-pointer border-gray-300 bg-white text-gray-600 shadow-[2px_2px_0_#e5e7eb]"
                    }`}
                  >
                    {"<"}
                  </button>

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
                      isLast && selected !== undefined
                        ? 100
                        : (currentIndex / QUESTIONS.length) * 100
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
