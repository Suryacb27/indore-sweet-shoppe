# ROADMAP.md

> **Current Milestone**: Admin Auth Implementation
> **Goal**: Harden the existing auth system by fixing identified gaps — error handling, deprecated API usage, and redirect correctness

---

## Must-Haves

- [ ] `adminBootstrap()` returns `{ error }` (no uncaught throws)
- [ ] `/admin-setup` displays inline errors
- [ ] `adminBootstrap()` redirects to `/admin/login?created=1`
- [ ] `searchParams` updated to Next.js 16 async pattern
- [ ] All 9 acceptance criteria pass
- [ ] TypeScript: 0 errors

---

## Phases

### Phase 1: Server Action Hardening
**Status**: ✅ Complete
**Objective**: Fix `adminBootstrap()` to return `{ error }`, update `/admin-setup` for inline error display, fix redirect to `/admin/login?created=1`, and update `searchParams` to async pattern.

### Phase 2: End-to-End Verification
**Status**: ✅ Complete
**Objective**: Run all 9 acceptance criteria manually, run TypeScript compile, capture proof, update STATE.md. Includes fixing the redirect loop via route grouping.
