/* eslint-disable no-console */
import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";
import * as dotenv from "dotenv";
import * as path from "path";

dotenv.config({ path: path.resolve(__dirname, "../.env.local") });

const pool = new Pool({
  connectionString:
    process.env.DATABASE_URL ||
    "postgresql://postgres:password@localhost:5432/mydb",
});
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log("🚀 Starting Performance Benchmark...\n");
  const user = await prisma.user.findFirst();

  if (!user) {
    console.error("❌ Needs seeded user");
    return;
  }

  // --- Baseline Query (Inefficient) ---
  console.time("Baseline Query");
  // Simulating a heavy query: fetching all bookings with relations, no specific filtering optimizations
  // and performing it multiple times to simulate load
  for (let i = 0; i < 50; i++) {
    await prisma.booking.findMany({
      include: {
        property: {
          include: {
            reviews: true,
          },
        },
        user: true,
        payment: true,
      },
      orderBy: { createdAt: "desc" },
      // Fetching all (no take/skip) is the anti-pattern here if the table is large
      // For this small seed, it's fast, but demonstrates the pattern.
    });
  }
  console.timeEnd("Baseline Query");

  // --- Optimized Query ---
  console.time("Optimized Query");
  for (let i = 0; i < 50; i++) {
    await prisma.booking.findMany({
      where: {
        userId: user.id, // Filter by indexed field (will be indexed soon)
        status: "CONFIRMED", // Filter by status (will be indexed)
      },
      select: {
        id: true,
        startDate: true,
        totalPrice: true,
        status: true,
        // Only fetching necessary relation fields
        property: {
          select: {
            name: true,
            price: true,
          },
        },
      },
      orderBy: { createdAt: "desc" },
      take: 10, // Pagination limit
    });
  }
  console.timeEnd("Optimized Query");

  console.log("\n🏁 Benchmark Complete.");
}

main()
  .then(async () => await prisma.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
