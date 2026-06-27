import Link from "next/link";
import { BookText, FlaskConical, Globe2, ScrollText, Sigma } from "lucide-react";
import { cn } from "@/lib/utils";
import type { QuestionItem } from "@/components/teacher/question-bank/questionBankData";

interface TeacherQuestionCardProps {
  question: QuestionItem;
  selected?: boolean;
}

const difficultyStyles = {
  Easy: "text-green-600",
  Medium: "text-yellow-600",
  Hard: "text-red-500",
};

const subjectIconMap = {
  Math: { icon: Sigma, className: "bg-red-100 text-red-500" },
  Science: { icon: FlaskConical, className: "bg-secondary-50 text-secondary-500" },
  History: { icon: ScrollText, className: "bg-yellow-50 text-yellow-700" },
  Geography: { icon: Globe2, className: "bg-green-50 text-green-700" },
  English: { icon: BookText, className: "bg-primary-50 text-primary-600" },
};

export default function TeacherQuestionCard({
  question,
  selected = false,
}: TeacherQuestionCardProps) {
  const subjectVisual = subjectIconMap[question.subject];
  const SubjectIcon = subjectVisual.icon;

  return (
    <article
      className={cn(
        "gap-sm px-sm py-sm grid rounded-lg border bg-white shadow-[2px_3px_4px_0_rgba(0,0,0,0.18)] transition-all md:grid-cols-[auto_1fr_auto] md:items-start",
        selected ? "border-primary-500 shadow-[0_0_0_2px_rgba(216,101,224,0.35)]" : "border-text"
      )}
    >
      <div
        className={cn(
          "mt-1 flex h-9 w-9 shrink-0 items-center justify-center rounded-sm",
          subjectVisual.className
        )}
      >
        <SubjectIcon className="h-4.5 w-4.5" />
      </div>

      <div className="space-y-xs2 min-w-0">
        <h2 className="font-secondary text-text text-[14px] leading-6 font-medium md:text-[16px]">
          {question.title}
        </h2>

        <div className="gap-xs2 text-text grid text-[12px] leading-5 md:grid-cols-2 xl:grid-cols-4">
          {question.answers.map((answer, index) => (
            <p key={`${question.id}-${index}`} className="font-secondary truncate">
              <span className="mr-1 text-neutral-700">{String.fromCharCode(65 + index)})</span>
              {answer}
            </p>
          ))}
        </div>

        <div className="gap-xs2 pt-xxs flex flex-wrap items-center text-[10px] text-neutral-500">
          <span className="px-xs2 py-xxs rounded-sm bg-neutral-100">Grade {question.grade}</span>
          <span className="px-xs2 py-xxs rounded-sm bg-neutral-100">Term {question.term}</span>
          <span className="px-xs2 py-xxs rounded-sm bg-neutral-100">{question.subject}</span>
          <span className="px-xs2 py-xxs rounded-sm bg-neutral-100">{question.topic}</span>
          <span className={cn("px-xs2 py-xxs rounded-sm", difficultyStyles[question.difficulty])}>
            {question.difficulty}
          </span>
          <span className="px-xs2 py-xxs rounded-sm bg-neutral-100">
            Used x{question.usedCount}
          </span>
        </div>
      </div>

      <div className="gap-xs2 flex shrink-0 flex-row md:flex-col">
        <Link
          href={`/teacher/question-bank/${question.id}/use`}
          className="border-text bg-primary-500 px-sm py-xs font-primary inline-flex min-w-[64px] items-center justify-center rounded-sm border text-[11px] text-neutral-950 uppercase shadow-[2px_3px_0_0_rgba(0,0,0,0.18)] transition-transform hover:-translate-y-0.5"
        >
          Use
        </Link>
        <Link
          href={`/teacher/question-bank/${question.id}/edit`}
          className="px-sm py-xs font-primary text-text inline-flex min-w-[64px] items-center justify-center rounded-sm border border-neutral-300 bg-white text-[11px] uppercase shadow-[2px_3px_0_0_rgba(0,0,0,0.1)] transition-transform hover:-translate-y-0.5"
        >
          Edit
        </Link>
      </div>
    </article>
  );
}
