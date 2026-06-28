"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import ReusableWindow from "@/components/ui/ReusableWindow";
import ContestLeaderboard from "@/components/ui/ContestLeaderboard";
import SystemLoading from "@/components/ui/SystemLoading";
import SystemError from "@/components/ui/SystemError";
import {
  getContestSummaryAction,
  getContestRankAction,
} from "@/lib/actions/student_contest.action";

export default function ContestSummaryPage() {
  const router = useRouter();
  const params = useParams();
  const studentContestId = params.studentContestId;

  const [summaryData, setSummaryData] = useState(null);
  const [leaderboardData, setLeaderboardData] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      setError(null);
      try {
        const [summaryRes, rankRes] = await Promise.all([
          getContestSummaryAction(studentContestId),
          getContestRankAction(studentContestId),
        ]);
        setSummaryData(summaryRes?.data || summaryRes);
        const rankData = rankRes?.data || rankRes || [];
        const mapped = rankData.map((user) => ({
          ...user,
          firstName: user.first_name || user.firstName,
        }));
        setLeaderboardData(mapped);
      } catch (err) {
        setError(err.message || "Failed to load summary");
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [studentContestId]);

  if (loading) return <SystemLoading />;
  if (error)
    return (
      <SystemError message={error} onRetry={() => window.location.reload()} />
    );

  const currentUserId = leaderboardData.find(
    (u) => u.firstName === "YOU" || u.id
  )?.id;

  return (
    <div className="flex w-full items-start justify-center gap-xl p-xl">
      <ContestLeaderboard
        students={leaderboardData}
        currentUserId={currentUserId}
      />

      <ReusableWindow
        title="CONTESTS_CHALLENGES/CONTEST/SCIENCE FAIR PREP.SYS"
        className="flex-1 max-w-[800px]"
      >
        <div className="flex flex-col items-center gap-md py-base pt-md mx-base">
          <div className="flex flex-col items-center gap-base text-center">
            <h2 className="heading-h5-primary flex items-center gap-xs font-bold uppercase text-text">
              CONTEST <span className="text-primary-500">FINISHED!</span>
            </h2>
            <p className="body-1 font-medium text-text">
              You Have Successfully Finished The Contest. Great Job!
            </p>
          </div>

          <div className="grid w-full grid-cols-3 gap-md self-stretch">
            {[
              {
                label: "FINAL SCORE",
                value: summaryData?.finalScore ?? 0,
                color: "text-green-600",
              },
              {
                label: "SPEED BONUS",
                value: `+${summaryData?.speedBonus ?? 0}`,
                color: "text-yellow-600",
              },
              {
                label: "XP GAINED",
                value: `+${summaryData?.xpGained ?? 0} XP`,
                color: "text-primary-600",
              },
            ].map((stat, idx) => (
              <div
                key={idx}
                className="flex flex-col items-center justify-center gap-xs rounded-md bg-neutral-100 p-base shadow-[2px_3px_0px_0px_rgba(0,0,0,0.05)]"
              >
                <span className="label-3 uppercase text-text">
                  {stat.label}
                </span>
                <span className={`heading-h5-primary ${stat.color}`}>
                  {stat.value}
                </span>
              </div>
            ))}
          </div>

          {summaryData?.skillImpacted?.length > 0 && (
            <div className="flex w-full flex-col gap-sm py-base">
              <h3 className="label-1 font-bold uppercase text-text">
                SKILL IMPACTED
              </h3>
              <div className="flex flex-wrap gap-base">
                {summaryData.skillImpacted.map((skill, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-xs bg-neutral-100 px-sm py-sm"
                  >
                    <span className="body-1 font-medium text-neutral-500">
                      {skill.skill || skill.skillName}
                    </span>
                    <span className="body-2 font-bold text-primary-500">
                      {skill.accuracy}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="flex items-start gap-md rounded-md border bg-neutral-50 p-base">
            <div className="mt-1 text-blue-500">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="12" cy="12" r="10"></circle>
                <polyline points="12 6 12 12 16 14"></polyline>
              </svg>
            </div>
            <div className="flex flex-col gap-xs">
              <h4 className="label-2 font-bold uppercase text-text">
                ANSWERS ARE COMING!
              </h4>
              <p className="body-3 font-medium text-neutral-500">
                Detailed solutions and correct answers will show when the
                contest time ends for everyone. Check your notifications later
                today!
              </p>
            </div>
          </div>

          <button
            onClick={() => router.push("/")}
            className="label-1 w-full rounded border border-border bg-white py-sm px-md font-medium text-text transition-colors hover:bg-neutral-50"
          >
            Return Home
          </button>
        </div>
      </ReusableWindow>
    </div>
  );
}
