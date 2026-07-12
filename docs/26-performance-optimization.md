# 26. Performance Optimization

## Overview

The Legamii platform employs a layered performance strategy spanning build-time optimizations (Next.js App Router), runtime rendering choices (Server Components vs Client Components), asset delivery (images, fonts), and real-time connection management (Socket.IO singletons). This section documents every optimization pattern present in the codebase and identifies areas for future improvement.

---

## 1. Server Components (Zero-Bundle Rendering)

The platform's primary performance lever is the extensive use of React Server Components (RSC). Every page and layout that does not need client-side interactivity is kept server-only, producing zero JavaScript for the browser.

### Server Component Pages

```
src/app/(app)/student/home/page.js        — leaderboard + profile fetch
src/app/(app)/student/contests/page.js     — contest list
src/app/(app)/student/practice/page.js     — quiz list + grades
src/app/(app)/student/notifications/page.js — notifications
src/app/(app)/teacher/dashboard/page.tsx   — teacher dashboard
src/app/(app)/teacher/qBank/page.tsx       — question bank
... and 10+ more pages/layouts
```

**Impact**: These pages send only HTML to the browser — no hydration, no client JS bundle, no re-renders. Dependencies like services, API client, and data-fetching logic never reach the client bundle.

### Parallel Data Fetching

When a page needs multiple independent data sources, promises are started in parallel via `Promise.all` inside the server component:

```tsx
// src/app/(app)/student/notifications/page.js
const [notificationsRes, unreadRes] = await Promise.all([
  getNotificationsAction(),
  getUnreadCountAction(),
]);
```

```tsx
// src/app/(app)/teacher/qBank/add/page.tsx
const [publicRes, customRes, subjectsRes, gradesRes] = await Promise.all([
  getQuestionsAction(query),
  getMyQuestionsAction(query),
  getAllSubjectsAction(),
  getAllGradesAction(),
]);
```

**Why**: Sequential `await` would add latency equal to the sum of all requests. `Promise.all` waits only for the slowest request.

---

## 2. Suspense Boundaries & Skeleton Loading

Coarse-grained loading indicators at the route level and fine-grained skeletons at the component level.

### Route-Level Loading

```
src/app/(app)/student/contests/loading.js  →  renders <SystemLoading />
src/app/(app)/student/contests/error.js    —  error boundary with retry
```

### Component-Level Suspense

The student dashboard wraps each async widget in `<Suspense>` with a dedicated skeleton:

```tsx
// src/app/(app)/student/home/page.js
<Suspense fallback={<DailyMissionSkeleton />}>
  <DailyMission />
</Suspense>
<Suspense fallback={<StreakSkeleton />}>
  <Streak />
</Suspense>
<Suspense fallback={<UpcomingContestsSkeleton />}>
  <UpcomingContests />
</Suspense>
```

Each skeleton uses Tailwind's `animate-pulse` for a shimmer effect. This allows each widget to stream in independently — the user sees a meaningful layout immediately rather than a blank page or a full-page spinner.

### Skeleton Components

| File | Purpose |
|---|---|
| `src/components/Skeletons/DailyMissionSkeleton.js` | Mission card shimmer |
| `src/components/Skeletons/StreakSkeleton.js` | Streak widget shimmer |
| `src/components/Skeletons/UpcomingContestSkeleton.js` | Contest card shimmer |
| `src/components/contest/ContestListSkeleton.js` | Contest list shimmer |

---

## 3. Font Loading Strategy

Seven font families are loaded with Next.js's built-in font optimization, which auto-generates the CSS `@font-face` rules and applies a preload link:

```tsx
// src/app/layout.tsx
const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const cabinSketch = Cabin_Sketch({ subsets: ["latin"], weight: ["400", "700"], variable: "--font-cabin-sketch" });
// ... (6 Google Fonts total)

const dogica = localFont({
  src: [
    { path: "../../public/fonts/dogica.ttf", weight: "400", style: "normal" },
    { path: "../../public/fonts/dogicabold.ttf", weight: "700", style: "normal" },
    { path: "../../public/fonts/dogicapixel.ttf", weight: "400", style: "normal" },
    { path: "../../public/fonts/dogicapixelbold.ttf", weight: "700", style: "normal" },
  ],
  variable: "--font-dogica",
  display: "swap",
});
```

**Optimizations applied**:
- **`display: swap`** — ensures text remains visible while the font loads (FOUT instead of FOIT)
- **`subsets: ["latin"]`** — restricts glyph downloads to the Latin character set
- **CSS variables** — each font is assigned to a `--font-*` custom property, allowing Tailwind's `@theme` to reference them without runtime cost
- **Local font files** — Dogica is self-hosted, eliminating a third-party network request

---

## 4. Image Optimization with `next/image`

Eight components use the `<Image>` component from `next/image`, which provides automatic lazy loading, responsive sizing, and format negotiation (WebP/AVIF):

| File | Usage |
|---|---|
| `src/components/layout/Header.js` | Avatar `width={40} height={40}` |
| `src/components/ui/Leaderboard.js` | Avatar with `fill` |
| `src/components/auth/RoleContent.js` | Role icon `width={48} height={48}` |
| `src/components/contest/ContestCard.js` | Contest thumbnail |
| `src/components/ui/ContestLeaderboard.js` | Avatar with `fill` |
| `src/components/ui/Background.js` | Full-page background with `fill` |
| `src/components/home/GlobalLeaderboard.js` | Leaderboard avatars |
| `src/components/Navbar.tsx` | Logo `width=16 height=16` |

**Gap**: No component uses `sizes`, `placeholder="blur"`, `blurDataURL`, or `priority`. The `next.config.ts` has no `images.remotePatterns` configuration, which means remote images will fail in production unless unoptimized mode is used. These are identified as improvement opportunities in Section 10.

---

## 5. Bundle Size & Code Splitting

### In Use

- **Per-component icon imports** from `lucide-react` (e.g., `import { Dot } from "lucide-react"`) instead of wildcard imports — enables tree-shaking
- **Custom SVG icon components** in `src/components/icons/` — smaller and more specific than full icon libraries

### Not Yet Used

- **`next/dynamic`** — no dynamic imports or lazy-loaded components exist
- **`React.lazy`** — not used anywhere
- **Bundle analyzer** — `@next/bundle-analyzer` is not installed
- **`next.config.js`** — empty; no `optimizePackageImports`, `compress`, `swcMinify`, or `experimental` options configured

---

## 6. Server Actions

Thirteen server action files provide a direct bridge from client interactions to server logic without building an API route layer:

```
src/lib/actions/
├── auth.action.js
├── subject.action.js
├── grade.action.js
├── student_profile.action.js
├── teacher_profile.action.js
├── student_contest.action.js
├── quiz.action.js
├── streak.action.js
├── missions.action.js
├── qbank.action.js
├── notifications.action.js
├── leaderboard.action.js
└── chat.action.js
```

**Performance benefit**: Server actions eliminate the need for a separate REST endpoint for mutations. They run on the server, receive the form/JSON data directly, and can revalidate server state with `revalidatePath()` / `revalidateTag()`.

### useTransition for Non-Blocking Submissions

```tsx
// src/components/teacher/question-bank/TeacherQuestionEditorModal.tsx
const [isPending, startTransition] = useTransition();

startTransition(async () => {
  await createQuestionAction(data);
  router.refresh();
});
```

Using `startTransition` keeps the UI responsive — React continues to process user input while the server action runs, and the pending state can show a spinner.

---

## 7. Socket.IO Performance Patterns

### Singleton Connections

All three socket namespaces (contest, leaderboard, notification) use a singleton pattern — the socket connection is created once and reused, avoiding redundant handshakes:

```ts
// src/lib/sockets/leaderboard.socket.ts — reuses a single connection
// src/lib/sockets/contest.socket.ts — removes old listeners before adding new
// src/lib/sockets/notification.socket.ts — subscribe/unsubscribe lifecycle
```

### WebSocket-Only Transport

All socket modules specify `transports: ["websocket"]`, which skips the long-polling fallback negotiation and establishes a persistent TCP connection immediately.

### Callback Stability via useRef

```tsx
// src/app/(app)/hooks/useContestSocket.ts
const callbacks = useRef({ onJoined, onStarted, ... });
callbacks.current = { onJoined, onStarted, ... };
```

This pattern prevents re-subscribing to socket events on every render while ensuring the latest callback version is invoked. See [25-react-socket-hooks.md](./25-react-socket-hooks.md) for hook-level details.

### Race Condition Guards

The contest play page uses a `finishedCalled` ref to prevent double-firing:

```tsx
// ContestPlayPage.js
const finishedCalled = useRef(false);
if (!finishedCalled.current) {
  finishedCalled.current = true;
  // ... handle finish
}
```

---

## 8. Rendering Optimizations (useCallback / useMemo)

Limited usage exists:

- **`useCallback`** in 3 files — stabilizes event handlers passed to socket hooks and child components
- **`useMemo`** in 1 active use — memoizes pagination page numbers on the leaderboard

```tsx
// src/app/(app)/student/leaderboard/page.js
const pageNumbers = useMemo(() => {
  if (!pageInfo) return [];
  const { page: p, totalPages } = pageInfo;
  const around = new Set([1, totalPages, p - 1, p, p + 1]);
  return [...around].filter(n => n >= 1 && n <= totalPages).sort((a, b) => a - b);
}, [pageInfo]);
```

**Note**: `React.memo` is not used anywhere in the codebase. The Next.js App Router architecture reduces the need for `React.memo` because Server Components never re-render on the client, and Client component trees tend to be shallow.

---

## 9. Link Prefetching

Next.js `<Link>` components (used throughout navigation — `Logo.js`, `Navigation.js`, `MobileMenu.js`, `TeacherHeader.tsx`, `Footer.tsx`) automatically prefetch linked routes when they appear in the viewport. This means navigations feel instant once the initial page load completes.

---

## 10. Future Optimization Opportunities

| Area | Current State | Recommended Action |
|---|---|---|
| **next/image config** | No `remotePatterns`, `sizes`, or `placeholder` | Add `images.remotePatterns` for backend avatar URLs; use `sizes` attribute on fill images; consider `placeholder="blur"` with `blurDataURL` |
| **Dynamic imports** | Not used | Wrap heavy components (editor modals, chart libraries, PDF exports) with `next/dynamic` |
| **React Query** | Installed but unused | Adopt for client-side data fetching with caching (`staleTime`, `gcTime`) to reduce redundant network calls |
| **Bundle analysis** | Not set up | Add `@next/bundle-analyzer` to identify large dependencies |
| **next.config** | Empty | Enable `swcMinify` (default in Next.js 16, confirm), configure `optimizePackageImports` for icon libraries |
| **Middleware** | Not used | Add JWT refresh / route protection middleware to avoid client-side auth checks |
| **React.memo** | Not used | Add selectively on heavy client components with stable props |
| **Streaming** | Not used | Migrate slow server component fetches to `React.use()` with Suspense boundaries to stream HTML progressively |
| **CDN / caching headers** | Not configured | Set `Cache-Control` headers on static pages via `generateStaticParams` or `revalidate` |