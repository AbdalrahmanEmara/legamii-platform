# 24. Socket Events Reference

## Contest Namespace (`/contest`)

### Client → Server Emits

| Event | Payload | When |
|---|---|---|
| `contest:join` | `{ contestId: string, studentContestId: string }` | On socket connect (auto-emitted by `connectContestSocket`) |

### Server → Client Events

| Event | Payload | Description |
|---|---|---|
| `contest:joined` | `{ contestId: string, status: string, remainingSeconds?: number }` | Confirmation that the client has joined the contest room. Includes remaining time if contest is in progress |
| `contest:started` | `{ startedAt: string, endsAt: string }` | Contest has officially started. Provides timestamps |
| `contest:clarification` | `{ id: string, message: string, createdAt: string }` | Teacher sent a clarification message during the contest. Displayed to all participants in real-time |
| `contest:leaderboard` | `{ updatedAt: string, leaderboard: LeaderboardEntry[] }` | Real-time leaderboard update. Sent whenever any participant's score changes |

### LeaderboardEntry

```ts
interface LeaderboardEntry {
  rank: number;
  studentId: string;
  studentName: string;
  avatar: string;
  score: number;
  speedBonus: number;
}
```

### `contest:leaderboard` Payload

```ts
{
  updatedAt: string;  // ISO timestamp
  leaderboard: [      // Sorted by rank
    { rank: 1, studentId: "uuid", studentName: "Ahmed M.", avatar: "url", score: 85, speedBonus: 5 },
    { rank: 2, studentId: "uuid", studentName: "Sara K.", avatar: "url", score: 72, speedBonus: 3 },
    // ...
  ]
}
```

| Event | Payload | Description |
|---|---|---|
| `contest:finished` | `{ reason: string }` | Contest has finished for all participants. Reason could be "time_up" or "teacher_ended" |

---

## Leaderboard Namespace (`/leaderboard`)

### Client → Server Emits
None (the connection alone subscribes the client to updates).

### Server → Client Events

| Event | Payload | Description |
|---|---|---|
| `leaderboard:global` | `LeaderboardUpdate` | Global leaderboard has changed. Sent whenever any student's XP is updated |

### LeaderboardUpdate

```ts
{
  type: "update" | "full";  // "update" = incremental, "full" = full reload
  data: {
    // The changed entries or full leaderboard
    leaderboard: {
      rank: number;
      student_id: string;
      first_name: string;
      last_name: string;
      avatar_url: string | null;
      level: number;
      points: number;
    }[];
    authenticated_student?: {
      rank: number;
      points: number;
      level: number;
    };
  }
}
```

---

## Notifications Namespace (`/notifications`)

### Client → Server Emits

| Event | Payload | When |
|---|---|---|
| `joinContestRoom` | `{ contestId: string }` | When a student enters a contest lobby/play page, to receive clarifications |
| `leaveContestRoom` | `{ contestId: string }` | When a student leaves a contest page |

### Server → Client Events

| Event | Payload | Description |
|---|---|---|
| `notification` | `NotificationPayload` | New personal notification for the connected user |
| `broadcast` | `BroadcastPayload` | New broadcast message (sent to all connected users) |
| `contestClarification` | `ContestClarificationPayload` | New contest clarification (sent to room members) |

### NotificationPayload

```ts
{
  id: string;
  user_id: string;
  title: string;
  message: string;
  type: string;         // "contest_reminder", "quiz_result", "mission_complete", etc.
  metadata: Record<string, any>;
  is_read: boolean;
  created_at: string;   // ISO timestamp
}
```

### BroadcastPayload

```ts
{
  id: string;
  title: string;
  message: string;
  type: string;         // "announcement", "maintenance", etc.
  metadata: Record<string, any>;
  created_at: string;   // ISO timestamp
}
```

### ContestClarificationPayload

```ts
{
  id: string;
  contestId: string;
  message: string;
  teacherName: string;
  createdAt: string;    // ISO timestamp
}
```

---

## Event Payload Summary Table

| Namespace | Event | Direction | Auth Required |
|---|---|---|---|
| `/contest` | `contest:join` | Client → Server | Yes |
| `/contest` | `contest:joined` | Server → Client | Yes |
| `/contest` | `contest:started` | Server → Client | Yes |
| `/contest` | `contest:clarification` | Server → Client | Yes |
| `/contest` | `contest:leaderboard` | Server → Client | Yes |
| `/contest` | `contest:finished` | Server → Client | Yes |
| `/leaderboard` | `leaderboard:global` | Server → Client | Yes |
| `/notifications` | `joinContestRoom` | Client → Server | Yes |
| `/notifications` | `leaveContestRoom` | Client → Server | Yes |
| `/notifications` | `notification` | Server → Client | Yes |
| `/notifications` | `broadcast` | Server → Client | Yes |
| `/notifications` | `contestClarification` | Server → Client | Yes |
