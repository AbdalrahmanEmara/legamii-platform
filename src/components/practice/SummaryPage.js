'use client';
import { useEffect, useState } from "react";
import ReusableWindow from "../ui/ReusableWindow";
import QuestionReviewCard from "./QuestionReviewCard";
import { getQuizByIdAction } from "@/lib/actions/quiz.actions";
import SystemLoading from "../ui/SystemLoading";
import SystemError from "../ui/SystemError";

function SummaryPage({ quiz_id }) {
  const [quizData, setQuizData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadQuizData() {
      try {
        const res = await getQuizByIdAction(quiz_id);
        console.log("Fetched quiz result:", res);
        if (res?.data) {
          setQuizData(res.data);
        } else {
          setError("Failed to load quiz data or incorrect format");
          setQuizData({ questions: [] });
        }
      } catch (error) {
        setError(`Error fetching quiz: ${error}`);
      }
    }
    loadQuizData();
  }, [quiz_id]);

  if (!quizData) {
    return <SystemLoading />;
  }

  const questions = quizData.questions || [];

  if (error) {
    return <SystemError message={error} />;
  }

  return (
    <div className="flex flex-col items-center">
      {/* Summary header window */}
      <ReusableWindow
        title="CONTEST/SCIENCE FAIR PREP SUMMARY.SYS"
        className="mb-md m-auto w-[1032px]"
      >
        <div className="p-base pb-md">
          <h2 className="heading-h5-primary mb-sm font-semibold uppercase">
            Science Fair Prep Summary
          </h2>
          <p className="body-1 mb-md font-medium">
            Your results are in! Review your score, understand your mistakes, and see how your
            skills are improving
          </p>
          <div className="gap-xl3 grid grid-cols-3">
            {[
              {
                label: "ACCURACY",
                value: `${quizData.accuracy}%`,
                cls: "bg-secondary-50  text-secondary-600",
              },
              { label: "XP GAINED", value: `+${quizData.xpGained} XP`, cls: "bg-primary-50  text-primary-600" },
              { label: "FINAL SCORE", value: quizData.finalScore, cls: "bg-green-50  text-green-600" },
            ].map((s) => (
              <div
                key={s.label}
                className={`p-base gap-sm border-border flex h-[120.5px] flex-[1_0_0] flex-col items-center justify-center rounded-md border shadow-[2px_3px_4px_0_#000] ${s.cls}`}
              >
                <span className="body-3 text-text text-center font-medium">{s.label}</span>
                <div
                  className={`heading-h5-primary font-medium ${s.cls.split(" ").find((c) => c.startsWith("text-"))}`}
                >
                  {s.value}
                </div>
              </div>
            ))}
          </div>
        </div>
      </ReusableWindow>

      <div className="gap-md flex flex-col">
        {questions.map((q, i) => (
          <QuestionReviewCard key={q.order} question={q} index={i} userAnswer={q.studentAnswer} />
        ))}
      </div>
    </div>
  );
}

export default SummaryPage;
