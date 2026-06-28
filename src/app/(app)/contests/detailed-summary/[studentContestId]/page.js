"use client";

import React from "react";
import ReusableWindow from "@/components/ui/ReusableWindow";
import QuestionReviewCard from "@/components/practice/QuestionReviewCard";
import ContestLeaderboard from "@/components/ui/ContestLeaderboard";

export default function DetailedSummaryPage() {
  const currentUserId = "you";

  const detailedSummaryData = {
    finalScore: 214,
    rank: 6,
    xpGained: 240,
    correctQuestionsCount: 8,
    totalQuestionsCount: 10,
    questions: [
      {
        questionId: "q1",
        order: 1,
        skill: "Phisics",
        difficulty: "hard",
        questionText:
          "When a flashlight is turned on, which energy transfer happens first?",
        options: {
          a: "Light energy → electrical energy",
          b: "Electrical energy → light energy",
          c: "Sound energy → light energy",
          d: "Heat energy → electrical energy",
        },
        answer: "b",
        correctAnswer: "b",
        score: 10,
        tip: "When you turn on a flashlight, electrical energy from the battery starts moving where it is converted into light energy",
        tags: ["Phisics", "Scientific Skills"],
      },
      {
        questionId: "q2",
        order: 2,
        skill: "Scientific Skills",
        difficulty: "intermediate",
        questionText:
          "When a flashlight is turned on, which energy transfer happens first?",
        options: {
          a: "Light energy → electrical energy",
          b: "Electrical energy → light energy",
          c: "Sound energy → light energy",
          d: "Heat energy → electrical energy",
        },
        answer: "c",
        correctAnswer: "b",
        score: 0,
        tip: "When you turn on a flashlight, electrical energy from the battery starts moving where it is converted into light energy",
        tags: ["Scientific Skills"],
      },
    ],
  };

  const leaderboardData = [
    {
      id: "1",
      firstName: "HELENA",
      lastName: "",
      avatarUrl: "/avatars/avatar1.png",
      score: 234,
      level: 20,
    },
    {
      id: "2",
      firstName: "TYHHYT",
      lastName: "",
      avatarUrl: "/avatars/avatar2.png",
      score: 228,
      level: 20,
    },
    {
      id: "3",
      firstName: "FARAH",
      lastName: "",
      avatarUrl: "/avatars/avatar3.png",
      score: 224,
      level: 20,
    },
    {
      id: "4",
      firstName: "HENNA",
      lastName: "",
      avatarUrl: "/avatars/avatar4.png",
      score: 220,
      level: 20,
    },
    {
      id: "5",
      firstName: "SALMA",
      lastName: "",
      avatarUrl: "/avatars/avatar5.png",
      score: 216,
      level: 20,
    },
    {
      id: "you",
      firstName: "YOU",
      lastName: "",
      avatarUrl: "/avatars/avatar6.png",
      score: 214,
      level: 8,
    },
  ];

  return (
    <div className="w-full">
      <div className="mx-auto max-w-[1519px] px-[64px]">
        <div className="flex justify-center gap-[32px]">
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
                    value: `#${detailedSummaryData.rank}`,
                    color: "text-yellow-600",
                  },
                  {
                    label: "FINAL SCORE",
                    value: detailedSummaryData.finalScore,
                    color: "text-green-600",
                  },
                  {
                    label: "ACCURACY",
                    value: `${detailedSummaryData.correctQuestionsCount}/${detailedSummaryData.totalQuestionsCount}`,
                    color: "text-blue-600",
                  },
                  {
                    label: "XP GAINED",
                    value: `+${detailedSummaryData.xpGained} XP`,
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

          <ContestLeaderboard
            students={leaderboardData}
            currentUserId={currentUserId}
            variant="detailed-summary"
          />
        </div>
      </div>

      <div className="mx-auto mt-[32px] max-w-[1519px] px-[64px]">
        <div className="flex flex-col gap-md">
          {detailedSummaryData.questions.map((q, i) => {
            const questionProp = {
              ...q,
              answer: q.correctAnswer,
              tags: q.tags,
            };

            return (
              <QuestionReviewCard
                key={q.questionId}
                question={questionProp}
                index={i}
                userAnswer={q.answer}
                width="w-full"
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}