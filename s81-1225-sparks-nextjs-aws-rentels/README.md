This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## 🔐 Environment Variable Management

This project uses environment variables to manage configuration and sensitive data securely.

### Environment Files

- `.env.local`  
  Contains real credentials and secrets.  
  ❌ Not committed to GitHub.

- `.env.example`  
  Template file listing all required environment variables with placeholders.  
  ✅ Committed to GitHub.

### Server-side Variables (Private)

| Variable Name | Purpose |
|--------------|--------|
| DATABASE_URL | PostgreSQL database connection string |
| JWT_SECRET | Used for signing authentication tokens |

These variables are only accessed on the server using `process.env`.

### Client-side Variables (Public)

| Variable Name | Purpose |
|--------------|--------|
| NEXT_PUBLIC_API_BASE_URL | Base URL for frontend API calls |

Client-side variables always start with `NEXT_PUBLIC_`.

### Setup Instructions

1. Copy `.env.example` and rename it to `.env.local`
2. Fill in actual values
3. Restart the development server

```bash
cp .env.example .env.local
npm run dev
