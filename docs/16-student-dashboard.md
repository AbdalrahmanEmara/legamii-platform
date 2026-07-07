# 16. Student Dashboard (Home Page)

## Overview

The student dashboard at `/student/home` is the first page students see after login. It's a server component that fetches all data server-side and renders multiple independent sections with Suspense boundaries.

## Page Structure

**File:** `src/app/(app)/student/home/page.js`

```jsx
export default async function HomePage() {
  // SSR: pre-fetch profile and initial leaderboard data
  const leaderboardRes = await getGlobalLeaderboardAction(1, 100);
  let profile = null;
  try {
    profile = await getProfile();
  } catch (err) {
    console.error("Failed to load profile:", err);
  }
  const name = profile?.first_name || "Student";

  return (
    <div className="mx-auto px-base md:px-md xl:px-xl3">
      <div className="grid grid-cols-1 md:grid-cols-[1fr_258px] lg:grid-cols-[1fr_350px] 2xl:grid-cols-[1fr_435px] gap-base">
        {/* Two-column grid layout */}

        {/* Left column - spans full width on desktop */}
        <div className="md:col-span-2 xl:col-span-1 xl:row-span-2">
          <WelcomeBack name={name} />
        </div>

        {/* Right column - Streak */}
        <div className="md:col-start-2 xl:col-start-2 xl:row-span-3">
          <Suspense fallback={<StreakSkeleton />}>
            <Streak />
          </Suspense>
        </div>

        {/* Left column bottom */}
        <div className="xl:col-span-1">
          <Suspense fallback={<DailyMissionSkeleton />}>
            <DailyMission />
          </Suspense>
        </div>

        {/* Left column - contests */}
        <div className="md:col-span-2 xl:col-span-1">
          <Suspense fallback={<UpcomingContestsSkeleton />}>
            <UpcomingContests />
          </Suspense>
        </div>

        {/* Right column bottom - Leaderboard */}
        <div className="md:col-span-2 xl:col-span-1">
          <GlobalLeaderboard initial={leaderboardRes} />
        </div>
      </div>
    </div>
  );
}
```

## Components

### WelcomeBack
**File:** `src/components/home/WelcomeBack.js`

A server component that:
- Greets the student by name ("Welcome back, Ahmed!")
- Shows a **class code join form** (text input + submit button)
- Uses `ReusableWindow` with an offset shadow effect (two windows layered)

### DailyMission
**File:** `src/components/home/DailyMission.js`

Fetches daily missions via `getDailyMissions()`:
- Displays mission cards with:
  - Mission description
  - Progress bar (current / target)
  - XP reward amount
  - Claim button (if completed, not yet claimed)
- Auto-claims completed missions on load
- Calls `claimMissionAction({ id })` when user clicks claim

### Streak
**File:** `src/components/home/Streak.js`

Fetches streak data via `getStreak()`:
- **Fire icon** with consecutive days count
- **Week activity grid** — shows which days the student practiced
  - Green = solved (practiced)
  - Gray = missed
- **Stats:**
  - Current streak (consecutive days)
  - Total active days
  - Best streak (all-time record)
- Uses `ReusableWindow` with `CustomScroll`

### UpcomingContests
**File:** `src/components/home/UpcomingContests.js`

Fetches upcoming contests via `getContests(null, "UPCOMING")`:
- Shows top 3 upcoming contests using `ContestList` component
- "View All" link to full contests page (`/student/contests`)
- Each card shows: title, subject icon, time remaining, registered players

### GlobalLeaderboard
**File:** `src/components/home/GlobalLeaderboard.js`

A **client component** that displays the top 100 students:
- **Initial SSR rendering:** 100 students pre-fetched on the server
- **Real-time updates:** Uses `useLeaderboardSocket` for live updates via WebSocket
- Shows: rank, avatar (DiceBear initials fallback), name, level, XP
- "View Full Leaderboard" link to `/student/leaderboard`
- Uses `ReusableWindow` with `CustomScroll`

## Grid Layout Breakdown

```
Desktop (≥1280px):
┌──────────────────────────────────┬──────────────────┐
│                                  │      Streak      │
│          WelcomeBack             │                  │
│                                  ├──────────────────┤
│                                  │                  │
│          DailyMission            │  GlobalLeader    │
│                                  │  board           │
│                                  │                  │
│          UpcomingContests        │                  │
│                                  │                  │
└──────────────────────────────────┴──────────────────┘

Mobile (<768px):
┌──────────────────┐
│   WelcomeBack    │
├──────────────────┤
│     Streak       │
├──────────────────┤
│  DailyMission   │
├──────────────────┤
│ UpcomingContests│
├──────────────────┤
│GlobalLeaderboard│
└──────────────────┘
```

## Loading States

Each async section has its own skeleton component for Suspense:

| Section | Skeleton | Component |
|---|---|---|
| DailyMission | `DailyMissionSkeleton.js` | Shows 2-3 card placeholders |
| Streak | `StreakSkeleton.js` | Shows fire + grid placeholders |
| UpcomingContests | `UpcomingContestSkeleton.js` | Shows 3 card placeholders |

These skeleton components are in `src/components/Skeletons/`.

## Data Flow

```
Page (Server Component) ──┬── getProfile()  ───────────> WelcomeBack (name)
                           │
                           ├── getDailyMissions()  ─────> DailyMission (async, Suspense)
                           │
                           ├── getStreak()  ────────────> Streak (async, Suspense)
                           │
                           ├── getContests(UPCOMING)  ───> UpcomingContests (async, Suspense)
                           │
                           └── getGlobalLeaderboardAction()  ──> GlobalLeaderboard
                                                                  └── WebSocket for live updates
```
