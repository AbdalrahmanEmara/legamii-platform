"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";


const FILTERS = [
    {
        id: "contests",
        label: "Contests",
        children: [
            {
                id: "ONGOING",
                label: "Live",
            },
            {
                id: "UPCOMING",
                label: "Upcoming",
            },
            {
                id: "REGISTERED",
                label: "Registered",
            },
        ],
    },
    {
        id: "HISTORY",
        label: "History",
    },
];

export default function ContestFilters({ current }) {
    const router = useRouter();
    // const [active, setActive] = useState(current || "live");

    function handleFilter(status) {
        router.push(
            `/contests?status=${status}`
        );
    }

    return (
        <nav className="flex flex-1 flex-col p-xs gap-y-1 pt-sm">
            {FILTERS.map((item) => (
                <div key={item.id}>

                    {/* Parent row */}
                    <button
                        onClick={() =>
                            handleFilter(item.id)
                        }
                        className={`flex w-full items-center gap-2 px-sm py-xs2 text-left rounded transition-colors ${current === item.id ? "text-text font-semibold" : "text-sec-text hover:text-text"
                            }`}
                    >
                        {/* Checkbox — only on "Contests" parent */}
                        {item.children && (
                            <span className={`inline-flex h-4 w-4 shrink-0 items-center justify-center rounded-sm border border-text ${current === item.id || item.children.some((c) => c.id === current)
                                ? "bg-text"
                                : "bg-white"
                                }`}>
                                {(current === item.id || item.children.some((c) => c.id === current)) && (
                                    <svg viewBox="0 0 10 10" className="h-2.5 w-2.5 fill-white">
                                        <rect x="1" y="4" width="8" height="2" rx="1" />
                                    </svg>
                                )}
                            </span>
                        )}
                        <span className="font-primary text-sm">{item.label}</span>
                    </button>

                    {/* Children with tree lines */}
                    {item.children && (
                        <div className="relative ml-[22px] flex flex-col mt-0.5">
                            {/* Vertical line */}
                            <span className="absolute left-0 top-0 bottom-3 w-px bg-border" />

                            {item.children.map((child) => (
                                <button
                                    key={child.id}
                                    onClick={() =>
                                        handleFilter(child.id)
                                    }
                                    className={`relative flex w-full items-center pl-4 pr-sm py-xs2 text-left rounded-r transition-colors ${current === child.id ? "text-text font-semibold" : "text-sec-text hover:text-text"
                                        }`}
                                >
                                    {/* Horizontal branch */}
                                    <span className="absolute left-0 top-1/2 w-3 -translate-y-1/2 border-t border-border" />
                                    <span className="font-primary text-sm">{child.label}</span>
                                </button>
                            ))}
                        </div>
                    )}

                </div>
            ))}
        </nav>
    );
}

