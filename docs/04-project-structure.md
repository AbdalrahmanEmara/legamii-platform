# 4. Project Structure

## Directory Layout

```
legamii-platform/
├── src/
│   ├── app/                     # Next.js App Router pages & layouts
│   ├── components/              # React components
│   ├── lib/                     # Business logic (services, actions, api)
│   └── proxy.js                 # Middleware (route protection)
├── public/
│   └── fonts/                   # Local fonts (Dogica TTF files)
├── docs/                        # Documentation (this book)
├── .husky/                      # Git hooks (pre-commit lint-staged)
├── .vscode/                     # VSCode workspace settings
├── .env                         # Environment variables (committed)
├── eslint.config.mjs            # ESLint v9 flat config
├── next.config.ts               # Next.js config
├── postcss.config.mjs           # PostCSS config (Tailwind v4)
├── package.json
├── tsconfig.json
├── components.json              # shadcn/ui config
└── opencode.json                # AI assistant config
```

## `src/app/` — Pages & Layouts

```
src/app/
├── layout.tsx                   # Root layout: fonts, Toaster, globals.css
├── page.tsx                     # Landing / design system test page
├── globals.css                  # Tailwind v4 @theme + global styles
├── favicon.ico
├── (app)/                       # Authenticated routes group
│   ├── layout.tsx               # Pass-through layout
│   ├── page.js                  # Redirects to /home
│   ├── hooks/                   # Socket React hooks
│   │   ├── useContestSocket.ts
│   │   ├── useLeaderboardSocket.ts
│   │   └── useNotificationSocket.ts
│   ├── student/                 # Student routes
│   │   ├── layout.tsx           # AppShell with headerVariant="student"
│   │   ├── home/page.js         # Dashboard
│   │   ├── practice/page.js     # Subject selection → quiz
│   │   ├── practice/[quiz_id]/page.js  # Active quiz
│   │   ├── contests/page.js     # Contest listing
│   │   ├── contests/[classId]/[contestId]/page.js  # Contest lobby
│   │   ├── contests/play/[studentContestId]/page.js # Contest play
│   │   ├── contests/summary/[studentContestId]/page.js  # Post-contest summary
│   │   ├── contests/detailed-summary/[studentContestId]/page.js # Detailed review
│   │   ├── leaderboard/page.js  # Global leaderboard
│   │   ├── notifications/page.js # Notification list
│   │   ├── aiChat/page.js       # AI tutor chat
│   │   └── grade/updateAcadInfo/page.js # Academic info update
│   └── teacher/                 # Teacher routes
│       ├── layout.tsx           # AppShell with headerVariant="teacher"
│       ├── dashboard/page.tsx   # Dashboard (placeholder)
│       ├── classes/page.tsx     # Class management (placeholder)
│       ├── contests/page.tsx    # Contest management (placeholder)
│       ├── analytics/page.tsx   # Analytics (placeholder)
│       └── qBank/               # Question bank (fully implemented)
│           ├── page.tsx         # Question list / workspace
│           ├── add/page.tsx     # Add question (opens editor modal)
│           └── [questionId]/
│               ├── edit/page.tsx  # Edit question
│               └── use/page.tsx   # Use question (placeholder)
└── auth/                        # Public auth routes
    ├── (signInOut)/             # Full-page auth with side branding
    │   ├── layout.js            # BackgroundV2 wrapper
    │   ├── role/page.js         # Role selection
    │   ├── signin/page.js       # Login
    │   └── signup/page.js       # Registration
    └── (restAuthPages)/         # Password assistance flow
        ├── layout.js            # Centered ReusableWindow wrapper
        ├── forget-password/page.js
        ├── otp/page.js           # Email verification OTP
        └── create-new-password/page.js
```

## `src/components/` — React Components

```
src/components/
├── ui/              # Reusable UI primitives (28 components)
│   ├── ReusableWindow.js    # Window frame with title bar
│   ├── Btn1.js              # Primary action button
│   ├── Button.js            # Simple button
│   ├── ButtonSecondary.js   # Secondary variant
│   ├── SystemLoading.js     # Loading spinner
│   ├── SystemError.js       # Error state
│   ├── SystemConfirm.tsx    # Confirmation dialog
│   ├── SystemValidation.tsx # Validation popup
│   ├── Timer.js             # Countdown timer
│   ├── ProgressBar.tsx      # Progress indicator
│   ├── CustomScroll.tsx     # Custom scrollbar wrapper
│   ├── BellButton.js        # Notification bell
│   ├── StatusBadge.js       # Status/difficulty badges
│   ├── ContentBox.tsx       # Generic container
│   ├── Leaderboard.js       # Leaderboard display
│   ├── Background*.js       # Background variants (Main, Auth, From0)
│   ├── LogoWord.js          # "LEGAMII" text logo
│   ├── GoogleBtn.js         # Google sign-in button
│   ├── ContestCard.js       # Contest preview card
│   ├── ContestFilters.js    # Contest filter sidebar
│   ├── ContestLeaderboard.js
│   ├── ContestLobbyCard.jsx
│   ├── ContestQuestionList.jsx
│   ├── QuestionList.js
│   └── Footer.tsx
├── auth/             # Auth form components (13 components)
│   ├── SigninContent.js
│   ├── SignupContent.js
│   ├── RoleContent.js
│   ├── OtpInput.js
│   ├── CreateNewPassForm.js
│   ├── FormInput.js
│   ├── FormSelect.js
│   ├── GradeSelect.js
│   ├── AuthHeader.js
│   └── ...
├── layout/           # App shell components
│   ├── AppShell.tsx       # Root shell (Header + Background + Footer)
│   ├── Header.js          # Client header with scroll behavior
│   ├── Footer.tsx         # Page footer
│   ├── Navigation.js      # Nav links from navigationLinks.js
│   └── MobileMenu.js      # Full-screen mobile nav overlay
├── home/             # Student dashboard components
│   ├── WelcomeBack.js     # Greeting + class code join
│   ├── DailyMission.js    # Mission cards with progress
│   ├── Streak.js          # Streak counter + week grid
│   ├── UpcomingContests.js # Top 3 upcoming contests
│   └── GlobalLeaderboard.js # Live top 100 leaderboard
├── contest/          # Contest-related components
│   ├── MainContestPage.js
│   ├── ContestList.js
│   ├── ContestListWrapper.js
│   ├── ContestCard.js
│   └── ContestListSkeleton.js
├── practice/         # Quiz-related components
│   ├── StartQuizButton.js
│   ├── AnswerOption.js
│   ├── Progressbar.js
│   ├── SummaryPage.js
│   ├── QuestionReviewCard.js
│   └── AiTutorModal.js
├── notifications/    # Notification components
│   ├── NotificationItem.js
│   └── NotificationListener.js
├── teacher/          # Teacher section components
│   ├── layout/           # TeacherHeader + TeacherFooter
│   ├── shared/           # TeacherFlowPlaceholder
│   └── question-bank/    # Workspace, Card, Editor Modal, Page
├── icons/            # Custom SVG icons (15 components)
│   ├── LogoIcon.tsx, FireIcon.tsx, FlagIcon.js
│   ├── BellIcon, CloseIcon, DoneIcon, GoogleIcon
│   ├── HamburgerIcon, SearchIcon, SettingsIcon
│   ├── ArrowIcon, MinusIcon, SquareIcon
│   ├── NotificationIcons.jsx
│   └── subjects/         # MathsIcon, ScienceIcon, HistoryIcon
└── Skeletons/        # Loading skeleton components
    ├── UpcomingContestSkeleton.js
    ├── StreakSkeleton.js
    └── DailyMissionSkeleton.js
```

## `src/lib/` — Business Logic

```
src/lib/
├── api/
│   ├── client.js         # HTTP client (fetch wrapper, JWT cookie)
│   └── endPoints.js      # Endpoint path definitions
├── services/             # Server-only API call wrappers
│   ├── auth.service.js
│   ├── quiz.service.js
│   ├── student_contest.service.js
│   ├── student_profile.service.js
│   ├── teacher_profile.service.js
│   ├── qbank.service.js
│   ├── notifications.service.js
│   ├── leaderboard.service.js
│   ├── streak.service.js
│   ├── missions.service.js
│   ├── subject.service.js
│   ├── grade.service.js
│   ├── school.service.js
│   ├── students.service.js
│   └── index.js          # Re-exports all services
├── actions/              # Server actions (use server)
│   ├── auth.action.js
│   ├── quiz.action.js
│   ├── student_contest.action.js
│   ├── student_profile.action.js
│   ├── teacher_profile.action.js
│   ├── qbank.action.js
│   ├── notifications.action.js
│   ├── leaderboard.action.js
│   ├── streak.action.js
│   ├── missions.action.js
│   ├── subject.action.js
│   └── grade.action.js
├── sockets/              # Socket.IO connection modules
│   ├── contest.socket.ts
│   ├── leaderboard.socket.ts
│   └── notification.socket.ts
├── constants.js          # API_VERSION, SOCKET_URL
├── navigationLinks.js    # STUDENT_LINKS, TEACHER_LINKS arrays
├── validators.js         # Zod schemas (auth, missions)
└── utils.js              # cn(), getRelativeTime(), getTimeAgo()
```

## Key Conventions

### File Extensions
- **`.js`** — Treated as JSX (VSCode setting: `"files.associations": {"*.js": "javascriptreact"}`)
- **`.tsx`** — Used for layout files, hooks, sockets, and typed components
- **`.ts`** — Used for typed utility modules (sockets)

### Import Alias
- `@/*` maps to `./src/*`
- Example: `import { cn } from "@/lib/utils"`

### Naming Conventions
- **Service files:** `domain.service.js` — exports `verbNoun` functions
- **Action files:** `domain.action.js` — exports `verbNounAction` functions
- **Component files:** `PascalCase.js` — default or named exports
- **Page files:** `page.js` / `page.tsx` — Next.js convention
- **Layout files:** `layout.js` / `layout.tsx` — Next.js convention
- **Endpoint keys:** CamelCase grouped by domain in `ENDPOINTS` object
