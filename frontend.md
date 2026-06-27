<!-- # Student Contest API Documentation

Base URL: `/api/v1`

All endpoints require **JWT authentication** and the **student role**.

---

## Enums / Constants

```ts
enum ContestStatus         { UPCOMING = 'UPCOMING', ONGOING = 'ONGOING', FINISHED = 'FINISHED' }
enum StudentContestStatus  { REGISTERED = 'REGISTERED', IN_PROGRESS = 'IN_PROGRESS', FINISHED = 'FINISHED' }
enum ContestFilter         { UPCOMING = 'UPCOMING', REGISTERED = 'REGISTERED', ONGOING = 'ONGOING', HISTORY = 'HISTORY' }
enum Difficulty            { EASY = 'easy', MEDIUM = 'medium', HARD = 'hard', EXTRA_HARD = 'extra_hard' }
```

---

## Shared Response Types

```ts
interface ResponseFriendRequestDto {
    id: string;
    first_name: string;
    middleName: string;
    lastName: string;
    avatarUrl: string;
    level: number;
}

interface ResponseRegisteredStudentDto {
    id: string;
    firstName: string;
    middleName: string;
    lastName: string;
    avatarUrl: string;
    level: number;
}
```

---

## Endpoints

### 1. List Contests

```
GET /api/v1/student-contest?classId=&status=
```

| Query Param | Type | Required | Description |
|-------------|------|----------|-------------|
| `classId` | string | No | Filter by class |
| `status` | `ContestFilter` | **Yes** | UPCOMING \| ONGOING \| REGISTERED \| HISTORY |

**Response:** `ResponseContestsDto[]`

```ts
{
    contestId: string;
    title: string;
    startTime: Date;
    classId: string;
    classNumber: string;
    grade: string;
    subject: string;
    difficulty: string;
    status: ContestFilter;
    playersCount: number;
    studentContestId?: string;    // present when status = REGISTERED | HISTORY
    isRegistered?: boolean;       // present when status = UPCOMING | ONGOING
    joinedFriends: ResponseFriendRequestDto[];
}
```

---

### 2. Get Contest Lobby

```
GET /api/v1/student-contest/class/:classId/contest/:contestId
```

| Path Param | Type | Description |
|------------|------|-------------|
| `classId` | string | Class ID |
| `contestId` | string | Contest ID |

**Guards:** +StudentInClassGuard

**Response:** `ResponseContestLobbyDto`

```ts
{
    contestTitle: string;
    subject: string;
    difficulty: Difficulty;   // easy | medium | hard | extra_hard
    skills: string[];
    contestStartingTime: Date;
    contestTimeLimit: number;  // minutes
    contestStatus: ContestStatus;  // UPCOMING | ONGOING | FINISHED
    isRegistered: boolean;
    xpGained: number;
    registeredStudents: ResponseRegisteredStudentDto[];
    joinedFriends: ResponseFriendRequestDto[];
}
```

---

### 3. Register for Contest

```
PATCH /api/v1/student-contest/class/:classId/contest/:contestId/register
```

| Path Param | Type | Description |
|------------|------|-------------|
| `classId` | string | Class ID |
| `contestId` | string | Contest ID |

**Body:** None

**Guards:** +StudentInClassGuard, ContestInClassGuard

**Response:**

```ts
{ status: 'success', message: 'Student registered successfully!' }

// If already registered:
{ message: 'Student already registered!' }
```

---

### 4. Start Contest

```
PATCH /api/v1/student-contest/class/:classId/contest/:contestId/start
```

| Path Param | Type | Description |
|------------|------|-------------|
| `classId` | string | Class ID |
| `contestId` | string | Contest ID |

**Body:** None

**Guards:** +StudentInClassGuard, ContestInClassGuard

**Response:**

```ts
{
    status: 'success',
    message: 'Student started the contest successfully!',
    studentContestId: string
}
```

---

### 5. List Contest Questions (Metadata)

```
GET /api/v1/student-contest/:studentContestId/questions
```

| Path Param | Type | Description |
|------------|------|-------------|
| `studentContestId` | string | Student contest ID |

**Response:** `ResponseContestQuestionsDto[]`

```ts
{
    questionId: string;
    order: number;       // 1-based question order
    isAnswered: boolean;
    isFlaged: boolean;   // note: typo in source (Flaged vs Flagged)
}[]
```

---

### 6. Get Single Question Detail

```
GET /api/v1/student-contest/:studentContestId/question/:questionId
```

| Path Param | Type | Description |
|------------|------|-------------|
| `studentContestId` | string | Student contest ID |
| `questionId` | string | Question ID |

**Response:** `ResponseQuestionDto`

```ts
{
    questionId: string;
    questionText: string;
    options: { a: string; b: string; c: string; d: string };
    answer: string;        // student's submitted answer (if any)
    score: number;         // max score for this question
    isFlaged: boolean;
}
```

---

### 7. Submit Answer

```
POST /api/v1/student-contest/:studentContestId/question/:questionId
```

| Path Param | Type | Description |
|------------|------|-------------|
| `studentContestId` | string | Student contest ID |
| `questionId` | string | Question ID |

**Request Body:**

```ts
{ "answer": string }  // required, non-empty
```

**Response:**

```ts
{ status: 'success', message: 'Answer submitted successfully' }
```

---

### 8. Toggle Question Flag

```
PATCH /api/v1/student-contest/:studentContestId/question/:questionId
```

| Path Param | Type | Description |
|------------|------|-------------|
| `studentContestId` | string | Student contest ID |
| `questionId` | string | Question ID |

**Body:** None

**Response:**

```ts
{ status: 'success', message: 'flag updated successfully' }
```

---

### 9. Finish Contest

```
GET /api/v1/student-contest/:studentContestId/finish
```

| Path Param | Type | Description |
|------------|------|-------------|
| `studentContestId` | string | Student contest ID |

**Response:**

```ts
{ status: 'success', message: 'Contest finished successfully' }
```

Triggers score calculation, XP/level update, and streak update.

---

### 10. Get Contest Summary

```
GET /api/v1/student-contest/:studentContestId/summary
```

| Path Param | Type | Description |
|------------|------|-------------|
| `studentContestId` | string | Student contest ID |

**Response:** `ResponseContestSummaryDto`

```ts
{
    finalScore: number;
    speedBonus: number;
    xpGained: number;
    skillImpacted: {
        skill: string;
        accuracy: number;   // percentage (0-100)
    }[];
}
```

---

### 11. Get Detailed Summary

```
GET /api/v1/student-contest/:studentContestId/detailed-summary
```

| Path Param | Type | Description |
|------------|------|-------------|
| `studentContestId` | string | Student contest ID |

**Response:** `ResponseContestDetailedSummaryDto`

```ts
{
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
        answer: string;           // student's answer
        correctAnswer: string;
        score: number;            // points earned
    }[];
}
```

---

### 12. Get Contest Leaderboard

```
GET /api/v1/student-contest/:studentContestId/rank
```

| Path Param | Type | Description |
|------------|------|-------------|
| `studentContestId` | string | Student contest ID |

**Response:** `ResponseContestRankDto[]`

```ts
{
    id: string;
    first_name: string;
    middleName: string;
    lastName: string;
    avatarUrl: string;
    score: number;
    level: number;
}[]
```

---

### 13. Get My Contest History

```
GET /api/v1/student/me/contests
```

**Response:** `ResponseStudentContestsDto`

```ts
{
    contests: {
        id: string;
        contest_title: string;
        class_id: string;
        status: string;
        score: number;
        speedBonus: number;
        rank?: number;
        started_at?: Date;
        finished_at?: Date;
    }[];
}
```

---

### 14. Get My Statistics

```
GET /api/v1/student/me/statistics
```

**Response:** `ResponseStudentStatisticsDto`

```ts
{
    total_contests: number;
    average_contest_score: number;
    best_contest_score: number;
    total_quizzes: number;
    average_quiz_score: number;
    total_active_days: number;
    current_streak: number;
    best_streak: number;
} -->
```


//////////////////////////////////////////////////////////////////////////////////



```md
# Notifications

Base URL: `/api/v1`

All endpoints require **JWT authentication**.

Some endpoints additionally require elevated roles:
- **Admin role** for broadcast creation
- **Teacher role** for contest clarification creation

---

## Socket.IO Realtime

Namespace: `/notifications`

Connection URL:
```ts
ws://localhost:3000/notifications
```

Authentication format:
```ts
{
  auth: {
    token: "JWT_TOKEN"
  }
}
```

### User Room
After connection, the client automatically joins:

```ts
user:{userId}
```

### Contest Room
Clients must manually join contest rooms to receive contest clarification events.

#### Join
```ts
socket.emit('joinContestRoom', { contestId: string })
```

#### Leave
```ts
socket.emit('leaveContestRoom', { contestId: string })
```

### Server Events

#### `notification`
```ts
{
  id: string;
  user_id: string;
  title: string;
  message: string;
  type: string;
  metadata: Record<string, any>;
  is_read: boolean;
  created_at: Date;
}
```

#### `broadcast`
```ts
{
  id: string;
  title: string;
  message: string;
  type: string;
  metadata: Record<string, any>;
  created_at: Date;
}
```

#### `contestClarification`
```ts
{
  id: string;
  contestId: string;
  message: string;
  teacherName: string;
  createdAt: Date;
}
```

---

## Shared Response Types

```ts
interface ResponseNotificationDto {
  id: string;
  user_id: string;
  title: string;
  message: string;
  type: string;
  metadata: Record<string, any>;
  is_read: boolean;
  created_at: Date;
}

interface ResponseBroadcastDto {
  id: string;
  title: string;
  message: string;
  type: string;
  metadata: Record<string, any>;
  created_at: Date;
  is_read?: boolean;
}

interface ResponseContestClarificationDto {
  id: string;
  contestId: string;
  message: string;
  teacherName: string;
  createdAt: Date;
}

interface ResponsePaginatedNotificationsDto {
  data: ResponseNotificationDto[];
  page: number;
  limit: number;
  total: number;
}

interface ResponseUnreadCountDto {
  count: number;
}

interface ResponseMessageDto {
  message: string;
}
```

---

## Endpoints

### 1. Get Notifications

```http
GET /api/v1/notifications?page=&limit=
```

| Query Param | Type | Required | Description |
|-------------|------|----------|-------------|
| `page` | number | No | Page number |
| `limit` | number | No | Number of items per page |

**Response:** `ResponsePaginatedNotificationsDto`

```ts
{
  data: [
    {
      id: string;
      user_id: string;
      title: string;
      message: string;
      type: string;
      metadata: Record<string, any>;
      is_read: boolean;
      created_at: Date;
    }
  ];
  page: number;
  limit: number;
  total: number;
}
```

---

### 2. Get Unread Count

```http
GET /api/v1/notifications/unread-count
```

**Response:** `ResponseUnreadCountDto`

```ts
{
  count: number;
}
```

---

### 3. Mark Notification as Read

```http
PATCH /api/v1/notifications/:notificationId/read
```

| Path Param | Type | Description |
|------------|------|-------------|
| `notificationId` | string | Notification ID |

**Response:** `ResponseMessageDto`

```ts
{
  message: string;
}
```

---

### 4. Mark All Notifications as Read

```http
PATCH /api/v1/notifications/read-all
```

**Response:** `ResponseMessageDto`

```ts
{
  message: string;
}
```

---

### 5. Get Broadcasts

```http
GET /api/v1/notifications/broadcasts
```

**Response:** `ResponseBroadcastDto[]`

```ts
[
  {
    id: string;
    title: string;
    message: string;
    type: string;
    metadata: Record<string, any>;
    created_at: Date;
    is_read: boolean;
  }
]
```

---

### 6. Mark Broadcast as Read

```http
PATCH /api/v1/notifications/broadcasts/:broadcastId/read
```

| Path Param | Type | Description |
|------------|------|-------------|
| `broadcastId` | string | Broadcast ID |

**Response:** `ResponseMessageDto`

```ts
{
  message: string;
}
```

---

### 7. Admin: Broadcast Notification

```http
POST /api/v1/notifications/broadcast
```

**Role:** Admin

**Body:**
```ts
{
  title: string;
  message: string;
  type: string;
}
```

**Response:** `ResponseBroadcastDto`

```ts
{
  id: string;
  title: string;
  message: string;
  type: string;
  metadata: Record<string, any>;
  created_at: Date;
}
```

**Realtime Effect:**
Emits `broadcast` to connected users.

---

### 8. Teacher: Send Contest Clarification

```http
POST /api/v1/notifications/contest-clarification
```

**Role:** Teacher

**Body:**
```ts
{
  contestId: string;
  message: string;
}
```

**Response:** `ResponseContestClarificationDto`

```ts
{
  id: string;
  contestId: string;
  message: string;
  teacherName: string;
  createdAt: Date;
}
```

**Notes:**
- Teacher must own the contest
- Message is emitted to the contest room
- Email is sent to all participants

**Realtime Effect:**
Emits `contestClarification` to the joined contest room.

---

### 9. Get Contest Clarification

```http
GET /api/v1/notifications/contest-clarification/:contestId
```

| Path Param | Type | Description |
|------------|------|-------------|
| `contestId` | string | Contest ID |

**Response:** `ResponseContestClarificationDto`

```ts
{
  id: string;
  contestId: string;
  message: string;
  teacherName: string;
  createdAt: Date;
}
```
```

A few important notes:
- I used your preferred concise style.
- I changed the base path from `{{baseUrl}}/...` to `/api/v1/...` to match your example.
- I did not mark all endpoints as student-only, because the folder clearly contains:
  - normal authenticated user endpoints
  - admin-only endpoint
  - teacher-only endpoint

If you want, I can now do either of these next:
- make this into 9 separate `.md` files, one per endpoint
- make the same style docs for another folder
- refine this further with exact DTO names and enums for notifications, broadcasts, and clarification types

