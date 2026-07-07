# 17. Practice Quiz System

## Overview

The practice quiz system lets students test their knowledge on various subjects. Students pick a subject, start a timed quiz, answer questions one by one with instant feedback, and review their results at the end.

## Flow Diagram

```
/practice (server)
  │ getQuizListAction() → subjects with mastery data
  │
  ├── StartQuizButton (form action = startQuizAction)
  │     │ POST /quiz { subject_id, difficulty, tags }
  │     │ redirect /practice/{quizId}
  │     ▼
  │
  /practice/[quiz_id] (server)
  │   getQuestions(quiz_id) → questionId list
  │
  └── PracticePage (client)
        │ useEffect → getQuestionAction(quizId, id) lazy-loads each question
        │
        ├── AnswerOption (click → optimistic UI → solveQuestionAction)
        ├── ProgressBar (current / total)
        ├── Timer (90 seconds → auto-finish)
        │
        ├── handleFinish → finishQuizAction → setFinished(true)
        │
        └── SummaryPage (client)
              │ getQuizByIdAction → graded data
              │
              └── QuestionReviewCard (correct/incorrect highlighting)
                    └── AiTutorModal (Claude-powered explanation)
```

## Page Details

### 1. Subject Selection (`/student/practice`)

**File:** `src/app/(app)/student/practice/page.js`

A server component that fetches the student's subjects with mastery data:

```js
const subjects = await getQuizListAction();
// Each subject has:
// { name, id, lastAttemptAccuracy, attempted, streak, masteryLevel, status, tags }
```

Renders a subject card list inside `ReusableWindow`:
- Subject name
- Accuracy percentage (from last attempt)
- Streak count
- Mastery level (0-100)
- Status badges per skill tag
- **Start Quiz button** for each subject

### 2. Start Quiz Button

**File:** `src/components/practice/StartQuizButton.js`

A server component that renders a form bound to `startQuizAction`:

```jsx
<form action={startQuizAction}>
  <input type="hidden" name="subject_id" value={subject.id} />
  <input type="hidden" name="difficulty" value={difficulty} />
  <input type="hidden" name="subjectTagsMasteryLevel" value={JSON.stringify(tags)} />
  <Btn1 type="submit">Start Quiz</Btn1>
</form>
```

The action calls `startQuiz()` which creates a quiz session and returns a `quizId`, then the action **redirects** to `/practice/{quizId}`.

### 3. Active Quiz (`/student/practice/[quiz_id]`)

**File:** `src/app/(app)/student/practice/[quiz_id]/page.js`

A "server wrapper + client component" pattern:

- The **server page** fetches initial question metadata: `getQuestions(quiz_id)` → array of `{ questionId }`
- Passes the data to **`PracticePage`** (client component)

### 4. PracticePage (Client)

**File:** `src/components/practice/` (integrated into the page)

The main quiz interface manages:

#### State
```js
const [currentIndex, setCurrentIndex] = useState(0);
const [selected, setSelected] = useState(null);
const [finished, setFinished] = useState(false);
const [secondsLeft, setSecondsLeft] = useState(QUIZ_DURATION); // 90
```

#### Lazy-Loaded Questions
Questions are fetched one at a time as the student progresses:

```js
useEffect(() => {
  getQuestionAction(quizId, questions[currentIndex].questionId)
    .then(setCurrentQuestion);
}, [currentIndex]);
```

This prevents all answers from being sent to the client upfront.

#### Answer Submission
When the student clicks an option (A/B/C/D):

1. **Optimistic UI** — `setSelected(answer)` highlights the choice immediately
2. **On "Next"** — calls `solveQuestionAction(quizId, questionId, { answer })` to submit
3. **Increments** `currentIndex` to load the next question

#### Timer
- 90-second countdown via `Timer` component
- When timer hits 0 → auto-finish the quiz
- Shows time in MM:SS format

#### Finish
On last question "FINISH" click or timer expiry:
```js
await finishQuizAction(quiz_id);
setFinished(true);  // swaps to SummaryPage
```

### 5. SummaryPage (Client)

**File:** `src/components/practice/SummaryPage.js`

After the quiz ends, fetches the graded results:

```js
const quizData = await getQuizByIdAction(quiz_id);
// { accuracy, finalScore, xpGained, questions: [...] }
```

Displays:
- **Accuracy** percentage (e.g., 80%)
- **XP Gained** (e.g., +45 XP)
- **Final Score** (e.g., 8/10)

Below the stats, lists all questions with `QuestionReviewCard`.

### 6. QuestionReviewCard

**File:** `src/components/practice/QuestionReviewCard.js`

Displays a single question with:
- Question text
- Answer options with color coding:
  - **Green highlight** = correct answer
  - **Red highlight** = student's answer (if wrong)
- **TIP section** with an "Explain More" button
- Clicking "Explain More" opens `AiTutorModal`

### 7. AiTutorModal

**File:** `src/components/practice/AiTutorModal.js`

A modal dialog that connects to **Anthropic Claude** for AI-powered explanations:
- Full-screen overlay with chat interface
- Shows chat messages between student and AI tutor
- Send button for follow-up questions
- Close by clicking backdrop
- Custom scroll for message history

## Key Actions

| Action | Service | Purpose |
|---|---|---|
| `getQuizListAction()` | `getQuizList()` | Fetch subjects with mastery |
| `startQuizAction(body)` | `startQuiz(body)` | Create quiz session, redirect |
| `getQuestionAction(quiz_id, question_id)` | `getQuestion()` | Fetch single question |
| `solveQuestionAction(quiz_id, question_id, { answer })` | `solveQuestion()` | Submit answer |
| `finishQuizAction(quiz_id)` | `finishQuiz()` | End quiz, trigger grading |
| `getQuizByIdAction(quiz_id)` | `getQuizById()` | Get graded results |

## Quiz Duration Constant

The quiz timer is set to **90 seconds** (defined as `QUIZ_DURATION` in the practice page). When the timer reaches 0, the quiz automatically finishes and the summary is shown.
