# 14. Authentication Infrastructure

## Cookie-Based JWT

Legamii uses **httpOnly cookies** for JWT storage. This approach prevents XSS attacks because JavaScript cannot read httpOnly cookies.

### Cookies Set on Login

| Cookie | Value | Purpose |
|---|---|---|
| `token` | JWT string | Authenticates all API requests |
| `role` | `STUDENT` or `TEACHER` | Determines route access and redirects |

### Cookie Configuration

```js
cookieStore.set("token", jwtToken, {
  httpOnly: true,                        // Inaccessible to JS
  secure: process.env.NODE_ENV === "production",  // HTTPS only in production
  sameSite: "lax",                       // CSRF protection
  maxAge: 60 * 60 * 24 * 7,              // 7 days
});
```

### Login Action (`loginAction`)

Located in `src/lib/actions/auth.action.js`:

```js
export async function loginAction(payload) {
  // 1. Validate with Zod
  const parsed = loginSchema.safeParse(payload);
  if (!parsed.success) {
    return { success: false, message: parsed.error.errors[0].message };
  }

  try {
    // 2. Call backend
    const res = await login(parsed.data);

    // 3. Set cookies
    const cookieStore = await cookies();
    cookieStore.set("token", res.token, { httpOnly: true, /* ... */ });
    cookieStore.set("role", res.role, { httpOnly: true, /* ... */ });

    // 4. Decode JWT to get role for immediate use
    const decoded = JSON.parse(atob(res.token.split(".")[1]));
    return { success: true, message: "Login successful", role: decoded.role };
  } catch (err) {
    return { success: false, message: err.message || "Login failed" };
  }
}
```

### Logout Action (`logoutAction`)

```js
export async function logoutAction() {
  const cookieStore = await cookies();
  cookieStore.delete("token");
  cookieStore.delete("role");
}
```

### Session Check (`getSessionAction`)

```js
export async function getSessionAction() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value || null;
  const role = cookieStore.get("role")?.value || null;
  return { success: true, token, role };
}
```

Used by client components to check auth state (e.g., `NotificationListener` checks for token before connecting sockets).

## Route Protection with Middleware

**File:** `src/proxy.js`

A Next.js middleware that runs on every request to `/auth/*`, `/student/*`, and `/teacher/*`.

### Matcher Configuration

```js
export const config = {
  matcher: ["/auth/:path*", "/student/:path*", "/teacher/:path*"],
};
```

### Middleware Logic

```js
export function proxy(request) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get("token")?.value;
  const role = request.cookies.get("role")?.value;

  // Rule 1: Not logged in + non-public path → redirect to /auth/signin
  if (!token && !isPublic(pathname)) {
    return NextResponse.redirect(new URL("/auth/signin", request.url));
  }

  // Rule 2: Logged in + trying to access auth → redirect to dashboard
  if (token && isPublic(pathname)) {
    if (role === "STUDENT")
      return NextResponse.redirect(new URL("/student/home", request.url));
    if (role === "TEACHER")
      return NextResponse.redirect(new URL("/teacher/dashboard", request.url));
  }

  // Rule 3: Student trying to access teacher routes → redirect to student home
  if (role === "STUDENT" && isTeacher(pathname)) {
    return NextResponse.redirect(new URL("/student/home", request.url));
  }

  // Rule 4: Teacher trying to access student routes → redirect to teacher dashboard
  if (role === "TEACHER" && isStudent(pathname)) {
    return NextResponse.redirect(new URL("/teacher/dashboard", request.url));
  }

  return NextResponse.next();
}
```

### Path Classification

```js
const PUBLIC_PATHS = ["/auth"];
const STUDENT_PATHS = ["/student"];
const TEACHER_PATHS = ["/teacher"];

const isPublic = (path) => matchPath(path, PUBLIC_PATHS);
const isStudent = (path) => matchPath(path, STUDENT_PATHS);
const isTeacher = (path) => matchPath(path, TEACHER_PATHS);
```

### Middleware Redirect Rules Summary

| User State | Requested Path | Result |
|---|---|---|
| Not logged in | `/student/*` or `/teacher/*` | Redirect to `/auth/signin` |
| Not logged in | `/auth/*` | Allow (public) |
| Logged in (any role) | `/auth/*` | Redirect to dashboard by role |
| Student | `/teacher/*` | Redirect to `/student/home` |
| Teacher | `/student/*` | Redirect to `/teacher/dashboard` |
| Student | `/student/*` | Allow |
| Teacher | `/teacher/*` | Allow |

## API Client JWT Handling

The API client (`client.js`) automatically attaches the JWT from the `token` cookie:

```js
const cookieStore = await cookies();
const token = cookieStore.get("token");

// On every request:
headers: {
  "Content-Type": "application/json",
  ...(token ? { Authorization: `Bearer ${token.value}` } : {}),
}
```

This means services and actions never need to manually pass tokens — it's handled transparently.

## Academic Onboarding

After a student logs in for the first time, if they haven't set their grade/term, they should be redirected to an academic onboarding page (`/auth/academic` — not yet implemented). This uses:

```
PATCH /api/v1/student/academic
Body: { gradeId, term }
```

This sets the student's grade, deletes old mastery tags, and creates new ones.

## Security Notes

1. **httpOnly cookies** prevent XSS from stealing tokens
2. **`sameSite: "lax"`** prevents CSRF attacks
3. **`secure: true` in production** ensures cookies are only sent over HTTPS
4. **7-day expiry** balances security with user convenience
5. **Role-based routing** prevents students from accessing teacher pages and vice versa
6. **Middleware runs server-side** — cannot be bypassed by client-side manipulation
