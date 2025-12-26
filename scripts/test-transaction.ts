/* eslint-disable no-console */
import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";
import * as dotenv from "dotenv";
import * as path from "path";

// Load env vars
dotenv.config({ path: path.resolve(__dirname, "../.env.local") });

// Setup Prisma (reuse similar logic to seed.ts)
const pool = new Pool({
  connectionString:
    process.env.DATABASE_URL ||
    "postgresql://postgres:password@localhost:5432/mydb",
});
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log("🔄 Starting Transaction Tests...\n");

  // Fetch prerequisites
  const user = await prisma.user.findFirst();
  const property = await prisma.property.findFirst();

  if (!user || !property) {
    console.error(
      "❌ Error: Need at least one user and one property to run tests."
    );
    return;
  }

  console.log(`👤 Using User ID: ${user.id}`);
  console.log(`🏠 Using Property ID: ${property.id}\n`);

  // --- SCENARIO 1: Successful Transaction ---
  console.log(
    "👉 [Scenario 1] Attempting SUCCESSFUL transaction (Booking + Payment)..."
  );
  try {
    const [booking, payment] = await prisma.$transaction(async (tx) => {
      // 1. Create Booking
      const newBooking = await tx.booking.create({
        data: {
          userId: user.id,
          propertyId: property.id,
          startDate: new Date("2025-05-01"),
          endDate: new Date("2025-05-07"),
          totalPrice: 1000.0,
          status: "CONFIRMED",
        },
      });

      // 2. Create Payment linked to Booking
      const newPayment = await tx.payment.create({
        data: {
          bookingId: newBooking.id,
          amount: 1000.0,
          status: "COMPLETED",
          paymentMethod: "Credit Card",
          transactionId: `TX-SUCCESS-${Date.now()}`,
        },
      });

      return [newBooking, newPayment];
    });

    console.log("✅ Transaction COMMITTED successfully!");
    console.log(`   Created Booking ID: ${booking.id}`);
    console.log(`   Created Payment ID: ${payment.id}\n`);
  } catch (error) {
    console.error("❌ Transaction 1 FAILED unexpectedly:", error);
  }

  // --- SCENARIO 2: Failed Transaction (Rollback) ---
  console.log(
    "👉 [Scenario 2] Attempting FAILED transaction to verify ROLLBACK..."
  );
  let bucketBookingId: number | undefined;

  try {
    await prisma.$transaction(async (tx) => {
      // 1. Create Booking (Valid)
      const newBooking = await tx.booking.create({
        data: {
          userId: user.id,
          propertyId: property.id,
          startDate: new Date("2025-06-01"),
          endDate: new Date("2025-06-07"),
          totalPrice: 2000.0,
          status: "PENDING",
        },
      });
      bucketBookingId = newBooking.id;
      console.log(
        `   (Inside TX) Created valid Booking ID: ${newBooking.id} (Should be rolled back)`
      );

      // 2. Create Payment (INVALID - Force error)
      // We force an error by passing an invalid value or missing data
      // Payment requires 'amount', let's trick it or throw manually
      throw new Error("🔥 Intentional Failure to trigger rollback 🔥");
    });
  } catch (error) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const appError = error as any;
    console.log(`✅ Caught expected error: ${appError.message}`);
    console.log("   Verifying rollback...");

    if (bucketBookingId) {
      const check = await prisma.booking.findUnique({
        where: { id: bucketBookingId },
      });

      if (!check) {
        console.log(
          `✅ Rollback VERIFIED: Booking ID ${bucketBookingId} does NOT exist.`
        );
      } else {
        console.error(
          `❌ Rollback FAILED: Booking ID ${check.id} still exists!`
        );
      }
    }
  }

  console.log("\n🏁 Transaction Tests Completed.");
}

main()
  .then(async () => await prisma.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
