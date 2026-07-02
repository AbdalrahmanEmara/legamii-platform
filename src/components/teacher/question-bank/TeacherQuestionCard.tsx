import Link from "next/link";
import { BookText, FlaskConical, Globe2, ScrollText, Sigma, HelpCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface TeacherQuestionCardProps {
  question: any;
  selected?: boolean;
  subjects?: any[];
  grades?: any[];
}

const difficultyStyles: Record<string, string> = {
  easy: "text-green-600",
  medium: "text-yellow-600",
  hard: "text-red-500",
  extra_hard: "text-purple-600",
};

const subjectIconMap: Record<string, any> = {
  Math: { icon: Sigma, className: "bg-red-100 text-red-500" },
  Mathematics: { icon: Sigma, className: "bg-red-100 text-red-500" },
  Science: { icon: FlaskConical, className: "bg-secondary-50 text-secondary-500" },
  History: { icon: ScrollText, className: "bg-yellow-50 text-yellow-700" },
  Geography: { icon: Globe2, className: "bg-green-50 text-green-700" },
  English: { icon: BookText, className: "bg-primary-50 text-primary-600" },
};

const defaultSubjectVisual = { icon: HelpCircle, className: "bg-neutral-100 text-neutral-500" };

export default function TeacherQuestionCard({
  question,
  selected = false,
  subjects = [],
  grades = [],
}: TeacherQuestionCardProps) {
  const subjectName = question.subject?.name ?? "Unknown Subject";
  const gradeName = question.grade?.name ?? "Unknown Grade";

  const subjectVisual = subjectIconMap[subjectName] || defaultSubjectVisual;
  const SubjectIcon = subjectVisual.icon;

  console.log({
    subject_id: question.subject_id,
    grade_id: question.grade_id,
    subjectFound: subjects.find(s => s.id === question.subject_id),
    gradeFound: grades.find(g => g.id === question.grade_id),
  });
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
          {question.question_text}
        </h2>

        <div className="gap-xs2 text-text grid text-[12px] leading-5 md:grid-cols-2 xl:grid-cols-4">
          {(question.options || []).map((answer: string, index: number) => (
            <p key={`${question.id}-${index}`} className="font-secondary truncate">
              <span className="mr-1 text-neutral-700">{String.fromCharCode(65 + index)})</span>
              {answer}
            </p>
          ))}
        </div>

        <div className="gap-xs2 pt-xxs flex flex-wrap items-center text-[10px] text-neutral-500">
          <span className="px-xs2 py-xxs rounded-sm bg-neutral-100">{gradeName}</span>
          {question.term && (
            <span className="px-xs2 py-xxs rounded-sm bg-neutral-100">Term {question.term}</span>
          )}
          <span className="px-xs2 py-xxs rounded-sm bg-neutral-100">{subjectName}</span>
          {question.lesson && (
            <span className="px-xs2 py-xxs rounded-sm bg-neutral-100">{question.lesson}</span>
          )}
          {question.difficulty && (
            <span className={cn("px-xs2 py-xxs rounded-sm uppercase", difficultyStyles[question.difficulty] || "text-neutral-500")}>
              {question.difficulty.replace('_', ' ')}
            </span>
          )}
          {question.usedCount !== undefined && (
            <span className="px-xs2 py-xxs rounded-sm bg-neutral-100">
              Used x{question.usedCount}
            </span>
          )}
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
