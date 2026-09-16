---
name: recipecraft-project
description: Understand and work on the RecipeCraft React recipe application using its established architecture, authentication, recipe management, dashboard, API, and UI conventions. Use whenever implementing or modifying RecipeCraft features.
---

# RecipeCraft Project Skill

## Purpose

This skill provides the persistent project knowledge needed to safely develop RecipeCraft.

Always inspect the existing implementation before modifying it.

Do not assume a feature is missing simply because it is not described here.

The actual repository code is the source of truth.

## Development Process

For every task:

### 1. Inspect

Identify:

- relevant pages
- relevant components
- feature modules
- API modules
- Redux state
- routing
- existing reusable components

### 2. Understand

Trace the current data flow.

For example:

UI
→ component
→ feature/API layer
→ backend

or:

UI
→ dispatch
→ Redux thunk
→ API
→ backend
→ Redux state

### 3. Implement

Make focused changes.

Do not rewrite unrelated functionality.

### 4. Verify

Check:

- TypeScript
- imports
- routing
- API contracts
- loading states
- error states
- responsive layout

### 5. Explain

When finishing a task, report:

- files changed
- what changed
- assumptions
- remaining issues
- recommended next step

## Architecture Principles

Keep these responsibilities separate:

UI:
- rendering
- interaction
- local state

Feature:
- domain logic
- domain types
- API operations

Redux:
- global application state

RTK Query:
- server state

API:
- HTTP communication

Pages:
- route-level composition

## Do Not

Do not:

- create duplicate API clients
- create duplicate Redux stores
- store passwords
- bypass existing authentication architecture
- put API requests directly into presentational components
- duplicate existing components
- introduce unnecessary libraries
- replace working architecture without justification


# RecipeCraft Development Roadmap

## Phase 1 — API Foundation

Completed / established:

- Axios instance
- API base URL
- Axios configuration
- API response types
- Axios base query

## Phase 2 — Authentication

Current work:

- signup
- login
- logout
- auth Redux state
- current-user restoration
- protected routes

## Phase 2.5 — Authentication Security

- access token handling
- refresh token interceptor
- session restoration
- ProtectedRoute
- PublicOnlyRoute
- logout handling

## Phase 3 — Recipe Management

Next:

- recipe types
- recipe API
- RTK Query
- recipe listing
- recipe detail
- create recipe
- edit recipe
- delete recipe
- search
- filters
- sorting
- draft/published state

## Phase 4 — Recipe Experience

- favorites
- saved recipes
- ratings
- reviews
- comments
- sharing

## Phase 5 — User/Profile

- profile
- avatar
- bio
- account settings
- security
- connected accounts

## Phase 6 — Analytics

- recipe views
- saves
- likes
- ratings
- recipe performance

## Phase 7 — Production

- testing
- performance
- accessibility
- SEO
- error boundaries
- security review
- deployment