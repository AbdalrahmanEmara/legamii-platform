# 2. Technology Stack

## Core Framework

| Technology | Version | Purpose |
|---|---|---|
| **Next.js** | 16.1.6 | React framework with App Router, server components, and server actions |
| **React** | 19.2.3 | UI library for component-based architecture |
| **TypeScript** | ~5.x | Type safety (used in hooks, sockets, and layout files) |

Next.js 16 was chosen for its **App Router** which provides server components by default, allowing data fetching at the server level without exposing API secrets to the client. Server Actions (`"use server"`) provide a clean bridge between client interactions and backend API calls without building a separate BFF layer.

## Styling & Design

| Technology | Purpose |
|---|---|
| **Tailwind CSS v4** | Utility-first CSS framework with `@theme`-based design tokens |
| **shadcn/ui** | Reusable UI primitives (New York style, RSC enabled) |
| **class-variance-authority** | component variant management |
| **clsx + tailwind-merge** | Conditional class merging (`cn()` utility) |
| **prettier-plugin-tailwindcss** | Automatic Tailwind class sorting on format |

Tailwind v4 eliminates the need for `tailwind.config.js` — all design tokens live in `globals.css` under the `@theme` block, making them the single source of truth.

## Forms & Validation

| Technology | Purpose |
|---|---|
| **react-hook-form** | Performant form state management |
| **@hookform/resolvers** | Bridge between react-hook-form and Zod |
| **Zod** | Runtime schema validation |
| **zod** | Validation schemas in `src/lib/validators.js` |

All forms (signup, login, password reset, etc.) use react-hook-form with Zod schemas for type-safe validation. Error messages are defined within the Zod schemas themselves and displayed inline on form fields.

## State Management & Data Fetching

| Technology | Purpose |
|---|---|
| **TanStack React Query** | Client-side server state management |
| **Server Actions** | Server-side mutations with progressive enhancement |
| **Server Components** | Direct data fetching without client round-trips |

TanStack React Query is available for client components that need caching and background refetching. Server Components and Server Actions cover most data-fetching needs, following the architecture pattern.

## Real-Time

| Technology | Purpose |
|---|---|
| **Socket.IO (client)** | WebSocket-based real-time communication |
| **3 Namespaces** | `/contest`, `/leaderboard`, `/notifications` |

Socket.IO is used for:
- **Contest namespace** — real-time leaderboard updates, contest start/end events, teacher clarifications
- **Leaderboard namespace** — global leaderboard live updates
- **Notifications namespace** — push notifications and broadcasts

## Icons

| Technology | Purpose |
|---|---|
| **lucide-react** | Primary icon library (Bell, Search, Settings, etc.) |
| **Custom SVG icons** | Brand-specific icons (Logo, Fire, Flag, Subject icons, etc.) |

All custom icons live in `src/components/icons/` as individual React components.

## Authentication

| Technology | Purpose |
|---|---|
| **next/headers (cookies)** | Server-side cookie read/write |
| **httpOnly cookies** | Secure JWT storage (`token` and `role` cookies) |
| **Zod** | Auth schema validation |
| **Proxy/Middleware** | Route protection via `src/proxy.js` |

JWT tokens are stored in httpOnly cookies set by server actions, preventing XSS attacks. A middleware (`proxy.js`) protects routes by checking for the `token` cookie and validating role-based access.

## Fonts

| Font | Type | Usage |
|---|---|---|
| **Dogica** | Local (TTF) | Primary pixel font — titles, labels, nav |
| **Inter** | Google Fonts | Secondary — body text, headings |
| **Cabin Sketch** | Google Fonts | Logo accent ("LE" in LEGAMII) |
| **Jost** | Google Fonts | Theming alias `--font-futura` |
| **Montserrat** | Google Fonts | Additional heading style |
| **Rajdhani** | Google Fonts | Monospace-style accent |
| **Share Tech Mono** | Google Fonts | Technical/monospace text |

Dogica is loaded as a local font from `public/fonts/` via `next/font/local`, while all other fonts are loaded from Google Fonts via `next/font/google` in the root layout.

## Development Tools

| Tool | Purpose |
|---|---|
| **ESLint** (v9 flat config) | Code linting |
| **Prettier** | Code formatting with Tailwind class sorting |
| **Husky** | Pre-commit hooks |
| **lint-staged** | Run linters only on staged files |
| **PostCSS** | CSS processing with `@tailwindcss/postcss` |

## Package Management

```bash
npm run dev       # Next.js dev server on localhost:3000
npm run build     # Production build
npm run lint      # ESLint check (next lint)
npm run lint:fix  # ESLint auto-fix
npm run format    # Prettier write all
npm run format:check  # Prettier check only
```

## Why These Choices?

1. **Next.js App Router** — Server Components reduce client-side JavaScript, Server Actions eliminate API route boilerplate, and the file-based routing keeps the project organized by feature.

2. **Tailwind v4 with @theme** — No config file needed, all tokens in CSS, native dark mode via `@custom-variant`, and the utility-first approach keeps component files small.

3. **shadcn/ui** — Copy-paste components that are fully customizable, RSC-compatible, and don't add a heavy dependency.

4. **Server Actions** — They bridge the gap between client and server without building REST endpoints in Next.js (the backend already has the API). They handle auth cookies, validation, and redirects in one function.

5. **Socket.IO** — Built-in room support for contest-scoped events, auto-reconnection, and fallback to HTTP long-polling make it reliable for classroom use.
