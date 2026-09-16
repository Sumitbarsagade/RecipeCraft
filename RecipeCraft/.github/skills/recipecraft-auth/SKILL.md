---
name: recipecraft-auth
description: Implement, debug, and review RecipeCraft authentication including signup, login, logout, session restoration, refresh tokens, protected routes, Redux auth state, and Axios authentication.
---

# RecipeCraft Authentication Skill

## Authentication Endpoints

Current assumed backend contract:

POST /auth/signup
POST /auth/login
POST /auth/logout
POST /auth/refresh
GET /auth/me

Do not invent additional authentication endpoints.

## Architecture

Authentication follows:

LoginForm
→ authSlice login thunk
→ authApi loginUser
→ axiosInstance
→ POST /auth/login
→ backend response
→ Redux auth state
→ navigation

Signup follows the same architecture.

## Important Separation

Login form state is local component state:

- email
- password

Do NOT store plaintext passwords in Redux.

Authentication state belongs in Redux:

- user
- isAuthenticated
- isLoading
- error
- initialized

## Access Token

The current implementation may store the access token in localStorage.

Use the existing Axios request interceptor to attach:

Authorization: Bearer <accessToken>

Do not create another token mechanism.

## Refresh Token

Refresh token must be an HttpOnly cookie.

Never:

- read it from JavaScript
- store it in localStorage
- store it in Redux
- log it

Axios must use:

withCredentials: true

## Session Restoration

AuthInitializer should:

1. Check whether an access token exists.
2. If it exists, call GET /auth/me.
3. If the access token has expired, allow the refresh interceptor to refresh it.
4. Restore the authenticated user.
5. Mark authentication initialization as complete.

## Protected Routes

Dashboard routes require authentication.

Unauthenticated users should be redirected to /login.

Preserve the originally requested route when appropriate.

## Public Authentication Routes

Authenticated users should not remain on:

/login
/signup

Redirect them to:

/dashboard

## Login Form

The login form should:

- validate required fields
- dispatch the Redux login thunk
- show loading state
- disable submit while loading
- display backend errors
- navigate after successful login

Do NOT dispatch the raw axios loginUser Promise.

Correct:

dispatch(login({ email, password }))

Incorrect:

dispatch(loginUser({ email, password }))

## Signup

Signup should:

- validate required fields
- validate password confirmation
- dispatch signup thunk
- display API validation errors
- handle successful account creation according to backend behavior

Never assume signup automatically logs the user in unless the backend contract confirms it.

## Logout

Logout should:

1. Call POST /auth/logout.
2. Clear Redux authentication state.
3. Remove access token from localStorage.
4. Redirect to /login.

Even if the server logout request fails, clear the local frontend session.

## Error Handling

Handle:

400 validation errors
401 authentication errors
403 authorization errors
409 duplicate account errors
500 server errors

Translate backend messages into user-friendly UI messages.

## Security

Never log:

- passwords
- access tokens
- refresh tokens

Never place authentication secrets into source code.