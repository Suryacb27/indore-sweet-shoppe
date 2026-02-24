---
phase: 1
plan: 1
wave: 1
---

# Plan 1.1: Unify Logout + Disable /admin-setup + Add AUTH_MODE Flag

## Objective
Eliminate the logout inconsistency (HTML form POST vs server action), add `AUTH_MODE=test` env flag, and disable `/admin-setup` in production. These are pure cleanup tasks with no risk to existing flows.

## Context
- `.gsd/SPEC.md`
- `.gsd/ARCHITECTURE.md`
- `actions/auth.ts` — has `logout()` server action (USE THIS)
- `components/layout/Navbar.tsx` — currently uses `<form action="/api/auth/signout" method="POST">`
- `components/layout/MobileMenu.tsx` — check if also uses old pattern
- `app/api/auth/signout/route.ts` — DELETE after migration
- `app/admin-setup/page.tsx` — needs env guard

## Tasks

<task type="auto">
  <name>Unify logout to server action in Navbar and MobileMenu</name>
  <files>
    components/layout/Navbar.tsx
    components/layout/MobileMenu.tsx
  </files>
  <action>
    1. In Navbar.tsx, replace the `<form action="/api/auth/signout" method="POST">` block with a `<form action={logout}>` using the imported `logout` server action from `actions/auth.ts`.
    2. Import: `import { logout } from "@/actions/auth"`
    3. Make the form: `<form action={logout}><button type="submit" ...>logout icon</button></form>`
    4. In MobileMenu.tsx, find any logout button/link and apply the same pattern. If it uses a client-side handler, convert to a form action.
    5. Do NOT rename or modify the `logout()` function in actions/auth.ts.
    6. Do NOT touch any other part of Navbar or MobileMenu.
  </action>
  <verify>Search for "signout" in all .tsx files — should return 0 results. Search for "logout" import in Navbar.tsx — should exist.</verify>
  <done>Both Navbar and MobileMenu use `form action={logout}` pattern. No references to /api/auth/signout remain in component files.</done>
</task>

<task type="auto">
  <name>Delete /api/auth/signout route and guard /admin-setup with AUTH_MODE</name>
  <files>
    app/api/auth/signout/route.ts (DELETE)
    app/admin-setup/page.tsx (MODIFY)
    .env.local (MODIFY)
  </files>
  <action>
    1. Delete `app/api/auth/signout/route.ts` — it will no longer be called.
    2. In `app/admin-setup/page.tsx`, add at the top of the page component:
       ```ts
       if (process.env.AUTH_MODE !== 'test') {
         notFound()
       }
       ```
       Import `notFound` from `next/navigation`.
    3. Add to `.env.local`:
       ```
       AUTH_MODE=test
       ```
       This enables admin-setup locally. In production (Vercel), this var is NOT set, so the page returns 404.
    4. Do NOT change any auth logic inside admin-setup — only add the guard.
  </action>
  <verify>
    - `Get-ChildItem app/api/auth/signout` → should not exist
    - `.env.local` contains `AUTH_MODE=test`
    - `app/admin-setup/page.tsx` has `notFound()` guard
  </verify>
  <done>Route file deleted. Admin-setup returns 404 when AUTH_MODE is not 'test'. Local .env has AUTH_MODE=test.</done>
</task>

## Success Criteria
- [ ] Navbar logout uses `form action={logout}` (server action)
- [ ] MobileMenu logout uses same pattern
- [ ] `/api/auth/signout` route deleted
- [ ] `/admin-setup` returns 404 in production (not test mode)
- [ ] `.env.local` has `AUTH_MODE=test`
- [ ] App compiles with no TypeScript errors
