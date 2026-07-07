# Appendix D: Component Tree

## Directory Overview

```
src/components/
├── ui/              → 28 reusable UI primitives
├── layout/          → 5 app shell components
├── auth/            → 13 auth form components
├── home/            → 5 dashboard components
├── contest/         → 5 contest components
├── practice/        → 6 quiz components
├── notifications/   → 2 notification components
├── teacher/         → Teacher section components
│   ├── layout/      → 2 components (Header, Footer)
│   ├── shared/      → 1 component (Placeholder)
│   └── question-bank/ → 4 components
├── icons/           → 15 icon components
└── Skeletons/       → 3 skeleton components
```

---

## ui/ — Reusable Primitives

| Component | File | Type | Props | Notes |
|---|---|---|---|---|
| ReusableWindow | `ReusableWindow.js` | S/C | `title`, `width`, `height`, `className`, `children` | Retro window frame with title bar |
| Btn1 | `Btn1.js` | C | `href?`, `onClick?`, `loading?`, `type?`, `children` | Primary CTA, can be link or button |
| Button | `Button.js` | C | `onClick`, `children` | Simple purple button |
| ButtonSecondary | `ButtonSecondary.js` | C | `onClick`, `children` | Secondary variant |
| GoogleBtn | `GoogleBtn.js` | C | `onClick?` | Google OAuth button |
| SystemLoading | `SystemLoading.js` | S/C | — | Full-area loading spinner |
| SystemError | `SystemError.js` | C | `message`, `onRetry?` | Error state with retry |
| SystemConfirm | `SystemConfirm.tsx` | C | `isOpen`, `onClose`, `onConfirm`, `variant`, `loading`, `children` | Confirmation dialog |
| SystemValidation | `SystemValidation.tsx` | C | — | Validation popup |
| Timer | `Timer.js` | C | `seconds`, `onFinish` | MM:SS countdown, red ≤10s |
| ProgressBar | `ProgressBar.tsx` | C | `value`, `max?`, `height?`, `className`, `color?` | Progress indicator |
| CustomScroll | `CustomScroll.tsx` | C | `className`, `children` | Scrollable wrapper with custom thumb |
| BellButton | `BellButton.js` | C | — | Notification bell icon |
| StatusBadge | `StatusBadge.js` | S | `status` | Color-coded status/difficulty badge |
| ContentBox | `ContentBox.tsx` | S/C | `children`, `className` | Generic content container |
| Background | `Background.js` | S/C | `variant?`, `children` | Full-page background |
| BackgroundMain | `BackgroundMain.js` | S/C | `children` | Main app background |
| BackgroundAuth | `BackgroundAuth.js` | S/C | `children` | Auth page background |
| BackgroundFrom0 | `BackgroundFrom0.js` | S/C | `children` | Alternative background |
| Leaderboard | `Leaderboard.js` | C | — | Leaderboard display |
| LogoWord | `LogoWord.js` | S | `className?` | "LEGAMII" text logo |
| ContestCard | `ContestCard.js` | S | `contest`, `status` | Contest preview card (also in contest/) |
| ContestFilters | `ContestFilters.js` | C | `onFilterChange` | Filter sidebar |
| ContestLeaderboard | `ContestLeaderboard.js` | C | — | Contest leaderboard |
| ContestLobbyCard | `ContestLobbyCard.jsx` | S/C | — | Lobby info card |
| ContestQuestionList | `ContestQuestionList.jsx` | C | — | Question navigation |
| QuestionList | `QuestionList.js` | C | — | Generic question list |
| Footer | `Footer.tsx` | S | `variant` | Page footer (also in layout/) |

---

## layout/ — App Shell

| Component | File | Type | Props | Notes |
|---|---|---|---|---|
| AppShell | `AppShell.tsx` | S | `headerVariant: "student" \| "teacher"`, `children` | Root shell: Header + BackgroundMain + Footer |
| Header | `Header.js` | C | `variant` | Scroll-aware fixed header, logo + nav + bell + avatar |
| Navigation | `Navigation.js` | C | — | Nav links from `navigationLinks.js`, active detection |
| MobileMenu | `MobileMenu.js` | C | — | Full-screen nav overlay for mobile |
| Footer | `Footer.tsx` | S | `variant` | 4-column footer |

---

## auth/ — Auth Forms

| Component | File | Type | Notes |
|---|---|---|---|
| RoleContent | `RoleContent.js` | C | Role selection cards (Student/Teacher/Admin) |
| SigninContent | `SigninContent.js` | C | Login form, react-hook-form + zod, redirects by role |
| SignupContent | `SignupContent.js` | C | Registration form, role-aware fields |
| OtpInput | `OtpInput.js` | C | 6-digit OTP with auto-focus, paste, countdown |
| CreateNewPassForm | `CreateNewPassForm.js` | C | Password reset with requirements checklist |
| AuthHeader | `AuthHeader.js` | S | Logo + prompt text + link |
| FormInput | `FormInput.js` | C | Input with label, error, icon toggle |
| FormSelect | `FormSelect.js` | C | Select dropdown |
| GradeSelect | `GradeSelect.js` | C | Grade dropdown, fetches grades |
| LogoutButton | `LogoutButton.js` | C | Triggers `logoutAction()` |
| OrLine | `OrLine.js` | S | "or" divider |
| SigningContentHeader | `SigningContentHeader.js` | S | Title + subtitle |
| Logo | `Logo.js` | S | LogoIcon + "LE" (Cabin Sketch) + "GAMII" |

---

## home/ — Dashboard

| Component | File | Type | Notes |
|---|---|---|---|
| WelcomeBack | `WelcomeBack.js` | S | Greeting + class code join form |
| DailyMission | `DailyMission.js` | S | Mission cards with progress, auto-claim |
| Streak | `Streak.js` | S | Fire icon, week grid, streak stats |
| UpcomingContests | `UpcomingContests.js` | S | Top 3 upcoming contests |
| GlobalLeaderboard | `GlobalLeaderboard.js` | C | Top 100, socket-powered live updates |

---

## contest/ — Contest System

| Component | File | Type | Notes |
|---|---|---|---|
| MainContestPage | `MainContestPage.js` | C | Layout with filter sidebar + contest list |
| ContestList | `ContestList.js` | S | Renders list of ContestCards |
| ContestListWrapper | `ContestListWrapper.js` | S | Fetches contests + error handling |
| ContestCard | `ContestCard.js` | S | Individual contest card with status-based button |
| ContestListSkeleton | `ContestListSkeleton.js` | S | 3 skeleton cards for loading |

---

## practice/ — Quiz System

| Component | File | Type | Notes |
|---|---|---|---|
| StartQuizButton | `StartQuizButton.js` | S | Form bound to `startQuizAction` |
| AnswerOption | `AnswerOption.js` | C | Optimistic UI on click, calls `solveQuestionAction` |
| Progressbar | `Progressbar.js` | C | Quiz progress (current/total) |
| SummaryPage | `SummaryPage.js` | C | Results: accuracy, XP, score, question review |
| QuestionReviewCard | `QuestionReviewCard.js` | C | Per-question display with correct/incorrect highlights |
| AiTutorModal | `AiTutorModal.js` | C | Claude AI tutor, chat interface, shown on "Explain More" |

---

## notifications/

| Component | File | Type | Notes |
|---|---|---|---|
| NotificationItem | `NotificationItem.js` | C | Single notification row |
| NotificationListener | `NotificationListener.js` | C | Invisible, connects notification socket, renders null |

---

## teacher/ — Teacher Section

| Component | File | Type | Notes |
|---|---|---|---|
| TeacherHeader | `teacher/layout/TeacherHeader.tsx` | C | Dark theme header with nav + streak + bell + avatar |
| TeacherFooter | `teacher/layout/TeacherFooter.tsx` | S | Light theme footer with links |
| TeacherFlowPlaceholder | `teacher/shared/TeacherFlowPlaceholder.tsx` | S | "Under construction" placeholder |
| TeacherQuestionBankPage | `teacher/question-bank/TeacherQuestionBankPage.tsx` | C | Page layout for question bank |
| TeacherQuestionBankWorkspace | `teacher/question-bank/TeacherQuestionBankWorkspace.tsx` | C | Filter bar + question grid |
| TeacherQuestionCard | `teacher/question-bank/TeacherQuestionCard.tsx` | S/C | Question preview card |
| TeacherQuestionEditorModal | `teacher/question-bank/TeacherQuestionEditorModal.tsx` | C | Add/edit modal with AI generation |

---

## icons/ — Custom SVG Icons

| Component | File | Description |
|---|---|---|
| LogoIcon | `LogoIcon.tsx` | Geometric L logo |
| ArrowIcon | `ArrowIcon.tsx` | Directional arrow |
| BellIcon | `BellIcon.tsx` | Bell |
| CloseIcon | `CloseIcon.tsx` | X close |
| DoneIcon | `DoneIcon.tsx` | Checkmark |
| FireIcon | `FireIcon.tsx` | Flame |
| FlagIcon | `FlagIcon.js` | Question flag |
| GoogleIcon | `GoogleIcon.tsx` | Google G |
| HamburgerIcon | `HamburgerIcon.tsx` | Menu hamburger |
| MinusIcon | `MinusIcon.tsx` | Minus |
| NotificationIcons | `NotificationIcons.jsx` | Notification type icons |
| SearchIcon | `SearchIcon.tsx` | Magnifying glass |
| SettingsIcon | `SettingsIcon.tsx` | Gear |
| SquareIcon | `SquareIcon.tsx` | Empty square |
| MathsIcon | `subjects/MathsIcon.tsx` | Math icon |
| ScienceIcon | `subjects/ScienceIcon.tsx` | Science icon |
| HistoryIcon | `subjects/HistoryIcon.tsx` | History icon |

---

## Skeletons/ — Loading States

| Component | File | Used For |
|---|---|---|
| UpcomingContestSkeleton | `UpcomingContestSkeleton.js` | `UpcomingContests` Suspense fallback |
| StreakSkeleton | `StreakSkeleton.js` | `Streak` Suspense fallback |
| DailyMissionSkeleton | `DailyMissionSkeleton.js` | `DailyMission` Suspense fallback |
