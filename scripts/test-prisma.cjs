const { PrismaClient } = require("@prisma/client");
const { PrismaPg } = require("@prisma/adapter-pg");
const { Pool } = require("pg");

const pgPool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

const prisma = new PrismaClient({
  adapter: new PrismaPg(pgPool),
  log: ["query", "info", "warn", "error"],
});

async function main() {
  const users = await prisma.user.findMany();
  console.log("Prisma connection OK. Users:", users);
}

main()
  .catch((error) => {
    console.error("Prisma connection FAILED:", error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
    await pgPool.end();
  });
