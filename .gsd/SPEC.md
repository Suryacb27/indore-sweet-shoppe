# SPEC.md — System Stabilization & Completion

> **Status**: DRAFT
> **Milestone**: System Stabilization & Completion
> **Date**: 2026-02-24

---

## Goal

Transform the current codebase into a fully functional, production-ready ecommerce platform for "Indore Sweet Shoppe". This involves standardizing authentication, securing routes via architectural patterns (Route Groups), completing all UI/UX loops, and seeding meaningful demo data.

---

## Core Objectives

### 1. Robust Authentication
- **Customer**: Signup, Login, Logout using unified Server Actions.
- **Admin**: Login (sign-in only in action), with authorization enforced by Middleware/Layouts.
- **Source of Truth**: `profiles.role` column. No trusting JWT claims.

### 2. Architectural Integrity
- Implement **Route Groups**:
  - `app/(public)`: Landing, product listings, detail pages, cart.
  - `app/(auth)`: Login, signup.
  - `app/admin/(dashboard)`: All protected admin management routes.
- Centralized Middleware role validation for `/admin/*`.

### 3. Feature Completion
- **Customer**:
  - View category-based product lists.
  - Add to cart (functional persistence).
  - Mock checkout process.
  - View basic order history in profile.
- **Admin**:
  - Dashboard with summary metrics (Total Orders, Total Revenue, Total Users).
  - Full CRUD for Products and Categories.
  - Order management view.

### 4. Demo Data
- Full seed of 10+ Indori sweets with descriptions, prices, and images.
- Seeded admin and customer accounts.
- Seeded order history for dashboard visualization.

---

## Must-Haves

- [ ] All forms (Login, Signup, Product Create, etc.) use Server Actions.
- [ ] No direct Supabase client calls in Client Components for data mutation.
- [ ] Middleware prevents customer access to `/admin` and unauthenticated access to `/profile`.
- [ ] Cart reflects additions/removals immediately (optimistic UI or simple revalidation).
- [ ] All menu links in Navbar and Admin Sidebar are functional.
- [ ] Production build (`npm run build`) passes with zero warnings.

## Security Constraints

- **RLS**: Enabled on `profiles`, `products`, `categories`, and `orders`.
- **RBAC**: Source of truth is `profiles` table.
- **Environment**: Sensitive keys only in server-side context.

---

## Reset Plan Phases

1. **Full Audit**: Map routes, identify dead links/buttons, and auth inconsistencies.
2. **Auth Stabilization**: Standardize sign-in/up/out patterns.
3. **Dashboard Separation**: Implement Route Groups and layout-level guards.
4. **Functional Completion**: Connect all UI triggers to server actions.
5. **Demo Data Seeding**: Populate the database for a complete "out-of-the-box" experience.
6. **Final Verification**: Comprehensive pass through all 10 project expectations.
