# 5. Getting Started

## Prerequisites

- **Node.js** >= 18 (recommended: 20 LTS or later)
- **npm** >= 9

## Quick Start

```bash
# 1. Install dependencies
npm install

# 2. Start the development server
npm run dev
```

The app starts on **http://localhost:3000**.

## Environment Variables

All environment variables are in `.env` (committed to git):

```bash
# API base URL (NestJS backend)
NEXT_PUBLIC_API_BASE_URL=http://localhost:3000/api/v1

# Socket.IO URL (for real-time features)
NEXT_PUBLIC_SOCKET_URL=http://localhost:3000
```

> The `.env` file is committed. If you need to override values locally, create `.env.local` — it takes precedence over `.env`.

## Available Scripts

```bash
npm run dev          # Start Next.js dev server (localhost:3000)
npm run build        # Production build
npm run start        # Start production server
npm run lint         # Run ESLint (next lint, flat config)
npm run lint:fix     # ESLint auto-fix
npm run format       # Prettier format all files
npm run format:check # Check formatting without writing
```

## Development Workflow

1. **Start dev server** — `npm run dev`
2. **Make changes** — Pages auto-reload, components hot-reload
3. **Lint** — `npm run lint` before committing
4. **Format** — `npm run format` to auto-sort Tailwind classes and format code
5. **Build** — `npm run build` to verify production build

## Pre-commit Hooks

Husky runs `lint-staged` before every commit, which executes:

```
next lint --fix   # ESLint auto-fix on staged files
prettier --write  # Prettier format on staged files
```

If the pre-commit hook fails, fix the issues and try committing again.

## VSCode Setup

The `.vscode/` directory contains recommended settings. Key ones:

```json
{
  "files.associations": {
    "*.js": "javascriptreact"  // Treat .js files as JSX
  },
  "prettier.enable": true,
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode"
}
```

Install the **Prettier** and **Tailwind CSS IntelliSense** extensions for the best experience.

## Project Conventions

- **Import specifier preference:** Non-relative, e.g. `@/components/...` over `../../components/...`
- **Component exports:** Named exports for services/actions, default or named for components
- **CSS:** Tailwind utility classes only — no custom CSS files (except `globals.css` for `@theme`)
- **Dark mode:** Toggled by adding `.dark` class to the `<html>` element
- **Server vs Client:** Default to server components; add `"use client"` only when you need interactivity (hooks, event handlers, state)

## Debugging Tips

- **Server Action errors** — Check the terminal running `npm run dev`; server action logs appear there
- **Client errors** — Check browser DevTools console
- **API errors** — Check the Network tab in DevTools; if the backend isn't running, API calls will fail silently in actions (caught by try/catch)
- **Socket connection** — Socket connections log socket IDs to the console on connect
- **Cookie issues** — Check Application → Cookies in DevTools for `token` and `role` cookies

## Backend Dependency

The frontend requires the **NestJS backend** to be running for any data operations. Without it:
- Auth pages will fail to sign in/sign up
- No data will load on any page
- Socket connections will fail

The backend URL is configured through `NEXT_PUBLIC_API_BASE_URL` in `.env`.
