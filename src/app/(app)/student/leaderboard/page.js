"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import ReusableWindow from "@/components/ui/ReusableWindow";
import CustomScroll from "@/components/ui/CustomScroll";

import { getGlobalLeaderboardAction } from "@/lib/actions/leaderboard.action";


const rankBadgeStyle = (rank) => {
  if (rank === 1)
    return "bg-gradient-to-br from-yellow-300 to-yellow-500 text-black";
  if (rank === 2)
    return "bg-gradient-to-br from-gray-200 to-gray-400 text-black";
  if (rank === 3)
    return "bg-gradient-to-br from-orange-300 to-orange-500 text-black";
  return "bg-primary-100 text-black";
};



function RankRow({ entry, isMe }) {
 const avatar =
  entry.avatar_url ||
  `https://api.dicebear.com/9.x/initials/svg?seed=${encodeURIComponent(
    `${entry.first_name} ${entry.last_name}`
  )}`;

  return (
    <div
      className={[
        "grid grid-cols-[64px_56px_1fr_120px_100px] items-center gap-3",
        "border-2 border-black px-3 py-2",
        isMe ? "bg-primary-200" : "bg-white",
      ].join(" ")}
    >
      <div
        className={`flex h-9 w-12 items-center justify-center border-2 border-black font-bold ${rankBadgeStyle(entry.rank)}`}
      >
        #{entry.rank}
      </div>

      <img
        src={avatar}
        alt=""
        className="h-[50px] w-[50px] border-2 border-black object-cover"
      />

      <div className="min-w-0">
        <div className="truncate font-bold label-1">
          {isMe ? "YOU" : `${entry.first_name} ${entry.last_name}`}
        </div>

        <div className="body-2 text-black/60">
          Level {entry.level}
        </div>
      </div>

      <div className="text-right font-bold label-1">
        {entry.points.toLocaleString()} XP
      </div>

      <div className="text-right body-2 text-black/70">
        Lvl {entry.level}
      </div>
    </div>
  );
}
function PagerBtn({ children, active, disabled, onClick }) {
  return (
    <button
      type="button"
      disabled={disabled}
      onClick={onClick}
      className={[
        "h-9 min-w-9 border-2 border-black px-2 label-1",
        active ? "bg-primary-300" : "bg-white hover:bg-primary-100",
        disabled ? "cursor-not-allowed opacity-40" : "",
      ].join(" ")}
    >
      {children}
    </button>
  );
}

/* ------------------------------------------------------------------ */
/*  PAGE                                                               */
/* ------------------------------------------------------------------ */

export default function LeaderboardPage() {
  const [page, setPage] = useState(1);

  const [leaderboard, setLeaderboard] = useState(null);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    async function loadLeaderboard() {
      setLoading(true);

      const result = await getGlobalLeaderboardAction(page, 50);

      if (!cancelled && result.success) {
        setLeaderboard(result.data);
      }

      if (!cancelled) {
        setLoading(false);
      }
    }

    loadLeaderboard();

    return () => {
      cancelled = true;
    };
  }, [page]);


  const me = leaderboard?.authenticated_student;

  const pageInfo = leaderboard?.pagination;

  const pageNumbers = useMemo(() => {
    if (!pageInfo) return [];
    const { page: p, totalPages } = pageInfo;
    const around = new Set([1, totalPages, p - 1, p, p + 1]);
    return [...around]
      .filter((n) => n >= 1 && n <= totalPages)
      .sort((a, b) => a - b);
  }, [pageInfo]);

  return (
    <ReusableWindow
      title="GLOBAL LEADERBOARD"
      width="1004px"
      height="auto"
      className="mx-auto my-8"
    >

      {/* ---- Sticky "Your Rank" row (Codeforces-style) ---- */}
      {me && (
        <div className="border-b-2 border-black bg-primary-200 px-4 py-2">
          <div className="mb-1 label-1">YOUR RANK</div>

          <RankRow
            entry={{
              rank: me.rank,
              first_name: "You",
              last_name: "",
              avatar_url: null,
              points: me.points,
              level: me.level,
            }}
            isMe
          />
        </div>
      )}

      {/* ---- Table ---- */}
      <CustomScroll className="max-h-[520px] px-4 py-3">
        {loading && (
          <div className="py-8 text-center body-2 text-black/60">Loading...</div>
        )}

        {!loading && leaderboard?.leaderboard?.length === 0 && (
          <div className="py-8 text-center body-2 text-black/60">
            No participants found.
          </div>
        )}

        <div className="flex flex-col gap-2">
          {leaderboard?.leaderboard?.map((entry) => (
            <RankRow
              key={entry.student_id}
              entry={entry}
            />
          ))}
        </div>
      </CustomScroll>

      {/* ---- Pagination ---- */}
      {pageInfo && (
        <div className="flex flex-wrap items-center justify-between gap-3 border-t-2 border-black bg-primary-50 px-4 py-3">
          <div className="body-2 text-black/70">
            Page <b>{pageInfo.page}</b> of <b>{pageInfo.totalPages}</b> ·{" "}
            {pageInfo.total} participants
          </div>

          <div className="flex items-center gap-1">
            <PagerBtn
              disabled={pageInfo.page <= 1}
              onClick={() => setPage(1)}
            >
              «
            </PagerBtn>
            <PagerBtn
              disabled={pageInfo.page <= 1}
              onClick={() => setPage((p) => p - 1)}
            >
              ‹ Prev
            </PagerBtn>

            {pageNumbers.map((n, i) => {
              const prev = pageNumbers[i - 1];
              const gap = prev && n - prev > 1;
              return (
                <span key={n} className="flex items-center gap-1">
                  {gap && <span className="px-1 body-2">…</span>}
                  <PagerBtn
                    active={n === pageInfo.page}
                    onClick={() => setPage(n)}
                  >
                    {n}
                  </PagerBtn>
                </span>
              );
            })}

            <PagerBtn
              disabled={pageInfo.page >= pageInfo.totalPages}
              onClick={() => setPage((p) => p + 1)}
            >
              Next ›
            </PagerBtn>
            <PagerBtn
              disabled={pageInfo.page >= pageInfo.totalPages}
              onClick={() => setPage(pageInfo.totalPages)}
            >
              »
            </PagerBtn>
          </div>

          <Link
            href="/home"
            className="h-9 border-2 border-black bg-primary-100 px-3 leading-9 label-1 hover:bg-primary-200"
          >
            ← BACK
          </Link>
        </div>
      )}
    </ReusableWindow>
  );
}

