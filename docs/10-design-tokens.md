# 10. Design Tokens

## Location

`src/app/globals.css` — the `@theme` block.

## Overview

Legamii uses **Tailwind CSS v4** which replaces the traditional `tailwind.config.js` with a CSS-based `@theme` block. All design tokens are defined in `globals.css` as the single source of truth. No `tailwind.config.js` file exists.

## Font Families

| Token | CSS Variable | Font | Use Case |
|---|---|---|---|
| `--font-primary` | `--font-dogica` | Dogica (local TTF) | Titles, labels, navigation, pixel aesthetic |
| `--font-secondary` | `--font-inter` | Inter (Google) | Body text, headings |
| `--font-cabin-sketch` | `--font-cabin-sketch` | Cabin Sketch | Logo accent ("LE" in LEGAMII) |
| `--font-futura` | `--font-jost` | Jost | Alternative heading font |
| `--font-montserrat` | `--font-montserrat` | Montserrat | Additional heading style |
| `--font-rajdhani` | — | Rajdhani (Google) | Technical/monospace accent |
| `--font-share-tech-mono` | — | Share Tech Mono | Monospace text |

Usage in templates:
```html
<h1 class="font-primary text-title-1">Pixel Title</h1>
<p class="font-secondary text-body-1">Body text in Inter</p>
<span class="font-cabin-sketch">LE</span>
```

## Typography Scale

### Titles (Dogica font — always `font-primary`)
| Class | Size | Usage |
|---|---|---|
| `title-1` | 72px | Hero headings |
| `title-2` | 64px | Section headings |
| `title-3` | 56px | Page titles |

### Headings (Inter font — `font-secondary` unless suffixed)
| Class | Size |
|---|---|
| `h1` | 56px |
| `h2` | 48px |
| `h3` | 40px |
| `h4` | 32px |
| `h5` | 24px |
| `h6` | 20px |
| `h7` | 16px |

Heading classes can also use Dogica via `heading-h5-primary`, `heading-h6-primary`.

### Labels (Dogica font)
| Class | Size | Usage |
|---|---|---|
| `label-1` | 16px | Section labels, button text |
| `label-2` | 14px | Sub-labels, metadata |
| `label-3` | 12px | Small labels |

### Body (Inter font)
| Class | Size | Usage |
|---|---|---|
| `body-1` | 20px | Lead text |
| `body-2` | 18px | Body text |
| `body-3` | 14px | Small body text |
| `body-4` | 12px | Fine print |

### Captions
| Class | Size |
|---|---|
| `caption-1` | 10px |
| `caption-2` | 9px |

## Custom Spacing

All spacing utilities use these custom tokens instead of Tailwind defaults:

| Token | Value | Example |
|---|---|---|
| `zero` | 0px | `p-zero`, `gap-zero` |
| `px` | 2px | `gap-px` |
| `xxs` | 4px | `p-xxs` |
| `xs2` | 8px | `gap-xs2` |
| `xs` | 12px | `p-xs` |
| `sm` | 16px | `p-sm`, `gap-sm` |
| `base` | 24px | `p-base`, `gap-base` |
| `md` | 32px | `p-md` |
| `lg` | 40px | `p-lg` |
| `xl` | 48px | `p-xl` |
| `xl2` | 56px | `p-xl2` |
| `xl3` | 64px | `p-xl3` |
| `xl4` | 72px | `pt-xl4` (used for header offset) |
| `xl5` | 80px | `p-xl5` |
| `xl6` | 88px | `p-xl6` |

## Color Palette

### Brand Colors
| Token | Hex | Usage |
|---|---|---|
| `primary-500` | `#D865E0` | Primary purple — buttons, accents, active states |
| `secondary-500` | `#0059FF` | Blue accent |

### Primary Scale
| Token | Hex |
|---|---|
| `primary-50` | `#FDF2FD` |
| `primary-100` | `#F9DFFB` |
| `primary-200` | `#F2BFF6` |
| `primary-300` | `#EB9FF0` |
| `primary-400` | `#E47FEB` |
| `primary-500` | `#D865E0` |
| `primary-600` | `#C44BD0` |
| `primary-700` | `#A832B5` |
| `primary-800` | `#8C1E9A` |
| `primary-900` | `#6E0F7A` |

### Semantic Colors
| Token | Light | Dark | Usage |
|---|---|---|---|
| `red-500` | `#EF4444` | — | Errors, warnings |
| `yellow-300` | `#FDE047` | — | Rank 1 badge |
| `green-500` | `#22C55E` | — | Success, correct answers |
| `cyan-500` | `#06B6D4` | — | Info |

### Neutral Scale
| Token | Light | Dark |
|---|---|---|
| `neutral-50` | `#FAFAFA` | `#0A0A0B` |
| `neutral-100` | `#F5F5F5` | `#121213` |
| `neutral-200` | `#E5E5E5` | `#1F1F21` |
| `neutral-500` | `#737373` | `#A3A3A3` |
| `neutral-800` | `#262626` | `#D4D4D4` |
| `neutral-950` | `#020203` | `#FAFAFA` |

### Semantic Tokens
| Token | Light Value | Dark Value | Purpose |
|---|---|---|---|
| `bg` | `primary-500` | `primary-500` | Primary background accent |
| `el-bg` | `neutral-50` | `neutral-950` | Element background |
| `border` | `neutral-800` | `neutral-200` | Borders |
| `text` | `neutral-950` | `neutral-50` | Primary text |
| `sec-text` | `neutral-500` | `neutral-400` | Secondary/muted text |
| `sec-el` | `neutral-100` | `neutral-800` | Secondary element bg |

## Border Radius
| Token | Value |
|---|---|
| `rounded-sm` | 2px |
| `rounded-md` | 4px |
| `rounded-lg` | 8px |
| `rounded-xl` | 12px |
| `rounded-2xl` | 16px |
| `rounded-3xl` | 24px |
| `rounded-4xl` | 32px |
| `rounded-5xl` | 48px |
| `rounded-full` | 999px |

## Dark Mode

Dark mode is toggled by adding the `.dark` class to the `<html>` element.

```html
<html class="dark">...</html>
```

Defined in CSS:
```css
@custom-variant dark (&:is(.dark *));
```

When `.dark` is present, all neutral colors invert (e.g., `neutral-50` becomes `#0A0A0B`, `neutral-950` becomes `#FAFAFA`). Semantic tokens also flip automatically.

## Usage in Components

```jsx
// Button with primary color
<button className="bg-primary-500 text-white rounded-xl px-sm py-xs label-1">
  Start Quiz
</button>

// Card with semantic tokens
<div className="bg-el-bg border border-border rounded-xl p-base">
  <h2 className="text-text heading-h6">Title</h2>
  <p className="text-sec-text body-3">Description</p>
</div>

// Dark mode aware
<div className="bg-white dark:bg-neutral-950 text-black dark:text-white">
  Responsive to theme
</div>
```
