# Advanced Data Fetching in Next.js (App Router)

## Objective

This project demonstrates **Static Rendering (SSG)**, **Dynamic Rendering (SSR)**, and **Hybrid Rendering (ISR)** using the **Next.js App Router**. The goal is to understand when to use each strategy, how caching and revalidation work, and how these choices impact performance, cost, and scalability in real-world applications.

---

## Rendering Strategies Overview

Next.js App Router provides flexible data fetching with built-in caching controls. Each page in this app intentionally uses a different rendering mode.

---

## 1️⃣ Static Rendering (SSG)

### What it does

* Page is pre-rendered at **build time**
* Served as static HTML from the CDN
* No server work on each request

### Implementation

```js
export const revalidate = false; // fully static
```

### Example Page

* `/about` or `/blog`

### Why this approach

* Content changes rarely
* Fastest possible load time
* Ideal for SEO and marketing pages

### Performance Impact

* ⚡ Instant TTFB
* 🧠 CDN cached
* 💰 Zero runtime server cost

---

## 2️⃣ Dynamic Rendering (SSR)

### What it does

* Page is rendered **on every request**
* Always returns real-time, user-specific data

### Implementation

```js
export const dynamic = 'force-dynamic';
```

or

```js
await fetch(url, { cache: 'no-store' });
```

### Example Page

* `/dashboard` or `/profile`

### Sample Code

```js
export default async function Dashboard() {
  const data = await fetch('https://api.example.com/metrics', {
    cache: 'no-store',
  }).then(res => res.json());

  return <DashboardView data={data} />;
}
```

### Why this approach

* Data changes frequently
* Content is user-specific
* Requires authentication

### Trade-offs

* 🐢 Slower than static pages
* 🔄 Server runs per request
* ✅ Always fresh data

---

## 3️⃣ Hybrid Rendering (ISR)

### What it does

* Page is statically generated
* Re-generated in the background at a fixed interval
* Combines SSG speed with SSR freshness

### Implementation

```js
export const revalidate = 60; // seconds
```

### Example Page

* `/products`
* `/events`

### Why this approach

* Data updates periodically
* Avoids full rebuilds
* Scales efficiently under load

### Performance Impact

* ⚡ Fast initial response
* 🔁 Automatic updates
* 📈 Excellent scalability

---

## Rendering Strategy Summary

| Page              | Rendering Mode | Reason                         |
| ----------------- | -------------- | ------------------------------ |
| About / Blog      | Static (SSG)   | Rare updates, best performance |
| Dashboard         | Dynamic (SSR)  | Live, user-specific data       |
| Products / Events | Hybrid (ISR)   | Periodic updates               |

---

## How Caching Improves Performance

* Static pages are served directly from CDN
* SSR pages fetch fresh data per request
* ISR avoids unnecessary re-renders
* Reduced server load and improved scalability

---

## Verification & Testing

To verify rendering behavior:

* Used **Network Tab** in DevTools to inspect fetch calls
* Logged server timestamps to distinguish build-time vs request-time execution
* Tested behavior after deployment to confirm caching and regeneration

---

## Reflection: Scaling to 10× Users

If this app scaled to **10× more users**, using SSR everywhere would not be ideal.

### Changes I would make:

* Convert most pages to **Static + ISR**
* Keep SSR only for:

  * Authenticated dashboards
  * Real-time analytics pages
* Rely on CDN caching and background regeneration

This approach reduces server cost, improves TTFB, and scales better under high traffic.

---

## Key Takeaway

> Choosing the right rendering strategy is a performance decision — not just a development preference. Proper use of SSG, SSR, and ISR leads to faster apps, lower costs, and better scalability.
