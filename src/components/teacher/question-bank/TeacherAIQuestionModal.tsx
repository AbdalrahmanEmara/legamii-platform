"use client";

import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import ReusableWindow from "@/components/ui/ReusableWindow";
import { cn } from "@/lib/utils";
import { aiGenerateQuestionAction } from "@/lib/actions/qbank.actions";
import SystemValidation from "@/components/ui/SystemValidation";

interface TeacherAIQuestionModalProps {
  subjects?: any[];
  grades?: any[];
}

const editableDifficulties = ["easy", "medium", "hard"];
const answerLetters = ["A", "B", "C", "D"] as const;

export default function TeacherAIQuestionModal({
  subjects = [],
  grades = [],
}: TeacherAIQuestionModalProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const [gradeId, setGradeId] = useState(grades?.[0]?.id ?? "");
  const [subjectId, setSubjectId] = useState(subjects?.[0]?.id ?? "");
  const [term, setTerm] = useState<"1" | "2">("1");
  const [lesson, setLesson] = useState("");
  const [difficulty, setDifficulty] = useState("medium");
  const [validationError, setValidationError] = useState("");
  const [generatedQuestion, setGeneratedQuestion] = useState<any>(null);

  const handleGenerate = () => {
    if (!gradeId || !subjectId) {
      setValidationError("Please select a grade and subject.");
      return;
    }
    if (!lesson.trim()) {
      setValidationError("Please enter a lesson / topic.");
      return;
    }

    startTransition(async () => {
      const payload = {
        subject_id: subjectId,
        grade_id: gradeId,
        term: String(term),
        lesson: lesson.trim(),
        difficulty,
      };
      try {
        console.log("Payload : ", payload)
        const res = await aiGenerateQuestionAction(payload);
        console.log("res : ", res)
        if (res?.question) {
          setGeneratedQuestion(res.question);
        } else {
          setValidationError("AI generation failed. Please try again.");
        }
      } catch (err) {
        console.error("Failed to generate question with AI", err);
        setValidationError("An error occurred during generation. Please try again.");
      }
    });
  };

  const handleDone = () => {
    router.push("/teacher/question-bank");
  };

  const handleRegenerate = () => {
    setGeneratedQuestion(null);
  };

  return (
    <div className="pointer-events-none absolute inset-0 z-20 flex items-start justify-center px-base py-md md:px-xl">
      <ReusableWindow
        title="AI_GENERATE.SYS"
        className="pointer-events-auto mt-xl max-h-[calc(100vh-160px)] w-full max-w-[760px] overflow-hidden"
      >
        <div className="space-y-sm bg-el-bg p-sm md:p-base">

          {/* AI badge */}
          <div className="flex items-center gap-xs2 border border-primary-300 bg-primary-50 px-sm py-xs2">
            <span className="inline-flex h-5 items-center justify-center bg-primary-500 px-xs2 font-primary text-[9px] uppercase text-neutral-950">
              AI
            </span>
            <p className="font-secondary text-xs text-neutral-700">
              Provide context below and the AI will generate a complete question with answer choices.
            </p>
          </div>

          {generatedQuestion ? (
            /* ── Generated question preview ── */
            <div className="space-y-sm">
              <div className="space-y-xxs">
                <label className="font-primary text-[11px] uppercase text-text">
                  Generated Question
                </label>
                <div className="min-h-[92px] w-full border border-primary-300 bg-white px-sm py-sm font-secondary text-sm text-text">
                  {generatedQuestion.question_text}
                </div>
              </div>

              <div className="space-y-xs2">
                <label className="font-primary text-[11px] uppercase text-text">
                  Answer Choices
                </label>
                <div className="space-y-xs2">
                  {(generatedQuestion.options ?? []).map((opt: string, index: number) => {
                    const isCorrect = opt === generatedQuestion.correct_answer;
                    return (
                      <div
                        key={answerLetters[index] ?? index}
                        className="grid grid-cols-[auto_auto_1fr] items-center gap-xs2"
                      >
                        {/* correct indicator (read-only) */}
                        <span
                          className={cn(
                            "h-4 w-4 rounded-full border",
                            isCorrect
                              ? "border-green-600 bg-green-500 shadow-[inset_0_0_0_2px_white]"
                              : "border-neutral-300 bg-white",
                          )}
                        />
                        <span className="font-primary text-[12px] uppercase text-neutral-700">
                          {answerLetters[index] ?? index + 1}
                        </span>
                        <div
                          className={cn(
                            "h-10 w-full border px-sm font-secondary text-sm text-text flex items-center",
                            isCorrect
                              ? "border-green-300 bg-green-50 text-green-800"
                              : "border-neutral-300 bg-white",
                          )}
                        >
                          {opt}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="flex flex-wrap items-center justify-between gap-sm pt-xs2">
                <button
                  type="button"
                  onClick={handleRegenerate}
                  disabled={isPending}
                  className="inline-flex min-w-[128px] items-center justify-center gap-xs2 border border-neutral-400 bg-white px-base py-xs font-primary text-[11px] uppercase text-neutral-700 shadow-[2px_3px_0_0_rgba(0,0,0,0.08)] disabled:opacity-50"
                >
                  ↻ Regenerate
                </button>

                <div className="flex flex-wrap gap-xs2">
                  <button
                    type="button"
                    onClick={() => router.push("/teacher/question-bank")}
                    className="inline-flex min-w-[128px] items-center justify-center border border-neutral-400 bg-white px-base py-xs font-primary text-[11px] uppercase text-neutral-700 shadow-[2px_3px_0_0_rgba(0,0,0,0.08)]"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={handleDone}
                    className="inline-flex min-w-[128px] items-center justify-center border border-text bg-primary-500 px-base py-xs font-primary text-[11px] uppercase text-neutral-950 shadow-[2px_3px_0_0_rgba(0,0,0,0.18)]"
                  >
                    Done
                  </button>
                </div>
              </div>
            </div>
          ) : (
            /* ── Input form ── */
            <>
              {/* Grade + Term row */}
              <div className="grid gap-sm md:grid-cols-[1fr_auto] md:items-end">
                <div className="space-y-xxs">
                  <label className="font-primary text-[11px] uppercase text-text">Grade</label>
                  <select
                    value={gradeId}
                    onChange={(e) => setGradeId(e.target.value)}
                    className="h-11 w-full rounded-none border border-neutral-300 bg-white px-sm font-secondary text-sm text-text outline-none focus:border-primary-300"
                  >
                    {grades.map((g) => (
                      <option key={g.id} value={g.id}>
                        {g.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="flex items-center gap-xs2">
                  <span className="inline-flex h-7 items-center justify-center bg-neutral-950 px-sm font-primary text-[11px] uppercase text-white">
                    Term
                  </span>
                  {(["1", "2"] as const).map((option) => (
                    <button
                      key={option}
                      type="button"
                      onClick={() => setTerm(option)}
                      className={cn(
                        "inline-flex h-7 min-w-8 items-center justify-center border px-xs2 font-primary text-[11px] uppercase transition-colors",
                        term === option
                          ? "border-neutral-950 bg-white text-text"
                          : "border-neutral-200 bg-neutral-100 text-neutral-600",
                      )}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </div>

              {/* Subject */}
              <div className="space-y-xxs">
                <label className="font-primary text-[11px] uppercase text-text">Subject</label>
                <select
                  value={subjectId}
                  onChange={(e) => setSubjectId(e.target.value)}
                  className="h-11 w-full rounded-none border border-neutral-300 bg-white px-sm font-secondary text-sm text-text outline-none focus:border-primary-300"
                >
                  {subjects.map((s) => (
                    <option key={s.id} value={s.id}>
                      {s.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Lesson / Topic */}
              <div className="space-y-xxs">
                <label className="font-primary text-[11px] uppercase text-text">
                  Lesson / Topic
                </label>
                <input
                  value={lesson}
                  onChange={(e) => setLesson(e.target.value)}
                  placeholder="e.g. Quadratic Equations, Photosynthesis…"
                  className="h-11 w-full rounded-none border border-neutral-300 bg-white px-sm font-secondary text-sm text-text outline-none transition-colors placeholder:text-neutral-400 focus:border-primary-300"
                />
              </div>

              {/* Difficulty */}
              <div className="space-y-xs2">
                <label className="font-primary text-[11px] uppercase text-text">Difficulty</label>
                <div className="grid grid-cols-3 overflow-hidden border border-neutral-200 bg-neutral-50 text-center">
                  {editableDifficulties.map((option) => (
                    <button
                      key={option}
                      type="button"
                      onClick={() => setDifficulty(option)}
                      className={cn(
                        "px-sm py-xs font-primary text-[11px] uppercase transition-colors",
                        option === "easy" && difficulty === option && "bg-green-50 text-green-700",
                        option === "medium" && difficulty === option && "bg-yellow-50 text-yellow-700",
                        option === "hard" && difficulty === option && "bg-red-100 text-red-600",
                        difficulty !== option && "bg-white text-neutral-500",
                      )}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-wrap items-center justify-end gap-xs2 pt-xs2">
                <button
                  type="button"
                  onClick={() => router.push("/teacher/question-bank")}
                  className="inline-flex min-w-[128px] items-center justify-center border border-neutral-400 bg-white px-base py-xs font-primary text-[11px] uppercase text-neutral-700 shadow-[2px_3px_0_0_rgba(0,0,0,0.08)] disabled:opacity-50"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleGenerate}
                  disabled={isPending}
                  className="inline-flex min-w-[128px] items-center justify-center gap-xs2 border border-text bg-primary-500 px-base py-xs font-primary text-[11px] uppercase text-neutral-950 shadow-[2px_3px_0_0_rgba(0,0,0,0.18)] disabled:opacity-50"
                >
                  {isPending ? (
                    <>
                      <span className="animate-spin">⟳</span>
                      Generating…
                    </>
                  ) : (
                    "Generate"
                  )}
                </button>
              </div>
            </>
          )}

          {validationError && (
            <SystemValidation
              message={validationError}
              onClose={() => setValidationError("")}
            />
          )}
        </div>
      </ReusableWindow>
    </div>
  );
}
