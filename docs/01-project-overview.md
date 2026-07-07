# 1. Project Overview

## What is Legamii?

Legamii is a **gamified learning platform** designed for K-12 students and their teachers. It transforms traditional studying into an engaging, game-like experience where students earn XP, maintain streaks, compete in contests, and level up — all while mastering their curriculum.

The platform serves two primary user roles:

- **Students** — Practice subjects through quizzes, compete in live contests, track streaks and daily missions, chat with an AI tutor, and climb the global leaderboard.
- **Teachers** — Create and manage question banks, organize contests, monitor class performance through analytics, and manage classroom rosters.

## Problem Statement

Traditional educational tools often fail to engage students beyond the classroom. Students lack motivation for self-study, teachers lack tools to create competitive, fun learning experiences, and there is no seamless bridge between classroom instruction and independent practice. Legamii solves this by introducing game mechanics (XP, levels, streaks, leaderboards, contests) into the learning process, making practice feel like play.

## Key Features

### Student Features
- **Practice Quizzes** — Subject-based quizzes with adaptive difficulty, timed sessions, and instant feedback
- **Live Contests** — Real-time competitive quizzes against classmates with leaderboards and scoring
- **Streak System** — Daily practice tracking with fire icons and streak counts to encourage consistency
- **Daily Missions** — Goal-oriented tasks with XP rewards to guide daily learning
- **AI Tutor** — Anthropic Claude-powered assistant for question explanations and learning help
- **Global Leaderboard** — School-wide ranking with real-time updates via WebSocket
- **Notifications** — Real-time alerts for contests, broadcasts, and updates

### Teacher Features
- **Question Bank** — Full CRUD for questions with AI generation support
- **Contest Management** — Create and manage contests for classes
- **Class Management** — View and manage classroom rosters
- **Analytics Dashboard** — Student performance overview

### Cross-Cutting
- **JWT Authentication** — Secure, cookie-based auth with role separation
- **Real-Time Updates** — WebSocket-powered live features (contests, leaderboard, notifications)
- **Dark Mode** — Full dark theme support via CSS class toggling
- **Responsive Design** — Mobile-friendly layouts with adaptive navigation

## System Context

```
┌─────────────────────────────────────────────────┐
│                  Browser (Client)                │
│  ┌───────────────────────────────────────────┐  │
│  │         Next.js 16 App (Frontend)         │  │
│  │  ┌─────┐ ┌──────┐ ┌──────┐ ┌──────────┐  │  │
│  │  │Pages│ │Comp. │ │Actions│ │ Sockets  │  │  │
│  │  └─────┘ └──────┘ └──────┘ └──────────┘  │  │
│  └───────────────────────────────────────────┘  │
│                        │                         │
│           ┌────────────┼────────────┐            │
│           ▼            ▼            ▼            │
│     REST API      WebSocket      Auth Cookies    │
│     (HTTP)       (/namespace)   (httpOnly)       │
└───────────────────────┬─────────────────────────┘
                        │
                        ▼
              ┌──────────────────┐
              │  NestJS Backend  │
              │   (REST + WS)   │
              └──────────────────┘
                        │
                        ▼
              ┌──────────────────┐
              │    Database      │
              └──────────────────┘
```

The frontend is a **Next.js 16 App Router** application that communicates with a NestJS backend through REST endpoints (via a typed API client) and WebSocket connections (for real-time features). Authentication is handled via httpOnly JWT cookies set by server actions.

## Technical Highlights

| Aspect | Implementation |
|---|---|
| Rendering | Hybrid SSR + CSR (Server Components + Client Components) |
| Data Flow | `Backend API → Service (server-only) → Action ('use server') → Component` |
| Styling | Tailwind CSS v4 with custom `@theme` tokens |
| UI Library | shadcn/ui (New York style, RSC-enabled) |
| Forms | react-hook-form + @hookform/resolvers + Zod |
| Real-Time | Socket.IO with 3 namespaces |
| Auth | httpOnly JWT cookies, middleware-protected routes |
| Icons | lucide-react + custom SVG icons |
| State | TanStack React Query (client) |
