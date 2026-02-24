# SPEC.md — Admin Auth Implementation

> **Status**: FINALIZED
> **Milestone**: Admin Auth Implementation
> **Date**: 2026-02-24

---

## Problem

The auth system needs a hardened, complete admin signup + login flow with proper:
- Server-side role validation at every gate
- No client-side role trust
- Clean error returns (no raw `throw` to the browser)
- Dedicated admin entry points separated from customer auth
- Production safety — no public admin creation path

---

## Current State (Audit Result)

The previous milestone **already implemented** the structural foundations:

| Component | Status |
|-----------|--------|
| `login()` server action — returns `{ error }` | ✅ Done |
| `signup()` server action — returns `{ error }` | ✅ Done |
| `logout()` server action unified in Navbar + MobileMenu | ✅ Done |
| `adminLogin()` — signs in, validates role, signs out non-admins | ✅ Done |
| `/admin/login` page with dark admin UI | ✅ Done |
| Middleware guards `/admin/*` → redirects to `/admin/login` | ✅ Done |
| Middleware excludes `/admin/login` from guard | ✅ Done |
| Admin layout double-guard (user + role server-side) | ✅ Done |
| `/admin-setup` page with `AUTH_MODE=test` guard | ✅ Done |
| `adminBootstrap()` creates admin in `profiles` table | ✅ Done |
| `AuthLayout` Admin Access link → `/admin/login` | ✅ Done |

---

## Gaps (What This Milestone Adds)

### Gap 1 — `adminBootstrap()` throws uncaught errors
`adminBootstrap()` uses `throw new Error(...)` which bubbles as an unhandled Next.js error page instead of returning a user-friendly form error.

**Fix**: Return `{ error }` consistently. Update `/admin-setup` page to display errors inline.

### Gap 2 — `searchParams` deprecated in Next.js 16 App Router
`AdminSetupPage` accepts `searchParams: { message: string }` synchronously. In Next.js 16 this must be `Promise<{ message: string }>` and awaited.

**Fix**: Update the component signature and await searchParams.

### Gap 3 — `adminBootstrap()` redirects to `/` instead of `/admin/login`
After admin creation, the user is redirected to `/` (the storefront). They should be sent to `/admin/login` to sign in with the new credentials.

**Fix**: Change `redirect("/")` → `redirect("/admin/login?created=1")` in `adminBootstrap()`.

### Gap 4 — `/admin-setup` doesn't display error state
Form errors from `adminBootstrap()` are never shown (the old URL search param pattern was unreliable). After fixing Gap 1, the form needs to display inline errors.

---

## Must-Haves

- [ ] `adminBootstrap()` returns `{ error }` (no uncaught throws)
- [ ] `/admin-setup` displays inline errors from server action
- [ ] `adminBootstrap()` redirects to `/admin/login?created=1` on success
- [ ] `searchParams` usage updated to Next.js 16 async pattern
- [ ] All 9 verification scenarios pass
- [ ] TypeScript: 0 errors

## Out of Scope

- Rate limiting / brute-force protection (needs edge middleware — future milestone)
- Email verification flow (Supabase email confirm disabled in dev)
- Password reset
- Multi-admin management UI
- Any changes to order RPC / cart logic

## Security Constraints (Unchanged)

- Role always from `profiles` table server-side — never from session JSON
- `httpOnly` cookies via Supabase SSR client
- `SUPABASE_SERVICE_ROLE_KEY` never exposed to client
- `/admin-setup` returns 404 in production (`AUTH_MODE !== "test"`)
- Non-admin sessions destroyed immediately on `adminLogin()` rejection

---

## Acceptance Criteria (9 Tests)

1. `/admin-setup` → create admin → redirected to `/admin/login?created=1`
2. `/admin/login` with admin creds → redirected to `/admin`
3. `/admin/login` with customer creds → "Access denied" inline error
4. `/admin/orders` as customer → redirected to `/`
5. `/admin/orders` unauthenticated → redirected to `/admin/login`
6. Logout via Navbar / MobileMenu → session cleared → redirected to `/`
7. `/admin-setup` in production (`AUTH_MODE` absent) → 404
8. Zero console errors throughout
9. `npx tsc --noEmit` → exit code 0
