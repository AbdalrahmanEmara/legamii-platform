# Questions API — Endpoints & Responses

Base URL: `/questions`

---

## 1. POST /questions

**Roles:** teacher, admin

**Request Body:**
```json
{
  "subject_id": "uuid",
  "grade_id": "uuid",
  "difficulty": "string",
  "lesson": "string",
  "term": 1,
  "question_text": "string",
  "options": ["opt1", "opt2", "opt3", "opt4"],
  "correct_answer": "opt1",
  "tags": ["tag1", "tag2"]
}
```

**Response (201):**
```json
{
  "message": "Question created successfully",
  "question_id": "uuid"
}
```

---

## 2. POST /questions/ai-generate

**Roles:** teacher, admin

**Request Body:**
```json
{
  "subject_id": "uuid",
  "grade_id": "uuid",
  "term": 1,
  "lesson": "string",
  "difficulty": "string"
}
```

**Response (201):**
```json
{
  "message": "Question created successfully",
  "question": {
    "id": "uuid",
    "creator_id": "uuid|null",
    "subject_id": "uuid",
    "grade_id": "uuid",
    "term": 1,
    "lesson": "string",
    "difficulty": "string",
    "question_text": "What is the capital of France?",
    "options": ["Paris", "London", "Berlin", "Madrid"],
    "correct_answer": "Paris",
    "tags": null,
    "generated_by_ai": true,
    "created_at": "2026-01-01T00:00:00.000Z"
  }
}
```

---

## 3. GET /questions

**Roles:** teacher, admin

**Query Params:** `?subject_id=&grade_id=&difficulty=&term=&lesson=&tags=&search=&page=1&limit=20`

**Response (200):**
```json
{
  "data": [
    {
      "id": "uuid",
      "creator_id": "uuid|null",
      "subject_id": "uuid",
      "subject_tag_id": "uuid|null",
      "grade_id": "uuid",
      "term": 1,
      "lesson": "string",
      "difficulty": "string",
      "question_text": "string",
      "options": ["string"],
      "correct_answer": "string",
      "tags": ["string"] | null,
      "generated_by_ai": false,
      "created_at": "2026-01-01T00:00:00.000Z"
    }
  ],
  "total": 100
}
```

---

## 4. GET /questions/me

**Roles:** teacher

**Query Params:** same as `GET /questions`

**Response (200):** — Same shape as `GET /questions` but filtered to current teacher's own questions.

```json
{
  "data": [ /* same question shape */ ],
  "total": 50
}
```

---

## 5. GET /questions/:id/student

**Roles:** student

**Response (200):**
```json
{
  "id": "uuid",
  "question_text": "string",
  "options": ["string"]
}
```
> Note: `correct_answer` is **NOT** returned to students.

---

## 6. GET /questions/:id/admin

**Roles:** admin, teacher

**Response (200):**
```json
{
  "id": "uuid",
  "question_text": "string",
  "options": ["string"],
  "correct_answer": "string",
  "difficulty": "string",
  "lesson": "string",
  "term": 1,
  "tags": ["string"] | null,
  "generated_by_ai": false,
  "creator": {
    "id": "uuid",
    "user": {
      "firstName": "string",
      "lastName": "string"
    }
  },
  "subject": {
    "id": "uuid",
    "name": "string"
  },
  "grade": {
    "id": "uuid",
    "name": "string"
  }
}
```

---

## 7. PATCH /questions/:id

**Roles:** teacher, admin

**Request Body** (all fields optional):
```json
{
  "subject_id": "uuid",
  "grade_id": "uuid",
  "difficulty": "string",
  "lesson": "string",
  "term": 1,
  "question_text": "string",
  "options": ["string"],
  "correct_answer": "string",
  "tags": ["string"]
}
```

**Response (200):** Returns the updated full question object:
```json
{
  "id": "uuid",
  "creator_id": "uuid|null",
  "subject_id": "uuid",
  "subject_tag_id": "uuid|null",
  "grade_id": "uuid",
  "term": 1,
  "lesson": "string",
  "difficulty": "string",
  "question_text": "string",
  "options": ["string"],
  "correct_answer": "string",
  "tags": ["string"] | null,
  "generated_by_ai": false,
  "created_at": "2026-01-01T00:00:00.000Z"
}
```

---

## 8. DELETE /questions/:id

**Roles:** teacher, admin

**Response (200):** No content body returned (204 style). Question is soft-detached from contests via `deleteMany` on `contest_Questions`.

---

## 9. POST /questions/contest/:contestId

**Roles:** teacher

**Request Body:**
```json
{
  "question_id": "uuid",
  "order": 1
}
```

**Response (200):**
```json
{
  "message": "Question added to contest"
}
```

---

## 10. POST /questions/contest/:contestId/add-and-attach

**Roles:** teacher

Creates a new question AND attaches it to the contest in one call.

**Request Body:**
```json
{
  "subject_id": "uuid",
  "grade_id": "uuid",
  "difficulty": "string",
  "lesson": "string",
  "term": 1,
  "question_text": "string",
  "options": ["string"],
  "correct_answer": "string",
  "tags": ["string"],
  "order": 1
}
```

**Response (200):**
```json
{
  "message": "Question created and attached to contest successfully",
  "question": {
    "id": "uuid",
    "question_text": "string",
    "options": ["string"],
    "correct_answer": "string",
    "order": 1
  }
}
```

---

## 11. POST /questions/:questionId/contest/:contestId/stats

**Roles:** teacher

**Response (200):**
```json
{
  "question_id": "uuid",
  "contest_id": "uuid",
  "attempts": 42,
  "correct": 30,
  "wrong": 12,
  "accuracy": 0.7142857142857143
}
```

---

## 12. GET /questions/contest/:contestId

**Roles:** student

Returns the list of questions in a contest with their answer status for the current student.

**Response (200):**
```json
[
  {
    "order": 1,
    "question_id": "uuid",
    "answered": true
  },
  {
    "order": 2,
    "question_id": "uuid",
    "answered": false
  }
]
```

---

## 13. GET /questions/contest/:contestId/:order

**Roles:** student

Returns a single question by its order number in the contest.

**Response (200):**
```json
{
  "order": 1,
  "question_id": "uuid",
  "question_text": "string",
  "options": ["string"],
  "saved_answer": "string|null"
}
```
> Note: `correct_answer` is **NOT** included. `saved_answer` is the student's previously saved answer if any.

---

---

# Supporting Endpoints (Reference Data for Questions)

These endpoints provide the enum/reference data you need to populate dropdowns when creating/filtering questions.

---

## A. GET /subjects

**Roles:** teacher, admin

Returns all subjects (used for `subject_id` dropdown).

**Response (200):**
```json
{
  "data": [
    {
      "id": "uuid",
      "name": "Mathematics",
      "grades": [
        { "id": "uuid", "name": "Grade 1", "level": 1 }
      ]
    }
  ],
  "total": 10
}
```

---

## B. GET /subjects/student

**Roles:** student

Returns subjects filtered to the student's own grade.

**Response (200):**
```json
[
  {
    "id": "uuid",
    "name": "Mathematics",
    "grade": {
      "id": "uuid",
      "name": "Grade 5"
    },
    "subject_tags": [
      { "id": "uuid", "skill": "Addition" }
    ]
  }
]
```

---

## C. GET /grades

**Roles:** teacher, admin

Returns all grades (used for `grade_id` dropdown).

**Response (200):**
```json
{
  "data": [
    {
      "id": "uuid",
      "name": "Grade 5",
      "level": 5,
      "subjects": [
        { "id": "uuid", "name": "Mathematics" }
      ]
    }
  ],
  "total": 12
}
```

---

## D. GET /grades/:id/subjects

**Roles:** student, teacher, admin

Returns subjects for a specific grade.

**Response (200):**
```json
{
  "data": [
    {
      "id": "uuid",
      "name": "Mathematics"
    }
  ],
  "total": 6
}
```

---

## E. Enums / Constants

These are the valid string values used across the question API:

| Field | Valid Values |
|-------|-------------|
| `difficulty` | `easy`, `medium`, `hard`, `extra_hard` |
| `term` | `1` or `2` |
| `role` | `admin`, `teacher`, `student`, `parent`, `super_admin` |

---

## Common Error Responses

**400 Bad Request:**
```json
{
  "message": "Options must be at least 2",
  "error": "Bad Request",
  "statusCode": 400
}
```

**403 Forbidden:**
```json
{
  "message": "You are not authorized to update this question",
  "error": "Forbidden",
  "statusCode": 403
}
```

**404 Not Found:**
```json
{
  "message": "Question not found",
  "error": "Not Found",
  "statusCode": 404
}
```