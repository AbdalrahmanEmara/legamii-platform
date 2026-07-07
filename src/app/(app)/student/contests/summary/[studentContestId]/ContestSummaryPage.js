"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import ReusableWindow from "@/components/ui/ReusableWindow";
import ContestLeaderboard from "@/components/ui/ContestLeaderboard";
import { useContestSocket } from "@/app/(app)/hooks/useContestSocket";
import { getSessionAction } from "@/lib/actions/auth.action";
import { Eye, Clock } from "lucide-react";

export default function ContestSummaryPage({
    studentContestId,
    contestId,
    summaryData,
    leaderboardData,
}) {
    const router = useRouter();
    const [answersAvailable, setAnswersAvailable] = useState(false);
    const [token, setToken] = useState(null);

    const currentUserId = "you-uuid";
    const normalizedLeaderboard =
        leaderboardData?.map((student) => ({
            ...student,
            firstName: student.first_name,
        })) || [];

    useEffect(() => {
        const fetchToken = async () => {
            const res = await getSessionAction();
            if (res?.token) setToken(res.token);
        };
        fetchToken();
    }, []);

    useContestSocket({
        token,
        contestId,
        studentContestId,
        onFinished: () => setAnswersAvailable(true),
    });

    return (
        <div className="flex w-full items-start justify-center gap-xl p-xl">
            <ContestLeaderboard
                students={normalizedLeaderboard}
                currentUserId={currentUserId}
            />

            <ReusableWindow
                title="CONTESTS_CHALLENGES/CONTEST/SCIENCE FAIR PREP.SYS"
                className="flex-1 max-w-[800px]"
            >
                <div className="flex flex-col items-center gap-md py-base pt-md mx-base">
                    <div className="flex flex-col items-center gap-base text-center">
                        <h2 className="heading-h5-primary flex items-center gap-xs font-bold uppercase text-text">
                            CONTEST <span className="text-primary-500">FINISHED!</span> 🎉
                        </h2>
                        <p className="body-1 font-medium text-text">
                            You Have Successfully Finished The Contest. Great Job!
                        </p>
                    </div>

                    <div className="grid w-full grid-cols-3 gap-md self-stretch">
                        {[
                            { label: "FINAL SCORE", value: summaryData.finalScore ?? 0, color: "text-green-600" },
                            { label: "SPEED BONUS", value: `+${summaryData.speedBonus ?? 0}`, color: "text-yellow-600" },
                            { label: "XP GAINED", value: `+${summaryData.xpGained ?? 0} XP`, color: "text-primary-600" },
                        ].map((stat, idx) => (
                            <div
                                key={idx}
                                className="flex flex-col items-center justify-center gap-xs rounded-md bg-neutral-100 p-base shadow-[2px_3px_0px_0px_rgba(0,0,0,0.05)]"
                            >
                                <span className="label-3 uppercase text-text">{stat.label}</span>
                                <span className={`heading-h5-primary ${stat.color}`}>
                                    {stat.value}
                                </span>
                            </div>
                        ))}
                    </div>

                    <div className="flex w-full flex-col gap-sm py-base">
                        <h3 className="label-1 font-bold uppercase text-text">SKILL IMPACTED</h3>
                        <div className="flex flex-wrap gap-base">
                            {summaryData.skillImpacted.map((skill, index) => (
                                <div
                                    key={index}
                                    className="flex items-center gap-xs bg-neutral-100 px-sm py-sm"
                                >
                                    <span className="body-1 font-medium text-neutral-500">{skill.skill}</span>
                                    <span className="body-2 font-bold text-primary-500">{skill.accuracy}%</span>
                                </div>
                            )) ?? []}
                        </div>
                    </div>

                    {answersAvailable ? (
                        <div className="flex w-full flex-col gap-md">
                            <div className="flex items-start gap-md rounded-md border border-green-200 bg-green-50 p-base">
                                <div className="mt-1 text-green-600">
                                    <Eye size={20} />
                                </div>
                                <div className="flex flex-col gap-xs">
                                    <h4 className="label-2 font-bold uppercase text-green-700">ANSWERS AVAILABLE</h4>
                                    <p className="body-3 font-medium text-green-600">
                                        The contest has ended for everyone. Detailed solutions and correct answers are ready for review.
                                    </p>
                                </div>
                            </div>
                            <button
                                onClick={() => router.push(`/student/contests/detailed-summary/${studentContestId}`)}
                                className="label-1 w-full rounded border border-green-600 bg-green-600 py-sm px-md font-medium text-white transition-colors hover:bg-green-700"
                            >
                                View Detailed Summary
                            </button>
                        </div>
                    ) : (
                        <div className="flex items-start gap-md rounded-md border bg-neutral-50 p-base">
                            <div className="mt-1 text-blue-500">
                                <Clock size={20} />
                            </div>
                            <div className="flex flex-col gap-xs">
                                <h4 className="label-2 font-bold uppercase text-text">ANSWERS ARE COMING!</h4>
                                <p className="body-3 font-medium text-neutral-500">
                                    Detailed solutions and correct answers will show when the contest time ends for everyone. Check your notifications later today!
                                </p>
                            </div>
                        </div>
                    )}

                    <button
                        onClick={() => router.push("/home")}
                        className="label-1 w-full rounded border border-border bg-white py-sm px-md font-medium text-text transition-colors hover:bg-neutral-50"
                    >
                        Return Home
                    </button>
                </div>
            </ReusableWindow>
        </div>
    );
}