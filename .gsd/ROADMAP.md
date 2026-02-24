# ROADMAP.md

> **Current Milestone**: Auth Stabilization and Role Separation
> **Goal**: Clean, consistent auth system with proper role separation, server action uniformity, and safe test mode.
> **Created**: 2026-02-24

---

## Must-Haves

- [ ] All auth uses `"use server"` actions (no HTML form POST to API routes)
- [ ] `/admin/login` route with role-validated access
- [ ] Middleware + layout guard confirmed clean and consistent
- [ ] Test mode flag (`AUTH_MODE=test`) for safe local development
- [ ] Unified logout via `logout()` server action everywhere
- [ ] User-friendly error handling (no raw Supabase errors)
- [ ] `/admin-setup` disabled in production via env flag

---

## Phases

### Phase 1: Auth Foundation Cleanup
**Status**: ⬜ Not Started
**Objective**: Eliminate auth inconsistencies. Unify logout to use `logout()` server action across Navbar and MobileMenu. Remove the `/api/auth/signout` route. Add `AUTH_MODE=test` env flag and disable `/admin-setup` in production. Verify Customer signup and login work end-to-end with proper redirects and error handling.

---

### Phase 2: Admin Login Route
**Status**: ⬜ Not Started
**Objective**: Create `/admin/login` — a dedicated admin login page that validates `profiles.role === 'admin'` before granting session. Non-admins get an error, not a redirect to `/admin`. Wire up the middleware and layout guard to use this route for auth failures on `/admin/*`.

---

### Phase 3: End-to-End Verification
**Status**: ⬜ Not Started
**Objective**: Verify all 9 acceptance criteria from SPEC.md pass. Capture evidence (browser session screenshots or curl output). Update STATE.md. Commit with atomic messages.

---

## Completion Criteria

All 9 acceptance criteria in `.gsd/SPEC.md` must pass with empirical evidence documented in `.gsd/phases/3/VERIFICATION.md`.
