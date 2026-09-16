---
name: recipecraft-debugging
description: Diagnose and fix RecipeCraft TypeScript, React, Redux, React Router, API, authentication, runtime, and UI bugs using evidence from the existing codebase.
---

# RecipeCraft Debugging Skill

## Rule

Do not immediately rewrite the affected component.

First identify the actual cause.

## Debugging Process

1. Read the complete error.
2. Identify the file and line.
3. Inspect surrounding code.
4. Trace imports.
5. Trace data flow.
6. Inspect related types.
7. Check package/library expectations.
8. Fix the root cause.
9. Check for related errors.
10. Verify the affected flow.

## Redux Errors

When seeing:

"Argument of type Promise is not assignable to UnknownAction"

check whether:

dispatch()

is receiving:

- a Redux action
- a thunk

rather than a raw Promise from an async API function.

Correct architecture:

dispatch(thunk())

not:

dispatch(apiPromise())

## React Hooks

Hooks must be called:

- inside React components
- inside custom hooks

Never call hooks at module scope.

## React Router

When Link/NavLink/useNavigate/useLocation fails:

Check:

- BrowserRouter
- Router nesting
- route hierarchy
- duplicate routes
- component rendering outside router context

Use React Router navigation for internal application routes.

## API Errors

Check:

- baseURL
- endpoint path
- HTTP method
- request body
- headers
- Authorization
- withCredentials
- backend response structure

Do not change frontend assumptions without inspecting the backend contract when available.

## TypeScript

Fix the type mismatch rather than suppressing it.

Do not solve errors with:

any
as any
@ts-ignore

unless there is a documented unavoidable reason.

## Final Debug Report

After fixing a problem explain:

Root cause
Fix
Files changed
Why the fix works
Any remaining issue