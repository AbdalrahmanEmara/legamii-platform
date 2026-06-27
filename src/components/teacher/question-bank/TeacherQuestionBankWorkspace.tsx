"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import { Search } from "lucide-react";
import { useMemo, useState } from "react";
import ReusableWindow from "@/components/ui/ReusableWindow";
import { cn } from "@/lib/utils";
import TeacherQuestionCard from "@/components/teacher/question-bank/TeacherQuestionCard";
import {
  difficulties,
  grades,
  questions,
  scopeCounts,
  subjects,
  terms,
  type QuestionDifficulty,
  type QuestionScope,
  type QuestionSubject,
  type QuestionTerm,
} from "@/components/teacher/question-bank/questionBankData";

function FilterPill({
  label,
  active,
  onClick,
  className = "",
}: {
  label: string;
  active: boolean;
  onClick: () => void;
  className?: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={cn(
        "inline-flex h-8 items-center justify-center border px-sm font-primary text-[11px] uppercase transition-colors",
        active
          ? "border-neutral-950 bg-neutral-950 text-white"
          : "border-neutral-200 bg-neutral-100 text-neutral-700 hover:border-neutral-300 hover:text-text",
        className,
      )}
    >
      {label}
    </button>
  );
}

interface TeacherQuestionBankWorkspaceProps {
  overlay?: ReactNode;
  selectedQuestionId?: string;
  initialScope?: QuestionScope;
}

export default function TeacherQuestionBankWorkspace({
  overlay,
  selectedQuestionId,
  initialScope = "Custom Made",
}: TeacherQuestionBankWorkspaceProps) {
  const [scope, setScope] = useState<QuestionScope>(initialScope);
  const [subject, setSubject] = useState<QuestionSubject>("All");
  const [difficulty, setDifficulty] = useState<QuestionDifficulty>("All");
  const [grade, setGrade] = useState("All");
  const [term, setTerm] = useState<QuestionTerm>("All");
  const [search, setSearch] = useState("");

  const filteredQuestions = useMemo(() => {
    return questions.filter((question) => {
      const matchesScope = question.scope === scope;
      const matchesSubject = subject === "All" || question.subject === subject;
      const matchesDifficulty = difficulty === "All" || question.difficulty === difficulty;
      const matchesGrade = grade === "All" || String(question.grade) === grade;
      const matchesTerm = term === "All" || question.term === term;
      const matchesSearch =
        search.trim().length === 0 ||
        [question.title, question.topic, question.subject]
          .join(" ")
          .toLowerCase()
          .includes(search.trim().toLowerCase());

      return (
        matchesScope &&
        matchesSubject &&
        matchesDifficulty &&
        matchesGrade &&
        matchesTerm &&
        matchesSearch
      );
    });
  }, [difficulty, grade, scope, search, subject, term]);

  return (
    <div className="mx-auto max-w-[1240px]">
      <div className="relative">
        <ReusableWindow title="Q.BANK.SYS" className="overflow-hidden">
          <div className="space-y-base p-sm md:p-base">
            <div className="flex flex-col gap-sm border-b border-neutral-300 pb-base lg:flex-row lg:items-center lg:justify-between">
              <div className="space-y-xs2">
                <h1 className="font-primary text-[28px] leading-none uppercase text-text md:text-[32px]">
                  Question Bank
                </h1>
              </div>

              <Link
                href="/teacher/question-bank/add"
                className="inline-flex h-12 items-center justify-center self-start border border-text bg-primary-500 px-base font-primary text-[12px] uppercase text-neutral-950 shadow-[2px_3px_0_0_rgba(0,0,0,0.18)] transition-transform hover:-translate-y-0.5 lg:self-auto"
              >
                + Add Question
              </Link>
            </div>

            <div className="space-y-sm border-b border-neutral-300 pb-sm">
              <div className="flex flex-wrap gap-xs2">
                {(Object.keys(scopeCounts) as QuestionScope[]).map((option) => (
                  <button
                    key={option}
                    type="button"
                    onClick={() => setScope(option)}
                    className={cn(
                      "inline-flex h-8 items-center justify-center border px-sm font-primary text-[11px] uppercase transition-colors",
                      scope === option
                        ? "border-neutral-300 bg-white text-text"
                        : "border-neutral-200 bg-neutral-100 text-neutral-600 hover:border-neutral-300 hover:text-text",
                    )}
                  >
                    {option} {scopeCounts[option]}
                  </button>
                ))}
              </div>

              <div className="flex flex-col gap-sm xl:flex-row xl:items-center xl:justify-between">
                <div className="flex flex-wrap gap-xs2">
                  {subjects.map((option) => (
                    <FilterPill
                      key={option}
                      label={option}
                      active={subject === option}
                      onClick={() => setSubject(option)}
                    />
                  ))}
                </div>

                <div className="flex flex-wrap gap-xs2">
                  {difficulties.map((option) => (
                    <FilterPill
                      key={option}
                      label={option}
                      active={difficulty === option}
                      onClick={() => setDifficulty(option)}
                    />
                  ))}
                </div>
              </div>

              <div className="flex flex-col gap-sm xl:flex-row xl:items-center xl:justify-between">
                <div className="flex flex-wrap gap-xs2">
                  {grades.map((option) => (
                    <FilterPill
                      key={option}
                      label={option === "All" ? "All" : `Grade ${option}`}
                      active={grade === option}
                      onClick={() => setGrade(option)}
                    />
                  ))}
                </div>

                <div className="flex flex-col gap-sm sm:flex-row sm:items-center xl:min-w-[360px] xl:justify-end">
                  <div className="flex flex-wrap gap-xs2">
                    {terms.map((option) => (
                      <FilterPill
                        key={option}
                        label={option === "All" ? "Term" : option}
                        active={term === option}
                        onClick={() => setTerm(option)}
                        className={option === "All" ? "min-w-[68px]" : "min-w-10"}
                      />
                    ))}
                  </div>

                  <label className="relative block min-w-[220px] flex-1 xl:max-w-[240px]">
                    <span className="sr-only">Search questions</span>
                    <Search className="pointer-events-none absolute top-1/2 left-sm h-4 w-4 -translate-y-1/2 text-neutral-400" />
                    <input
                      value={search}
                      onChange={(event) => setSearch(event.target.value)}
                      placeholder="Search Qestion, Tag..."
                      className="h-8 w-full border border-neutral-300 bg-white pr-sm pl-10 font-secondary text-[11px] text-text outline-none transition-colors placeholder:text-neutral-400 focus:border-primary-300"
                    />
                  </label>
                </div>
              </div>
            </div>

            <div className="max-h-[560px] space-y-sm overflow-y-auto pr-1 [scrollbar-color:#d4d4d4_transparent] [scrollbar-width:thin]">
              {filteredQuestions.length > 0 ? (
                filteredQuestions.map((question) => (
                  <TeacherQuestionCard
                    key={question.id}
                    question={question}
                    selected={selectedQuestionId === question.id}
                  />
                ))
              ) : (
                <div className="rounded-lg border border-dashed border-neutral-300 bg-neutral-50 px-base py-xl text-center">
                  <p className="font-primary text-[11px] uppercase text-text">No questions found</p>
                  <p className="mt-xs2 font-secondary text-sm text-neutral-600">
                    Try another filter combination or create a new question.
                  </p>
                </div>
              )}
            </div>
          </div>
        </ReusableWindow>

        {overlay}
      </div>

      <div className="mt-base flex justify-center">
        <div className="flex items-center gap-base rounded-2xl bg-neutral-900 px-base py-sm text-white shadow-[0_12px_24px_rgba(0,0,0,0.22)]">
          <button type="button" className="font-secondary text-base text-neutral-300">
            ‹
          </button>
          <span className="font-secondary text-sm font-medium">61 / 123</span>
          <button type="button" className="font-secondary text-base text-neutral-300">
            ›
          </button>
        </div>
      </div>
    </div>
  );
}
