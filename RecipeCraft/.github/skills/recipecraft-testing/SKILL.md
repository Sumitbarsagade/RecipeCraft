---
name: recipecraft-testing
description: Test and verify RecipeCraft frontend features including authentication, routing, recipe CRUD, forms, API behavior, responsive UI, and regression scenarios.
---

# RecipeCraft Testing Skill

## Authentication Test Flow

Test:

### Signup

- valid signup
- missing username
- invalid email
- weak password
- password mismatch
- duplicate email
- duplicate username
- backend error

### Login

- valid credentials
- invalid password
- unknown email
- empty email
- empty password
- loading state
- successful redirect
- protected route redirect

### Session

- browser refresh while authenticated
- expired access token
- refresh token flow
- /auth/me failure
- logout
- logout after token expiration

## Recipe Tests

Test:

- recipe list
- search
- category filter
- status filter
- sorting
- recipe detail
- create
- edit
- delete
- draft
- publish
- API errors
- empty results

## UI Tests

Check:

- mobile
- tablet
- desktop
- keyboard navigation
- focus states
- modal behavior
- sidebar behavior
- dropdown positioning

## Regression

After changing authentication, verify:

- login
- signup
- protected routes
- dashboard
- logout

After changing recipe APIs, verify:

- recipes page
- recipe detail
- dashboard recipes
- create recipe
- edit recipe
- delete recipe

Do not declare a feature complete without checking its dependent flows.