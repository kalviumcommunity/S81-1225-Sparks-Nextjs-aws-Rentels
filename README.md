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

## 🎯 TypeScript & ESLint Configuration

This project is configured with **strict TypeScript settings**, **ESLint + Prettier integration**, and **pre-commit hooks** to ensure code quality and consistency across the team.

### 📋 TypeScript Strict Mode

Our `tsconfig.json` is configured with strict compiler options to catch potential errors early and enforce type safety:

```json
{
  "compilerOptions": {
    "strict": true,
    "noImplicitAny": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "forceConsistentCasingInFileNames": true,
    "skipLibCheck": true
  }
}
```

**Why These Rules Matter:**

- **`strict: true`** - Enables all strict type checking options, preventing common runtime errors
- **`noImplicitAny: true`** - Raises errors on expressions with implied 'any' type, ensuring explicit typing
- **`noUnusedLocals: true`** - Reports errors on unused local variables, keeping code clean
- **`noUnusedParameters: true`** - Reports errors on unused parameters, preventing dead code
- **`forceConsistentCasingInFileNames: true`** - Ensures consistent file name casing across different operating systems
- **`skipLibCheck: true`** - Skips type checking of declaration files for faster compilation

**Benefits:**
- ✅ Catches type errors at compile time instead of runtime
- ✅ Prevents undefined/null reference errors
- ✅ Enforces explicit typing for better code documentation
- ✅ Reduces bugs and improves code maintainability

### 🎨 ESLint & Prettier Rules

We use **ESLint 9** with the new flat config format, integrated with **Prettier** for consistent code formatting.

**Configuration (`eslint.config.mjs`):**

```javascript
{
  "extends": ["next/core-web-vitals", "plugin:prettier/recommended"],
  "rules": {
    "no-console": "warn",
    "semi": ["error", "always"],
    "quotes": ["error", "double"]
  }
}
```

**Rule Explanations:**

- **`no-console: "warn"`** - Warns on console statements (should be removed in production)
- **`semi: ["error", "always"]`** - Requires semicolons at the end of statements
- **`quotes: ["error", "double"]`** - Enforces double quotes for string literals
- **`next/core-web-vitals`** - Next.js best practices for performance and SEO
- **`plugin:prettier/recommended`** - Integrates Prettier formatting as ESLint rules

**Prettier Configuration (`.prettierrc`):**

```json
{
  "singleQuote": false,
  "semi": true,
  "tabWidth": 2,
  "trailingComma": "es5"
}
```

**Benefits:**
- ✅ Consistent code style across the entire team
- ✅ Automatic formatting on save
- ✅ Catches common mistakes and anti-patterns
- ✅ Improves code readability and maintainability

### 🪝 Pre-Commit Hooks

We use **Husky** and **lint-staged** to automatically run linting and formatting checks before each commit.

**How It Works:**

1. When you run `git commit`, Husky triggers the pre-commit hook
2. `lint-staged` runs ESLint and Prettier on staged files
3. If there are errors, the commit is blocked until they're fixed
4. Auto-fixable issues are automatically corrected

**Configuration (`package.json`):**

```json
{
  "lint-staged": {
    "*.{ts,tsx,js,jsx}": ["eslint --fix", "prettier --write"]
  }
}
```

**Benefits:**
- ✅ Prevents committing code with lint errors
- ✅ Ensures all committed code is properly formatted
- ✅ Maintains consistent code quality across the team
- ✅ Reduces code review time by catching issues early

### 🚀 Available Scripts

```bash
# Run development server
npm run dev

# Build for production
npm run build

# Run ESLint
npm run lint

# Run ESLint with auto-fix
npm run lint:fix

# Format all files with Prettier
npm run format
```

### 📸 Configuration in Action

**Before Auto-Fix:**
- Single quotes instead of double quotes
- Missing semicolons
- Console.log statements (warnings)
- Unused variables (TypeScript errors)

**After Auto-Fix:**
- ✅ All quotes converted to double quotes
- ✅ Semicolons added automatically
- ✅ Warnings displayed for console.log
- ✅ TypeScript errors for unused variables

**Pre-Commit Hook:**
- ✅ Automatically runs lint-staged on staged files
- ✅ Fixes formatting issues before commit
- ✅ Blocks commits with unfixable errors

### 🔥 Team Scalability

**"If your team scaled to 10 developers tomorrow, how would this setup help maintain code quality and prevent chaos?"**

With 10 developers working simultaneously, this setup provides:

1. **Consistency** - All developers follow the same code style automatically, eliminating style debates and merge conflicts
2. **Quality Gates** - Pre-commit hooks prevent bad code from entering the repository
3. **Early Error Detection** - Strict TypeScript catches bugs before they reach production
4. **Reduced Review Time** - Automated formatting means reviewers can focus on logic, not style
5. **Onboarding** - New developers automatically follow team standards without manual enforcement
6. **Scalable Codebase** - Clean, typed code is easier to refactor and maintain as the project grows

---

## 🐳 How Docker Simplifies Deployment Workflows

Docker packages an application and all its dependencies into a container, ensuring the application runs the same in every environment.

### Benefits of Docker

- **Consistency** – Same behavior in local, CI, and production
- **Isolation** – Each service runs independently
- **Portability** – Runs on AWS, Azure, or any cloud
- **Version Control** – Images can be tagged and tracked

### Example

In a full-stack application:

- Frontend → React container
- Backend → Node.js/Express container
- Database → MongoDB container

Each service is containerized, preventing dependency conflicts and environment mismatches.

## 🔄 How CI/CD Pipelines Simplify Deployment

CI/CD pipelines automate the process of building, testing, and deploying applications.

### CI (Continuous Integration)

- Runs on every code push
- Installs dependencies
- Runs tests
- Builds Docker images

### CD (Continuous Deployment)

- Pushes Docker images to a container registry
- Deploys containers to AWS or Azure
- Replaces old versions automatically
