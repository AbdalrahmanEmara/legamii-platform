# 9. Data Fetching & Error Handling Patterns

## Overview

Legamii uses three distinct data-fetching patterns depending on where and how data is needed. Each pattern has corresponding error handling strategies.

## Pattern 1: Server Page Reading Data

**When:** A server-rendered page displays data without interactivity.

**How:** Call the service directly inside the async `page()` function.

```js
// app/student/home/page.js (Server Component)
import { getProfile } from "@/lib/services/student_profile.service";

export default async function HomePage() {
  let profile = null;
  try {
    profile = await getProfile();
  } catch (err) {
    console.error("Failed to load profile:", err);
  }

  return <WelcomeBack name={profile?.first_name || "Student"} />;
}
```

**Error handling:**
- Wrap in try/catch and provide fallback data
- Or use `error.js` (Next.js error boundary file) for the whole page

```js
// error.js (placed next to page.js)
"use client";
export default function Error({ error, reset }) {
  return <SystemError message={error.message} onRetry={reset} />;
}

// loading.js (placed next to page.js)
export default function Loading() {
  return <SystemLoading />;
}
```

**Decision:** Use `error.js` + `loading.js` for full-page failures. Use try/catch inside the page for partial failures (e.g., one section fails but others should still render).

## Pattern 2: Mutation via Form/Button

**When:** A user action changes server state (create, update, delete, start quiz, register for contest).

**How:** Create a Server Action and bind it to a form or button.

```js
// lib/actions/quiz.action.js
"use server";
export async function startQuizAction({ subject_id, difficulty, subjectTagsMasteryLevel }) {
  let res;
  try {
    res = await startQuiz({ subject_id, difficulty, subjectTagsMasteryLevel });
  } catch (err) {
    console.error("Error starting quiz:", err);
    return; // Don't redirect
  }
  redirect(`/practice/${res.quizId}`);
}
```

```jsx
// component
<form action={startQuizAction}>
  <button type="submit">Start Quiz</button>
</form>
```

**Error handling:**
- Show toast notification on failure
- Don't use redirect on error

```js
// Client component mutation without form
const handleSubmit = async () => {
  try {
    const res = await someAction(payload);
    if (!res?.success) {
      toast.error(res?.message || "Something went wrong");
      return;
    }
    toast.success("Success!");
  } catch (err) {
    toast.error(err.message || "Something went wrong");
  }
};
```

## Pattern 3: Client Component Fetching Data

**When:** A client component needs to load data after mount (interactive pages like quiz play, leaderboard, notifications).

**How:** Call a Server Action inside `useEffect`.

```js
"use client";
import { useState, useEffect } from "react";
import { getQuestionAction } from "@/lib/actions/quiz.action";

export default function PracticePage({ quizId, questions }) {
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    let cancelled = false;

    async function loadQuestion() {
      setLoading(true);
      setError(null);
      try {
        const question = await getQuestionAction(quizId, questions[currentIndex].questionId);
        if (!cancelled) setCurrentQuestion(question);
      } catch (err) {
        if (!cancelled) setError("Failed to load question");
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    loadQuestion();
    return () => { cancelled = true; };
  }, [quizId, currentIndex]);

  if (error) return <SystemError message={error} />;
  if (loading || !currentQuestion) return <SystemLoading />;

  return <QuestionDisplay question={currentQuestion} />;
}
```

**Error handling patterns:**
| State | Loading | Error | Display |
|---|---|---|---|
| Initial | `true` | `null` | `<SystemLoading />` |
| Loading | `true` | `null` | `<SystemLoading />` |
| Error | `false` | Error message | `<SystemError />` |
| Success | `false` | `null` | Actual content |

## Advanced Pattern: Suspense for Sections

For server pages with independently loading sections, use `<Suspense>`:

```js
// app/student/home/page.js
export default async function HomePage() {
  return (
    <div className="grid">
      <WelcomeBack name={name} />  {/* synchronous */}
      <Suspense fallback={<DailyMissionSkeleton />}>
        <DailyMission />           {/* async, loads independently */}
      </Suspense>
      <Suspense fallback={<StreakSkeleton />}>
        <Streak />
      </Suspense>
      <Suspense fallback={<UpcomingContestsSkeleton />}>
        <UpcomingContests />
      </Suspense>
    </div>
  );
}

async function DailyMission() {
  const missions = await getDailyMissions();
  return <MissionCards missions={missions} />;
}
```

## Complete Error Handling Decision Table

| Situation | Error Handling Strategy |
|---|---|
| Full server page fails | `error.js` + `loading.js` (Next.js files) |
| Section of server page fails | `<Suspense>` + try/catch with fallback |
| Client component loading data | `useState` (loading + error + data) + `useEffect` |
| Client component mutation | try/catch + `toast.error()` |
| Server Action fails internally | try/catch → return null or `{ success: false }` |
| Validation fails in action | return `{ success: false, message }` immediately |

## Key Rules

- `error.js` must be `"use client"`
- `loading.js` does NOT need `"use client"`
- If `error.js` exists, you don't need try/catch in the page (Next.js catches it)
- The `reset` function in `error.js` re-renders only the failed component, not a full page reload
- Data fetching errors → error state (the UI isn't present anyway)
- Mutation errors → toast (the UI should stay functional)
- Always use the `cancelled` flag pattern in `useEffect` to prevent state updates on unmounted components
