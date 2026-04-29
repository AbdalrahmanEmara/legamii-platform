# Legamii — Data Fetching Patterns

## القاعدة الأساسية

```
Backend API → service → action → component
```

---

## الـ 3 حالات اللي هتقابلك

---

### 1. صفحة بتعرض data بس (read)

الـ `page.js` server component — استدعي الـ service مباشرة، مش محتاج action.

```js
// app/contest/page.js
import { listContests } from "@/lib/services/student-contest.service";

async function Page() {
  try {
    const contests = await listContests({ status: "ONGOING" });
    return <ContestList contests={contests.data} />
  } catch {
    return <div>Something went wrong</div>
  }
}
```

---

### 2. user action بيغير data (mutation)

اعمل action في `lib/actions/` — زرار أو form بيستدعيه.

```js
// lib/actions/contest.actions.js
"use server";
import { registerContest } from "@/lib/services/student-contest.service";
import { redirect } from "next/navigation";

export async function registerContestAction(class_id, contest_id) {
  await registerContest(class_id, contest_id);
  redirect(`/contest/${contest_id}/lobby`);
}
```

```js
// الـ component
import { registerContestAction } from "@/lib/actions/contest.actions";

export default function RegisterButton({ class_id, contest_id }) {
  return (
    <form action={() => registerContestAction(class_id, contest_id)}>
      <button type="submit">Register</button>
    </form>
  )
}
```

---

### 3. client component محتاج تجيب data (interactive page)

اعمل action وستدعيه في `useEffect`.

```js
// lib/actions/contest.actions.js
"use server";
import { getContestQuestion } from "@/lib/services/student-contest.service";

export async function getContestQuestionAction(student_contest_id, question_id) {
  return getContestQuestion(student_contest_id, question_id);
}
```

```js
// في الـ component
"use client";

const [currentQuestion, setCurrentQuestion] = useState(null);
const [loading, setLoading] = useState(true);
const [error, setError] = useState(null);

useEffect(() => {
  async function fetchQuestion() {
    setLoading(true);
    try {
      const question = await getContestQuestionAction(id, questions[currentIndex].questionId);
      setCurrentQuestion(question);
    } catch {
      setError("Failed to load question");
    } finally {
      setLoading(false);
    }
  }
  fetchQuestion();
}, [currentIndex]);

if (error) return <div>{error}</div>
if (loading) return <SystemLoading />
```

---

## الـ Error Handling

```js
// server component
try {
  const data = await listContests();
  return <ContestList contests={data} />
} catch {
  return <div>Something went wrong</div>
}

// client component
const [error, setError] = useState(null);

try {
  const res = await getContestQuestionAction(...);
  setCurrentQuestion(res);
} catch {
  setError("Failed to load question");
}

if (error) return <div>{error}</div>
```

---

## ملخص القرارات

| الحالة | الحل |
|---|---|
| صفحة بتعرض data | service مباشرة في `page.js` |
| زرار أو form بيعمل mutation | action في `lib/actions/` |
| client component محتاج data | action + `useEffect` |
| مش عارف تستدعي الـ service مباشرة؟ | معناها محتاج action |

---

## قاعدة مهمة

- الـ `services` معمول عليها `server-only` — مش تتستدعى من client components أبداً
- الـ `actions` هي الـ bridge الوحيد بين الـ client والـ server
- الـ `page.js` دايماً server component — استدعي الـ service مباشرة من غير action