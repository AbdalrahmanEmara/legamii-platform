import BackgroundV2 from "../BackgroundV2";
import ReusableWindow from "../ReusableWindow";
import QuestionReviewCard from "./QuestionReviewCard";

function SummaryPage({ questions, answers, timeTaken }) {
  const score = questions.reduce((acc, q, i) => acc + (answers[i] === q.correct ? 1 : 0), 0);
  const xp = score * 30 + Math.max(0, 60 - timeTaken);
  const finalScore = score * 20 + Math.max(0, 60 - timeTaken);

  return (
    <BackgroundV2>
      <div className="mx-auto max-w-2xl">
        {/* Summary header window */}
        <ReusableWindow
          title="CONTEST/SCIENCE FAIR PREP SUMMARY.SYS"
          className="mb-sm w-[1032px] p-px"
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
                  value: `${score}/${questions.length}`,
                  cls: "bg-secondary-50  text-secondary-600",
                },
                { label: "XP GAINED", value: `+${xp} XP`, cls: "bg-primary-50  text-primary-600" },
                { label: "FINAL SCORE", value: finalScore, cls: "bg-green-50  text-green-600" },
              ].map((s) => (
                <div
                  key={s.label}
                  className={`p-base gap-sm flex-[1 0 0] border-border flex h-[120.5px] flex-col items-center justify-center rounded-md shadow-[2px_3px_4px_0_#e5e7eb] ${s.cls}`}
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

        {questions.map((q, i) => (
          <QuestionReviewCard key={q.id} question={q} index={i} userAnswer={answers[i]} />
        ))}
      </div>
    </BackgroundV2>
  );
}

export default SummaryPage;
