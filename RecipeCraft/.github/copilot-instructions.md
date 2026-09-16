# RecipeCraft Project Instructions

## Project

RecipeCraft is a modern recipe blog and recipe-management web application.

The project is being developed incrementally and should be treated as a production-quality application rather than a temporary demo.

## Technology Stack

Frontend:

- React
- TypeScript
- Vite
- React Router
- Redux Toolkit
- RTK Query
- Axios
- Tailwind CSS
- Framer Motion
- Lucide React

Backend:

- TypeScript
- Node.js
- Express
- MongoDB
- Mongoose
- JWT-based authentication

## Existing Frontend Architecture

Use this general structure:

src/
├── api/
├── components/
├── features/
│   ├── auth/
│   ├── recipes/
│   ├── users/
│   ├── comments/
│   └── ui/
├── pages/
├── store/
└── ...

Domain-specific functionality belongs inside the appropriate feature folder.

Do not put business logic into random components.

## State Management

Follow this separation:

### Local React state

Use component state for:

- Form inputs
- Temporary UI state
- Modal visibility
- Dropdown state
- Tabs
- Temporary filters

Do not move simple component state into Redux without a reason.

### Redux

Use Redux for global application state such as:

- Authentication state
- Current authenticated user
- Application-wide UI state when necessary

Never store plaintext passwords in Redux.

Never store refresh tokens in Redux or localStorage.

### RTK Query

Use RTK Query for server state such as:

- Recipes
- User profile data
- Comments
- Analytics
- Other backend resources

Avoid creating redundant Redux slices for server data that RTK Query already manages.

## Authentication

Current assumed endpoints:

POST /auth/signup
POST /auth/login
POST /auth/logout
POST /auth/refresh
GET /auth/me

Authentication architecture:

- Access token may currently be stored in localStorage because the existing Axios architecture uses it.
- Refresh token must be handled as an HttpOnly cookie.
- Axios uses withCredentials: true.
- Authentication state is stored in Redux.
- AuthInitializer restores the session.
- ProtectedRoute protects dashboard pages.
- PublicOnlyRoute prevents authenticated users from accessing login/signup.

Never expose refresh tokens to JavaScript.

## Recipe API

Current assumed endpoints:

GET /recipes
GET /recipes/:id
POST /recipes
PUT /recipes/:id
DELETE /recipes/:id

Do not invent additional backend endpoints unless explicitly requested.

If an endpoint contract is uncertain:

1. Inspect the existing project.
2. State the assumption.
3. Isolate the assumption in the API layer.
4. Do not spread the assumption throughout UI components.

## Recipe Form Model

The frontend recipe form uses:

RecipeFormData

with:

- title
- description
- image
- category
- cuisine
- tags
- prepTime
- cookTime
- servings
- difficulty
- ingredients
- instructions
- nutrition
- tips
- notes
- status

Form numeric values may be strings because they originate from HTML inputs.

Convert them into appropriate API values before sending requests.

## UI Design

RecipeCraft visual identity:

Primary:
#C8501A

Background:
#FAF8F5

Muted text:
#737C76

Border:
#E8DDD4

Use:

- rounded cards
- subtle shadows
- clean spacing
- premium food imagery
- responsive layouts
- accessible interactive controls
- Framer Motion where animation improves the experience

Avoid excessive animations.

## Dashboard

Dashboard pages must NOT be wrapped inside the public Navbar/Footer layout.

Dashboard has its own:

- Sidebar
- Mobile navigation
- Header
- Content area

Dashboard routes include:

/dashboard
/dashboard/profile
/dashboard/recipes
/dashboard/recipes/new
/dashboard/recipes/:id/edit
/dashboard/analytics
/dashboard/settings

## Routing

Public routes and dashboard routes must remain separate.

Dashboard routes should be protected.

Do not duplicate routes.

Do not use multiple unrelated pages on the same path.

Use React Router Link/NavLink for internal navigation instead of plain anchor tags where appropriate.

## Components

Prefer reusable components.

Before creating a new component:

1. Search for an existing component that performs the same function.
2. Reuse it if possible.
3. Extend it if appropriate.
4. Only create a new component when necessary.

Avoid giant components.

Break complex pages into logical components.

## TypeScript

Use strict TypeScript.

Avoid:

- any
- unnecessary type assertions
- duplicated interfaces
- implicit any

Prefer explicit domain types.

Keep API types separate from form types when their data shapes differ.

## API Errors

Always provide:

- loading state
- error state
- empty state

Do not silently swallow API errors.

Display user-friendly messages while keeping technical error information available for debugging.

## Security

Never:

- store passwords
- log passwords
- log access tokens
- expose refresh tokens
- commit secrets
- hardcode production credentials

Environment variables must be used for configuration.

## Coding Workflow

Before changing code:

1. Inspect the existing implementation.
2. Understand how the affected feature currently works.
3. Identify reusable code.
4. Make the smallest coherent change.
5. Check TypeScript errors.
6. Check related imports.
7. Check routing.
8. Check responsive behavior.
9. Test the affected flow.

Do not rewrite unrelated files.

## Important Rule

Do not replace existing RecipeCraft architecture merely because another architecture is possible.

Prefer incremental improvements that preserve working functionality.

When uncertain about an existing decision, inspect the code before changing it.