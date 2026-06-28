# Legamii — Project Brief (New Session)

## Stack
- Next.js 14+ App Router
- JavaScript (not TypeScript)
- `server-only` on all API layers
- `react-hook-form` + `zod` for forms
- `react-hot-toast` for notifications

---

## Architecture Pattern

```
Backend API → service → action → component
```

### Rules
| Layer | Rule |
|---|---|
| `client.js` | HTTP only — reads token from cookie, adds Authorization header |
| `endpoints.js` | Paths only — no base URL, no `process.env` |
| `services/` | Call `api.get/post/patch/delete` + `ENDPOINTS` only |
| `actions/` | `"use server"` — bridge between client components and services |
| `components` | Never call `api` or `services` directly — only actions |
| `page.js` (server) | Call service directly — no action needed |
| `page.js` (client) | Call action inside `useEffect` |

### 3 Fetch Patterns
1. **Server component read** → call service directly in `async page()`
2. **Mutation (button/form)** → server action in `lib/actions/`
3. **Client component needs data** → server action + `useEffect`

---

## `lib/` Structure

```
src/lib/
├── api/
│   ├── client.js        ✅ done
│   └── endpoints.js     ✅ done
├── services/
│   ├── auth.service.js                ✅
│   ├── quiz.service.js                ✅
│   ├── student_contest.service.js     ✅
│   ├── student_profile.service.js     ✅
│   ├── grade.service.js               ✅
│   ├── school.service.js              ⬜ not started
│   ├── teacher.service.js             ⬜ not started
│   ├── student.service.js             ⬜ not started
│   ├── subject.service.js             ⬜ not started
│   └── cloudinary.service.js          ⬜ not started
├── actions/
│   ├── auth.actions.js                ✅
│   ├── quiz.actions.js                ✅
│   ├── student_contest.action.js      ✅
│   ├── student_profile.action.js      ✅
│   └── grade.actions.js               ✅
├── validators/
│   └── auth.schema.js                 ✅ (all auth schemas)
├── constants.js                       ✅
└── utils.js                           ✅
```

---

## `client.js` — Key Details

```js
import "server-only"
import { cookies } from "next/headers"

export const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL

async function request(method, endpoint, { body, params } = {}) {
  const url = new URL(`${BASE_URL}/${endpoint}`)

  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null)
        url.searchParams.set(key, String(value))
    })
  }

  const cookieStore = await cookies()
  const token = cookieStore.get("token")

  const res = await fetch(url.toString(), {
    method,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token.value}` } : {}),
    },
    ...(body ? { body: JSON.stringify(body) } : {}),
  })

  if (!res.ok) {
    const error = await res.json().catch(() => ({}))
    throw new Error(error?.message ?? `HTTP ${res.status}: ${endpoint}`)
  }

  return res.json()
}

export const api = {
  get:    (endpoint, options)       => request("GET",    endpoint, options),
  post:   (endpoint, body, options) => request("POST",   endpoint, { ...options, body }),
  patch:  (endpoint, body, options) => request("PATCH",  endpoint, { ...options, body }),
  delete: (endpoint, options)       => request("DELETE", endpoint, options),
}
```

---

## `endpoints.js` — Full Map

```js
import { API_VERSION } from "../constants"
const v = `api/${API_VERSION}`

export const ENDPOINTS = {
  auth: {
    signup:        `${v}/auth/signup`,
    verifyEmail:   `${v}/auth/verify-email`,
    login:         `${v}/auth/login`,
    resetPassword: `${v}/auth/reset-password`,
    forgetPassword:`${v}/auth/forgot-password`,
  },
  school: {
    list:   `${v}/school`,
    byId:   (id) => `${v}/school/${id}`,
    update: (id) => `${v}/school/${id}`,
    delete: (id) => `${v}/school/${id}`,
  },
  teacher: {
    list:   `${v}/teacher`,
    byId:   (id) => `${v}/teacher/${id}`,
    update: (id) => `${v}/teacher/${id}`,
    delete: (id) => `${v}/teacher/${id}`,
  },
  student: {
    list:           `${v}/student`,
    byId:           (id) => `${v}/student/${id}`,
    update:         (id) => `${v}/student/${id}`,
    updateAcademic: `${v}/student/academic`,
    delete:         (id) => `${v}/student/${id}`,
  },
  subject: {
    studentSubjects: `${v}/subjects/student`,
  },
  grade: {},
  cloudinary: {
    upload: `${v}/cloudinary/upload`,
  },
  quiz: {
    list:      `${v}/quiz`,
    start:     `${v}/quiz`,
    byId:      (quiz_id) => `${v}/quiz/${quiz_id}`,
    finish:    (quiz_id) => `${v}/quiz/${quiz_id}`,
    questions: (quiz_id) => `${v}/quiz/${quiz_id}/question`,
    question:  (quiz_id, question_id) => `${v}/quiz/${quiz_id}/question/${question_id}`,
    solve:     (quiz_id, question_id) => `${v}/quiz/${quiz_id}/question/${question_id}`,
  },
  student_contest: {
    list:           `${v}/student-contest`,
    lobby:          (class_id, contest_id) => `${v}/student-contest/class/${class_id}/contest/${contest_id}`,
    register:       (class_id, contest_id) => `${v}/student-contest/class/${class_id}/contest/${contest_id}/register`,
    start:          (class_id, contest_id) => `${v}/student-contest/class/${class_id}/contest/${contest_id}/start`,
    rank:           (id) => `${v}/student-contest/${id}/rank`,
    questions:      (id) => `${v}/student-contest/${id}/questions`,
    finish:         (id) => `${v}/student-contest/${id}/questions`,
    summary:        (id) => `${v}/student-contest/${id}/summary`,
    detailedSummary:(id) => `${v}/student-contest/${id}/detailed-summary`,
    question:       (id, question_id) => `${v}/student-contest/${id}/question/${question_id}`,
    submitAnswer:   (id, question_id) => `${v}/student-contest/${id}/question/${question_id}`,
    toggleFlag:     (id, question_id) => `${v}/student-contest/${id}/question/${question_id}`,
  },
}
```

---

## Auth Flow

### Endpoints
| Action | Method | Path |
|---|---|---|
| signup | POST | `/auth/signup` |
| verify email | POST | `/auth/verify-email` |
| login | POST | `/auth/login` |
| forgot password | POST | `/auth/forgot-password` |
| reset password | POST | `/auth/reset-password` |

### Flow
```
signup → verify email (OTP) → login → cookie set → academic onboarding → dashboard
```

### Cookie
- Name: `token`
- `httpOnly: true`
- `secure: true` in production
- `sameSite: "lax"`
- `maxAge: 60 * 60 * 24 * 7`

### Academic Onboarding
After login, if student has no grade/term set → redirect to `/auth/academic`.
Uses `PATCH /student/academic` with body `{ gradeId, term }`.
This sets grade, deletes old mastery tags, creates new ones.

---

## Quiz Flow

```
/practice (server) → getQuizList() → StartQuizButton (server action)
  → startQuizAction() → redirect /practice/[quiz_id]

/practice/[quiz_id] (server) → getQuestions(quiz_id) → PracticePage (client)
  → useEffect fetches each question via getQuestionAction()
  → handleNext → solveQuestionAction()
  → handleFinish → finishQuizAction()
  → SummaryPage → getQuizByIdAction()
```

### Key actions in `quiz.actions.js`
```js
getQuestionsAction(quiz_id)
getQuestionAction(quiz_id, question_id)
solveQuestionAction(quiz_id, question_id, { answer })
finishQuizAction(quiz_id)
getQuizByIdAction(quiz_id)
startQuizAction(body) // body: { subject_id, difficulty, subjectTagsMasteryLevel }
```

---

## Contest Flow — In Progress

### Pages needed
```
/contests              → server component, getContests({ status })
/contests/[id]         → lobby page
/contests/[id]/play    → same pattern as quiz (server IDs + client interactive)
/contests/[id]/summary → summary + rank
```

### Actions needed in `contest.actions.js`
```js
registerContestAction(class_id, contest_id)
startContestAction(class_id, contest_id)
getContestQuestionsAction(student_contest_id)
getContestQuestionAction(student_contest_id, question_id)
submitContestAnswerAction(student_contest_id, question_id, { answer })
toggleFlagAction(student_contest_id, question_id)
finishContestAction(student_contest_id)
getContestSummaryAction(student_contest_id)
```

---

## Pages Status

| Page | Status |
|---|---|---|
| `/auth/signup` | ✅ |
| `/auth/signin` | ✅ |
| `/auth/otp` | ✅ |
| `/auth/forget-password` | ✅ |
| `/auth/reset-password` | ✅ |
| `/auth/academic` | ⬜ not started |
| `/practice` | ✅ |
| `/practice/[quiz_id]` | ✅ |
| `/contests` | ✅ |
| `/contests/[classId]/[contestId]` (lobby) | ✅ |
| `/contests/play/[studentContestId]` | ✅ |
| `/contests/summary/[studentContestId]` | ✅ (connected to API) |
| `/contests/detailed-summary/[studentContestId]` | ✅ (connected to API) |
| `/` (home/dashboard) | ✅ |

---

## Loading, Suspense & Error Handling

### Server Component — الطريقة الصح

اعمل ملفين جنب الـ `page.js`:

```
app/(app)/contests/
├── page.js       ← async server component
├── loading.js    ← Suspense fallback تلقائي
└── error.js      ← Error boundary تلقائي
```

```js
// loading.js
import SystemLoading from "@/components/ui/SystemLoading"
export default function Loading() {
  return <SystemLoading />
}

// error.js
"use client"
export default function Error({ error, reset }) {
  return (
    <div>
      <p>{error.message || "Something went wrong"}</p>
      <button onClick={reset}>Try again</button>
    </div>
  )
}
```

### Server Component — Suspense يدوي (sections منفصلة)

```js
import { Suspense } from "react"

export default async function DashboardPage() {
  return (
    <div>
      <Suspense fallback={<SystemLoading />}>
        <ContestsList />
      </Suspense>
      <Suspense fallback={<SystemLoading />}>
        <QuizStats />
      </Suspense>
    </div>
  )
}

async function ContestsList() {
  const res = await getContests()
  return <div>{res.data.map(...)}</div>
}
```

### Client Component — Data Fetching

```js
const [data, setData] = useState(null)
const [loading, setLoading] = useState(true)
const [error, setError] = useState(null)

useEffect(() => {
  async function fetchData() {
    setLoading(true)
    setError(null)
    try {
      const res = await getSomethingAction(id)
      setData(res)
    } catch (err) {
      setError(err.message || "Failed to load")
    } finally {
      setLoading(false)
    }
  }
  fetchData()
}, [id])

if (error) return <div>{error}</div>
if (loading) return <SystemLoading />
```

### Client Component — Mutation (زرار/form)

```js
const handleSubmit = async () => {
  try {
    await someAction(payload)
  } catch (err) {
    toast.error(err.message || "Something went wrong")
    return
  }
  // كمّل بعد النجاح
}
```

### متى تستخدم إيه

| الحالة | الحل |
|---|---|
| Server page كاملة | `loading.js` + `error.js` |
| Server page — sections منفصلة | `<Suspense>` يدوي |
| Server page — error بسيط | `try/catch` في الـ page |
| Client component data fetch | `useState` loading/error + `useEffect` |
| Client component mutation | `try/catch` + `toast` |

### قواعد ثابتة
- `error.js` دايماً `"use client"`
- `loading.js` مش محتاج `"use client"`
- لو `error.js` موجود — مش محتاج `try/catch` في الـ page
- الـ `reset` في `error.js` بيعيد الـ component اللي فشل بس — مش full page reload
- Data fetching errors → error state (الـ UI مش موجود أصلاً)
- Mutation errors → `toast` (الـ UI لازم يفضل شغال)

---

## Known Issues Fixed
- JWT expiring after 3s → backend fixed by converting `ACCESS_TOKEN_EXPIRES_IN` to `Number()` in `jwt.config.ts`
- `client.js` not sending token → fixed by reading cookie and adding `Authorization` header

---

## Next Steps
1. `/auth/academic` — grade + term onboarding page (after signup, before dashboard)
2. Create `services/index.js` — re-export all services
3. `middleware.js` — protect routes, redirect to `/auth/signin` if no token
4. Class join flow — connect the class code form in `WelcomeBack` to a server action
5. Real-time leaderboard updates during contest play (polling or WebSocket)
6. `AiTutorModal` — connect to backend AI tutor endpoint instead of hardcoded Anthropic API
