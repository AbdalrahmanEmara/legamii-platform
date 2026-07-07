# 18. Student Contests

## Overview

Contests are live, timed, competitive quizzes where students compete against classmates in real-time. The system supports the full lifecycle from browsing available contests to reviewing detailed results.

## Route Structure

```
/student/contests                           → List contests (filtered by status)
/student/contests/[classId]/[contestId]     → Contest lobby (pre-game)
/student/contests/play/[studentContestId]   → Active contest (play)
/student/contests/summary/[studentContestId]→ Post-contest summary
/student/contests/detailed-summary/[studentContestId] → Per-question review
```

## Contest Lifecycle

```
┌──────────┐    ┌──────────┐    ┌──────────┐    ┌──────────┐    ┌──────────┐
│  List    │───→│  Lobby   │───→│  Play    │───→│ Summary  │───→│Detailed  │
│(by status│    │(register)│    │(questions│    │(score,XP)│    │(review)  │
│ UPCOMING)│    │          │    │ + timer) │    │          │    │          │
└──────────┘    └──────────┘    └──────────┘    └──────────┘    └──────────┘
                                                      ↕
                                               Real-time via
                                               WebSocket:
                                               leaderboard,
                                               clarifications
```

## Enums

```ts
enum ContestStatus         { UPCOMING = 'UPCOMING', ONGOING = 'ONGOING', FINISHED = 'FINISHED' }
enum StudentContestStatus  { REGISTERED = 'REGISTERED', IN_PROGRESS = 'IN_PROGRESS', FINISHED = 'FINISHED' }
enum ContestFilter         { UPCOMING = 'UPCOMING', REGISTERED = 'REGISTERED', ONGOING = 'ONGOING', HISTORY = 'HISTORY' }
enum Difficulty            { EASY = 'easy', MEDIUM = 'medium', HARD = 'hard', EXTRA_HARD = 'extra_hard' }
```

## Page Details

### 1. Contest List (`/student/contests`)

**File:** `src/app/(app)/student/contests/page.js`

A server component that:
1. Reads `searchParams.status` (default: `"UPCOMING"`)
2. Calls `getContests(null, status)` to fetch contests
3. Renders `MainContestPage` with sidebar filters + contest list

**Filters:** UPCOMING, REGISTERED, ONGOING, HISTORY (via URL query param `?status=...`)

### ContestCard

**File:** `src/components/contest/ContestCard.js`

Each contest card shows:
- **Status badge** (LIVE / UPCOMING / FINISHED)
- **Subject icon** (Maths, Science, or History)
- **Title** and description
- **Grade / class number**
- **Players count** + joined friend avatars
- **Contextual action button:**

| Status | Registered | Button |
|---|---|---|
| ONGOING | any | "JOIN NOW" → lobby |
| UPCOMING | yes | "VIEW DETAILS" → lobby |
| UPCOMING | no | "REGISTER" → register action |
| HISTORY | any | "VIEW RESULT" → detailed summary |

### 2. Contest Lobby (`/student/contests/[classId]/[contestId]`)

**File:** `src/app/(app)/student/contests/[classId]/[contestId]/page.js`

A server component that shows pre-contest information:
- Contest title, subject, difficulty, skills
- Start time and time limit
- Number of registered players
- List of registered students with avatars
- Joined friends
- **Register button** (if not registered)
- **Start button** (if registered and contest is ONGOING)

Renders:
- `Leaderboard` component for contest standings
- `ContestLobbyCard` for contest details

### 3. Contest Play (`/student/contests/play/[studentContestId]`)

**Pattern:** Server wrapper + client component.

**Server page** fetches initial data:
- Question metadata list via `getContestQuestionsAction(studentContestId)`
- Leaderboard data

**Client component** (`ContestPlayPage.js`) manages:
- **Real-time socket connection** via `useContestSocket`
  - `contest:joined` — sync remaining time
  - `contest:started` — receive start/end timestamps
  - `contest:leaderboard` — live ranking updates
  - `contest:clarification` — teacher messages
  - `contest:finished` — contest ended for all
- **Question navigation:** fetch one question at a time (lazy-loaded)
- **Answer submission:** `submitContestAnswerAction(studentContestId, questionId, { answer })` — POST
- **Flag toggling:** `toggleQuestionFlagAction(studentContestId, questionId)` — PATCH (same URL, different method)
- **Timer:** synced with server via socket
- **Finish:** `finishContestAction(studentContestId)` → GET, triggers score calculation

### 4. Contest Summary (`/student/contests/summary/[studentContestId]`)

**File:** `src/app/(app)/student/contests/summary/[studentContestId]/page.js`

After finishing, shows:
- **Final score**
- **Speed bonus**
- **XP gained**
- **Skill impact** — per-skill accuracy percentages

```ts
interface ResponseContestSummaryDto {
  finalScore: number;
  speedBonus: number;
  xpGained: number;
  skillImpacted: { skill: string; accuracy: number }[];
}
```

### 5. Detailed Summary (`/student/contests/detailed-summary/[studentContestId]`)

**File:** `src/app/(app)/student/contests/detailed-summary/[studentContestId]/page.js`

Full per-question review:
- Final score, rank, XP
- Correct/total question counts
- **Per-question breakdown:**
  - Question text
  - Options (A/B/C/D)
  - Student's answer (highlighted)
  - Correct answer (green)
  - Score earned per question
  - Skill + difficulty tags
- **Contest leaderboard**

```ts
interface ResponseContestDetailedSummaryDto {
  finalScore: number;
  rank: number;
  xpGained: number;
  correctQuestionsCount: number;
  totalQuestionsCount: number;
  questions: {
    questionId: string;
    order: number;
    skill: string;
    difficulty: string;
    questionText: string;
    options: { a: string; b: string; c: string; d: string };
    answer: string;        // student's answer
    correctAnswer: string;
    score: number;          // points earned
  }[];
}
```

## Key Actions

| Action | HTTP | Purpose |
|---|---|---|
| `getContestsAction(classId, status)` | GET | List contests by filter |
| `getContestLobbyAction(classId, contestId)` | GET | Get lobby data |
| `registerContestAction(classId, contestId)` | PATCH | Register for contest |
| `startContestAction(classId, contestId)` | PATCH | Start contest play |
| `getContestQuestionsAction(studentContestId)` | GET | Get question metadata list |
| `getContestQuestionAction(studentContestId, questionId)` | GET | Get single question detail |
| `submitContestAnswerAction(studentContestId, questionId, body)` | POST | Submit answer |
| `toggleQuestionFlagAction(studentContestId, questionId)` | PATCH | Toggle flag on question |
| `finishContestAction(studentContestId)` | GET | Finish contest, trigger grading |
| `getContestSummaryAction(studentContestId)` | GET | Get summary (score, XP, skills) |
| `getContestDetailedSummaryAction(studentContestId)` | GET | Get per-question review data |
| `getContestRankAction(studentContestId)` | GET | Get contest leaderboard |

## Real-Time Features

The contest play page uses WebSockets extensively:
- **Leaderboard updates** — see other students' scores update in real-time
- **Clarifications** — teacher can send messages that appear during the contest
- **Time sync** — server syncs remaining time to prevent clock manipulation
- **Contest events** — start, finish notifications

See Chapter 23-25 for detailed socket documentation.
