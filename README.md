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

-   **Networks**: All services are connected via a shared bridge network named `localnet`. This allows the Next.js app to connect to the database using the hostname `db` and to Redis using `redis`.
-   **Volumes**: The `db_data` volume is mapped to `/var/lib/postgresql/data` inside the PostgreSQL container to persist database records.

Sample logs when everything is running:

```
nextjs_app   | ▲ Next.js 16.1.0
nextjs_app   | - Local:         http://localhost:3000
nextjs_app   | ✓ Ready in 958ms
postgres_db  | database system is ready to accept connections
redis_cache  | Ready to accept connections tcp
```

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

### 📝 Reflections & Troubleshooting

#### Issues Faced & Solutions
-   **TypeScript build failures (noUnusedLocals)**: `src/app/test-lint.tsx` and an unused env in `layout.tsx` caused `next build` to fail inside Docker. **Fix**: Removed unused variables and console statements so production builds pass.
-   **Build-time env access**: A build-time check for `DATABASE_URL` in `layout.tsx` crashed SSG during `next build`. **Fix**: Removed the check from build-time code; read envs at runtime in server code instead.
-   **Compose spec warning**: Docker Compose warned that `version` is obsolete. **Fix**: Removed the `version:` field from `docker-compose.yml` to follow the current spec.
-   **Environment Variables**: The app requires `DATABASE_URL`, `REDIS_URL`, and public `NEXT_PUBLIC_*` variables. **Fix**: Defined these in `docker-compose.yml` and used container hostnames (`db`, `redis`).
-   **Build Performance**: Used `-alpine` images and ensured `.dockerignore` excludes `node_modules`, `.next`, etc., to keep the context small and speed up builds.

#### Troubleshooting Tips
-   **Port Conflicts**: If the build fails with a port error, ensure no other service is using ports 3000, 5432, or 6379 on your host machine.
-   **Clean Slate**: To reset your environment completely, run:
    ```bash
	docker compose down -v --rmi all
    ```
 -   **Windows-specific**: Ensure Docker Desktop is running with WSL 2 backend; if file sharing prompts appear, allow the project drive. Antivirus or firewall can slow bind mounts; prefer image builds over host mounts for production-like runs.
