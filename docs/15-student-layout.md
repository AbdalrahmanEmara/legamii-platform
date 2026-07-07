# 15. Student Layout

## Overview

The student section uses `AppShell` — a layout wrapper that provides the header, background, navigation, and footer consistently across all student pages.

## Layout Chain

```
RootLayout (app/layout.tsx)
  │  Fonts, Toaster, globals.css
  │
  └─ AppLayout (app/(app)/layout.tsx)
       │  Pass-through (<>{children}</>)
       │
       └─ StudentLayout (app/(app)/student/layout.tsx)
            │  <AppShell headerVariant="student">
            │    <Header variant="student" />
            │    <NotificationListener />   (invisible, socket setup)
            │    <BackgroundMain>
            │      {children}               (page content)
            │    </BackgroundMain>
            │    <Footer variant="student" />
            │  </AppShell>
```

## AppShell

**File:** `src/components/layout/AppShell.tsx`

```tsx
export default function AppShell({ headerVariant, children }) {
  return (
    <>
      <Header variant={headerVariant} />
      <BackgroundMain>
        <div className="pt-xl4">  {/* 72px offset for fixed header */}
          {children}
        </div>
      </BackgroundMain>
      <Footer variant={headerVariant} />
    </>
  );
}
```

Manages three fixed sections:
- **Header** — Fixed at top (`z-50`), hides on scroll down, shows on scroll up
- **BackgroundMain** — Content area with the themed background image
- **Footer** — Page footer with navigation links

## Header

**File:** `src/components/layout/Header.js`

A client component with scroll-aware visibility:

```jsx
"use client";
import { useEffect, useState, useRef } from "react";

function Header() {
  const [visible, setVisible] = useState(true);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > lastScrollY.current && window.scrollY > 50) {
        setVisible(false);  // Hide on scroll down
      } else {
        setVisible(true);   // Show on scroll up
      }
      lastScrollY.current = window.scrollY;
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className={`fixed top-0 z-50 w-full transition-transform ${visible ? "translate-y-0" : "-translate-y-full"}`}>
      <div className="flex items-center justify-between px-4 py-2">
        <Logo />
        <Navigation />           {/* Desktop nav links */}
        <div className="flex items-center gap-3">
          <FireIcon />           {/* Streak display */}
          <span>14 Days</span>
          <BellButton />         {/* Notification bell */}
          <ProgressBar />        {/* Level/XP progress */}
          <Avatar />             {/* User avatar */}
          <HamburgerIcon />      {/* Mobile menu toggle */}
        </div>
      </div>
    </header>
  );
}
```

**Desktop layout (left to right):**
```
[Logo] [Navigation links] [Streak] [Bell] [Level/XP bar] [Avatar] [Hamburger]
```

**Mobile layout (left to right):**
```
[Logo] [Bell] [Hamburger]
```

## Navigation

**File:** `src/components/layout/Navigation.js`

Renders horizontal navigation links based on the current route group. Students see links from `STUDENT_LINKS`:

```js
// src/lib/navigationLinks.js
export const STUDENT_LINKS = [
  { href: "/student/home", label: "Home" },
  { href: "/student/contests", label: "Contests" },
  { href: "/student/practice", label: "Practice" },
  { href: "/student/aiChat", label: "AI Chat" },
];
```

Active link detection via `usePathname()` — applies bold styling and color to the active link.

## MobileMenu

**File:** `src/components/layout/MobileMenu.js`

Full-screen overlay menu triggered by the hamburger icon:
- Logo + close button
- Streak, level, and XP display (student only)
- Navigation links (same as desktop)
- Notifications link
- Covers entire viewport with high z-index

## NotificationListener

**File:** `src/components/notifications/NotificationListener.js`

An invisible client component embedded in the layout that:
1. Checks for a valid session via `getSessionAction()`
2. Connects to the notification WebSocket when authenticated
3. Listens for `notification` and `broadcast` events
4. Logs events to console (no visible UI — it's the socket connection manager)

## Footer

**File:** `src/components/layout/Footer.tsx`

Four-column footer:
| Column | Content |
|---|---|
| **Brand** | Logo + "Gamified learning platform" tagline |
| **Navigation** | Student nav links (Home, Contests, Practice, Leaderboard, Subjects) |
| **System** | Help, About, Privacy Policy, Terms of Service |
| **Connect** | GitHub, LinkedIn, Twitter icons |

Styled with `primary-500` decorative corner blocks.
