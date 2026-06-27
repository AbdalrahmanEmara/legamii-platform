"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import ReusableWindow from "@/components/ui/ReusableWindow";
import { cn } from "@/lib/utils";
import {
  editableDifficulties,
  editableSubjects,
  type QuestionItem,
} from "@/components/teacher/question-bank/questionBankData";

interface TeacherQuestionEditorModalProps {
  mode: "add" | "edit";
  question?: QuestionItem;
}

const answerLetters = ["A", "B", "C", "D"] as const;

export default function TeacherQuestionEditorModal({
  mode,
  question,
}: TeacherQuestionEditorModalProps) {
  const [questionText, setQuestionText] = useState(question?.title ?? "");
  const [grade, setGrade] = useState(String(question?.grade ?? 8));
  const [term, setTerm] = useState<"1" | "2">(question?.term ?? "1");
  const [subject, setSubject] = useState(question?.subject ?? "Math");
  const [topic, setTopic] = useState(question?.topic ?? "Quadratic Equations");
  const [difficulty, setDifficulty] = useState(question?.difficulty ?? "Medium");
  const [correctAnswerIndex, setCorrectAnswerIndex] = useState(question?.correctAnswerIndex ?? 0);
  const [answers, setAnswers] = useState(
    question?.answers ?? ["", "", "", ""],
  );

  const skillTags = useMemo(() => {
    return [
      "Quadratic Equations",
      "Calculus",
      "Chemistry",
      "Algebra",
      "Climate",
      "Ancient Civilizations",
      "Literary Devices",
    ];
  }, []);

  const title = mode === "edit" ? "EDIT_QUESTION.SYS" : "ADD_QUESTION.SYS";
  const primaryLabel = mode === "edit" ? "Save" : "Create";

  return (
    <div className="pointer-events-none absolute inset-0 z-20 flex items-start justify-center px-base py-md md:px-xl">
      <ReusableWindow
        title={title}
        className="pointer-events-auto mt-xl max-h-[calc(100vh-160px)] w-full max-w-[760px] overflow-hidden"
      >
        <div className="space-y-sm bg-el-bg p-sm md:p-base">
          <div className="space-y-xxs">
            <label className="font-primary text-[11px] uppercase text-text">Question Text</label>
            <textarea
              value={questionText}
              onChange={(event) => setQuestionText(event.target.value)}
              placeholder="Write the question here"
              className="min-h-[92px] w-full resize-none rounded-none border border-neutral-300 bg-white px-sm py-sm font-secondary text-sm text-text outline-none transition-colors placeholder:text-neutral-400 focus:border-primary-300"
            />
          </div>

          <div className="grid gap-sm md:grid-cols-[1fr_auto] md:items-end">
            <div className="space-y-xxs">
              <label className="font-primary text-[11px] uppercase text-text">Grade</label>
              <select
                value={grade}
                onChange={(event) => setGrade(event.target.value)}
                className="h-11 w-full rounded-none border border-neutral-300 bg-white px-sm font-secondary text-sm text-text outline-none focus:border-primary-300"
              >
                {[4, 5, 6, 7, 8, 9, 10, 11, 12].map((value) => (
                  <option key={value} value={value}>
                    Grade {value}
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

          <div className="grid gap-sm md:grid-cols-2">
            <div className="space-y-xxs">
              <label className="font-primary text-[11px] uppercase text-text">Subject</label>
              <select
                value={subject}
                onChange={(event) => setSubject(event.target.value as typeof subject)}
                className="h-11 w-full rounded-none border border-neutral-300 bg-white px-sm font-secondary text-sm text-text outline-none focus:border-primary-300"
              >
                {editableSubjects.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-xxs">
              <label className="font-primary text-[11px] uppercase text-text">Skill Tag</label>
              <select
                value={topic}
                onChange={(event) => setTopic(event.target.value)}
                className="h-11 w-full rounded-none border border-neutral-300 bg-white px-sm font-secondary text-sm text-text outline-none focus:border-primary-300"
              >
                {skillTags.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>
          </div>

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
                    option === "Easy" && difficulty === option && "bg-green-50 text-green-700",
                    option === "Medium" && difficulty === option && "bg-yellow-50 text-yellow-700",
                    option === "Hard" && difficulty === option && "bg-red-100 text-red-600",
                    difficulty !== option && "bg-white text-neutral-500",
                  )}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-xs2">
            <label className="font-primary text-[11px] uppercase text-text">Answer Choices</label>
            <div className="space-y-xs2">
              {answers.map((answer, index) => (
                <div key={answerLetters[index]} className="grid grid-cols-[auto_auto_1fr] items-center gap-xs2">
                  <button
                    type="button"
                    onClick={() => setCorrectAnswerIndex(index)}
                    aria-label={`Mark answer ${answerLetters[index]} as correct`}
                    className={cn(
                      "h-4 w-4 rounded-full border transition-colors",
                      correctAnswerIndex === index
                        ? "border-green-600 bg-green-500 shadow-[inset_0_0_0_2px_white]"
                        : "border-neutral-400 bg-white",
                    )}
                  />
                  <span className="font-primary text-[12px] uppercase text-neutral-700">
                    {answerLetters[index]}
                  </span>
                  <input
                    value={answer}
                    onChange={(event) => {
                      setAnswers((currentAnswers) =>
                        currentAnswers.map((currentAnswer, currentIndex) =>
                          currentIndex === index ? event.target.value : currentAnswer,
                        ),
                      );
                    }}
                    placeholder={`Answer ${answerLetters[index]}`}
                    className="h-10 w-full rounded-none border border-neutral-300 bg-white px-sm font-secondary text-sm text-text outline-none transition-colors placeholder:text-neutral-400 focus:border-primary-300"
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-sm pt-xs2">
            {mode === "edit" ? (
              <button
                type="button"
                className="inline-flex min-w-[128px] items-center justify-center border border-red-300 bg-white px-base py-xs font-primary text-[11px] uppercase text-red-500 shadow-[2px_3px_0_0_rgba(255,0,85,0.08)]"
              >
                Delete
              </button>
            ) : (
              <div />
            )}

            <div className="flex flex-wrap gap-xs2">
              <Link
                href="/teacher/question-bank"
                className="inline-flex min-w-[128px] items-center justify-center border border-neutral-400 bg-white px-base py-xs font-primary text-[11px] uppercase text-neutral-700 shadow-[2px_3px_0_0_rgba(0,0,0,0.08)]"
              >
                Cancel
              </Link>
              <button
                type="button"
                className="inline-flex min-w-[128px] items-center justify-center border border-text bg-primary-500 px-base py-xs font-primary text-[11px] uppercase text-neutral-950 shadow-[2px_3px_0_0_rgba(0,0,0,0.18)]"
              >
                {primaryLabel}
              </button>
            </div>
          </div>
        </div>
      </ReusableWindow>
    </div>
  );
}
