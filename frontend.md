# Contest Endpoints — Response Shapes

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

                