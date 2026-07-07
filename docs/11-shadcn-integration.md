# 11. shadcn/ui Integration

## Overview

Legamii uses **shadcn/ui** (New York style, with `rsc: true` enabled) for reusable UI primitives. shadcn/ui components are copy-pasted (not a dependency) and fully customizable.

## Configuration

**File:** `components.json` at project root:
```json
{
  "$schema": "https://ui.shadcn.com/schema.json",
  "style": "new-york",
  "rsc": true,
  "tsx": true,
  "tailwind": { ... },
  "aliases": {
    "components": "@/components",
    "utils": "@/lib/utils"
  }
}
```

| Setting | Value | Meaning |
|---|---|---|
| `style` | `"new-york"` | New York style (compact, bordered) |
| `rsc` | `true` | RSC-compatible output |
| `tsx` | `true` | Components in TypeScript |

## Utility Function

Located at `src/lib/utils.js`:
```js
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}
```

The `cn()` utility merges Tailwind classes intelligently — later classes override conflicting earlier ones. Use it for all conditional styling in components.

## CSS Variable Integration

shadcn/ui components use CSS variables (oklch color space) defined in `globals.css`:

```css
:root {
  --shadcn-background: oklch(1 0 0);
  --shadcn-foreground: oklch(0.145 0 0);
  --shadcn-card: oklch(1 0 0);
  --shadcn-card-foreground: oklch(0.145 0 0);
  --shadcn-popover: oklch(1 0 0);
  --shadcn-primary: oklch(0.205 0.042 265.755);
  --shadcn-primary-foreground: oklch(0.985 0 0);
  --shadcn-secondary: oklch(0.965 0.001 286.375);
  --shadcn-muted: oklch(0.965 0.001 286.375);
  --shadcn-accent: oklch(0.965 0.001 286.375);
  --shadcn-destructive: oklch(0.577 0.245 27.325);
  --shadcn-border: oklch(0.922 0.004 286.375);
  --shadcn-input: oklch(0.922 0.004 286.375);
  --shadcn-ring: oklch(0.205 0.042 265.755);
  --radius-shadcn-sm: 0.5rem;
  --radius-shadcn-md: 0.625rem;
  --radius-shadcn-lg: 0.75rem;
  --radius-shadcn-xl: 1rem;
}
```

These are mapped to Tailwind colors in the `@theme` block:
```css
@theme {
  --color-shadcn-border: var(--shadcn-border);
  --color-shadcn-input: var(--shadcn-input);
  --color-shadcn-ring: var(--shadcn-ring);
  --color-shadcn-background: var(--shadcn-background);
  --color-shadcn-foreground: var(--shadcn-foreground);
  --color-shadcn-primary: var(--shadcn-primary);
  --color-shadcn-primary-foreground: var(--shadcn-primary-foreground);
  --color-shadcn-secondary: var(--shadcn-secondary);
  --color-shadcn-muted: var(--shadcn-muted);
  --color-shadcn-accent: var(--shadcn-accent);
  --color-shadcn-destructive: var(--shadcn-destructive);
  --radius-shadcn-sm: --radius-shadcn-sm;
  --radius-shadcn-md: --radius-shadcn-md;
  --radius-shadcn-lg: --radius-shadcn-lg;
  --radius-shadcn-xl: --radius-shadcn-xl;
}
```

Usage in components:
```jsx
<div className="bg-shadcn-background text-shadcn-foreground border border-shadcn-border rounded-shadcn-lg">
  Content
</div>
```

## Adding shadcn Components

To add a new shadcn component (e.g., Dialog, DropdownMenu):

```bash
npx shadcn@latest add dialog
```

This creates the component in `src/components/ui/dialog.tsx`. The import path follows the alias:
```js
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
```

## Available shadcn Components

Components are in `src/components/ui/` alongside custom UI components. Currently, the project uses a small set of shadcn primitives. New ones can be added as needed following the same pattern.

## Best Practices

1. **Use `cn()` for conditional classes** — never manually concatenate class strings
2. **Don't modify shadcn source files** — if you need custom styling, wrap them or use Tailwind overrides
3. **Keep `cn()` imports consistent** — always from `@/lib/utils`
4. **shadcn components use `forwardRef`** — they support ref forwarding for form libraries
5. **Dark mode works automatically** — shadcn components read the `.dark` class on `<html>`
