# ROADMAP.md

> **Current Milestone**: System Stabilization & Completion
> **Goal**: Achieve a fully functional, production-ready ecommerce platform with standardized auth and architectural integrity.

## Must-Haves
- [ ] Centralized Middleware auth/role validation
- [ ] Standardized Server Actions for all mutations
- [ ] Route Groups for logical separation and security
- [ ] Functional Cart and Checkout (mock)
- [ ] Seeding script for demo products/orders
- [ ] Clean production build

## Phases

### Phase 1: Full Audit
**Status**: ⬜ Not Started
**Objective**: Identify all broken links, dead buttons, and auth inconsistencies. Map full route structure.

### Phase 2: Auth Stabilization
**Status**: ⬜ Not Started
**Objective**: Standardize signup/login/logout patterns. Fix RLS policies and middleware enforcement.

### Phase 3: Dashboard Separation
**Status**: ⬜ Not Started
**Objective**: Implement `(public)`, `(auth)`, and `admin/(dashboard)` route groups. Secure all layouts.

### Phase 4: Functional Completion
**Status**: ⬜ Not Started
**Objective**: Connect all UI components to functional server actions. Implement cart persistence and order flow.

### Phase 5: Demo Data Seeding
**Status**: ⬜ Not Started
**Objective**: Create a robust seeding script/action to populate products, users, and orders.

### Phase 6: Final Verification
**Status**: ⬜ Not Started
**Objective**: Comprehensive testing against all 10 project expectations. Final production build verification.
