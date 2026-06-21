<!-- # Contest Endpoints — Response Shapes

> All endpoints require `Authorization: Bearer <token>` header and `role: student`.
> Base URL: `http://localhost:3000/api/v1`

---

## 1. Get Contests List

**`GET /student-contest?classId={classId}&status={status}`**

`status` options: `UPCOMING` | `ONGOING` | `REGISTERED` | `HISTORY`

```json
[
  {
    "classId":        "uuid",
    "contestId":      "uuid",
    "studentContestId": "uuid",   // only present in HISTORY response
    "startTime":      "2025-01-01T10:00:00.000Z",
    "status":         "UPCOMING",
    "isRegistered":   false,
    "title":          "Math Contest - Chapter 3",
    "playersCount":   12,
    "joinedFriends": [
      {
        "id":        "uuid",
        "first_name": "Ali",
        "middleName": "Hassan",
        "lastName":   "Omar",
        "avatarUrl":  "https://...",
        "level":      3
      }
    ]
  }
]
```

---

## 2. Get Contest Lobby

**`GET /student-contest/class/{classId}/contest/{contestId}`**

```json
{
  "contestTitle":       "Math Contest - Chapter 3",
  "subject":            "Mathematics",
  "difficulty":         "easy",
  "skills":             ["Algebra", "Geometry"],
  "contestStartingTime": "2025-01-01T10:00:00.000Z",
  "contestTimeLimit":   30,
  "contestStatus":      "UPCOMING",
  "isRegistered":       false,
  "xpGained":           0,
  "registeredStudents": [
    {
      "id":         "uuid",
      "firstName":  "Sara",
      "middleName": "Ahmed",
      "lastName":   "Khalil",
      "avatarUrl":  "https://...",
      "level":      5
    }
  ],
  "joinedFriends": [
    {
      "id":         "uuid",
      "first_name": "Ali",
      "middleName": "Hassan",
      "lastName":   "Omar",
      "avatarUrl":  "https://...",
      "level":      3
    }
  ]
}
```

---

## 3. Register for Contest

**`PATCH /student-contest/class/{classId}/contest/{contestId}/register`**

```json
{ "status": "success", "message": "Student registered successfully!" }
```

Already registered:
```json
{ "message": "Student already registered!" }
```

---

## 4. Start Contest

**`PATCH /student-contest/class/{classId}/contest/{contestId}/start`**

> ⚠️ Save `studentContestId` — it's required for all endpoints below.

```json
{
  "status":            "success",
  "message":           "Student started the contest successfully!",
  "studentContestId":  "uuid"
}
```

---

## 5. Get Questions List

**`GET /student-contest/{studentContestId}/questions`**

```json
[
  {
    "questionId": "uuid",
    "order":      1,
    "isAnswered": false,
    "isFlaged":   false
  },
  {
    "questionId": "uuid",
    "order":      2,
    "isAnswered": true,
    "isFlaged":   true
  }
]
```

---

## 6. Get Single Question

**`GET /student-contest/{studentContestId}/question/{questionId}`**

```json
{
  "questionId":   "uuid",
  "questionText": "What is the value of x in 2x + 4 = 10?",
  "options": {
    "a": "2",
    "b": "3",
    "c": "4",
    "d": "5"
  },
  "answer":   null,     // student's submitted answer (null if not answered yet)
  "score":    null,     // null until contest is finished
  "isFlaged": false
}
```

---

## 7. Submit Answer

**`POST /student-contest/{studentContestId}/question/{questionId}`**

Request body:
```json
{ "answer": "b" }
```

Response:
```json
{ "status": "success", "message": "Answer submitted successfully!" }
```

---

## 8. Toggle Question Flag

**`PATCH /student-contest/{studentContestId}/question/{questionId}`**

No body needed. Toggles `isFlaged` on/off.

```json
{ "status": "success", "message": "Question flag toggled successfully!" }
```

---

## 9. Finish Contest

**`GET /student-contest/{studentContestId}/finish`**

```json
{ "status": "success", "message": "Contest finished successfully!" }
```

---

## 10. Get Contest Summary

**`GET /student-contest/{studentContestId}/summary`**

```json
{
  "finalScore":  85,
  "speedBonus":  10,
  "xpGained":    120,
  "skillImpacted": [
    { "skill": "Algebra",  "accuracy": "80%" },
    { "skill": "Geometry", "accuracy": "60%" }
  ]
}
```

---

## 11. Get Detailed Summary

**`GET /student-contest/{studentContestId}/detailed-summary`**

```json
{
  "finalScore":            85,
  "rank":                  2,
  "xpGained":              120,
  "correctQuestionsCount": 8,
  "totalQuestionsCount":   10,
  "questions": [
    {
      "questionId":    "uuid",
      "order":         1,
      "skill":         "Algebra",
      "difficulty":    "easy",
      "questionText":  "What is the value of x in 2x + 4 = 10?",
      "options": {
        "a": "2",
        "b": "3",
        "c": "4",
        "d": "5"
      },
      "answer":        "b",
      "correctAnswer": "b",
      "score":         10
    }
  ]
}
```

---

## 12. Get Contest Rank

**`GET /student-contest/{studentContestId}/rank`**

```json
[
  {
    "id":         "uuid",
    "first_name": "Sara",
    "middleName": "Ahmed",
    "lastName":   "Khalil",
    "avatarUrl":  "https://...",
    "score":      95,
    "level":      5
  },
  {
    "id":         "uuid",
    "first_name": "Ali",
    "middleName": "Hassan",
    "lastName":   "Omar",
    "avatarUrl":  "https://...",
    "score":      85,
    "level":      3
  }
]
```

---

## Difficulty Values

| Value | Description |
|---|---|
| `"easy"` | Easy |
| `"medium"` | Medium |
| `"hard"` | Hard |
| `"extra_hard"` | Extra Hard |

## Contest Status Values

| Value | When |
|---|---|
| `"UPCOMING"` | Contest hasn't started yet |
| `"ONGOING"` | Contest is currently live |
| `"FINISHED"` | Contest has ended |

## Student Contest Status Values

| Value | When |
|---|---|
| `"REGISTERED"` | Student registered, not started yet |
| `"IN_PROGRESS"` | Student started the contest |
| `"FINISHED"` | Student finished the contest |
 -->


app
└── (app)
    └── contests
        ├── page.js
        ├── [classId]
        │   └── [contestId]
        │       └── page.js
        ├── play
        │   └── [studentContestId]
        │       └── page.js
        └── summary
            └── [studentContestId]
                └── page.js

                

# Student Contest API Documentation

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
}
```