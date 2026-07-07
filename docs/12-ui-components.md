# 12. UI Components Catalog

## Location

`src/components/ui/` — 28 reusable UI components.

## Layout & Container Components

### ReusableWindow
The most used UI component — a retro-styled window frame with a title bar.

```jsx
import ReusableWindow from "@/components/ui/ReusableWindow";

<ReusableWindow
  title="GLOBAL LEADERBOARD"
  width="1004px"
  height="auto"
  className="mx-auto my-8"
>
  {/* Window content */}
</ReusableWindow>
```

**Props:** `title`, `width`, `height`, `className`, `children`
**Visual:** Gray border, title bar with close/minimize/maximize icons (colored dots), shadow, rounded corners.

### ContentBox
Generic content container with consistent padding and borders.

```jsx
import ContentBox from "@/components/ui/ContentBox";

<ContentBox>
  <p>Content inside a styled box</p>
</ContentBox>
```

### CustomScroll
Wraps content in a custom scrollable area with a draggable thumb.

```jsx
import CustomScroll from "@/components/ui/CustomScroll";

<CustomScroll className="max-h-[520px] px-4 py-3">
  <LongContent />
</CustomScroll>
```

**Props:** `className`, `children`

## Background Components

| Component | Usage |
|---|---|
| `Background` | Full-page image background |
| `BackgroundAuth` | Auth-specific background variant |
| `BackgroundMain` | Main app content area background |
| `BackgroundFrom0` | Alternative background variant |

The background is automatically applied by `AppShell` — you don't need to add it manually on pages.

## Button Components

### Btn1
Primary action button. Used throughout the app for main CTAs.

```jsx
import Btn1 from "@/components/ui/Btn1";

// As a link
<Btn1 href="/student/home">GO BACK</Btn1>

// As a button
<Btn1 onClick={handleClick}>START QUIZ</Btn1>

// With loading state
<Btn1 loading={isLoading}>SAVE</Btn1>
```

**Props:** `href` (optional, renders Link), `onClick`, `loading`, `children`, `type`
**Visual:** Purple background (`bg-primary-500`), uppercase text, shadow, loading spinner.

### Button
Simple styled button with purple bg, black border, shadow.

```jsx
import { Button } from "@/components/ui/Button";

<Button onClick={handleClick}>Click Me</Button>
```

### ButtonSecondary
Secondary variant with inverse styling.

```jsx
import { ButtonSecondary } from "@/components/ui/ButtonSecondary";

<ButtonSecondary>Cancel</ButtonSecondary>
```

### GoogleBtn
Google OAuth sign-in button.

```jsx
import GoogleBtn from "@/components/ui/GoogleBtn";
```

## Feedback & Modal Components

### SystemLoading
Full-area loading spinner. Used in `loading.js` files and client-side loading states.

```jsx
import SystemLoading from "@/components/ui/SystemLoading";

if (loading) return <SystemLoading />;
```

### SystemError
Error state display with optional retry.

```jsx
import SystemError from "@/components/ui/SystemError";

if (error) return <SystemError message={error} />;
```

### SystemConfirm
Confirmation dialog with danger/safe variants.

```jsx
import SystemConfirm from "@/components/ui/SystemConfirm";

<SystemConfirm
  isOpen={showConfirm}
  onClose={() => setShowConfirm(false)}
  onConfirm={handleDelete}
  variant="danger"
  loading={isDeleting}
>
  Are you sure you want to delete this question?
</SystemConfirm>
```

**Props:** `isOpen`, `onClose`, `onConfirm`, `variant` ("danger" | "safe"), `loading`, `children`

### SystemValidation
Validation error popup with yellow warning styling.

```jsx
import SystemValidation from "@/components/ui/SystemValidation";
```

## Display Components

### Timer
Countdown timer with MM:SS format. Turns red when ≤ 10 seconds.

```jsx
import Timer from "@/components/ui/Timer";

<Timer seconds={90} onFinish={handleTimeUp} />
```

**Props:** `seconds` (initial countdown value), `onFinish` (callback when timer hits 0)

### ProgressBar
Configurable progress indicator.

```jsx
import ProgressBar from "@/components/ui/ProgressBar";

<ProgressBar value={60} max={100} className="h-2" />
```

**Props:** `value`, `max`, `height`, `className`, `color`

### StatusBadge
Displays status or difficulty level with color coding.

```jsx
import { StatusBadge } from "@/components/ui/StatusBadge";

<StatusBadge status="EASY" />
<StatusBadge status="ONGOING" />
```

**Color mapping by difficulty:**
- `EASY` → green
- `MEDIUM` → yellow
- `HARD` → red
- `EXTRA_HARD` → purple

**Color mapping by contest status:**
- `UPCOMING` → blue
- `ONGOING` → green
- `FINISHED` → gray

### LogoWord
Renders "LEGAMII" as a text-only logo.

## Navigation Components

### BellButton
Notification bell icon with unread count badge.

```jsx
import BellButton from "@/components/ui/BellButton";
```

## Icon Components

Located in `src/components/icons/`:

| Icon | File | Description |
|---|---|---|
| `LogoIcon` | LogoIcon.tsx | The Legamii geometric logo |
| `ArrowIcon` | ArrowIcon.tsx | Directional arrow |
| `BellIcon` | BellIcon.tsx | Bell icon for notifications |
| `CloseIcon` | CloseIcon.tsx | X close button |
| `DoneIcon` | DoneIcon.tsx | Checkmark / completion |
| `FireIcon` | FireIcon.tsx | Flame for streak display |
| `FlagIcon` | FlagIcon.js | Flag for question bookmarking |
| `GoogleIcon` | GoogleIcon.tsx | Google "G" logo for OAuth |
| `HamburgerIcon` | HamburgerIcon.tsx | Three-line menu icon |
| `MinusIcon` | MinusIcon.tsx | Minus/collapse icon |
| `NotificationIcons` | NotificationIcons.jsx | Various notification type icons |
| `SearchIcon` | SearchIcon.tsx | Magnifying glass |
| `SettingsIcon` | SettingsIcon.tsx | Gear icon |
| `SquareIcon` | SquareIcon.tsx | Empty square (for checkboxes) |
| `MathsIcon` | subjects/MathsIcon.tsx | Math subject icon |
| `ScienceIcon` | subjects/ScienceIcon.tsx | Science subject icon |
| `HistoryIcon` | subjects/HistoryIcon.tsx | History subject icon |

Usage:
```jsx
import FireIcon from "@/components/icons/FireIcon";
<FireIcon className="h-6 w-6" />
```

Icons are inline SVGs as React components. They accept `className` for sizing and coloring.

## Contest-specific UI Components

| Component | Description |
|---|---|
| `ContestCard.js` | (In ui/) Contest preview card |
| `ContestFilters.js` | Sidebar filter for contest list |
| `ContestLeaderboard.js` | Leaderboard within a contest |
| `ContestLobbyCard.jsx` | Contest lobby info card |
| `ContestQuestionList.jsx` | Question navigation list |
| `QuestionList.js` | Generic question list |

These are used by the contest system and are documented in more detail in Chapter 18.

## Skeleton Components

Located in `src/components/Skeletons/`:

| Component | For |
|---|---|
| `UpcomingContestSkeleton.js` | Loading state of UpcomingContests |
| `StreakSkeleton.js` | Loading state of Streak |
| `DailyMissionSkeleton.js` | Loading state of DailyMission |

Usage with Suspense:
```jsx
import UpcomingContestsSkeleton from "@/components/Skeletons/UpcomingContestSkeleton";

<Suspense fallback={<UpcomingContestsSkeleton />}>
  <UpcomingContests />
</Suspense>
```

## Component Usage Guidelines

1. **Use `ReusableWindow` for page content areas** — it provides the consistent retro-window frame
2. **Use `Btn1` for primary CTAs** — start quiz, submit, save, register
3. **Use `SystemLoading` for loading states** — both full-page and sections
4. **Use `SystemError` for error states** — with retry option when possible
5. **Use `Timer` for quiz/contest countdowns** — it handles the MM:SS formatting and urgent styling
6. **Use `ProgressBar` for progress indicators** — quiz progress, XP progress
7. **Use `CustomScroll` for scrollable lists** — leaderboard, question lists
8. **Use `cn()` for conditional class merging** — never build class strings manually
9. **Icons accept Tailwind classes** — pass `className` for size/color overrides
