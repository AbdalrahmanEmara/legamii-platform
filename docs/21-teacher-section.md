# 21. Teacher Section

## Overview

The teacher section provides tools for educators to create and manage learning content, monitor student progress, and organize competitive events. Currently, the **question bank** is the primary fully-implemented feature; other pages serve as placeholders for future development.

## Route Structure

```
/teacher/dashboard   → Dashboard (placeholder)
/teacher/classes     → Class management (placeholder)
/teacher/contests    → Contest management (placeholder)
/teacher/analytics   → Analytics (placeholder)
/teacher/qBank       → Question bank (fully implemented)
/teacher/qBank/add   → Add question
/teacher/qBank/[id]/edit → Edit question
/teacher/qBank/[id]/use  → Use question (placeholder)
```

## Teacher Layout

**File:** `src/app/(app)/teacher/layout.tsx`

```tsx
export default function TeacherLayout({ children }) {
  return <AppShell headerVariant="teacher">{children}</AppShell>;
}
```

Uses the same `AppShell` system as the student section, but with `headerVariant="teacher"` which renders:
- **TeacherHeader** — dark theme (`bg-neutral-950/95`, `border-neutral-800`)
- **BackgroundMain** — content background
- **TeacherFooter** — light theme footer

### TeacherHeader

**File:** `src/components/teacher/layout/TeacherHeader.tsx`

Dark-themed header with:
- Logo
- Navigation links: Dashboard, Classes, Contests, Analytics, Q.Bank
- Streak display (Fire icon + "14 Days")
- Notification bell (placeholder)
- Level/XP progress bar
- Avatar with initials (e.g., "SA")

```jsx
// Navigation links (from navigationLinks.js)
export const TEACHER_LINKS = [
  { href: "/teacher/dashboard", label: "Dashboard" },
  { href: "/teacher/classes", label: "Classes" },
  { href: "/teacher/contests", label: "Contests" },
  { href: "/teacher/qBank", label: "Q.Bank" },
];
```

Active link detection uses `usePathname()`.

### TeacherFooter

**File:** `src/components/teacher/layout/TeacherFooter.tsx`

Light theme footer with:
- Logo + tagline
- Navigation links (Dashboard, Classes, Contests, Analytics, Q.Bank)
- Social icons (GitHub, LinkedIn, Twitter)
- System links (Help, About, Privacy, Terms)

## Placeholder Pages

The following teacher pages use `TeacherFlowPlaceholder`:

### TeacherFlowPlaceholder

**File:** `src/components/teacher/shared/TeacherFlowPlaceholder.tsx`

A reusable component that renders a consistent "under construction" UI:
- Window title (e.g., "Dashboard", "Classes")
- Description text
- Highlights grid (3 feature highlights)
- Action buttons (primary + secondary)

### Dashboard (`/teacher/dashboard`)
Placeholder for an analytics overview showing:
- Total students, classes, contests
- Recent activity
- Performance charts (future)

### Classes (`/teacher/classes`)
Placeholder for class management:
- Class roster view
- Student enrollment management
- Class code generation

### Contests (`/teacher/contests`)
Placeholder for contest creation and management:
- Create new contests
- Assign questions from question bank
- View contest results

### Analytics (`/teacher/analytics`)
A minimal stub (`<h>Hello</h>`) for future analytics features:
- Student performance tracking
- Class-wide statistics
- Question difficulty analysis

## Teacher Services & Actions

### Profile Service (`teacher_profile.service.js`)

| Function | HTTP | Purpose |
|---|---|---|
| `getProfile()` | GET | Get teacher profile |
| `updateProfile(data)` | PATCH | Update profile |
| `getClasses()` | GET | Get teacher's classes |
| `getStatistics()` | GET | Get statistics |
| `listTeachers(params)` | GET | List all teachers |
| `getTeacherById(id)` | GET | Get teacher by ID |
| `updateTeacher(id, data)` | PATCH | Update teacher |
| `deleteTeacher(id)` | DELETE | Delete teacher |

### Profile Actions (`teacher_profile.action.js`)

Each service function has a corresponding action: `getProfileAction`, `updateProfileAction`, `getClassesAction`, `getStatisticsAction`, `listTeachersAction`, `getTeacherByIdAction`, `updateTeacherAction`, `deleteTeacherAction`.

All follow the standard pattern: `"use server"` + try/catch + return null on error.

## Related Services Used by Teacher Pages

| Service | Used For |
|---|---|
| `qbank.service.js` | Question CRUD, AI generation, contest attachment |
| `subject.service.js` | Subject filter options |
| `grade.service.js` | Grade filter options |
| `teacher_profile.service.js` | Profile and class data |
| `notifications.service.js` | Contest clarifications, broadcasts |
| `students.service.js` | Student academic info updates |
