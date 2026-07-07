# 13. Authentication Pages

## Route Structure

Auth routes are organized into two route groups under `src/app/auth/`:

```
auth/
├── (signInOut)/              # Full-page layout with side branding
│   ├── layout.js             # BackgroundV2 wrapper
│   ├── role/page.js          # Role selection (Student / Teacher / Admin)
│   ├── signin/page.js        # Login form
│   └── signup/page.js        # Registration form (student or teacher)
└── (restAuthPages)/          # Centered window layout for password flow
    ├── layout.js             # ReusableWindow wrapper with back navigation
    ├── forget-password/page.js
    ├── otp/page.js           # Email verification (6-digit OTP)
    └── create-new-password/page.js
```

## Auth Flow Diagram

```
┌──────────┐
│  /auth/  │
│   role   │──── Student ──┐
│          │──── Teacher ──┤
└──────────┘               │
                           ▼
                    ┌──────────────┐
                    │  /auth/      │
                    │  signup      │
                    │  ?role=...   │
                    └──────┬───────┘
                           │ redirect after signup
                           ▼
                    ┌──────────────┐
                    │  /auth/otp   │
                    │  ?email=...  │
                    └──────┬───────┘
                           │ verify OTP
                           ▼
                    ┌──────────────┐
                    │  /auth/      │
                    │  signin      │
                    └──────┬───────┘
                           │ loginAction → sets cookies
                           ▼
              ┌──────────────────────┐
              │  Redirect based on   │
              │  role:               │
              │  STUDENT → /student/home│
              │  TEACHER → /teacher/   │
              │           dashboard    │
              └──────────────────────┘
```

**Password reset flow** is separate:
```
forget-password → otp (verify email) → create-new-password
```

## Page Details

### 1. Role Selection (`/auth/role`)

**Component:** `RoleContent.js`

Presents three role cards:
- **Student** — navigates to `/auth/signup?role=student`
- **Teacher** — navigates to `/auth/signup?role=teacher`
- **Administrator** — shows "coming soon" toast

Each card has an icon, title, and description.

### 2. Sign Up (`/auth/signup?role=...`)

**Component:** `SignupContent.js`

Form fields vary by role:

| Role | Fields |
|---|---|
| **Student** | First Name, Middle Name (optional), Last Name, Email, Grade (dropdown, fetched via `getAllGradesAction`), Password, Confirm Password |
| **Teacher** | First Name, Last Name, Email, Password, Confirm Password |

On submit:
1. Validates with `studentSignupSchema` or `teacherSignupSchema` (Zod)
2. Calls `signupAction(payload, role)`
3. On success, redirects to `/auth/otp?email=...`

**Layout features:**
- Left side: `LogoIcon` (240px) + `LogoWord` ("LE" + "GAMII") — hidden on mobile
- Right side: Form card with header (logo + prompt text)

### 3. Email Verification / OTP (`/auth/otp?email=...`)

**Component:** `OtpInput.js`

6-digit OTP verification:
- 6 individual input boxes
- Auto-focus to next box on typing
- Paste support (6 digits at once)
- 60-minute countdown timer for OTP expiry
- Expired state handling

On submit: calls `verifyEmailAction({ email, otp })` which validates with `verifyEmailSchema`.

### 4. Sign In (`/auth/signin`)

**Component:** `SigninContent.js`

Email + Password form with:
- Show/hide password toggle
- Google sign-in button
- "Forgot password?" link → `/auth/forget-password`
- Validation via `loginSchema` (Zod)

On submit:
1. Validates input
2. Calls `loginAction(payload)`
3. On success: redirects based on role (`STUDENT` → `/student/home`, `TEACHER` → `/teacher/dashboard`)
4. On error: shows toast with error message

### 5. Forgot Password (`/auth/forget-password`)

Simple form with email input only. Calls `forgetPasswordAction({ email })`. Redirects to `/auth/otp?email=...`.

### 6. Create New Password (`/auth/create-new-password?email=...`)

**Component:** `CreateNewPassForm.js`

Fields:
- Email (pre-filled from query param, hidden)
- OTP (entered in previous step)
- New Password
- Confirm Password

Features a **password requirements checklist** that validates in real-time:
- ✓ At least 6 characters
- ✓ At least 1 uppercase letter
- ✓ At least 1 lowercase letter
- ✓ At least 1 number
- ✓ At least 1 special character

Validates with `resetPasswordSchema` and calls `resetPasswordAction`.

## Auth Form Components

All in `src/components/auth/`:

| Component | Description |
|---|---|
| `SigninContent.js` | Login form (client, react-hook-form + zod) |
| `SignupContent.js` | Registration form (client, role-aware) |
| `RoleContent.js` | Role selection cards |
| `OtpInput.js` | 6-digit OTP input with auto-focus |
| `CreateNewPassForm.js` | Password reset with requirements checklist |
| `AuthHeader.js` | Logo + prompt line + link |
| `FormInput.js` | Reusable input with label + error + optional icon |
| `FormSelect.js` | Select dropdown |
| `GradeSelect.js` | Grade dropdown (fetches grades via action) |
| `LogoutButton.js` | Logout button (calls `logoutAction`) |
| `OrLine.js` | "or" visual divider |
| `SigningContentHeader.js` | Title + subtitle for auth forms |
| `Logo.js` | LogoIcon + "LE" (Cabin Sketch) + "GAMII" |

## Common Patterns

- All forms use **react-hook-form** with **`@hookform/resolvers/zod`**
- Error messages come from Zod schema definitions
- Toast notifications via **react-hot-toast** (`<Toaster />` in root layout)
- All auth pages redirect authenticated users away (handled by `proxy.js` middleware)
- Loading states show on submit buttons via `Btn1` `loading` prop
