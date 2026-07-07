# 22. Question Bank

## Overview

The question bank is the most fully-featured teacher tool. It allows teachers to create, edit, search, and manage questions, generate questions with AI, and attach questions to contests.

## Page Structure

```
/teacher/qBank               → Question list + workspace
/teacher/qBank/add           → Add question (modal overlay)
/teacher/qBank/[id]/edit     → Edit question (modal overlay)
/teacher/qBank/[id]/use      → Use question (placeholder)
```

## Question Bank Page (`/teacher/qBank`)

**File:** `src/app/(app)/teacher/qBank/page.tsx`

A server component that:
1. Fetches questions (`getQuestionsAction` or `getMyQuestionsAction`)
2. Fetches subjects (`getAllSubjectsAction`)
3. Fetches grades (`getAllGradesAction`)
4. Renders `TeacherQuestionBankPage` → `TeacherQuestionBankWorkspace`

### Workspace Layout

```
┌─────────────────────────────────────────────────┐
│  ReusableWindow: "QUESTION BANK"                │
│                                                 │
│  ┌─── Filters Bar ────────────────────────────┐ │
│  │ [Scope: All/My] [Subject ▼] [Difficulty ▼] │ │
│  │ [Grade ▼] [Term ▼] [Search...] [+ADD]     │ │
│  └─────────────────────────────────────────────┘ │
│                                                 │
│  ┌─── Questions Grid ─────────────────────────┐ │
│  │ ┌──────────────┐ ┌──────────────┐          │ │
│  │ │ Question Card │ │ Question Card │          │ │
│  │ │ Subject: Math │ │ Subject: Sci │          │ │
│  │ │ Difficulty:  │ │ Difficulty:  │          │ │
│  │ │ Medium       │ │ Hard         │          │ │
│  │ │ [Edit] [Use] │ │ [Edit] [Use] │          │ │
│  │ └──────────────┘ └──────────────┘          │ │
│  │ ...                                        │ │
│  └─────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────┘
```

### Filters

The workspace provides a rich filtering system:

| Filter | Type | Source |
|---|---|---|
| **Scope** | Toggle | All questions vs My questions |
| **Subject** | Dropdown | From `getAllSubjectsAction()` |
| **Difficulty** | Dropdown | EASY, MEDIUM, HARD, EXTRA_HARD |
| **Grade** | Dropdown | From `getAllGradesAction()` |
| **Term** | Dropdown | Term selection (1, 2) |
| **Search** | Text input | Keyword search across questions |

### TeacherQuestionCard

**File:** `src/components/teacher/question-bank/TeacherQuestionCard.tsx`

Each question card displays:
- Question text (truncated)
- Subject icon
- Difficulty badge (color-coded)
- Grade level
- Skill tags
- Action buttons: Edit, Use (in contest)

### TeacherQuestionEditorModal

**File:** `src/components/teacher/question-bank/TeacherQuestionEditorModal.tsx`

A modal dialog used for both **add** and **edit** modes:

| Mode | Route | Behavior |
|---|---|---|
| **Add** | `/teacher/qBank/add` | Empty form, creates new question |
| **Edit** | `/teacher/qBank/[id]/edit` | Pre-filled with question data via `getQuestionForAdminAction(id)` |

The modal includes:
- **Question text** (textarea)
- **Answer options** (A, B, C, D — 4 text inputs)
- **Correct answer** selector (radio buttons for A/B/C/D)
- **Subject** selector
- **Difficulty** selector
- **Grade** selector
- **Skill tags** input
- **AI Generate button** — generates question content via `aiGenerateQuestionAction`
- Save / Cancel buttons

## CRUD Operations

### Create
```js
// Action
createQuestionAction(data)
// Service
api.post(ENDPOINTS.questions.create, data)
```

### Read
```js
// List all
getQuestionsAction(query)          → api.get(ENDPOINTS.questions.list(query))
// My questions only
getMyQuestionsAction(query)        → api.get(ENDPOINTS.questions.myList(query))
// Single question (admin/teacher view)
getQuestionForAdminAction(id)      → api.get(ENDPOINTS.questions.byIdAdmin(id))
// Single question (student view)
getQuestionForStudentAction(id)    → api.get(ENDPOINTS.questions.byIdStudent(id))
```

### Update
```js
updateQuestionAction(id, data)     → api.patch(ENDPOINTS.questions.update(id), data)
```

### Delete
```js
deleteQuestionAction(id)           → api.delete(ENDPOINTS.questions.delete(id))
```

## AI Generation

The question bank supports **AI-powered question generation**:

```js
aiGenerateQuestionAction(data)
// Service:
api.post(ENDPOINTS.questions.aiGenerate, data)
```

This sends a prompt to the backend which generates a complete question (text + options + correct answer) using AI. The teacher can then review and save the generated question.

## Contest Integration

Questions can be attached to contests:

| Action | Description |
|---|---|
| `addQuestionToContestAction(contestId, data)` | Add existing question to contest |
| `createAndAttachQuestionToContestAction(contestId, data)` | Create new question + attach to contest |
| `getContestQuestionsAction(contestId)` | List all questions in a contest |
| `getContestQuestionByOrderAction(contestId, order)` | Get question by contest order index |
| `getQuestionContestStatsAction(questionId, contestId)` | Get per-question stats |

## Complete Actions Reference

| Action | Description |
|---|---|
| `createQuestionAction(data)` | Create new question |
| `aiGenerateQuestionAction(data)` | AI-generate a question |
| `getQuestionsAction(query)` | List public questions |
| `getMyQuestionsAction(query)` | List current teacher's questions |
| `getQuestionForStudentAction(id)` | Get question (student view) |
| `getQuestionForAdminAction(id)` | Get question (admin/teacher view) |
| `updateQuestionAction(id, data)` | Update question |
| `deleteQuestionAction(id)` | Delete question |
| `addQuestionToContestAction(contestId, data)` | Add question to contest |
| `createAndAttachQuestionToContestAction(contestId, data)` | Create + attach to contest |
| `getQuestionContestStatsAction(questionId, contestId)` | Get stats for question in contest |
| `getContestQuestionsAction(contestId)` | List contest questions |
| `getContestQuestionByOrderAction(contestId, order)` | Get contest question by order |

## Related Endpoints

```js
questions: {
  create:                   `${v}/questions`,
  aiGenerate:               `${v}/questions/ai-generate`,
  list:                     (query) => `${v}/questions${query}`,
  myList:                   (query) => `${v}/questions/me${query}`,
  byIdStudent:              (id) => `${v}/questions/${id}/student`,
  byIdAdmin:                (id) => `${v}/questions/${id}/admin`,
  update:                   (id) => `${v}/questions/${id}`,
  delete:                   (id) => `${v}/questions/${id}`,
  addToContest:             (contestId) => `${v}/questions/contest/${contestId}`,
  createAndAttachToContest: (contestId) => `${v}/questions/contest/${contestId}/add-and-attach`,
  stats:                    (questionId, contestId) => `${v}/questions/${questionId}/contest/${contestId}/stats`,
  listByContest:            (contestId) => `${v}/questions/contest/${contestId}`,
  getByContestOrder:        (contestId, order) => `${v}/questions/contest/${contestId}/${order}`,
}
```
