# 19. Student Leaderboard

## Overview

The leaderboard system has two components:
1. **Global leaderboard** on the home page (`GlobalLeaderboard` component) — top 100, live-updating
2. **Full leaderboard page** (`/student/leaderboard`) — paginated, Codeforces-style

## Global Leaderboard (Home Page)

**File:** `src/components/home/GlobalLeaderboard.js`

A client component embedded in the dashboard that:
- Receives initial top 100 data from SSR (pre-fetched in the home page)
- Connects to the **leaderboard WebSocket** for live updates via `useLeaderboardSocket`
- Renders rank, avatar (DiceBear initials fallback), name, level, and XP
- "View Full Leaderboard" link to `/student/leaderboard`
- Wrapped in `ReusableWindow` with `CustomScroll`

```jsx
// Data structure from API
{
  rank: number;
  student_id: string;
  first_name: string;
  last_name: string;
  avatar_url: string | null;
  level: number;
  points: number;
}
```

**Socket behavior:**
- Subscribes to `leaderboard:global` events
- Updates leaderboard in real-time when other students gain XP
- Uses `useLeaderboardSocket` hook (see Chapter 25)

## Full Leaderboard Page (`/student/leaderboard`)

**File:** `src/app/(app)/student/leaderboard/page.js`

A client component with pagination and sticky "Your Rank" row.

### Features

#### 1. Pagination
- 50 students per page
- Page navigation with first/prev/next/last buttons
- Page number buttons with gap ellipsis (`...` between distant pages)
- Shows current page / total pages + total participant count

#### 2. Sticky "Your Rank" Row
- Codeforces-style: the authenticated student's rank is pinned at the top, outside the scrollable area
- Highlighted with `bg-primary-200` (purple tint)
- Shows "YOU" as the name
- Only appears if the student has a rank

#### 3. Rank Badges
- **#1** — Gold gradient (`bg-gradient-to-br from-yellow-300 to-yellow-500`)
- **#2** — Silver gradient (`bg-gradient-to-br from-gray-200 to-gray-400`)
- **#3** — Bronze gradient (`bg-gradient-to-br from-orange-300 to-orange-500`)
- **Others** — `bg-primary-100`

#### 4. Avatar Fallback
If a student has no `avatar_url`, uses DiceBear initials API:
```js
const avatar = entry.avatar_url ||
  `https://api.dicebear.com/9.x/initials/svg?seed=${encodeURIComponent(
    `${entry.first_name} ${entry.last_name}`
  )}`;
```

### Data Fetching

```js
useEffect(() => {
  let cancelled = false;
  async function loadLeaderboard() {
    setLoading(true);
    const result = await getGlobalLeaderboardAction(page, 50);
    if (!cancelled && result.success) {
      setLeaderboard(result.data);
    }
    if (!cancelled) setLoading(false);
  }
  loadLeaderboard();
  return () => { cancelled = true; };
}, [page]);
```

### Page Structure

```
┌──────────────────────────────────────────┐
│  ReusableWindow: "GLOBAL LEADERBOARD"   │
│                                          │
│  ┌─── YOUR RANK (sticky, if logged in) ─┐│
│  │ #12 │ [Avatar] │ YOU │ 2,450 XP │ Lv15││
│  └───────────────────────────────────────┘│
│                                          │
│  ┌─── CustomScroll ─────────────────────┐│
│  │ #1  │ [Avatar] │ Alex M. │ 9,800 XP │││
│  │ #2  │ [Avatar] │ Sarah K. │ 8,200 XP │││
│  │ #3  │ [Avatar] │ John D. │ 7,500 XP │││
│  │ ...                                  │││
│  │ #50 │ [Avatar] │ User N. │ 120 XP   │││
│  └───────────────────────────────────────┘│
│                                          │
│  ┌─── Pagination ───────────────────────┐│
│  │ Page 1 of 20 · 1000 participants     ││
│  │ [«] [‹ Prev] [1] [2] [3] … [20]     ││
│  │ [Next ›] [»]             [← BACK]   ││
│  └───────────────────────────────────────┘│
└──────────────────────────────────────────┘
```

## Data Flow Summary

```
            Home Page                    Leaderboard Page
       ┌──────────────────┐         ┌────────────────────┐
       │ SSR: Top 100     │         │ Action: fetch page │
       │ getGlobalLeader- │         │ getGlobalLeader-   │
       │ boardAction(1,100)│        │ boardAction(page,50)│
       └────────┬─────────┘         └──────────┬─────────┘
                │                              │
                ▼                              ▼
       ┌──────────────────┐         ┌────────────────────┐
       │ GlobalLeaderboard │        │ LeaderboardPage     │
       │ (Client)         │        │ (Client)           │
       │ + socket updates │        │ pagination controls │
       └──────────────────┘         └────────────────────┘
                │
                ▼
       ┌──────────────────┐
       │ useLeaderboard-  │
       │ Socket hook      │
       │ leaderboard:global│
       └──────────────────┘
```

## Key Actions

| Action | Purpose |
|---|---|
| `getGlobalLeaderboardAction(page, limit)` | Fetch paginated leaderboard data |

## Service

| Function | HTTP | Endpoint |
|---|---|---|
| `getGlobalLeaderboard(page, limit)` | GET | `leaderboard.global` with `{ params: { page, limit } }` |

## Note

The global leaderboard uses a **socket namespace** (`/leaderboard`) for real-time updates, while the contest-specific leaderboard uses the **contest namespace** (`/contest`). Both are documented in Part VIII.
