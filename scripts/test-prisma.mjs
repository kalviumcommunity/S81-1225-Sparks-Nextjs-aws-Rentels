/* eslint-disable no-console */
import prismaPkg from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import pgPkg from "pg";

const { PrismaClient } = prismaPkg;
const { Pool } = pgPkg;

const pgPool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

const prisma = new PrismaClient({
  adapter: new PrismaPg(pgPool),
  log: ["query", "info", "warn", "error"],
});

try {
  const users = await prisma.user.findMany();
  console.log("Prisma connection OK. Users:", users);
} catch (error) {
  console.error("Prisma connection FAILED:", error);
  process.exitCode = 1;
} finally {
  await prisma.$disconnect();
  await pgPool.end();
}
