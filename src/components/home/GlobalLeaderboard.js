"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";

import ReusableWindow from "../ui/ReusableWindow";
import CustomScroll from "../ui/CustomScroll";

import Image from "next/image";

import { useLeaderboardSocket } from "@/app/(app)/hooks/useLeaderboardSocket";
import { getSessionAction } from "@/lib/actions/auth.actions";


export default function GlobalLeaderboard({ initialStudents }) {
    // Holds the current Top 100 leaderboard.
    // Initially filled from the server response.
    const [students, setStudents] = useState(initialStudents);
    const [token, setToken] = useState("");

    const handleLeaderboardUpdate = useCallback((updatedStudents) => {
        setStudents(updatedStudents);
    }, []);

    useEffect(() => {
        const fetchSession = async () => {
            const res = await getSessionAction();
            if (!res.success) {
                console.error("Failed to get session:", res.message);
                return;
            }
            setToken(res.token);
        };

        fetchSession();
    }, []);

    useLeaderboardSocket({
        token,
        // Whenever the backend broadcasts a new leaderboard,
        // simply replace the current state.
        onLeaderboardUpdate: handleLeaderboardUpdate,
    });

    return (
        <ReusableWindow
            title="Global_Leaderboard.sys"
            className="flex h-[1395px] w-[413px] flex-col"
        >
            <CustomScroll>

                {students.map((student, index) => {

                    const isTopOne = index === 0;
                    const isTopTwo = index === 1;
                    const isTopThree = index === 2;

                    return (

                        <div
                            key={student.student_id}
                            className={`px-sm py-base gap-base flex
                ${isTopOne
                                    ? "bg-primary-300"
                                    : isTopTwo
                                        ? "bg-primary-200"
                                        : isTopThree
                                            ? "bg-primary-50"
                                            : "bg-white"
                                }`}
                        >

                            {/* Rank */}
                            <div className="label-1 w-10 font-bold">
                                #{student.rank}
                            </div>

                            {/* Avatar */}
                            <div className="relative h-[50px] w-[50px]">

                                <Image
                                    src={student.avatar_url || "/avatars/default.png"}
                                    alt={`${student.first_name} ${student.last_name}`}
                                    fill
                                    className="rounded-full object-cover"
                                />

                            </div>

                            {/* Student information */}
                            <div className="flex flex-col justify-center">

                                <span className="label-1 font-bold">
                                    {student.first_name} {student.last_name}
                                </span>

                                <span className="body-2">
                                    Lvl {student.level}
                                </span>

                            </div>

                        </div>

                    );

                })}

            </CustomScroll>

            {/* Navigate to the full leaderboard page */}
            <div className="p-base">

                <Link
                    href="/student/leaderboard"
                    className="flex justify-center rounded-lg border border-border py-sm text-text font-primary uppercase"
                >
                    View Full Leaderboard
                </Link>

            </div>

        </ReusableWindow>
    );
}