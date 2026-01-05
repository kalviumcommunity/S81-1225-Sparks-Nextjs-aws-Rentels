import Redis from "ioredis";

const redis = new Redis(process.env.REDIS_URL || "redis://localhost:6379");

redis.on("error", (err) => {
  // Suppress unhandled error crashes if Redis is not running
  console.warn("Redis connection error:", err.message);
});

/**
 * Invalidate cache keys matching a specific pattern.
 * Uses SCAN to find keys incrementally to avoid blocking Redis.
 * @param pattern Glob pattern (e.g., "users:list:*")
 */
export async function invalidateCache(pattern: string) {
  const stream = redis.scanStream({
    match: pattern,
    count: 100,
  });

  stream.on("data", (keys) => {
    if (keys.length) {
      redis.unlink(keys);
    }
  });

  stream.on("end", () => {
    console.log(`Cache invalidated for pattern: ${pattern}`);
  });
}

export default redis;
