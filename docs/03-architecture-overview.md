# 3. Architecture Overview

## The Core Pattern

```
Backend API → Service (server-only) → Action ('use server') → Component
```

Every data flow in Legamii follows this unidirectional path. Each layer has a specific responsibility and set of rules:

| Layer | Technical Constraint | Responsibility |
|---|---|---|
| **Backend API** | External (NestJS) | Exposes REST + WebSocket endpoints |
| **Service** | `import "server-only"` | Calls backend via `api` client, maps endpoint paths |
| **Action** | `"use server"` | Orchestrates business logic, sets cookies, redirects, validates |
| **Component** | Client or Server | Renders UI, triggers actions on user interaction |

## Data-Fetching Decision Table

When writing a new page or component, consult this table:

| Situation | What to do |
|---|---|
| **Server page needs data** (read-only) | Call the **service** directly inside the async `page()` function |
| **Button or form performs a mutation** | Create a **server action** in `lib/actions/` and bind it to the form/button |
| **Client component needs data** | Create a **server action**, call it in `useEffect` |
| **Unsure if you can call a service directly** | You need a **server action** — services are `server-only` |

### Examples

**1. Server page reading data:**
```js
// app/student/home/page.js
import { getProfile } from "@/lib/services/student_profile.service";

export default async function HomePage() {
  const profile = await getProfile();
  return <WelcomeBack name={profile.first_name} />;
}
```

**2. Mutation via form action:**
```js
"use server";
import { startQuiz } from "@/lib/services/quiz.service";

export async function startQuizAction({ subject_id, difficulty }) {
  const res = await startQuiz({ subject_id, difficulty });
  redirect(`/practice/${res.quizId}`);
}
```
```jsx
// client component
<form action={startQuizAction}>
  <button type="submit">Start Quiz</button>
</form>
```

**3. Client component fetching data:**
```js
// client component
const [question, setQuestion] = useState(null);

useEffect(() => {
  getQuestionAction(quizId, questionId).then(setQuestion);
}, [quizId, questionId]);
```

## Why This Architecture?

1. **Security** — Services are `server-only`, meaning they never execute on the client. API tokens, endpoint paths, and fetch logic stay server-side.

2. **Separation of Concerns** — Components only know about actions. Actions orchestrate. Services make HTTP calls. Each layer can be tested and changed independently.

3. **Progressive Enhancement** — Server Actions work without JavaScript enabled (form submissions), then enhance with client-side interactivity when JS loads.

4. **No API Routes** — Unlike traditional Next.js apps, we don't proxy API calls through Next.js API routes. The backend is called directly from server actions/services.

## Server vs Client Boundaries

```
src/
├── lib/
│   ├── api/client.js      ← server-only (import "server-only")
│   ├── services/          ← server-only (import "server-only")
│   ├── actions/           ← server-only ("use server" + "server-only")
│   ├── validators.js      ← shared (runs on both)
│   └── constants.js       ← shared
├── components/
│   ├── ui/                ← mostly client
│   ├── layout/            ← mix (AppShell server, Header client)
│   ├── auth/              ← client (forms)
│   ├── practice/          ← client (interactive quiz)
│   ├── contest/           ← mix
│   └── home/              ← mix (DailyMission server, GlobalLeaderboard client)
└── app/
    ├── layout.tsx         ← server root
    ├── page.tsx           ← server
    └── (app)/             ← server pages
        ├── layout.tsx     ← pass-through
        ├── student/
        │   └── layout.tsx ← server (wraps AppShell)
        └── teacher/
            └── layout.tsx ← server (wraps AppShell)
```

## Key Rules

- **Services never import from actions** — services are the lowest layer
- **Components never import from services** — always go through actions (or direct service if server page)
- **Actions never render UI** — they return data/null/redirect
- **Server pages can call services directly** — no action wrapper needed for simple reads
- **Client components never call services** — they call actions, which call services
- **All services must start with `import "server-only"`** — enforced at runtime
