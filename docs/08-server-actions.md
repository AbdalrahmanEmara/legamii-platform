# 8. Server Actions

## Location

`src/lib/actions/` — one file per domain.

## Purpose

Server Actions are the **bridge** between client components and the backend. They handle:
- Calling the appropriate service function
- Validating input with Zod schemas
- Setting/clearing cookies (auth)
- Redirecting after mutations
- Catching and logging errors
- Returning structured responses to the client

## Anatomy of a Server Action

```js
"use server";
import "server-only";

import { someService } from "@/lib/services/some.service";

export async function someAction(payload) {
  try {
    // 1. (Optional) Validate with Zod
    // 2. Call the service
    const res = await someService(payload);
    return res;
  } catch (err) {
    console.error("Error in someAction:", err);
    return null;  // or { success: false, message: err.message }
  }
}
```

## Two Patterns

### Pattern 1: Pure Data Fetching (returns data)

Used when a client component needs data.

```js
// actions/quiz.action.js
export async function getQuestionAction(quiz_id, question_id) {
  try {
    const res = await getQuestion(quiz_id, question_id);
    return res;
  } catch (err) {
    console.error("Error getting question:", err);
    return null;
  }
}
```

Called from client component:
```js
const [question, setQuestion] = useState(null);

useEffect(() => {
  getQuestionAction(quizId, questionId).then(setQuestion);
}, [quizId, questionId]);
```

### Pattern 2: Mutation + Redirect

Used when a form/button changes server state and navigates.

```js
// actions/quiz.action.js
export async function startQuizAction({ subject_id, difficulty, subjectTagsMasteryLevel }) {
  let res;
  try {
    res = await startQuiz({ subject_id, difficulty, subjectTagsMasteryLevel });
  } catch (err) {
    console.error("Error starting quiz:", err);
    return; // Don't redirect on error
  }
  redirect(`/practice/${res.quizId}`);
}
```

Called from a form:
```jsx
<form action={startQuizAction}>
  <input type="hidden" name="subject_id" value={subject.id} />
  <button type="submit">Start Quiz</button>
</form>
```

## Auth Actions (Cookie Management)

Auth actions have additional responsibilities — managing httpOnly cookies:

```js
// actions/auth.action.js
export async function loginAction(payload) {
  // Validate input
  const parsed = loginSchema.safeParse(payload);
  if (!parsed.success) {
    return { success: false, message: parsed.error.errors[0].message };
  }

  try {
    const res = await login(parsed.data);

    // Set cookies
    const cookieStore = await cookies();
    cookieStore.set("token", res.token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7, // 7 days
    });
    cookieStore.set("role", res.role, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7,
    });

    return { success: true, message: "Login successful", role: res.role };
  } catch (err) {
    return { success: false, message: err.message || "Login failed" };
  }
}
```

## Validation Pattern

Actions that accept user input validate with Zod before calling services:

```js
import { loginSchema } from "@/lib/validators";

const parsed = loginSchema.safeParse(payload);
if (!parsed.success) {
  return { success: false, message: parsed.error.errors[0].message };
}
// Use parsed.data (safe, typed) instead of raw payload
```

Available schemas in `validators.js`:
- `loginSchema` — email + password
- `studentSignupSchema` — firstName, middleName, lastName, email, grade_id, password, role
- `teacherSignupSchema` — firstName, lastName, email, password, role
- `verifyEmailSchema` — email + otp
- `resetPasswordSchema` — email + otp + password + verifyPassword
- `forgetPasswordSchema` — email
- `claimMissionSchema` — id

## Return Value Conventions

| Situation | Return Value |
|---|---|
| Success, data expected | Return the data directly |
| Error, data expected | Return `null` |
| Mutation with validation | `{ success: true/false, message: string, ... }` |
| Mutation with redirect | `redirect()` (doesn't return) |

## Important Rules

1. **Every action file must start with `"use server"`** — this is a Next.js requirement
2. **Most actions also add `import "server-only"`** — for extra safety (they import server-only services)
3. **Never call an action from another action** — actions should not chain; call the service directly instead
4. **Actions can be called from Server Components** — import and call them directly
5. **Actions can be called from Client Components** — import and call as async functions
6. **Actions can be used as form actions** — pass to `<form action={...}>`
7. **Never import actions in services** — that would create a circular dependency

## Complete Action Files List

| File | Functions |
|---|---|
| `auth.action.js` | `signupAction`, `verifyEmailAction`, `loginAction`, `resetPasswordAction`, `forgetPasswordAction`, `logoutAction`, `getSessionAction` |
| `quiz.action.js` | `startQuizAction`, `getQuizListAction`, `getQuestionsAction`, `getQuestionAction`, `solveQuestionAction`, `finishQuizAction`, `getQuizByIdAction` |
| `student_contest.action.js` | `getContestsAction`, `getContestLobbyAction`, `registerContestAction`, `startContestAction`, `getContestQuestionsAction`, `getContestQuestionAction`, `submitContestAnswerAction`, `toggleQuestionFlagAction`, `finishContestAction`, `getContestSummaryAction`, `getContestDetailedSummaryAction`, `getContestRankAction` |
| `student_profile.action.js` | `getProfileAction`, `updateProfileAction`, `getStatisticsAction`, `getBadgesAction`, `getClassesAction`, `getContestsAction`, `getActivityAction`, `getSubjectTagsAction` |
| `teacher_profile.action.js` | `getProfileAction`, `updateProfileAction`, `getClassesAction`, `getStatisticsAction`, `listTeachersAction`, `getTeacherByIdAction`, `updateTeacherAction`, `deleteTeacherAction` |
| `qbank.action.js` | `createQuestionAction`, `aiGenerateQuestionAction`, `getQuestionsAction`, `getMyQuestionsAction`, `getQuestionForStudentAction`, `getQuestionForAdminAction`, `updateQuestionAction`, `deleteQuestionAction`, `addQuestionToContestAction`, `createAndAttachQuestionToContestAction`, `getQuestionContestStatsAction`, `getContestQuestionsAction`, `getContestQuestionByOrderAction` |
| `notifications.action.js` | `getNotificationsAction`, `getUnreadCountAction`, `markNotificationAsReadAction`, `markAllNotificationsAsReadAction`, `getBroadcastsAction`, `markBroadcastAsReadAction`, `createBroadcastAction`, `sendContestClarificationAction`, `getContestClarificationAction` |
| `leaderboard.action.js` | `getGlobalLeaderboardAction` |
| `streak.action.js` | `getStreakAction` |
| `missions.action.js` | `getDailyMissionsAction`, `claimMissionAction` |
| `subject.action.js` | `getAllSubjectsAction`, `getStudentSubjectsAction` |
| `grade.action.js` | `getAllGradesAction`, `getGradeSubjectsAction` |
