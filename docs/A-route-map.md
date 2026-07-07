# Appendix A: Route Map

## Legend
- **Type:** S = Server Component, C = Client Component, S→C = Server wrapper + Client component
- **Layout chain** is listed from outermost to innermost

---

## Auth Routes (Public)

| Route | File | Type | Layout |
|---|---|---|---|
| `/auth/role` | `auth/(signInOut)/role/page.js` | S | `(signInOut)/layout.js` (BackgroundV2) |
| `/auth/signin` | `auth/(signInOut)/signin/page.js` | S | `(signInOut)/layout.js` |
| `/auth/signup` | `auth/(signInOut)/signup/page.js` | S | `(signInOut)/layout.js` |
| `/auth/forget-password` | `auth/(restAuthPages)/forget-password/page.js` | S | `(restAuthPages)/layout.js` (ReusableWindow) |
| `/auth/otp` | `auth/(restAuthPages)/otp/page.js` | S | `(restAuthPages)/layout.js` |
| `/auth/create-new-password` | `auth/(restAuthPages)/create-new-password/page.js` | S | `(restAuthPages)/layout.js` |

---

## Student Routes

| Route | File | Type | Layout |
|---|---|---|---|
| `/student/home` | `(app)/student/home/page.js` | S | Root → `(app)/layout.tsx` → `student/layout.tsx` (AppShell) |
| `/student/contests` | `(app)/student/contests/page.js` | S | Same layout chain |
| `/student/contests/[classId]/[contestId]` | `(app)/student/contests/[classId]/[contestId]/page.js` | S | Same |
| `/student/contests/play/[studentContestId]` | `(app)/student/contests/play/[studentContestId]/page.js` | S→C | Same |
| `/student/contests/summary/[studentContestId]` | `(app)/student/contests/summary/[studentContestId]/page.js` | S→C | Same |
| `/student/contests/detailed-summary/[studentContestId]` | `(app)/student/contests/detailed-summary/[studentContestId]/page.js` | S→C | Same |
| `/student/practice` | `(app)/student/practice/page.js` | S | Same |
| `/student/practice/[quiz_id]` | `(app)/student/practice/[quiz_id]/page.js` | S→C | Same |
| `/student/leaderboard` | `(app)/student/leaderboard/page.js` | C | Same |
| `/student/notifications` | `(app)/student/notifications/page.js` | S→C | Same |
| `/student/aiChat` | `(app)/student/aiChat/page.js` | C | Same |
| `/student/grade/updateAcadInfo` | `(app)/student/grade/updateAcadInfo/page.js` | S | Same |

---

## Teacher Routes

| Route | File | Type | Layout |
|---|---|---|---|
| `/teacher/dashboard` | `(app)/teacher/dashboard/page.tsx` | S | Root → `(app)/layout.tsx` → `teacher/layout.tsx` (AppShell) |
| `/teacher/classes` | `(app)/teacher/classes/page.tsx` | S | Same |
| `/teacher/contests` | `(app)/teacher/contests/page.tsx` | S | Same |
| `/teacher/analytics` | `(app)/teacher/analytics/page.tsx` | S | Same |
| `/teacher/qBank` | `(app)/teacher/qBank/page.tsx` | S | Same |
| `/teacher/qBank/add` | `(app)/teacher/qBank/add/page.tsx` | S | Same |
| `/teacher/qBank/[id]/edit` | `(app)/teacher/qBank/[id]/edit/page.tsx` | S | Same |
| `/teacher/qBank/[id]/use` | `(app)/teacher/qBank/[id]/use/page.tsx` | S | Same |

---

## Root Routes

| Route | File | Type | Description |
|---|---|---|---|
| `/` | `app/page.tsx` | S | Landing / design system test page |
| `/(app)` | `(app)/page.js` | S | Redirects to `/home` |
| `/(app)/` | `(app)/layout.tsx` | — | Pass-through layout |

---

## Layout Chain Diagram

```
RootLayout (app/layout.tsx)
  Fonts: Inter, Dogica, Cabin Sketch, Jost, Montserrat, Rajdhani, Share Tech Mono
  Toaster from react-hot-toast
  globals.css
  │
  ├── Auth Layout (auth/(signInOut)/layout.js)
  │     BackgroundV2 variant="auth"
  │     Desktop: side panel (LogoIcon 240px + LogoWord)
  │     Children: role, signin, signup pages
  │
  ├── Auth Layout (auth/(restAuthPages)/layout.js)
  │     ReusableWindow centered
  │     Header: "< Back" + Logo
  │     Footer: legal text
  │     Children: forget-password, otp, create-new-password
  │
  └── App Layout ((app)/layout.tsx)
        │ Pass-through (<>{children}</>)
        │
        ├── Student Layout (student/layout.tsx)
        │     <AppShell headerVariant="student">
        │       <Header variant="student" />
        │       <NotificationListener />  (invisible)
        │       <BackgroundMain> {children} </BackgroundMain>
        │       <Footer variant="student" />
        │     </AppShell>
        │
        └── Teacher Layout (teacher/layout.tsx)
              <AppShell headerVariant="teacher">
                <Header variant="teacher" />
                <BackgroundMain> {children} </BackgroundMain>
                <Footer variant="teacher" />
              </AppShell>
```
