# AGENTS.md — Legamii Platform

## Quick start

```bash
npm run dev       # Next.js dev server (localhost:3000)
npm run build     # production build
npm run lint      # next lint (ESLint v9 flat config)
npm run lint:fix  # next lint --fix
npm run format    # prettier --write . (includes Tailwind class sorting)
npm run format:check
```

Pre-commit: Husky runs `lint-staged` → `next lint --fix` + `prettier --write`.

No test framework is installed. No CI pipeline.

## Architecture

```
Backend API → Service (server-only) → Action ('use server') → Component
```

All files in `src/`; path alias `@/*` → `./src/*`.

### Data-fetching decision table

| Situation | Solution |
|---|---|
| Server `page.js` displaying data | call service directly |
| Button/form doing a mutation | create an action in `lib/actions/` |
| Client component needs data | action + `useEffect` |
| Unsure if you can call a service directly | you need an action |

### Service rules (from `docs/api.md`)

- Every service file must start with `import "server-only"`
- Services import `api` from `@/lib/api/client` and `ENDPOINTS` from `@/lib/api/endPoints` — **no direct `fetch`**
- Exception: Cloudinary (uses `fetch` for `multipart/form-data`)
- Body passed as a single object; the service never destructures it
- Components must not import services directly (services are server-only)

### API client (`src/lib/api/client.js`)

- Reads `NEXT_PUBLIC_API_BASE_URL` from env
- Auto-attaches JWT from the `token` cookie (`Authorization: Bearer`)
- Exports `api.get/post/put/patch/delete`
- Endpoints in `src/lib/api/endPoints.js`: static → plain string, dynamic → arrow function
- API version is `"v1"` (from `src/lib/constants.js`)

### Caveats

- `*.js` files are treated as JSX (VSCode setting: `"files.associations": {"*.js": "javascriptreact"}`)
- Import specifier preference: non-relative (e.g. `@/components/...`)
- Auth: JWT stored in HTTP-only cookie named `token`; `loginAction` sets it server-side
- No `services/index.js` exists yet (re-exports need to be created per domain)
- `opencode.json` has a Figma MCP server configured (inline API key committed)
- `.env` is committed to git (contains `NEXT_PUBLIC_API_BASE_URL`)

## Design system

Tailwind CSS v4 — **no `tailwind.config.js`**. All tokens in `src/app/globals.css` (`@theme` block).

- Custom spacing: `zero`, `px`, `xxs`, `xs2`, `xs`, `sm`, `base`, `md`, `lg`, `xl`, `xl2`–`xl6`
- Custom typography classes: `title-1` to `title-3`, `heading-h1` to `heading-h7`, `label-1` to `label-3`, `body-1` to `body-4`, `caption-1`/`caption-2`
- Fonts: Dogica (primary, pixel), Inter (secondary), Cabin Sketch, Jost, Montserrat, Rajdhani, Share Tech Mono
- Dark mode via `.dark` class (`@custom-variant dark` in CSS)
- shadcn/ui (New York style, `rsc: true`)
  - UI components from `@/components/ui`
  - Utility `cn()` from `@/lib/utils` (uses `clsx` + `tailwind-merge`)
- `prettier-plugin-tailwindcss` sorts Tailwind classes on format

## Project structure

```
src/
├── app/          # Next.js App Router pages (layout.tsx, page.tsx, (app)/, auth/)
├── components/   # React components (ui/, shared/, auth/, home/, practice/, icons/, layout/)
└── lib/
    ├── actions/  # 'use server' actions (bridge between client and services)
    ├── api/      # API client + endpoint definitions
    ├── services/ # server-only business logic (import "server-only")
    ├── constants.js
    ├── utils.js  # cn()
    └── validators.js
```

## Key packages

- Next.js 16.1.6, React 19.2.3
- Tailwind CSS v4, PostCSS (`@tailwindcss/postcss`)
- `@tanstack/react-query` (for client state)
- `react-hook-form` + `@hookform/resolvers` + `zod` (forms + validation)
- `lucide-react` (icon library per shadcn config)
- `class-variance-authority` + `clsx` + `tailwind-merge`
- `radix-ui` (primitive components)
