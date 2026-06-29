"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import { Search } from "lucide-react";
import { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import ReusableWindow from "@/components/ui/ReusableWindow";
import { cn } from "@/lib/utils";
import TeacherQuestionCard from "@/components/teacher/question-bank/TeacherQuestionCard";
import CustomScroll from "@/components/ui/CustomScroll";

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
  initialQuestions?: any[];
  total?: number;
  customTotal?: number;
  publicTotal?: number;
  subjects?: any[];
  grades?: any[];
  searchParams?: Record<string, string>;
}

export default function TeacherQuestionBankWorkspace({
  overlay,
  selectedQuestionId,
  initialQuestions = [],
  total = 0,
  customTotal = 0,
  publicTotal = 0,
  subjects = [],
  grades = [],
  searchParams = {},
}: TeacherQuestionBankWorkspaceProps) {
  const router = useRouter();
  const pathname = usePathname();

  // Local state for search input to allow typing without immediate navigation
  const [searchInput, setSearchInput] = useState(searchParams.search || "");

  // Debounce search input
  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchInput !== (searchParams.search || "")) {
        handleFilterChange("search", searchInput);
      }
    }, 500);
    return () => clearTimeout(timer);
  }, [searchInput]);

  const createQueryString = (name: string, value: string) => {
    const params = new URLSearchParams(searchParams);
    if (value === "All" || !value) {
      params.delete(name);
    } else {
      params.set(name, value);
    }
    // reset page to 1 when filters change
    if (name !== "page") {
      params.set("page", "1");
    }
    return params.toString();
  };

  const handleFilterChange = (name: string, value: string) => {
    router.push(`${pathname}?${createQueryString(name, value)}`);
  };

  const scope = searchParams.scope || "Custom Made";
  const subjectId = searchParams.subject_id || "All";
  const difficulty = searchParams.difficulty || "All";
  const gradeId = searchParams.grade_id || "All";
  const term = searchParams.term || "All";
  const page = parseInt(searchParams.page || "1", 10);
  const limit = parseInt(searchParams.limit || "20", 10);

  // Constants
  const scopes = ["Custom Made", "Public Questions"];
  const scopeCounts: Record<string, number> = {
    "Custom Made": customTotal,
    "Public Questions": publicTotal
  };

  const difficulties = ["All", "easy", "medium", "hard", "extra_hard"];
  const difficultyLabels: Record<string, string> = {
    All: "All",
    easy: "Easy",
    medium: "Medium",
    hard: "Hard",
    extra_hard: "Extra Hard",
  };
  const terms = ["All", "1", "2"];

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
                {scopes.map((option) => (
                  <button
                    key={option}
                    type="button"
                    onClick={() => handleFilterChange("scope", option)}
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
                  <FilterPill
                    label="All Subjects"
                    active={subjectId === "All"}
                    onClick={() => handleFilterChange("subject_id", "All")}
                  />
                  {subjects.map((option) => (
                    <FilterPill
                      key={option.id}
                      label={option.name}
                      active={subjectId === option.id}
                      onClick={() => handleFilterChange("subject_id", option.id)}
                    />
                  ))}
                </div>

                <div className="flex flex-wrap gap-xs2">
                  {difficulties.map((option) => (
                    <FilterPill
                      key={option}
                      label={difficultyLabels[option]}
                      active={difficulty === option}
                      onClick={() => handleFilterChange("difficulty", option)}
                    />
                  ))}
                </div>
              </div>

              <div className="flex flex-col gap-sm xl:flex-row xl:items-center xl:justify-between">
                <div className="flex flex-wrap gap-xs2">
                  <FilterPill
                    label="All Grades"
                    active={gradeId === "All"}
                    onClick={() => handleFilterChange("grade_id", "All")}
                  />
                  {grades.map((option) => (
                    <FilterPill
                      key={option.id}
                      label={option.name}
                      active={gradeId === option.id}
                      onClick={() => handleFilterChange("grade_id", option.id)}
                    />
                  ))}
                </div>

                <div className="flex flex-col gap-sm sm:flex-row sm:items-center xl:min-w-[360px] xl:justify-end">
                  <div className="flex flex-row flex-nowrap items-center gap-xs2 shrink-0">
                    {terms.map((option) => (
                      <FilterPill
                        key={option}
                        label={option === "All" ? "TERM" : option}
                        active={term === option}
                        onClick={() => handleFilterChange("term", option)}
                        className={option === "All" ? "min-w-[68px]" : "min-w-10"}
                      />
                    ))}
                  </div>

                  <label className="relative block min-w-[220px] flex-1 xl:max-w-[240px]">
                    <span className="sr-only">Search questions</span>
                    <Search className="pointer-events-none absolute top-1/2 left-sm h-4 w-4 -translate-y-1/2 text-neutral-400" />
                    <input
                      value={searchInput}
                      onChange={(event) => setSearchInput(event.target.value)}
                      placeholder="Search Question, Tag..."
                      className="h-8 w-full border border-neutral-300 bg-white pr-sm pl-10 font-secondary text-[11px] text-text outline-none transition-colors placeholder:text-neutral-400 focus:border-primary-300"
                    />
                  </label>
                </div>
              </div>
            </div>

            <CustomScroll>

              <div className="max-h-[560px] space-y-sm overflow-y-auto pr-1 [scrollbar-color:#d4d4d4_transparent] [scrollbar-width:thin]">
                {initialQuestions.length > 0 ? (
                  initialQuestions.map((question) => (
                    <TeacherQuestionCard
                      key={question.id}
                      question={question}
                      selected={selectedQuestionId === question.id}
                      subjects={subjects}
                      grades={grades}
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
            </CustomScroll>
          </div>
        </ReusableWindow>

        {overlay}
      </div>

      <div className="mt-base flex justify-center">
        <div className="flex items-center gap-base rounded-2xl bg-neutral-900 px-base py-sm text-white shadow-[0_12px_24px_rgba(0,0,0,0.22)]">
          <button
            type="button"
            className="font-secondary text-base text-neutral-300 disabled:opacity-50"
            disabled={page <= 1}
            onClick={() => handleFilterChange("page", (page - 1).toString())}
          >
            ‹
          </button>
          <span className="font-secondary text-sm font-medium">
            {initialQuestions.length > 0 ? `${(page - 1) * limit + 1} - ${Math.min(page * limit, total)} of ${total}` : ''}
          </span>
          <button
            type="button"
            className="font-secondary text-base text-neutral-300 disabled:opacity-50"
            disabled={page * limit >= total}
            onClick={() => handleFilterChange("page", (page + 1).toString())}
          >
            ›
          </button>
        </div>
      </div>
    </div>
  );
}
