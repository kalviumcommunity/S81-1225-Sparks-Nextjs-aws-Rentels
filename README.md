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
docker-compose up --build
```

Once running, you can access:
- **Next.js App**: [http://localhost:3000](http://localhost:3000)
- **PostgreSQL**: `localhost:5432`
- **Redis**: `localhost:6379`

### 🏗️ Service Architecture

The `docker-compose.yml` file defines three core services:

1.  **`app` (Next.js)**:
    - **Build**: Uses the local `Dockerfile`.
    - **Dockerfile Logic**: Based on `node:20-alpine`. It installs dependencies, copies the source code, builds the production-ready Next.js app, and starts it on port 3000.
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

### 📝 Reflections & Troubleshooting

#### Issues Faced & Solutions
-   **Project Structure**: Initially, the source code was in a nested subfolder. This caused pathing issues in the Dockerfile. **Solution**: Moved all project files to the root directory to simplify the build context and follow standard practices.
-   **Environment Variables**: The app requires specific variables like `DATABASE_URL` and `REDIS_URL` at runtime. **Solution**: Configured these directly in `docker-compose.yml` to point to the internal container names (`db` and `redis`).
-   **Build Performance**: Large images can be slow to pull and build. **Solution**: Used `alpine` versions of all images (Node, Postgres, Redis) to keep the footprint small and the builds fast. Added a `.dockerignore` file to prevent copying `node_modules` and `.next` folder into the image twice.

#### Troubleshooting Tips
-   **Port Conflicts**: If the build fails with a port error, ensure no other service is using ports 3000, 5432, or 6379 on your host machine.
-   **Clean Slate**: To reset your environment completely, run:
    ```bash
    docker-compose down -v --rmi all
    ```
