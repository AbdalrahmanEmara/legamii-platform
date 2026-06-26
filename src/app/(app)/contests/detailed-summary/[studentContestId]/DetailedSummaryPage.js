"use client";

import React from "react";
import ReusableWindow from "@/components/ui/ReusableWindow";
import QuestionReviewCard from "@/components/practice/QuestionReviewCard";
import ContestLeaderboard from "@/components/ui/ContestLeaderboard";

export default function DetailedSummaryPage({
  summary,
  leaderboard,
}) {
  const currentUserId = "you";

  const leaderboardData = leaderboard.map((student) => ({
    ...student,
    firstName: student.first_name,
  }));

  const LETTER_KEYS = ["a", "b", "c", "d"];

  function getOptionKey(options, value) {
    if (!value) return null;

    const index = options.findIndex((option) => option === value);

    return index === -1 ? null : LETTER_KEYS[index];
  }
  return (
    <div className="w-full">
      {/* ===================== TOP SECTION ===================== */}
      <div className="mx-auto max-w-[1519px] px-[64px]">
        <div className="flex justify-center gap-[32px]">
          {/* Summary Window */}
          <ReusableWindow
            title="CONTEST/SCIENCE FAIR PREP SUMMARY.SYS"
            className="w-[786px] flex-shrink-0"
          >
            <div className="p-md">
              <h2 className="heading-h5-primary mb-sm font-semibold uppercase text-text">
                SCIENCE FAIR PREP SUMMARY
              </h2>

              <p className="body-1 mb-lg font-medium text-text">
                Your results are in! Review your score, understand your
                mistakes, and see how your skills are improving
              </p>

              <div className="grid grid-cols-2 gap-md">
                {[
                  {
                    label: "FINAL RANK",
                    value: `#${summary?.rank}`,
                    color: "text-yellow-600",
                  },
                  {
                    label: "FINAL SCORE",
                    value: summary?.finalScore,
                    color: "text-green-600",
                  },
                  {
                    label: "ACCURACY",
                    value: `${summary?.correctQuestionsCount}/${summary?.totalQuestionsCount}`,
                    color: "text-blue-600",
                  },
                  {
                    label: "XP GAINED",
                    value: `+${summary?.xpGained} XP`,
                    color: "text-primary-600",
                  },
                ].map((stat, idx) => (
                  <div
                    key={idx}
                    className="flex h-[120px] flex-col items-center justify-center p-base gap-xs rounded-md border border-neutral-200 bg-neutral-100 shadow-[2px_3px_0px_0px_rgba(0,0,0,0.05)]"
                  >
                    <span className="label-3 uppercase text-text">
                      {stat.label}
                    </span>

                    <div
                      className={`heading-h5-primary font-bold ${stat.color}`}
                    >
                      {stat.value}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </ReusableWindow>

          {/* Leaderboard */}
          <ContestLeaderboard
            students={leaderboardData}
            currentUserId={currentUserId}
            variant="detailed-summary"
          />
        </div>
      </div>

      {/* ===================== QUESTIONS ===================== */}
      <div className="mx-auto mt-[32px] max-w-[1519px] px-[64px]">
        <div className="flex flex-col gap-md">
          {summary.questions.map((q, i) => {
            console.log("Question", i + 1, q);
            const correctAnswerKey = getOptionKey(q.options, q.correctAnswer);
            const userAnswerKey = getOptionKey(q.options, q.answer);

            const questionProp = {
              ...q,
              answer: correctAnswerKey,
              tags: q.skill ? [q.skill] : [],
            };
            console.log(questionProp);

            return (
              <QuestionReviewCard
                key={q.questionId}
                question={questionProp}
                index={i}
                userAnswer={userAnswerKey}
                width="w-full"
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}