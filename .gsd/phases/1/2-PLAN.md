---
phase: 1
plan: 2
wave: 2
---

# Plan 1.2: Customer Auth Cleanup — Error Handling + Redirect Hardening

## Objective
Ensure customer signup and login produce clean, user-friendly error messages and correct redirects. Fix any raw Supabase error exposure in `LoginForm.tsx` and `SignupForm.tsx`.

## Context
- `.gsd/SPEC.md`
- `actions/auth.ts` — `login()`, `signup()` functions
- `components/auth/LoginForm.tsx`
- `components/auth/SignupForm.tsx`
- `app/login/page.tsx`
- `app/signup/page.tsx`

## Tasks

<task type="auto">
  <name>Harden error handling in login and signup server actions</name>
  <files>
    actions/auth.ts
  </files>
  <action>
    1. In `login()`: Currently throws `new Error(error.message)`. Change to `return { error: error.message }` so the form can display it gracefully without an unhandled exception boundary.
    2. In `signup()`: Already returns `{ error }` — verify the profile insert error is also returned cleanly (already done, confirm).
    3. Map common Supabase error messages to friendly strings:
       - "Invalid login credentials" → "Incorrect email or password. Please try again."
       - "User already registered" → "An account with this email already exists."
       - "Password should be at least 6 characters" → keep as-is (already clear)
    4. Do NOT change the redirect logic — `redirect("/")` after success stays.
    5. Do NOT change the `adminBootstrap()` function.
  </action>
  <verify>Grep for `throw new Error` in actions/auth.ts — should return 0 results after login() is fixed.</verify>
  <done>login() returns { error } instead of throwing. Error messages are human-readable. TypeScript compiles.</done>
</task>

<task type="auto">
  <name>Update LoginForm.tsx to handle returned error object</name>
  <files>
    components/auth/LoginForm.tsx
    components/auth/SignupForm.tsx
  </files>
  <action>
    1. In `LoginForm.tsx`: The form currently may handle exceptions via try/catch around the server action call. Since `login()` now returns `{ error }` instead of throwing, update the handler:
       ```ts
       const result = await login(formData)
       if (result?.error) {
         setError(result.error)
       }
       ```
    2. In `SignupForm.tsx`: Verify the same handling is already in place (it should be since signup already returns { error }). If it catches exceptions, update to use result.error pattern.
    3. Ensure error state is displayed in the form UI with the same red error text style already present.
    4. Do NOT change form layout, styling, or field structure.
  </action>
  <verify>In LoginForm.tsx — no `try/catch` around the login action call, uses result?.error pattern instead.</verify>
  <done>Both forms display user-friendly error messages. Raw Supabase errors never shown to user.</done>
</task>

## Success Criteria
- [ ] `login()` server action returns `{ error }` instead of throwing
- [ ] Error messages are user-friendly (not raw Supabase strings)
- [ ] `LoginForm` and `SignupForm` display errors inline
- [ ] Successful login redirects to `/`
- [ ] Successful signup redirects to `/`
- [ ] TypeScript compiles without errors
