"use client";

import { useRouter } from "next/navigation";
import { useMemo, useState, useTransition } from "react";
import ReusableWindow from "@/components/ui/ReusableWindow";
import { cn } from "@/lib/utils";
import { createQuestionAction, updateQuestionAction, deleteQuestionAction } from "@/lib/actions/qbank.actions";
import SystemConfirm from "@/components/ui/SystemConfirm";
import SystemValidation from "@/components/ui/SystemValidation";
interface TeacherQuestionEditorModalProps {
  mode: "add" | "edit";
  question?: any;
  subjects?: any[];
  grades?: any[];
}

const answerLetters = ["A", "B", "C", "D"] as const;
//const editableDifficulties = ["easy", "medium", "hard","extra hard"];
const editableDifficulties = ["easy", "medium", "hard"];
export default function TeacherQuestionEditorModal({
  mode,
  question,
  subjects = [],
  grades = [],
}: TeacherQuestionEditorModalProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const initialAnswers = question?.options ?? ["", "", "", ""];
  const initialCorrectIndex = question ? initialAnswers.indexOf(question.correct_answer) : 0;

  const [questionText, setQuestionText] = useState(question?.question_text ?? "");
  const [term, setTerm] = useState<"1" | "2">(question?.term ? String(question.term) as "1" | "2" : "1");
  const [gradeId, setGradeId] = useState(
    question?.grade?.id ?? grades?.[0]?.id ?? ""
  );

  const [subjectId, setSubjectId] = useState(
    question?.subject?.id ?? subjects?.[0]?.id ?? ""
  );
  const [topic, setTopic] = useState(question?.lesson ?? "Quadratic Equations");
  const [difficulty, setDifficulty] = useState(question?.difficulty ?? "medium");
  const [correctAnswerIndex, setCorrectAnswerIndex] = useState(initialCorrectIndex !== -1 ? initialCorrectIndex : 0);
  const [answers, setAnswers] = useState(initialAnswers);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [validationError, setValidationError] = useState("");

  //const skillTags = useMemo(() => {
  //  return [
  //    "Quadratic Equations",
  //   "Calculus",
  //   "Chemistry",
  //    "Algebra",
  //    "Climate",
  //    "Ancient Civilizations",
  //    "Literary Devices",
  //  ];
  //}, []);
  const skillTags = [
    "Problem Solving",
    "Critical Thinking",
    "Programming",
    "Algorithms",
    "Data Structures",
    "Database",
    "Networking",
    "Operating Systems",
    "Cybersecurity",
    "Artificial Intelligence",
    "Machine Learning",
    "Mathematics",
    "Geometry",
    "Algebra",
    "Calculus",
    "Statistics",
    "Physics",
    "Chemistry",
    "Biology",
    "History",
    "Geography",
    "Grammar",
    "Reading",
    "Writing",
  ];

  const title = mode === "edit" ? "EDIT_QUESTION.SYS" : "ADD_QUESTION.SYS";
  const primaryLabel = mode === "edit" ? "Save" : "Create";

  const handleSave = () => {
    if (!questionText.trim()) {
      setValidationError("Please enter the question text.");
      return;
    }

    if (answers.some((a) => !a.trim())) {
      setValidationError("Please fill in all answer choices.");
      return;
    }
    if (new Set(answers.map(a => a.trim())).size !== answers.length) {
      setValidationError("Answer choices must be different.");
      return;
    }
    if (!gradeId || !subjectId) {
      setValidationError("Please select a grade and subject.");
      return;
    }
    if (questionText.trim().length < 10) {
      setValidationError("Question text is too short.");
      return;
    }

    if (answers.every(a => !a.trim())) {
      setValidationError("At least one answer is required.");
      return;
    }

    startTransition(async () => {
      const payload = {
        subject_id: subjectId,
        grade_id: gradeId,
        difficulty,
        lesson: topic,
        term: parseInt(term, 10),
        question_text: questionText,
        options: answers,
        correct_answer: answers[correctAnswerIndex],
        tags: [topic]
      };
      try {
        if (mode === "add") {
          await createQuestionAction(payload);
        } else if (question?.id) {
          await updateQuestionAction(question.id, payload);
        }
        router.push("/teacher/question-bank");
      } catch (err) {
        console.error("Failed to save question", err);
      }
    });
  };


  const handleDelete = () => {
    if (!question?.id) return;

    startTransition(async () => {
      try {
        await deleteQuestionAction(question.id);
        router.push("/teacher/question-bank");
      } catch (err) {
        console.error("Failed to delete question", err);
      }
    });
  };

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
                value={gradeId}
                onChange={(event) => setGradeId(event.target.value)}
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

          <div className="grid gap-sm md:grid-cols-2">
            <div className="space-y-xxs">
              <label className="font-primary text-[11px] uppercase text-text">Subject</label>
              <select
                value={subjectId}
                onChange={(event) => setSubjectId(event.target.value)}
                className="h-11 w-full rounded-none border border-neutral-300 bg-white px-sm font-secondary text-sm text-text outline-none focus:border-primary-300"
              >
                {subjects.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.name}
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
                onClick={() => setShowDeleteDialog(true)}
                disabled={isPending}
                className="inline-flex min-w-[128px] items-center justify-center border border-red-300 bg-white px-base py-xs font-primary text-[11px] uppercase text-red-500 shadow-[2px_3px_0_0_rgba(255,0,85,0.08)] disabled:opacity-50"
              >
                Delete
              </button>
            ) : (
              <div />
            )}

            <div className="flex flex-wrap gap-xs2">
              <button
                type="button"
                onClick={() => router.push("/teacher/question-bank")}
                className="inline-flex min-w-[128px] items-center justify-center border border-neutral-400 bg-white px-base py-xs font-primary text-[11px] uppercase text-neutral-700 shadow-[2px_3px_0_0_rgba(0,0,0,0.08)] disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSave}
                disabled={isPending}
                className="inline-flex min-w-[128px] items-center justify-center border border-text bg-primary-500 px-base py-xs font-primary text-[11px] uppercase text-neutral-950 shadow-[2px_3px_0_0_rgba(0,0,0,0.18)] disabled:opacity-50"
              >
                {isPending ? "Saving..." : primaryLabel}
              </button>
            </div>
            {showDeleteDialog && (
              <SystemConfirm
                title="DELETE_QUESTION.SYS"
                danger
                loading={isPending}
                message="This question will be permanently deleted. This action cannot be undone."
                confirmText="Delete"
                cancelText="Cancel"
                onCancel={() => setShowDeleteDialog(false)}
                onConfirm={handleDelete}
              />
            )}
            {validationError && (
              <SystemValidation
                message={validationError}
                onClose={() => setValidationError("")}
              />
            )}
          </div>
        </div>
      </ReusableWindow>

    </div>
  );
}
