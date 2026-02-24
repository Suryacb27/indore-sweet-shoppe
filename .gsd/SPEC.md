# SPEC.md — Auth Stabilization and Role Separation

> Status: **FINALIZED**
> Created: 2026-02-24
> Milestone: Auth Stabilization and Role Separation

---

## Problem

The current authentication system has several inconsistencies and security gaps:

1. **Logout inconsistency** — Navbar uses HTML `<form action="/api/auth/signout" method="POST">` while `actions/auth.ts` already has a `logout()` server action. Two patterns for the same operation.
2. **No dedicated admin login route** — Admins hit `/login` just like customers. Role check only happens post-login.
3. **No test mode environment** — All auth testing runs against production Supabase.
4. **Admin guard is double-implemented** — Both middleware and `app/admin/layout.tsx` do role checks (good) but the patterns are not documented or consistent.
5. **`adminBootstrap` is permanently accessible** — `/admin-setup` remains accessible forever (only blocked by data check, not a flag/env variable).

---

## Goal

Stabilize and properly implement Admin and Customer auth with:
- Consistent server action patterns for all auth operations
- Dedicated `/admin/login` route with role validation before session grant
- Clean test mode flag (`AUTH_MODE=test`) for safe local development
- All routes protected server-side (middleware + layout guard)
- Single unified logout pattern using the existing `logout()` server action

---

## Must-Haves

- [ ] All auth operations use `"use server"` actions — no HTML form POSTs to API routes
- [ ] `/admin/login` route exists and validates role before granting admin access
- [ ] Middleware protects `/admin/*` (already in place — must be verified clean)
- [ ] `app/admin/layout.tsx` guard is clean and consistent with middleware
- [ ] Test mode: `AUTH_MODE=test` flag in `.env.local` enables test helpers without touching production
- [ ] Logout uses `actions/auth.ts → logout()` server action uniformly across Navbar and MobileMenu
- [ ] Error messages are user-friendly (no raw Supabase errors exposed)
- [ ] `/admin-setup` is disabled in production via env flag

---

## Nice-to-Haves

- [ ] "Remember me" on login form
- [ ] Admin login page custom design (separate from customer auth layout)
- [ ] Rate limiting on auth actions

---

## Out of Scope

- Payment gateway
- Email verification flows
- Password reset (unless already working)
- OAuth / social login
- Changing DB schema (role column already exists — use it as-is)

---

## Security Constraints

- Sessions stored in httpOnly cookies (already enforced by `@supabase/ssr`)
- Role validated from `profiles.role` on server — never from client-side state
- `SUPABASE_SERVICE_ROLE_KEY` only used server-side, never exposed to browser
- `AUTH_MODE=test` must NEVER disable real Supabase validation — only adds test helpers

---

## Test Acceptance Criteria

The milestone is complete when ALL of the following pass:

1. Customer can sign up with email + password → redirected to `/`
2. Customer can log in with email + password → redirected to `/`
3. Customer cannot access `/admin/*` → redirected to `/`
4. Admin can log in via `/admin/login` → validated by role → redirected to `/admin`
5. Non-admin attempting `/admin/login` gets error, not admin access
6. Logout from Navbar and MobileMenu both call `logout()` server action
7. Expired/invalid session handled gracefully (no 500 errors)
8. `/admin-setup` returns 404 or disabled message outside of test mode
9. All above verified with no browser console errors
