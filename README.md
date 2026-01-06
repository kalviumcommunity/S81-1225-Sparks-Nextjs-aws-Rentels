**Sparks Rentals — Next.js (TypeScript) App**

A modern rental platform front‑end scaffolded with Next.js 16 (TypeScript), App Router, and Tailwind CSS. The goal is to deliver a reliable, scalable UI for listing rentals, search, booking flows, and account management, with a structure that accelerates future sprints.

**Folder Structure**

- **Location:** The app is scaffolded in [s81-1225-sparks-nextjs-aws-rentels](s81-1225-sparks-nextjs-aws-rentels) using the `src/` directory.
- **Tree:**

```
src/
├── app/          # Routes & pages (App Router)
├── components/   # Reusable UI components
├── lib/          # Utilities, helpers, configs
```

- **[src/app](s81-1225-sparks-nextjs-aws-rentels/src/app):** Route folders contain `page.tsx`, `layout.tsx`, and optional `route.ts` for API endpoints.
- **[src/components](s81-1225-sparks-nextjs-aws-rentels/src/components):** Presentation‑focused, reusable UI components. Prefer PascalCase and minimal props.
- **[src/lib](s81-1225-sparks-nextjs-aws-rentels/src/lib):** Pure utilities, configs, clients, and shared logic. Keep React‑free for easy testing.

**Naming Conventions**

- **Components:** PascalCase (e.g., Button.tsx, Header.tsx)
- **Hooks/Utils:** camelCase (e.g., useAuth.ts, formatDate.ts)
- **Non‑component files/folders:** kebab-case (e.g., api-client.ts, date-utils/)
- **App routes:** Folder-based under `src/app` (e.g., `src/app/dashboard/page.tsx`)
- **Imports:** Use alias `@/*` for `src` (e.g., `import { Button } from '@/components/Button'`)

**Setup & Local Run**

- Prerequisites: Node.js 18+ and npm.
- Install and run:

```powershell
cd s81-1225-sparks-nextjs-aws-rentels
npm install
npm run dev
```

- Open the app at http://localhost:3000
- `.gitignore` excludes `node_modules`, `.next/`, `coverage/`, `.env*`, etc. See [s81-1225-sparks-nextjs-aws-rentels/.gitignore](s81-1225-sparks-nextjs-aws-rentels/.gitignore).

**Reflection: Why this structure? How it scales**

- **Separation of concerns:** Routing in `app`, UI in `components`, logic in `lib` keeps boundaries clear and code focused.
- **Modular growth:** New features slot into `src/app/feature/*`, shared UI lives in `components`, and shared logic in `lib` without cross‑coupling.
- **Discoverability:** Predictable locations and naming reduce cognitive load and speed up onboarding.
- **Testability:** Pure functions in `lib` are straightforward to unit test; components remain presentational.
- **Team velocity:** The `@/*` import alias and consistent conventions reduce friction, enabling faster iteration in future sprints.

---

## Layout & Component Architecture (Reusable UI)

This project uses a small, reusable component hierarchy so navigation and spacing stay consistent across routes.

### Recommended structure

```
src/
  app/
    layout.tsx
    page.tsx
    dashboard/
      page.tsx
  components/
    layout/
      Header.tsx
      Sidebar.tsx
      LayoutWrapper.tsx
    ui/
      Button.tsx
    index.ts
```

### Component hierarchy

`Header → Sidebar → LayoutWrapper → Page`

`LayoutWrapper` is applied globally from `src/app/layout.tsx`, so every route renders with the same layout shell.

### Usage examples

- Root layout usage: `import { LayoutWrapper } from "@/components";`
- UI usage: `import { Button } from "@/components";`

Example:

```tsx
import { Button } from "@/components";

export default function Example() {
  return (
    <div className="space-y-4">
      <Button label="Primary" onClick={() => {}} />
      <Button label="Secondary" variant="secondary" />
    </div>
  );
}
```

### Props contracts

- `Button`
  - `label: string` (required)
  - `variant?: "primary" | "secondary"` (optional)
  - Supports standard button props like `onClick`, `disabled`, and `type`.

### Accessibility considerations

- Semantic landmarks (`header`, `nav`, `aside`, `main`) provide predictable structure for assistive tech.
- `nav` uses `aria-label="Primary"` and `aside` uses `aria-label="Sidebar"`.
- Links and buttons include `focus-visible` outlines for keyboard navigation.

### Visual testing (Storybook)

Storybook is configured to preview components in isolation.

```powershell
npm install
npm run storybook
```

Stories live next to components (example: `src/components/ui/Button.stories.tsx`).

### Reflection

- Reusable layout primitives reduce UI drift as routes grow.
- Centralized components improve maintainability (one change updates everywhere).
- Shared accessibility patterns (landmarks, focus styling) scale better than per-page fixes.

---

## State Management (Context + Hooks)

This project includes a lightweight global state setup using React Context API and custom hooks for:

- **Auth state** (demo): current user + login/logout
- **UI state**: theme mode + sidebar open/close

### Folder structure

```
src/
  context/
    AuthContext.tsx
    UIContext.tsx
  hooks/
    useAuth.ts
    useUI.ts
```

### State flow (high level)

`AuthProvider/UIProvider → Context Value → useAuthContext/useUIContext → useAuth/useUI → Components`

Providers are mounted globally in `src/app/layout.tsx`, so any client component can access state.

### Code snippets

Auth hook:

```ts
import { useAuthContext } from "@/context/AuthContext";

export function useAuth() {
  const { user, login, logout } = useAuthContext();
  return { isAuthenticated: Boolean(user), user, login, logout };
}
```

UI hook:

```ts
import { useUIContext } from "@/context/UIContext";

export function useUI() {
  const { theme, toggleTheme, sidebarOpen, toggleSidebar } = useUIContext();
  return { theme, toggleTheme, sidebarOpen, toggleSidebar };
}
```

### Evidence (console logs)

These context actions log state transitions for quick verification in DevTools:

- `User logged in: KalviumUser`
- `User logged out`
- `Theme toggled`
- `Sidebar toggled`

### Debugging & performance notes

- Inspect provider values via React DevTools → Components.
- Context changes re-render consumers; keep provider values memoized and callbacks stable.
- For larger UI state, consider `useReducer` to make state transitions predictable.

### Reflection

- Context removes prop-drilling and keeps shared logic centralized.
- Custom hooks (`useAuth`, `useUI`) keep components declarative and consistent.
- Overusing a single “mega-context” can cause unnecessary re-renders; split contexts by concern.

---

## Client-side Data Fetching (SWR)

This project demonstrates client-side data fetching using SWR (stale-while-revalidate) on the `/users` page.

### Install & run

```powershell
npm install
npm run dev
```

### Files

- Fetch helper: `src/lib/fetcher.ts`
- SWR list page: `src/app/users/page.tsx`
- Optimistic mutation UI: `src/app/users/AddUser.tsx`

### SWR keys

SWR keys identify cached resources. This app uses the key below to map to the users list API:

- Key: `/api/users?page=1&limit=10`
- Endpoint: `GET /api/users?page=1&limit=10`

### Revalidation

The users list uses `revalidateOnFocus: true` so data refreshes when the tab regains focus.

### Mutation & optimistic UI

`AddUser` performs an optimistic update:

1. Updates the SWR cache immediately (UI updates instantly)
2. Sends `POST /api/users`
3. Revalidates the list key to sync with the server

### Cache hits/misses (logs)

- SWR cache keys are logged in the browser console from the `/users` page.
- The API itself also logs Redis cache hits/misses for `GET /api/users`.

### Reflection

- SWR keeps the UI responsive by showing cached data and revalidating in the background.
- Optimistic updates improve UX but require careful rollback/revalidation on failure.
- Compared to raw `fetch`, SWR reduces boilerplate for caching, refetching, and shared state between components.

---

## Error & Loading States (App Router)

Handling loading and error states prevents blank screens and unexpected crashes during async rendering. A good fallback UI makes the app feel reliable: users always know whether the app is still working (loading) or needs action (error + retry).

### Implementation summary

- **Route-level skeletons:** Next.js `loading.tsx` files provide a structured skeleton while a route segment is loading.
- **Route-level error boundaries:** Next.js `error.tsx` files catch rendering/runtime errors in that route segment and display a friendly retry UI using `reset()`.
- **Client fetch errors surfaced to the boundary:** `/users` throws the SWR error during render so the route error boundary can handle it consistently.

### Where it’s implemented

- Users list route
  - `src/app/users/loading.tsx`
  - `src/app/users/error.tsx`
  - `src/app/users/page.tsx`
- User profile route
  - `src/app/users/[id]/loading.tsx`
  - `src/app/users/[id]/error.tsx`
  - `src/app/users/[id]/page.tsx`

### How to simulate states

1) **Simulate slow loading**

- Set `NEXT_PUBLIC_FETCH_DELAY_MS=2000` in `.env.local` (template in `env.example`).
- Reload and navigate to `/users` (and `/users/1`) to see the skeleton state.

2) **Simulate an error**

- Users list: break the API temporarily (e.g., throttle/offline in DevTools or make `/api/users` return an error) and visit `/users`.
- User profile: visit `/users/999999` to trigger a demo error and verify the route error boundary.

### Evidence (screenshots/GIFs)

Add your captures to `public/screenshots/` and update the links below:

- Loading skeleton
  - `public/screenshots/users-loading.png`
- Error fallback UI
  - `public/screenshots/users-error.png`
- Success after retry
  - `public/screenshots/users-success.png`

**Project Overview**

- **Stack:** Next.js 16 (TypeScript) with App Router and Tailwind CSS.
- **Location:** Project scaffolded in [s81-1225-sparks-nextjs-aws-rentels](s81-1225-sparks-nextjs-aws-rentels) with `src/` enabled.

**Folder Structure**

- **[src/app](s81-1225-sparks-nextjs-aws-rentels/src/app):** Routes, layouts, and pages using the App Router (`page.tsx`, `layout.tsx`, `route.ts` for API).
- **[src/components](s81-1225-sparks-nextjs-aws-rentels/src/components):** Reusable UI components that are presentation-focused and stateless when possible.
- **[src/lib](s81-1225-sparks-nextjs-aws-rentels/src/lib):** Utilities, helpers, configs, and non-React logic (formatters, clients, constants).

**Naming Conventions**

- **Components:** PascalCase (e.g., Button.tsx, Header.tsx).
- **Hooks/Utils:** camelCase (e.g., useAuth.ts, formatDate.ts).
- **Files & Folders:** kebab-case when not React components (e.g., api-client.ts, date-utils/).
- **App routes:** Folder-based routes under `src/app` (e.g., `src/app/dashboard/page.tsx`).
- **Imports:** Use `@/*` import alias for `src` (e.g., import { Button } from '@/components/Button').

**Scalability & Clarity**

- **Separation of concerns:** UI lives in components, logic in lib, routing in app for clean boundaries.
- **Modular growth:** New features add routes under app/feature, shared UI in components, and shared logic in lib.
- **Discoverability:** Predictable locations reduce cognitive load and onboarding time.
- **Testability:** Pure functions in lib are easy to unit test; components stay focused on rendering.

**Run Locally**

- From the workspace root:

```powershell
cd s81-1225-sparks-nextjs-aws-rentels
npm run dev
```

- App serves on http://localhost:3000.

![alt text](image-1.png)

**Workflow & Collaboration**

- **Branching Strategy:** Use consistent branch names for clarity and traceability.
  - feature/<feature-name>
  - fix/<bug-name>
  - chore/<task-name>
  - docs/<update-name>
  - Examples: `feature/login-auth`, `fix/navbar-alignment`, `docs/update-readme`.
- **PR Template:** All pull requests should use the template at [.github/pull_request_template.md](.github/pull_request_template.md).
- **Code Review Checklist:** Reviewers confirm:
  - Code follows naming conventions and structure
  - Functionality verified locally
  - No console errors or warnings
  - ESLint and Prettier checks pass
  - Comments and documentation are meaningful
  - Sensitive data is not exposed
- **Status Checks (CI):** PRs and pushes run lint, build, and optional tests via GitHub Actions workflow at [.github/workflows/ci.yml](.github/workflows/ci.yml).

**Branch Protection Rules**

- Configure in GitHub: Repository → Settings → Branches → Branch protection rules.
- Protect `main` with:
  - Require pull request reviews before merging
  - Require status checks to pass (select CI jobs: "Lint", "Build", and "Tests")
  - Disallow direct pushes to `main`
  - Require PRs to be up to date before merging
- Add a screenshot of your configured protection rules to document enforcement.

**PR Evidence & Screenshots**

- Include screenshots or console outputs showing checks passing or review comments resolved in your PR.
- Add a screenshot of a real PR with all CI checks passing and reviewer feedback addressed.

**Why this Workflow?**

- **Quality:** Enforces lint/build checks and standardized reviews.
- **Clarity:** Branch naming and PR template make intent obvious.
- **Velocity:** Clear rules reduce back-and-forth and avoid broken main.
- **Security:** Review and CI reduce risk of leaking sensitive data.
  Rental nextjs project!!!

# Rental Next.js Project

This project demonstrates **Static Rendering (SSG)**, **Dynamic Rendering (SSR)**, and **Hybrid Rendering (ISR)** using the **Next.js App Router**. It is also fully containerized for a seamless development experience.

---

## 🎯 TypeScript & ESLint Configuration

This project is configured with **strict TypeScript settings**, **ESLint + Prettier integration**, and **pre-commit hooks** to ensure code quality and consistency across the team.

### 📋 TypeScript Strict Mode

Our `tsconfig.json` is configured with strict compiler options to catch potential errors early.

### 🎨 ESLint & Prettier Rules

We use ESLint 9 with a flat config and Prettier for consistent formatting.

### 🪝 Pre-Commit Hooks

Husky and lint-staged automatically run checks before each commit.

---

## 🔐 Environment Variable Management

This project uses environment variables to manage configuration and sensitive data securely.

### Setup Instructions

1. Copy `.env.example` and rename it to `.env.local`
2. Fill in actual values
3. Restart the development server

```bash
cp .env.example .env.local
npm run dev
```

---

## 🐳 Docker & Compose Setup for Local Development

This project is containerized using Docker and Docker Compose to ensure a consistent local development environment that mirrors production. This setup eliminates the "it works on my machine" problem by bundling the app, database, and cache together.

### 🚀 Running the Stack

To start all services with a single command, run the following in the root directory:

```bash
docker compose up --build
```

Once running, you can access:

- **Next.js App**: [http://localhost:3000](http://localhost:3000)
- **PostgreSQL**: `localhost:5432`
- **Redis**: `localhost:6379`

Quick verification commands:

```powershell
# Show running containers
docker compose ps

# Check Next.js logs
docker compose logs app --tail=100

# Ping Redis
docker exec redis_cache redis-cli PING

# List Postgres databases
docker exec -it postgres_db psql -U postgres -c "\\l"
```

### 🏗️ Service Architecture

The `docker-compose.yml` file defines three core services:

1.  **`app` (Next.js)**:
    - **Build**: Uses the local `Dockerfile`.
    - **Dockerfile Logic**: Based on `node:20-alpine`. It installs dependencies, copies the source code, sets `NODE_ENV=production`, disables Next telemetry, builds the production-ready Next.js app, and starts it on port 3000.
    - **Dependencies**: Depends on `db` and `redis` to ensure they are started first.
2.  **`db` (PostgreSQL)**:
    - **Image**: `postgres:15-alpine`.
    - **Volume**: Uses `db_data` for data persistence, ensuring your database remains intact even if the container is stopped or removed.
    - **Network**: Accessible within the container network as `db:5432`.
3.  **`redis` (Redis Cache)**:
    - **Image**: `redis:7-alpine`.
    - **Purpose**: Used for high-performance caching.

### 🌐 Networking & Volumes

- **Networks**: All services are connected via a shared bridge network named `localnet`. This allows the Next.js app to connect to the database using the hostname `db` and to Redis using `redis`.
- **Volumes**: The `db_data` volume is mapped to `/var/lib/postgresql/data` inside the PostgreSQL container to persist database records.

Sample logs when everything is running:

```
nextjs_app   | ▲ Next.js 16.1.0
nextjs_app   | - Local:         http://localhost:3000
nextjs_app   | ✓ Ready in 958ms
postgres_db  | database system is ready to accept connections
redis_cache  | Ready to accept connections tcp
```

---

## Redis Caching Strategy
We have integrated Redis to improve API performance for the `/api/users` endpoint.

### Configuration
- **Library**: `ioredis`
- **Pattern**: Cache-Aside (Lazy Loading)
- **TTL**: 60 seconds for list data
- **Invalidation**: Automatic cache clearing on User creation (`POST`), update (`PUT`/`PATCH`), and deletion (`DELETE`).

### Performance
- **Cold Cache**: ~150ms (fetches from DB)
- **Warm Cache**: ~10ms (fetches from Redis)

### Connection
Ensure a Redis instance is running at `redis://localhost:6379` or set `REDIS_URL`.

---

## Prisma ORM (PostgreSQL)

Prisma is the ORM layer for this project. It provides:

- **Type-safe queries** (generated types from your schema)
- **Centralized models** in `prisma/schema.prisma`
- **Consistent DB access** through a shared Prisma Client

### What was added

- **Schema**: `prisma/schema.prisma`
- **Prisma config**: `prisma.config.ts` (Prisma v7 uses this for `DATABASE_URL`)
- **Client singleton**: `src/lib/prisma.ts`
- **Test query script**: `scripts/test-prisma.mjs`

### Key Prisma v7 notes (important)

- Prisma v7 no longer supports `url = env("DATABASE_URL")` inside `schema.prisma` for Migrate.
- The database URL is configured via `prisma.config.ts`.
- Prisma Client requires a **PostgreSQL adapter** (`@prisma/adapter-pg`) instead of using the connection string directly.

### Setup steps

From the project root:

```powershell
npm install
npx prisma generate
```

Start Postgres (recommended: Docker Compose) and apply the schema:

```powershell
# Make sure Docker Desktop is running
docker compose up -d db

# Create/apply the initial migration
npx prisma migrate dev --name init
```

Verify connectivity with a simple query:

```powershell
npm run prisma:test
```

Expected success output looks like:

```
Prisma connection OK. Users: []
```

If Postgres is not running, you’ll typically see `ECONNREFUSED`.

---

## API Route Structure & Naming (REST)

This project uses **Next.js App Router file-based routing** for APIs: every `route.ts` under `src/app/api/**` becomes an endpoint under `/api/**`.

### Route hierarchy

Users are implemented as a RESTful resource with **plural nouns**:

- `GET /api/users` → list users (supports pagination) *(protected: requires JWT)*
- `POST /api/users` → create user
- `GET /api/users/:id` → get user by id *(protected: requires JWT)*
- `PUT /api/users/:id` → update user by id
- `PATCH /api/users/:id` → partial update user by id
- `DELETE /api/users/:id` → delete user by id

**Source files**

- `src/app/api/users/route.ts`
- `src/app/api/users/[id]/route.ts`

### Pagination (GET /api/users)

Query params:

- `page` (default: `1`)
- `limit` (default: `10`, max: `100`)

Response shape:

```json
{
  "success": true,
  "message": "Users fetched successfully",
  "data": {
    "page": 1,
    "limit": 10,
    "total": 42,
    "data": []
  },
  "timestamp": "2025-12-27T10:00:00.000Z"
}
```

Example:

```bash
curl "http://localhost:3000/api/users?page=1&limit=10" \
  -H "Authorization: Bearer <YOUR_JWT_TOKEN>"
```

### Sample requests

Create a user:

```bash
curl -X POST "http://localhost:3000/api/users" \
	-H "Content-Type: application/json" \
	-d '{"name":"Alice","email":"alice@example.com","role":"CUSTOMER","phone":"+1-555-0100"}'
```

Get a user by id:

```bash
curl "http://localhost:3000/api/users/1" \
  -H "Authorization: Bearer <YOUR_JWT_TOKEN>"
```

Update a user (PATCH):

```bash
curl -X PATCH "http://localhost:3000/api/users/1" \
	-H "Content-Type: application/json" \
	-d '{"name":"Alice Updated"}'
```

Delete a user:

```bash
curl -X DELETE "http://localhost:3000/api/users/1"
```

### Error handling & status codes

Routes return consistent JSON errors and meaningful HTTP status codes:

- `200 OK` → successful `GET`, `PUT/PATCH`, `DELETE`
- `201 Created` → successful `POST`
- `400 Bad Request` → invalid input (invalid JSON, invalid `page/limit`, invalid `id`)
- `404 Not Found` → user not found
- `409 Conflict` → unique constraint conflict (e.g., email already exists)
- `401 Unauthorized` → missing/invalid credentials (auth)
- `403 Forbidden` → invalid/expired token (auth)
- `500 Internal Server Error` → unexpected server/database errors

### Reflection (why consistency matters)

Using predictable, noun-based route naming (e.g., `/api/users` rather than `/api/getUsers`) reduces ambiguity, keeps endpoints discoverable, and helps teammates and clients integrate faster with fewer mismatches in expectations.

---

## Global API Response Handler

All API endpoints return a **consistent JSON envelope** using a shared helper.

### Unified response envelope

Success responses:

```json
{
  "success": true,
  "message": "Success",
  "data": {},
  "timestamp": "2025-12-27T10:00:00.000Z"
}
```

Error responses:

```json
{
  "success": false,
  "message": "Missing required field: name",
  "error": {
    "code": "E001"
  },
  "timestamp": "2025-12-27T10:00:00.000Z"
}
```

### Handler utility

The global helpers live in:

- `src/lib/responseHandler.ts`
- `src/lib/errorCodes.ts`

---

## Centralized Error Handling (Middleware-style)

Next.js App Router does not provide an Express-style “catch-all” middleware for route handlers, so this project centralizes error handling via a **shared `handleError()` utility** that every API route can call inside `catch` blocks.

### Why this matters

- **Consistency:** one response shape for all errors.
- **Security:** in production, user responses stay minimal.
- **Observability:** developers get structured JSON logs with context.

### Files

- `src/lib/logger.ts` → structured JSON logger
- `src/lib/errorHandler.ts` → centralized `handleError(error, context)`

### Development vs Production behavior

| Environment | Client response | Logging |
|---|---|---|
| Development (`NODE_ENV!=production`) | Uses the real error message and includes stack info in `error.details` | Full stack logged |
| Production (`NODE_ENV=production`) | Returns a safe message: `Something went wrong. Please try again later.` | Stack is logged as `REDACTED` |

### Logger (structured)

`src/lib/logger.ts` writes JSON lines like:

```json
{
  "level": "error",
  "message": "Error in GET /api/users",
  "meta": {
    "message": "Database connection failed!",
    "stack": "REDACTED",
    "status": 500,
    "code": "E500"
  },
  "timestamp": "2025-12-29T16:45:00.000Z"
}
```

### Using the handler in routes

Routes catch unexpected failures and return `handleError()`:

```ts
import { handleError } from "@/lib/errorHandler";

export async function GET() {
  try {
    // ...your logic
  } catch (error) {
    return handleError(error, "GET /api/users");
  }
}
```

### Example response (dev)

```json
{
  "success": false,
  "message": "Database connection failed!",
  "error": {
    "code": "E500",
    "details": {
      "context": "GET /api/users",
      "name": "Error",
      "stack": "Error: Database connection failed!\n  at ..."
    }
  },
  "timestamp": "2025-12-29T16:45:00.000Z"
}
```

### Example response (prod)

```json
{
  "success": false,
  "message": "Something went wrong. Please try again later.",
  "error": {
    "code": "E500"
  },
  "timestamp": "2025-12-29T16:45:00.000Z"
}
```

### Reflection (least leakage, fastest debugging)

- Structured logs make it easy to search by `context` and correlate failures.
- Redacting stack traces in production reduces accidental data exposure.
- Extensible approach: `handleError()` can be expanded to map custom error classes (Validation/Auth/DB) to specific status codes and `ERROR_CODES`.

Usage pattern (example from Users routes):

```ts
import { sendError, sendSuccess } from "@/lib/responseHandler";
import { ERROR_CODES } from "@/lib/errorCodes";

// success
return sendSuccess(user, "User fetched successfully", 200);

// validation error
return sendError("Invalid user id", ERROR_CODES.VALIDATION_ERROR, 400);
```

### Defined error codes

```ts
export const ERROR_CODES = {
  VALIDATION_ERROR: "E001",
  NOT_FOUND: "E002",
  DATABASE_FAILURE: "E003",
  CONFLICT: "E004",
  UNAUTHORIZED: "E005",
  FORBIDDEN: "E006",
  INTERNAL_ERROR: "E500",
} as const;
```

### Reflection (DX + observability)

A single response schema makes frontend integration predictable (no per-route response parsing), speeds up debugging (every error has a stable code + timestamp), and makes it easier to plug into logging/monitoring tools later.

---

## Input Validation with Zod

This project validates **all POST and PUT request bodies** with Zod before touching Prisma. Schemas are shared so they can be reused on both the server (API routes) and the client (forms).

### Shared schema

User schemas live in `src/lib/schemas/userSchema.ts` and export both schemas and types:

```ts
import { z } from "zod";

export const ROLE_VALUES = ["CUSTOMER", "OWNER", "ADMIN"] as const;

export const userCreateSchema = z.object({
  name: z.string().trim().min(2, "Name must be at least 2 characters long"),
  email: z
    .string()
    .trim()
    .min(1, "Email is required")
    .email("Invalid email address")
    .transform((value) => value.toLowerCase()),
  role: z.enum(ROLE_VALUES).optional().nullable(),
  phone: z.string().trim().optional().nullable(),
});

export type UserCreateInput = z.infer<typeof userCreateSchema>;
```

### Applying validation in routes

Example pattern used in `POST /api/users` and `PUT /api/users/:id`:

```ts
import { ZodError } from "zod";
import { userCreateSchema, formatZodError } from "@/lib/schemas/userSchema";
import { sendError, sendSuccess } from "@/lib/responseHandler";
import { ERROR_CODES } from "@/lib/errorCodes";

try {
  const body = await req.json();
  const validated = userCreateSchema.parse(body);
  return sendSuccess(validated, "Validated", 200);
} catch (err) {
  if (err instanceof ZodError) {
    return sendError("Validation Error", ERROR_CODES.VALIDATION_ERROR, 400, {
      errors: formatZodError(err),
    });
  }
  return sendError("Unexpected error", ERROR_CODES.INTERNAL_ERROR, 500);
}
```

### Passing vs failing examples

Passing request:

```bash
curl -X POST "http://localhost:3000/api/users" \
  -H "Content-Type: application/json" \
  -d '{"name":"Alice","email":"alice@example.com","role":"CUSTOMER"}'
```

Failing request:

```bash
curl -X POST "http://localhost:3000/api/users" \
  -H "Content-Type: application/json" \
  -d '{"name":"A","email":"bademail"}'
```

Expected failing response shape:

```json
{
  "success": false,
  "message": "Validation Error",
  "error": {
    "code": "E001",
    "details": {
      "errors": [
        { "field": "name", "message": "Name must be at least 2 characters long" },
        { "field": "email", "message": "Invalid email address" }
      ]
    }
  },
  "timestamp": "2025-12-27T10:00:00.000Z"
}
```

### Reflection (schema reuse + maintainability)

Having a single schema source of truth reduces duplicated validation rules, makes API behavior consistent across endpoints, and helps teams evolve payload requirements safely (schema changes are explicit and type-checked).

---

## Authentication APIs (Signup / Login)

### Authentication vs authorization

- **Authentication**: verifies *who you are* (login/signup).
- **Authorization**: verifies *what you can access* (e.g., admin-only routes).

This project focuses on **authentication** with bcrypt (password hashing) and JWT (session token).

### API structure

- `POST /api/auth/signup` → create account (hashes password)
- `POST /api/auth/login` → verify password and issue JWT

Source files:

- `src/app/api/auth/signup/route.ts`
- `src/app/api/auth/login/route.ts`

### Environment variables

Server-side secret used for signing/verifying tokens:

```bash
JWT_SECRET=your_jwt_secret_here_change_in_production
```

### Signup flow (bcrypt)

On signup, the API:

1. Validates input (Zod)
2. Checks if a user already exists
3. Hashes the password with bcrypt (salt rounds: `10`)
4. Stores **only the hash** (never the plaintext)

Signup request:

```bash
curl -X POST "http://localhost:3000/api/auth/signup" \
  -H "Content-Type: application/json" \
  -d '{"name":"Alice","email":"alice@example.com","password":"mypassword123"}'
```

Signup success response (example):

```json
{
  "success": true,
  "message": "Signup successful",
  "data": {
    "id": 1,
    "name": "Alice",
    "email": "alice@example.com",
    "role": "CUSTOMER",
    "phone": null,
    "createdAt": "2025-12-27T10:00:00.000Z",
    "updatedAt": "2025-12-27T10:00:00.000Z"
  },
  "timestamp": "2025-12-27T10:00:00.000Z"
}
```

### Login flow (JWT)

On login, the API:

1. Validates input (Zod)
2. Finds the user by email
3. Compares password with the stored hash using bcrypt
4. Issues a signed JWT access token (expires in **1 hour**)

Login request:

```bash
curl -X POST "http://localhost:3000/api/auth/login" \
  -H "Content-Type: application/json" \
  -d '{"email":"alice@example.com","password":"mypassword123"}'
```

Login success response (example):

```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "token": "<JWT_TOKEN>",
    "expiresIn": "1h",
    "user": {
      "id": 1,
      "name": "Alice",
      "email": "alice@example.com",
      "role": "CUSTOMER",
      "phone": null,
      "createdAt": "2025-12-27T10:00:00.000Z",
      "updatedAt": "2025-12-27T10:00:00.000Z"
    }
  },
  "timestamp": "2025-12-27T10:00:00.000Z"
}
```

### Protected route (token validation)

`GET /api/users` is protected and requires:

```http
Authorization: Bearer <YOUR_JWT_TOKEN>
```

Example:

```bash
curl "http://localhost:3000/api/users?page=1&limit=10" \
  -H "Authorization: Bearer <YOUR_JWT_TOKEN>"
```

If the token is missing you’ll get `401` (E005). If it’s invalid/expired you’ll get `403` (E006).

### Reflection: expiry, storage, refresh

- **Token expiry**: short-lived access tokens (`1h`) reduce the damage window if a token leaks.
- **Token storage**:
  - `localStorage` is easy but vulnerable to XSS.
  - `httpOnly` cookies reduce XSS risk (recommended for many apps) but require CSRF considerations.
- **Refresh strategy (not implemented here)**: for long-lived sessions, use a separate refresh token (rotated, stored securely) to mint new short-lived access tokens.

### Postman evidence

Add screenshots showing:

- Signup success + signup conflict (existing email)
- Login success + login failure
- Protected route success + missing/expired token cases

### Schema snippet

```prisma
generator client {
	provider = "prisma-client-js"
}

datasource db {
	provider = "postgresql"
}

model User {
	id        Int       @id @default(autoincrement())
	name      String
	email     String    @unique
	createdAt DateTime  @default(now())
	projects  Project[]
}

model Project {
	id     Int    @id @default(autoincrement())
	name   String
	userId Int
	user   User   @relation(fields: [userId], references: [id])
}
```

### Prisma Client initialization snippet

```ts
import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";

const globalForPrisma = globalThis as unknown as {
  prisma?: PrismaClient;
  pgPool?: Pool;
};

const pgPool =
  globalForPrisma.pgPool ||
  new Pool({
    connectionString: process.env.DATABASE_URL,
  });

const adapter = new PrismaPg(pgPool);

export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    adapter,
    log: ["query", "info", "warn", "error"],
  });

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.pgPool = pgPool;
  globalForPrisma.prisma = prisma;
}
```

### Reflection

- **Type safety**: query results and inputs are typed end-to-end, reducing runtime mistakes.
- **Reliability**: schema-driven models keep DB structure and application code in sync.
- **Productivity**: faster iteration (generate client, write typed queries) and clearer data access patterns.

---

## 🔄 Database Migrations & Seeding

This project uses **Prisma Migrate** for version-controlled database schema changes and a **seed script** for reproducible sample data.

### 📊 Database Schema

The application uses a comprehensive rental platform schema with the following models:

- **User**: Customers, property owners, and admins with role-based access
- **Property**: Rental listings with details, pricing, and availability
- **Booking**: Reservation records with dates and status tracking
- **Payment**: Transaction records linked to bookings
- **Review**: Property ratings and comments from customers
- **Amenity**: Property features (WiFi, parking, pool, etc.)

### 🚀 Migration Workflow

#### 1. Start the Database

```powershell
# Start PostgreSQL via Docker
docker compose up -d db

# Verify it's running
docker ps
```

#### 2. Create Initial Migration

```powershell
# Generate migration files and apply to database
npx prisma migrate dev --name init_schema
```

This command:

- Creates SQL migration files in `prisma/migrations/`
- Applies changes to the PostgreSQL database
- Regenerates Prisma Client with updated types

#### 3. Create Additional Migrations

When you modify `schema.prisma`, create a new migration:

```powershell
npx prisma migrate dev --name add_new_feature
```

Each migration is versioned and tracked, ensuring team-wide consistency.

#### 4. View Migration History

```powershell
# List all migrations
ls prisma\migrations

# View a specific migration SQL
cat prisma\migrations\*_init_schema\migration.sql
```

### 🌱 Seed Script

The seed script (`prisma/seed.ts`) populates the database with realistic sample data for development and testing.

#### Running the Seed

```powershell
npm run prisma:seed
```

**What gets seeded:**

- 5 Users (1 Admin, 2 Property Owners, 2 Customers)
- 4 Properties with varying details
- 17 Amenities across properties
- 3 Bookings in different states
- 2 Payments
- 5 Reviews with ratings

#### Idempotency

The seed script uses `upsert` operations, making it safe to run multiple times without creating duplicate data. This is crucial for:

- Resetting development environments
- Testing migration rollbacks
- Onboarding new team members

### 🔙 Rollback & Reset

#### Reset Database (Destructive)

```powershell
npx prisma migrate reset
```

This will:

1. Drop the database
2. Re-create it
3. Re-apply all migrations
4. Re-run the seed script

**Warning:** This destroys all data. Only use in development.

#### Rollback a Single Migration

Prisma doesn't support automatic rollback of individual migrations. To rollback:

1. Manually create a new migration that reverses the changes
2. Or use `migrate reset` to start fresh

### 🔍 Viewing Data

#### Prisma Studio (Recommended)

```powershell
npx prisma studio
```

Opens a visual database browser at `http://localhost:5555` where you can:

- Browse all tables
- View relationships
- Edit data
- Run queries

#### Direct Database Access

```powershell
# Connect to PostgreSQL
docker exec -it postgres_db psql -U postgres -d mydb

# Example query
SELECT * FROM "User";
```

### 🛡️ Production Safety Guidelines

Before running migrations in production:

1. **Backup First**: Always create a full database backup

   ```powershell
   # Example: pg_dump for PostgreSQL
   docker exec postgres_db pg_dump -U postgres mydb > backup.sql
   ```

2. **Test in Staging**: Run migrations in a staging environment that mirrors production

   ```powershell
   # Use environment-specific DATABASE_URL
   DATABASE_URL="postgresql://..." npx prisma migrate deploy
   ```

3. **Review Migration SQL**: Manually inspect generated SQL for destructive operations

   ```powershell
   cat prisma\migrations\*_migration_name\migration.sql
   ```

4. **Use `migrate deploy` in Production**: Never use `migrate dev` in production

   ```powershell
   # Production deployment (no prompts, no seed)
   npx prisma migrate deploy
   ```

5. **Plan for Downtime**: Schedule migrations during low-traffic periods

6. **Monitor**: Watch application logs and database metrics during and after migration

7. **Rollback Plan**: Have a tested rollback procedure ready
   - Keep database backups
   - Document manual rollback steps
   - Test rollback in staging first

8. **Data Validation**: Verify data integrity after migration
   ```sql
   -- Example: Check for orphaned records
   SELECT * FROM "Booking" WHERE "propertyId" NOT IN (SELECT id FROM "Property");
   ```

### 📸 Migration Evidence

Successful migration output:

```
Prisma schema loaded from prisma\schema.prisma
Datasource "db": PostgreSQL database "mydb" at "localhost:5432"

Applying migration `20251226085208_init_schema`

The following migration(s) have been created and applied:

migrations/
  └─ 20251226085208_init_schema/
    └─ migration.sql

Your database is now in sync with your schema.

✔ Generated Prisma Client
```

Successful seed output:

```
🌱 Starting database seeding...

👥 Seeding users...
✅ Users seeded successfully

🏠 Seeding properties...
✅ Properties seeded successfully

✨ Seeding amenities...
✅ Amenities seeded successfully

📅 Seeding bookings...
✅ Bookings seeded successfully

💳 Seeding payments...
✅ Payments seeded successfully

⭐ Seeding reviews...
✅ Reviews seeded successfully

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
✨ Database seeding completed successfully!
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

### 🎯 Quick Reference

| Command                     | Purpose                                                   |
| --------------------------- | --------------------------------------------------------- |
| `npx prisma generate`       | Regenerate Prisma Client after schema changes             |
| `npx prisma migrate dev`    | Create and apply migration in development                 |
| `npx prisma migrate deploy` | Apply migrations in production                            |
| `npx prisma migrate reset`  | Reset database and re-run migrations + seed               |
| `npm run prisma:seed`       | Run seed script                                           |
| `npx prisma studio`         | Open visual database browser                              |
| `npx prisma db push`        | Push schema changes without creating migration (dev only) |

---

## ⚡ Transaction & Query Optimisation

To ensure data integrity and high performance, this project implements Prisma Transactions and Database Indexing.

### 1. Transactions (Atomicity)

We use `prisma.$transaction()` to ensure that related operations succeed or fail together.

**Scenario**: **Booking Creation**. A booking must not exist without a corresponding payment record (in our simulated business flow).

- **Success**: Both `Booking` and `Payment` are created.
- **Rollback**: If the Payment fails (e.g., invalid data), the Booking is strictly rolled back to prevent "orphaned" bookings.

**Test Script**: `scripts/test-transaction.ts`
To verify, run:

```bash
npx ts-node --compiler-options '{"module":"CommonJS"}' scripts/test-transaction.ts
```

### 2. Database Indexes

We added indexes to `prisma/schema.prisma` to optimize frequent query patterns.

| Model      | Index              | Purpose                                                 |
| ---------- | ------------------ | ------------------------------------------------------- |
| `Booking`  | `[userId, status]` | Speeds up fetching "My Confirm Bookings" for dashboard. |
| `Booking`  | `[startDate]`      | Optimizes date-range overlap checks.                    |
| `Property` | `[price]`          | faster filtering by price range.                        |

**Migration**: `20251226..._add_indexes_for_optimisation`

### 3. Query Performance Benchmark

We compared a "Baseline" (naive) query vs. an "Optimized" query.

- **Baseline**: Fetches all fields + deep nested relations (Property, Reviews) + no filtering.
- **Optimized**: Uses `select` (specific fields), `take` (pagination), and filters by indexed fields.

**Results (Simulated Load)**:

- **Baseline Query**: ~150ms - 300ms (Heavy payload, full scan)
- **Optimized Query**: ~5ms - 20ms (Light payload, Index Seek)

_Note: Logs captured via `DEBUG="prisma:query"`._

### 4. Production Monitoring Strategy

To ensure query health in production (AWS/Vercel):

1.  **Enable Slow Query Logs**: Configure PostgreSQL to log queries taking > 100ms.
2.  **Prisma Metrics**: Use generic Prometheus metrics exposed by Prisma Client.
3.  **Anti-patterns Avoided**:
    - **N+1 Queries**: Solved by proper `include` or specific `select`.
    - **Over-fetching**: Solved by choosing only needed fields (`id`, `name`) instead of full objects.
    - **Full Table Scans**: Prevented by adding indexes on filter columns (`status`, `userId`).

---

### 📝 Reflections & Troubleshooting

#### Issues Faced & Solutions

- **TypeScript build failures (noUnusedLocals)**: `src/app/test-lint.tsx` and an unused env in `layout.tsx` caused `next build` to fail inside Docker. **Fix**: Removed unused variables and console statements so production builds pass.
- **Build-time env access**: A build-time check for `DATABASE_URL` in `layout.tsx` crashed SSG during `next build`. **Fix**: Removed the check from build-time code; read envs at runtime in server code instead.
- **Compose spec warning**: Docker Compose warned that `version` is obsolete. **Fix**: Removed the `version:` field from `docker-compose.yml` to follow the current spec.
- **Environment Variables**: The app requires `DATABASE_URL`, `REDIS_URL`, and public `NEXT_PUBLIC_*` variables. **Fix**: Defined these in `docker-compose.yml` and used container hostnames (`db`, `redis`).
- **Build Performance**: Used `-alpine` images and ensured `.dockerignore` excludes `node_modules`, `.next`, etc., to keep the context small and speed up builds.

#### Troubleshooting Tips

- **Port Conflicts**: If the build fails with a port error, ensure no other service is using ports 3000, 5432, or 6379 on your host machine.
- **Clean Slate**: To reset your environment completely, run:
  ```bash
  docker compose down -v --rmi all
  ```
- **Windows-specific**: Ensure Docker Desktop is running with WSL 2 backend; if file sharing prompts appear, allow the project drive. Antivirus or firewall can slow bind mounts; prefer image builds over host mounts for production-like runs.

---

## Lesson: Page Routing and Dynamic Routes (App Router)

This project now includes a working route structure with **public**, **protected**, and **dynamic** pages using Next.js App Router conventions.

### Route map

**Public routes**

- `/` → Home page
- `/login` → Login page (demo login)

**Protected routes (via middleware + cookie)**

- `/dashboard` → Protected dashboard
- `/users` → Protected users list
- `/users/[id]` → Protected dynamic user profile

**Error handling**

- `not-found.tsx` → Custom 404 page
- `/users/[id]` calls `notFound()` when `id` is not numeric (example of graceful error states).

### Where routing is implemented

- Pages live under `src/app/*`:
  - `src/app/page.tsx`
  - `src/app/login/page.tsx`
  - `src/app/dashboard/page.tsx`
  - `src/app/users/page.tsx`
  - `src/app/users/[id]/page.tsx`
  - `src/app/not-found.tsx`
- Shared navigation lives in `src/app/layout.tsx`.

### Middleware (public vs protected)

Protected page routes are enforced by `src/middleware.ts`.

- Public pages are accessible without auth.
- Protected pages require a `token` cookie.
- For this lesson, the login page sets a demo cookie value: `mock.jwt.token`.

Note: The middleware also continues to protect existing API routes (`/api/users/*` and `/api/admin/*`) using `Authorization: Bearer <token>`.

### Screenshots to include (deliverable)

Add screenshots to this README (or a `docs/` folder) showing:

- Home page and navbar
- `/login` page
- Attempting to visit `/dashboard` without a cookie (redirects to `/login`)
- Dynamic user pages (e.g. `/users/1`, `/users/2`)
- Custom 404 page (`/some-route-that-does-not-exist`)

### Reflection (SEO, scalability, UX)

- **Dynamic routing scales**: `/users/[id]` supports an unbounded number of profiles without creating a new file per user.
- **SEO-friendly structure**: Clean, hierarchical URLs (like `/users/42`) are readable and indexable, and map naturally to content.
- **Breadcrumbs improve UX**: Breadcrumb navigation helps users understand where they are and move around quickly (especially on deep routes).
- **Graceful error states**: A custom 404 page and param validation (`notFound()`) prevent broken or confusing experiences.

---

## Form Handling & Validation (React Hook Form + Zod)

This project implements production-grade form handling using **React Hook Form** for state management and **Zod** for schema-based validation. This combination provides type-safe, performant forms with minimal re-renders and declarative validation rules.

### Why React Hook Form + Zod?

| Tool | Purpose | Key Benefit |
|------|---------|-------------|
| **React Hook Form** | Manages form state and validation with minimal re-renders | Lightweight and performant |
| **Zod** | Provides declarative schema validation | Type-safe and reusable schemas |
| **@hookform/resolvers** | Connects Zod to React Hook Form seamlessly | Simplifies schema integration |

### Installation

The following packages are installed:

```bash
npm install react-hook-form zod @hookform/resolvers
```

### Project Structure

```
src/
  lib/
    schemas/
      signupSchema.ts       # Signup form validation schema
      contactSchema.ts      # Contact form validation schema
  components/
    ui/
      FormInput.tsx         # Reusable form input component
  app/
    signup/
      page.tsx             # Signup form page
    contact/
      page.tsx             # Contact form page
```

### Validation Schemas

Schemas are defined in `src/lib/schemas/` and follow a consistent pattern:

**Signup Schema** ([signupSchema.ts](file:///c:/Users/MAHIL%20MITHRAN/OneDrive/Desktop/S81-1225-Sparks-Nextjs-aws-Rentels/src/lib/schemas/signupSchema.ts)):

```ts
import { z } from "zod";

export const signupSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters long"),
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
});

export type SignupFormData = z.infer<typeof signupSchema>;
```

**Contact Schema** ([contactSchema.ts](file:///c:/Users/MAHIL%20MITHRAN/OneDrive/Desktop/S81-1225-Sparks-Nextjs-aws-Rentels/src/lib/schemas/contactSchema.ts)):

```ts
import { z } from "zod";

export const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters long"),
  email: z.string().email("Please enter a valid email address"),
  message: z.string().min(10, "Message must be at least 10 characters long"),
});

export type ContactFormData = z.infer<typeof contactSchema>;
```

### Reusable Form Components

**FormInput Component** ([FormInput.tsx](file:///c:/Users/MAHIL%20MITHRAN/OneDrive/Desktop/S81-1225-Sparks-Nextjs-aws-Rentels/src/components/ui/FormInput.tsx)):

A fully accessible, reusable input component with:
- Proper label association via `htmlFor`
- Error message display with conditional rendering
- ARIA attributes for accessibility (`aria-invalid`, `aria-describedby`)
- Visual feedback for validation states (red border on error)
- Support for different input types (text, email, password, etc.)

```tsx
<FormInput
  label="Email Address"
  name="email"
  type="email"
  register={register}
  error={errors.email?.message}
  placeholder="you@example.com"
/>
```

### Form Implementation Pattern

All forms follow this consistent pattern:

```tsx
"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signupSchema, SignupFormData } from "@/lib/schemas/signupSchema";
import FormInput from "@/components/ui/FormInput";

export default function SignupPage() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
  });

  const onSubmit = (data: SignupFormData) => {
    console.log("Form Submitted:", data);
    alert(`Welcome, ${data.name}!`);
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <FormInput
        label="Full Name"
        name="name"
        register={register}
        error={errors.name?.message}
      />
      {/* More fields... */}
      <button type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Submitting..." : "Sign Up"}
      </button>
    </form>
  );
}
```

### Key Features

1. **Real-time Validation**: Errors appear instantly as users interact with fields
2. **Type Safety**: TypeScript types are automatically inferred from Zod schemas
3. **Minimal Re-renders**: React Hook Form only re-renders when necessary
4. **Accessible**: Full ARIA support and semantic HTML
5. **Reusable**: FormInput component works across all forms
6. **Consistent Error Handling**: All validation messages come from schemas

### Live Forms

Visit these routes to see the forms in action:

- **Signup Form**: [http://localhost:3000/signup](http://localhost:3000/signup)
- **Contact Form**: [http://localhost:3000/contact](http://localhost:3000/contact)

### Validation Examples

**Signup Form Validation States**:

![Initial Signup Form](file:///C:/Users/MAHIL%20MITHRAN/.gemini/antigravity/brain/20c00e12-284b-415c-aa13-f1ea5767827a/initial_signup_form_1767608145559.png)

*Initial state of the signup form with clean, modern UI*

![Signup Validation Errors](file:///C:/Users/MAHIL%20MITHRAN/.gemini/antigravity/brain/20c00e12-284b-415c-aa13-f1ea5767827a/signup_validation_errors_1767608163870.png)

*Validation errors displayed when submitting empty fields*

**Test Scenarios**:

1. **Empty fields** → Shows required field errors for all inputs
2. **Invalid email** (e.g., "test") → Shows "Please enter a valid email address"
3. **Short password** (e.g., "123") → Shows "Password must be at least 6 characters long"
4. **Valid submission** → Logs data to console, shows success alert, resets form

**Console Output** (successful submission):

```
Form Submitted: {
  name: "Alice Johnson",
  email: "alice@example.com",
  password: "secret123"
}
```

### Accessibility Features

Our forms implement comprehensive accessibility:

- **Semantic HTML**: Proper `<label>`, `<input>`, and `<form>` elements
- **Label Association**: Every input has a connected label via `htmlFor` and `id`
- **ARIA Attributes**:
  - `aria-invalid={true}` on fields with errors
  - `aria-describedby` linking inputs to error messages
  - `role="alert"` on error messages for screen reader announcements
- **Keyboard Navigation**: Full tab order support with visible focus states
- **Visual Feedback**: Red borders and error text for invalid fields
- **Disabled State**: Submit button disabled during submission to prevent double-submits

### Reflection: Benefits of Schema-Based Validation

**Long-term advantages of Zod schemas in large applications**:

1. **Single Source of Truth**: Validation rules live in one place, not scattered across components
2. **Type Safety**: TypeScript types are automatically derived from schemas, eliminating type/validation mismatches
3. **Reusability**: Same schema can validate on client (forms) and server (API routes)
4. **Maintainability**: Changing validation rules requires updating only the schema
5. **Testability**: Schemas can be unit tested independently of UI components
6. **Documentation**: Schemas serve as self-documenting contracts for data shapes
7. **Consistency**: All forms follow the same validation patterns and error messaging
8. **Scalability**: Adding new fields or forms is fast and follows established patterns

**Compared to inline validation**:
- Inline: `if (!email.includes('@')) setError('Invalid email')`
- Schema: `email: z.string().email("Invalid email")`

The schema approach is more declarative, type-safe, and maintainable at scale.

### Component Reusability Impact

The `FormInput` component demonstrates how reusable patterns improve scalability:

- **Before**: Each form duplicates label, input, error display logic (~20 lines per field)
- **After**: Single `<FormInput />` component (~3 lines per field)
- **Benefit**: 85% reduction in code, consistent accessibility, easier to update globally

**Example**: Adding a new field to any form:

```tsx
<FormInput
  label="Phone Number"
  name="phone"
  type="tel"
  register={register}
  error={errors.phone?.message}
/>
```

This pattern scales to dozens of forms without duplicating accessibility or styling logic.

---


##  Toasts, Modals, and Feedback UI

This project implements interactive feedback layers (toasts, modals, loaders) that help users understand what's happening in the app. These UI elements make the application feel responsive, accessible, and human by clearly communicating success, error, and pending states.

###  Dependencies

- **react-hot-toast**: Lightweight toast notification library with excellent TypeScript support and accessibility features

```powershell
npm install react-hot-toast --legacy-peer-deps
```

###  Toast Notifications

Toast notifications provide instant, non-blocking feedback for user actions.

#### Implementation

**Global Setup** ([src/app/layout.tsx](src/app/layout.tsx)):
```tsx
import { Toaster } from "react-hot-toast";
import { toastConfig } from "@/lib/toast";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        {children}
        <Toaster
          position={toastConfig.position}
          toastOptions={{
            duration: toastConfig.duration,
            style: toastConfig.style,
            success: toastConfig.success,
            error: toastConfig.error,
            loading: toastConfig.loading,
          }}
        />
      </body>
    </html>
  );
}
```

**Usage** ([src/lib/toast.ts](src/lib/toast.ts)):
```tsx
import { toast } from '@/lib/toast';

// Success notification
toast.success('Data saved successfully!');

// Error notification
toast.error('Something went wrong!');

// Loading notification
const toastId = toast.loading('Saving...');
// Later update it
toast.success('Saved!', { id: toastId });

// Promise-based toast
toast.promise(
  saveData(),
  {
    loading: 'Saving...',
    success: 'Data saved!',
    error: 'Failed to save',
  }
);
```

#### Accessibility Features

- **ARIA live regions**: Toasts use `role="status"` and `aria-live="polite"` for screen reader announcements
- **Auto-dismiss**: Toasts automatically disappear after 4 seconds (configurable)
- **Non-blocking**: Users can continue interacting with the app while toasts are visible
- **Color-coded**: Success (green), error (red), loading (blue) for visual clarity

#### Integration Points

Toasts are integrated in:
- **Signup form** ([src/app/signup/page.tsx](src/app/signup/page.tsx)): Loading  Success/Error
- **Login form** ([src/app/login/page.tsx](src/app/login/page.tsx)): Loading  Success/Error
- **Contact form** ([src/app/contact/page.tsx](src/app/contact/page.tsx)): Loading  Success/Error

###  Modal Component

Modals provide blocking feedback for important user decisions and confirmations.

#### Features

- **Focus trap**: Focus stays inside the modal (keyboard users can't tab outside)
- **Keyboard support**: Press `Esc` to close, `Tab` to navigate between elements
- **Backdrop click**: Click outside the modal to close (can be disabled)
- **Accessible**: Proper ARIA attributes (`aria-modal`, `aria-labelledby`, `aria-describedby`)
- **Body scroll lock**: Prevents scrolling the page behind the modal

#### Usage

```tsx
import { Modal } from '@/components/ui/Modal';
import { useModal } from '@/hooks/useModal';

function MyComponent() {
  const { isOpen, openModal, closeModal } = useModal();

  return (
    <>
      <button onClick={openModal}>Open Modal</button>
      
      <Modal
        isOpen={isOpen}
        onClose={closeModal}
        title="Confirm Action"
        description="Are you sure you want to proceed?"
      >
        <div className="flex gap-3">
          <button onClick={closeModal}>Cancel</button>
          <button onClick={handleConfirm}>Confirm</button>
        </div>
      </Modal>
    </>
  );
}
```

#### Example: Delete Confirmation

See [src/app/examples/delete-modal/page.tsx](src/app/examples/delete-modal/page.tsx) for a complete example demonstrating:
1. Modal opens on button click
2. Loader appears during async operation
3. Toast shows success/error after completion
4. Modal closes automatically

###  Loader Component

Loaders provide visual feedback for async operations.

#### Features

- **Multiple sizes**: Small, medium, large
- **Overlay mode**: Full-page overlay with backdrop
- **Accessible**: `role="status"` and `aria-live="polite"` for screen readers
- **Optional text**: Display loading message below spinner

#### Usage

```tsx
import { Loader } from '@/components/ui/Loader';

// Inline loader
<Loader size="small" />

// Loader with text
<Loader text="Loading data..." />

// Full-page overlay
<Loader overlay text="Processing..." />

// In forms
{isSubmitting && <Loader size="small" />}
```

###  Complete Feedback Flow

The delete confirmation example demonstrates the complete feedback pattern:

```tsx
const handleDelete = async () => {
  setIsDeleting(true);
  const toastId = toast.loading('Deleting item...');
  
  try {
    await deleteItem();
    toast.success('Item deleted!', { id: toastId });
    closeModal();
  } catch (error) {
    toast.error('Failed to delete', { id: toastId });
  } finally {
    setIsDeleting(false);
  }
};
```

**Flow**:
1. User clicks "Delete"  **Modal** opens
2. User clicks "Confirm"  **Loader** appears in modal
3. **Toast** (loading) shows "Deleting item..."
4. Operation completes  **Toast** updates to success/error
5. **Modal** closes, **Loader** disappears

###  UX Improvements

**Before** (without feedback UI):
- Users clicked buttons and wondered if anything happened
- Errors appeared as browser alerts (jarring, inaccessible)
- No indication of loading states
- Destructive actions had no confirmation

**After** (with feedback UI):
- Clear, immediate feedback for all actions
- Accessible notifications that work with screen readers
- Visual loading indicators reduce perceived wait time
- Confirmation modals prevent accidental deletions
- Consistent, professional user experience

###  Accessibility Compliance

All feedback components follow WAI-ARIA best practices:

| Component | ARIA Attributes | Keyboard Support |
|-----------|----------------|------------------|
| Toast | `role="status"`, `aria-live="polite"` | Auto-dismiss, no interaction needed |
| Modal | `aria-modal="true"`, `aria-labelledby`, `aria-describedby` | Esc to close, Tab for focus trap |
| Loader | `role="status"`, `aria-live="polite"`, `aria-label` | No interaction needed |

---

##  Enhanced Environment Variable Management

This project uses a comprehensive environment variable setup to manage configuration and sensitive data securely across development, staging, and production environments.

###  Files

- **[env.example](env.example)**: Template with comprehensive documentation (committed to git)
- **[.env.local.template](.env.local.template)**: Quick-start template with placeholder values
- **`.env.local`**: Your actual local environment variables (gitignored, NEVER commit!)

###  Quick Setup

```powershell
# Copy the template
cp env.example .env.local

# Fill in your actual values
# Edit .env.local with your real secrets

# Restart the dev server
npm run dev
```

###  Environment Variables

#### Required Variables

These are essential for basic app functionality:

| Variable | Description | Example |
|----------|-------------|---------|
| `DATABASE_URL` | PostgreSQL connection string | `postgresql://user:pass@localhost:5432/db` |
| `JWT_SECRET` | Secret for JWT token signing (min 32 chars) | Generate with: `openssl rand -base64 32` |
| `NODE_ENV` | Environment mode | `development` \| `staging` \| `production` |
| `NEXT_PUBLIC_API_BASE_URL` | API base URL for client-side calls | `http://localhost:3000` |

#### Optional Variables

These enable specific features:

**Caching** (improves performance):
- `REDIS_URL`: Redis connection string (e.g., `redis://localhost:6379`)

**File Uploads** (AWS S3):
- `AWS_REGION`: AWS region (e.g., `us-east-1`)
- `AWS_ACCESS_KEY_ID`: AWS access key
- `AWS_SECRET_ACCESS_KEY`: AWS secret key
- `S3_BUCKET_NAME`: S3 bucket name
- `S3_BUCKET_REGION`: S3 bucket region

**Email Service** (SendGrid):
- `SENDGRID_API_KEY`: SendGrid API key
- `SENDGRID_FROM_EMAIL`: Sender email address
- `SENDGRID_FROM_NAME`: Sender name

###  Security Best Practices

#### 1. Never Commit Secrets

`.env.local` is in `.gitignore` and will NEVER be committed:

```gitignore
# env files
.env*
!.env.example
.env.local  # Explicitly listed for clarity
```

Verify with:
```powershell
git status  # .env.local should NOT appear
```

#### 2. Server-Only vs Client-Accessible

**Server-only variables** (secure):
- No prefix required
- Only accessible in server-side code (API routes, Server Components)
- Examples: `DATABASE_URL`, `JWT_SECRET`, `AWS_SECRET_ACCESS_KEY`

**Client-accessible variables** (public):
- Must start with `NEXT_PUBLIC_`
- Exposed to the browser (visible in DevTools)
- **NEVER put secrets here!**
- Examples: `NEXT_PUBLIC_API_BASE_URL`, `NEXT_PUBLIC_ENVIRONMENT`

#### 3. Generate Strong Secrets

```powershell
# Generate a strong JWT secret (32+ characters)
openssl rand -base64 32

# Example output:
# 8xK9mP2nQ5vR7wT1yU3zA6bC4dE8fG0hJ2kL5mN7pQ9=
```

#### 4. Environment-Specific Values

Use different secrets for each environment:

| Environment | JWT_SECRET | DATABASE_URL |
|-------------|-----------|--------------|
| Development | `dev_secret_123` | `postgresql://localhost:5432/dev_db` |
| Staging | `staging_secret_xyz` | `postgresql://staging.db:5432/staging_db` |
| Production | `prod_secret_abc` (strong, unique) | `postgresql://prod.db:5432/prod_db` |

#### 5. Production Deployment

For production, use secret management services:
- **Vercel**: Environment Variables in project settings
- **AWS**: AWS Secrets Manager or Parameter Store
- **Docker**: Docker secrets or encrypted env files

**Never** hardcode secrets in code or commit `.env.local` to git!

###  What Could Go Wrong?

**Scenario**: A teammate accidentally commits `.env.local` to GitHub.

**Consequences**:
- Database credentials exposed  unauthorized access
- JWT secret leaked  attackers can forge tokens
- AWS keys exposed  potential data breach or billing fraud
- SendGrid API key leaked  spam emails sent from your account

**How This Setup Prevents It**:
1. `.gitignore` blocks `.env.local` from being committed
2. `env.example` provides a safe template (no real secrets)
3. Pre-commit hooks (Husky) can detect and block secret commits
4. GitHub secret scanning alerts you if secrets are pushed

**If It Happens**:
1. Immediately rotate all exposed credentials
2. Revoke the leaked JWT secret and generate a new one
3. Delete AWS access keys and create new ones
4. Regenerate SendGrid API key
5. Force-push to remove the commit from git history (if caught early)

###  Documentation in Code

All environment variables are documented in [env.example](env.example) with:
- Description of what the variable does
- Example values (safe placeholders)
- Where to get the value (e.g., AWS IAM Console)
- Security notes and best practices
- Required vs optional designation

###  Verification

Test that environment variables are properly loaded:

```tsx
// In a Server Component or API route
console.log('Database URL:', process.env.DATABASE_URL);  //  Works
console.log('JWT Secret:', process.env.JWT_SECRET);      //  Works

// In a Client Component
console.log('API URL:', process.env.NEXT_PUBLIC_API_URL);  //  Works
console.log('JWT Secret:', process.env.JWT_SECRET);        //  undefined (secure!)
```

Open browser DevTools  Console:
- `NEXT_PUBLIC_*` variables are visible
- Server-only variables are NOT visible (secure!)

###  Reflection

**Why This Matters**:
- **Security**: Prevents accidental exposure of sensitive data
- **Consistency**: Same setup process for all team members
- **Scalability**: Easy to add new variables as features grow
- **Compliance**: Follows industry best practices for secret management
- **Developer Experience**: Clear documentation reduces onboarding friction

A secure `.env` setup is a professional developer's safety net�it protects not just your app, but your entire team from data leaks and costly mistakes.

---


## Responsive & Themed Design

### Configuration
We implemented a custom TailwindCSS v4 configuration in globals.css using the @theme directive:

- **Breakpoints**: 
  - sm: 640px
  - md: 768px
  - lg: 1024px
  - xl: 1280px
  
- **Brand Colors**:
  - Primary: #3b82f6 (Blue)
  - Secondary: #06b6d4 (Cyan)
  - Accent: #8b5cf6 (Purple)

### Features
- **Dark Mode**: Fully supported with dark: variant and localStorage persistence.
- **Theme Toggle**: Accessible button with smooth transition and icon animation.
- **Responsive Layouts**: Mobile-first design that adapts to all screen sizes.

### Accessibility
- **Contrast**: All colors meet WCAG AA standards.
- **Focus States**: Visible focus rings for keyboard navigation.
- **Reduced Motion**: Respects system preferences (though we added smooth transitions for theme switching).
