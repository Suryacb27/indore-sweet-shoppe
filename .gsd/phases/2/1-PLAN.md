---
phase: 2
plan: 1
wave: 1
---

# Plan 2.1: Create /admin/login Route

## Objective
Build a dedicated `/admin/login` page and server action that validates `profiles.role === 'admin'` BEFORE granting access. Non-admins get a clear error message, not a redirect to `/admin`.

## Context
- `.gsd/SPEC.md`
- `.gsd/ARCHITECTURE.md`
- `actions/auth.ts` — add `adminLogin()` here
- `lib/supabase/server.ts` — `createClient()`
- `lib/supabase/middleware.ts` — update redirect for admin auth failures to point to `/admin/login`
- `app/admin/layout.tsx` — update redirect for auth failures to point to `/admin/login`
- `components/auth/AuthLayout.tsx` — reuse for admin login page design

## Tasks

<task type="auto">
  <name>Add adminLogin() server action</name>
  <files>
    actions/auth.ts
  </files>
  <action>
    Add a new exported server action `adminLogin(formData: FormData)`:
    ```ts
    export async function adminLogin(formData: FormData) {
      const supabase = await createClient()
      const email = formData.get("email") as string
      const password = formData.get("password") as string

      // 1. Sign in
      const { data, error } = await supabase.auth.signInWithPassword({ email, password })
      if (error) return { error: "Incorrect email or password." }

      // 2. Validate role — if not admin, sign out immediately and return error
      const { data: profile } = await supabase
        .from("profiles")
        .select("role")
        .eq("id", data.user.id)
        .maybeSingle()

      if (profile?.role !== "admin") {
        await supabase.auth.signOut()
        return { error: "Access denied. Admin credentials required." }
      }

      // 3. Role confirmed — redirect
      redirect("/admin")
    }
    ```
    CRITICAL: Sign out the non-admin user before returning error. Never leave them in an authenticated state.
  </action>
  <verify>Grep for `adminLogin` in actions/auth.ts — must exist. Function signs out non-admins before returning error.</verify>
  <done>adminLogin() exported from actions/auth.ts. Validates role. Signs out non-admins. Redirects admins to /admin.</done>
</task>

<task type="auto">
  <name>Create /admin/login page and update middleware redirect target</name>
  <files>
    app/admin/login/page.tsx (NEW)
    lib/supabase/middleware.ts (MODIFY)
    app/admin/layout.tsx (MODIFY)
  </files>
  <action>
    1. Create `app/admin/login/page.tsx`:
       - Reuse `AuthLayout` wrapper from `components/auth/AuthLayout.tsx` for the shell
       - Build a simple admin login form (email + password fields + submit)
       - Use `adminLogin` server action as the form action
       - Display error state using the same pattern as LoginForm.tsx (result?.error)
       - Add a subtle "Back to store" link pointing to `/`
       - This page must be excluded from the admin middleware guard (don't redirect `/admin/login` to itself)

    2. In `lib/supabase/middleware.ts`:
       - In the `/admin` protection block, change redirect from `/login` to `/admin/login`
       - Also exclude `/admin/login` from being protected:
         ```ts
         if (request.nextUrl.pathname.startsWith('/admin') &&
             !request.nextUrl.pathname.startsWith('/admin/login')) {
         ```

    3. In `app/admin/layout.tsx`:
       - Change `redirect("/login")` to `redirect("/admin/login")`
       - This layout already correctly redirects non-admins to `/` — keep that.

    4. Do NOT change the visual design of any other admin pages.
  </action>
  <verify>
    - `Get-ChildItem app/admin/login/page.tsx` → exists
    - Grep for `/login` in middleware.ts → should be `/admin/login`
    - Grep for `/login` in app/admin/layout.tsx → should be `/admin/login`
  </verify>
  <done>/admin/login page exists. Middleware and layout redirect auth failures to /admin/login. Page excluded from its own guard.</done>
</task>

## Success Criteria
- [ ] `/admin/login` page renders correctly
- [ ] Correct admin credentials → redirect to `/admin`
- [ ] Wrong credentials → inline error (not a crash)
- [ ] Valid customer user attempting admin login → "Access denied" error, not admin access
- [ ] Middleware redirects unauthenticated `/admin/*` requests to `/admin/login`
- [ ] `/admin/login` itself is not caught by the auth guard (no redirect loop)
