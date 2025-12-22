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
