# GSD State

> Last updated: 2026-02-24

## Project

**Indore Sweet Shoppe** — Next.js 16 / Supabase e-commerce for premium Indian sweets.

## Current Milestone

**Auth Stabilization and Role Separation**

## Current Position

- **Phase 1**: ✅ Complete — Server Action Hardening
- **Phase 2**: ⬜ Not Started — End-to-End Verification

## Last Session Summary

Hardened admin auth system focused on server action robustness (`03f2993`):

- `adminBootstrap()` → returns `{ error }` instead of throwing; redirects to `/admin/login?created=1`
- `/admin-setup` → converted to Client Component (for error state) with async `searchParams` fix for Next.js 16
- `AdminSetupForm` → new client component created for inline error display
- Storage approach verified: `profiles.role` used consistently across all gates

- `actions/auth.ts` → `login()` returns `{ error }` instead of throwing; added `adminLogin()` with role guard + non-admin signout
- `Navbar.tsx` + `MobileMenu.tsx` → logout uses `form action={logout}` server action
- `app/api/auth/signout/route.ts` → **deleted** (replaced by server action)
- `app/admin-setup/page.tsx` → guarded by `AUTH_MODE=test` env flag
- `.env.local` → `AUTH_MODE=test` added
- `lib/supabase/middleware.ts` → redirects `/admin/*` to `/admin/login`; excludes `/admin/login` from guard
- `app/admin/layout.tsx` → redirects unauthenticated to `/admin/login`
- `app/admin/login/page.tsx` → **new** dedicated admin login page with dark UI
- `components/auth/AuthLayout.tsx` → Admin Access link fixed to `/admin/login`

## Next Steps

Phase 3 — run manual verification tests against all 9 SPEC acceptance criteria.

## Known Gaps / Decisions Pending

- No payment gateway integrated (COD assumed)
- No image upload / Supabase Storage configured
- Product ratings are placeholder values
- Search bar is decorative
- Delivery fee hardcoded in `actions/orders.ts`
