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

## 📧 Email Service Integration (SendGrid)

This project integrates **SendGrid** as a transactional email service to send automated notifications such as signup confirmations, password resets, and activity alerts.

### 🎯 Why Transactional Emails Matter

Transactional emails are critical for user engagement and trust. Unlike marketing emails, they are trigger-based and sent automatically by your backend in response to user actions.

**Common Use Cases:**

| Event | Email Type |
|---|---|
| User signs up | Welcome email |
| Password reset request | Reset link |
| Booking confirmation | Confirmation details |
| Payment success | Invoice/receipt |
| Account alert | Security notification |

### 🚀 Provider Choice: SendGrid

**Why SendGrid?**

- **Free Tier**: 100 emails/day (perfect for development and small apps)
- **Easy Setup**: No domain verification required for sandbox testing
- **Developer Experience**: Simple API with excellent documentation
- **Reliability**: Industry-standard email delivery service
- **Monitoring**: Built-in dashboard for tracking delivery, bounces, and spam reports

**Alternative**: AWS SES is also supported but requires domain verification and more complex setup.

### 📋 Setup Instructions

#### 1. Create SendGrid Account

1. Sign up at [sendgrid.com](https://sendgrid.com)
2. Navigate to **Settings → Sender Authentication**
3. Verify your sender email address (check your inbox for verification email)
4. Go to **Settings → API Keys**
5. Click **Create API Key**
6. Choose **Full Access** permissions
7. Copy the generated API key (you won't see it again!)

#### 2. Configure Environment Variables

Add the following to your `.env.local` file:

```env
# SendGrid Email Service
SENDGRID_API_KEY=SG.your_actual_api_key_here
SENDGRID_SENDER=no-reply@yourdomain.com
```

**Important**: The `SENDGRID_SENDER` must be the email address you verified in step 1.

#### 3. Install Dependencies

The SendGrid SDK is already installed. If needed:

```powershell
npm install @sendgrid/mail
```

### 📁 Project Structure

```
src/
├── app/
│   └── api/
│       └── email/
│           └── route.ts          # Email API endpoint
└── lib/
    └── emailTemplates.ts          # Reusable email templates
scripts/
└── test-email.ts                  # Test script with examples
```

### 🔌 API Endpoint

**POST /api/email**

Send a transactional email via SendGrid.

**Request Body:**

```json
{
  "to": "user@example.com",
  "subject": "Welcome to Sparks Rentals!",
  "message": "<h1>HTML email content</h1>",
  "from": "no-reply@yourdomain.com"  // optional, defaults to SENDGRID_SENDER
}
```

**Success Response (200):**

```json
{
  "success": true,
  "messageId": "01010189b2example123",
  "statusCode": 202,
  "timestamp": "2025-12-30T08:45:00.000Z"
}
```

**Error Response (400/500):**

```json
{
  "success": false,
  "error": {
    "message": "Invalid email data",
    "code": "VALIDATION_ERROR",
    "details": [
      { "field": "to", "message": "Invalid recipient email address" }
    ]
  }
}
```

**GET /api/email** (Health Check)

Check if the email service is properly configured.

```bash
curl http://localhost:3000/api/email
```

Response:

```json
{
  "service": "SendGrid Email Service",
  "configured": true,
  "sender": "no-reply@yourdomain.com",
  "timestamp": "2025-12-30T08:45:00.000Z"
}
```

### 📧 Email Templates

The project includes four pre-built, mobile-responsive HTML email templates:

#### 1. Welcome Email

```ts
import { welcomeTemplate } from '@/lib/emailTemplates';

const htmlMessage = welcomeTemplate("Alice Johnson");
```

**Features:**
- Personalized greeting with user's name
- Professional gradient header
- Call-to-action button to dashboard
- Responsive design with inline CSS

#### 2. Password Reset Email

```ts
import { passwordResetTemplate } from '@/lib/emailTemplates';

const htmlMessage = passwordResetTemplate(
  "Bob Smith",
  "https://app.kalvium.community/reset-password?token=abc123",
  "1 hour"
);
```

**Features:**
- Security-focused messaging
- Time-limited reset link
- Warning banner for unsolicited requests
- Fallback link for email clients that don't support buttons

#### 3. Notification Email

```ts
import { notificationTemplate } from '@/lib/emailTemplates';

const htmlMessage = notificationTemplate(
  "Charlie Davis",
  "New Booking Request",
  "<p>You have a new booking request for <strong>Sunset Villa</strong>.</p>",
  "https://app.kalvium.community/bookings/123",
  "View Booking"
);
```

**Features:**
- Flexible content area
- Optional call-to-action button
- Consistent branding

#### 4. Simple Template

```ts
import { simpleTemplate } from '@/lib/emailTemplates';

const htmlMessage = simpleTemplate(
  "Test Email",
  "<h1>Hello World!</h1><p>This is a test.</p>"
);
```

**Features:**
- Minimal styling for basic notifications
- Fast to render
- Good for system alerts

### 🧪 Testing the Email Service

#### Method 1: Using curl

```bash
# Test with welcome email
curl -X POST http://localhost:3000/api/email \
  -H "Content-Type: application/json" \
  -d '{
    "to": "your-email@example.com",
    "subject": "Welcome to Sparks Rentals!",
    "message": "<h1>Hello from Sparks Rentals! 🚀</h1><p>This is a test email.</p>"
  }'
```

#### Method 2: Using the test script

```powershell
npm run email:test
```

This will display example curl commands for all template types.

#### Method 3: Using Postman

1. Create a new POST request to `http://localhost:3000/api/email`
2. Set header: `Content-Type: application/json`
3. Add request body (see examples above)
4. Send and check console for message ID

### 📊 Expected Console Output

When an email is sent successfully, you'll see:

```
📧 Sending email...
   To: user@example.com
   From: no-reply@yourdomain.com
   Subject: Welcome to Sparks Rentals!
✅ Email sent successfully!
   Message ID: 01010189b2example123
   Status Code: 202
```

### 🔍 Verification Checklist

- [ ] SendGrid account created and verified
- [ ] API key generated with Full Access permissions
- [ ] Environment variables configured in `.env.local`
- [ ] Development server running (`npm run dev`)
- [ ] Test email sent successfully via API
- [ ] Email received in inbox (check spam folder if not found)
- [ ] Console logs show message ID
- [ ] SendGrid dashboard shows email activity

### 🏭 Sandbox vs Production

#### Sandbox Mode (Development)

- **Free tier**: 100 emails/day
- **Sender verification**: Only verified email addresses can send
- **Recipient verification**: In sandbox, only verified emails can receive
- **Rate limits**: Lower limits to prevent abuse
- **Best for**: Development and testing

#### Production Mode

- **Domain verification**: Verify your domain (SPF/DKIM records)
- **Higher limits**: Depends on your SendGrid plan
- **Any recipient**: Can send to any valid email address
- **Sender reputation**: Monitor bounce rates and spam reports
- **Best for**: Live applications with real users

**To move to production:**

1. Verify your domain in SendGrid (Settings → Sender Authentication)
2. Set up SPF and DKIM DNS records
3. Request higher sending limits if needed
4. Monitor SendGrid dashboard for delivery metrics

### ⚡ Rate Limiting & Performance

#### SendGrid Rate Limits

- **Free tier**: 100 emails/day
- **Essentials plan**: 40,000 emails/month
- **Pro plan**: 100,000+ emails/month

#### Handling High Volume

For applications sending 10,000+ emails/day:

1. **Implement a Queue System**:
   - Use Redis or a message queue (RabbitMQ, AWS SQS)
   - Process emails asynchronously in batches
   - Retry failed sends with exponential backoff

2. **Batch Sending**:
   - SendGrid supports sending to multiple recipients
   - Use personalization for bulk emails

3. **Rate Limiting**:
   ```ts
   // Example: Limit to 10 emails per second
   const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
   
   for (const email of emails) {
     await sendEmail(email);
     await delay(100); // 10 emails/sec
   }
   ```

4. **Monitor Quotas**:
   - Track daily/monthly email counts
   - Alert when approaching limits
   - Implement graceful degradation

### 🛡️ Bounce Handling & Deliverability

#### Types of Bounces

- **Hard Bounce**: Permanent failure (invalid email, domain doesn't exist)
- **Soft Bounce**: Temporary failure (mailbox full, server down)
- **Spam Reports**: Recipient marked email as spam

#### Best Practices

1. **Monitor SendGrid Dashboard**:
   - Check bounce rates (should be < 5%)
   - Review spam reports
   - Track delivery rates

2. **Handle Bounces**:
   - Remove hard-bounced emails from your database
   - Retry soft bounces with backoff
   - Unsubscribe users who mark as spam

3. **Improve Deliverability**:
   - Use verified domain (not generic Gmail/Yahoo)
   - Set up SPF, DKIM, and DMARC records
   - Avoid spam trigger words in subject lines
   - Include unsubscribe link (required by law)
   - Maintain good sender reputation

4. **SendGrid Webhooks** (Advanced):
   ```ts
   // POST /api/webhooks/sendgrid
   // Receive real-time events: delivered, bounced, opened, clicked
   ```

### 🔐 Security Best Practices

1. **Never commit API keys**:
   - Use `.env.local` (gitignored)
   - Rotate keys regularly
   - Use different keys for dev/staging/prod

2. **Validate input**:
   - Use Zod schemas to validate email addresses
   - Sanitize HTML content to prevent injection
   - Rate limit API endpoint to prevent abuse

3. **Monitor for abuse**:
   - Log all email sends
   - Alert on unusual patterns
   - Implement CAPTCHA for public forms

4. **Sender authentication**:
   - Verify domain ownership
   - Configure SPF/DKIM records
   - Monitor sender reputation

### 🐛 Troubleshooting

#### Email not delivered

- **Check spam folder**: Emails from new senders often go to spam
- **Verify sender email**: Must match verified address in SendGrid
- **Check SendGrid dashboard**: Look for bounce/spam reports
- **Sandbox mode**: Verify recipient email is also verified in SendGrid

#### API returns 401/403

- **Invalid API key**: Double-check `SENDGRID_API_KEY` in `.env.local`
- **Key permissions**: Ensure API key has "Full Access" or "Mail Send" permission
- **Expired key**: Regenerate API key in SendGrid dashboard

#### API returns 400 (Validation Error)

- **Invalid email format**: Check email addresses are valid
- **Missing required fields**: Ensure `to`, `subject`, and `message` are provided
- **Check console logs**: Detailed validation errors are logged

#### Slow email sending

- **Network latency**: SendGrid API calls take 200-500ms
- **Use async**: Don't block user requests waiting for email
- **Implement queue**: For bulk sends, use background jobs

### 📈 Monitoring & Logging

#### Console Logs

Every email send logs:
- Recipient, sender, subject
- Success/failure status
- Message ID (for tracking)
- Error details (if failed)

#### SendGrid Dashboard

Monitor:
- **Activity Feed**: Real-time email events
- **Stats**: Delivery rates, bounces, spam reports
- **Suppressions**: Blocked/bounced email addresses
- **Alerts**: Set up notifications for issues

#### Production Logging

For production, consider:
- Storing email logs in database
- Tracking user email preferences
- Monitoring daily/monthly quotas
- Alerting on high bounce rates

### 🎯 Reflection: Production Readiness

**What makes this implementation production-ready?**

1. **Error Handling**: Comprehensive error handling with detailed logging
2. **Validation**: Input validation using Zod schemas
3. **Security**: API keys in environment variables, never committed
4. **Monitoring**: Console logs + SendGrid dashboard for observability
5. **Templates**: Reusable, mobile-responsive HTML templates
6. **Scalability**: Clear path to queue-based processing for high volume
7. **Documentation**: Complete setup and troubleshooting guide

**Next Steps for Scale:**

- Implement email queue (Redis + Bull/BullMQ)
- Add webhook handlers for delivery tracking
- Create admin dashboard for email analytics
- Implement retry logic with exponential backoff
- Add email preference management for users
- Set up monitoring alerts for bounce rates
- Consider multi-provider fallback (SendGrid + AWS SES)

---
