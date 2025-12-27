/* eslint-disable no-console */
import { config } from "dotenv";
import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";
import bcrypt from "bcrypt";

// Load environment variables from .env.local
config({ path: ".env.local" });

// Initialize Prisma with pg adapter (required for Prisma v7)
const pool = new Pool({
  connectionString:
    process.env.DATABASE_URL ||
    "postgresql://postgres:password@localhost:5432/mydb",
});

const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log("🌱 Starting database seeding...\n");

  const seededPasswordHash = await bcrypt.hash("Password123!", 10);

  // Seed Users
  console.log("👥 Seeding users...");
  await prisma.user.upsert({
    where: { email: "admin@sparkrentals.com" },
    update: {},
    create: {
      name: "Admin User",
      email: "admin@sparkrentals.com",
      password: seededPasswordHash,
      role: "ADMIN",
      phone: "+1-555-0100",
    },
  });

  const owner1 = await prisma.user.upsert({
    where: { email: "alice@example.com" },
    update: {},
    create: {
      name: "Alice Johnson",
      email: "alice@example.com",
      password: seededPasswordHash,
      role: "OWNER",
      phone: "+1-555-0101",
    },
  });

  const owner2 = await prisma.user.upsert({
    where: { email: "bob@example.com" },
    update: {},
    create: {
      name: "Bob Smith",
      email: "bob@example.com",
      password: seededPasswordHash,
      role: "OWNER",
      phone: "+1-555-0102",
    },
  });

  const customer1 = await prisma.user.upsert({
    where: { email: "charlie@example.com" },
    update: {},
    create: {
      name: "Charlie Brown",
      email: "charlie@example.com",
      password: seededPasswordHash,
      role: "CUSTOMER",
      phone: "+1-555-0103",
    },
  });

  const customer2 = await prisma.user.upsert({
    where: { email: "diana@example.com" },
    update: {},
    create: {
      name: "Diana Prince",
      email: "diana@example.com",
      password: seededPasswordHash,
      role: "CUSTOMER",
      phone: "+1-555-0104",
    },
  });

  console.log("✅ Users seeded successfully\n");

  // Seed Properties
  console.log("🏠 Seeding properties...");
  const property1 = await prisma.property.upsert({
    where: { id: 1 },
    update: {},
    create: {
      name: "Luxury Downtown Apartment",
      description:
        "A stunning 2-bedroom apartment in the heart of downtown with modern amenities and breathtaking city views. Perfect for professionals and small families.",
      address: "123 Main Street",
      city: "New York",
      state: "NY",
      zipCode: "10001",
      price: 2500.0,
      bedrooms: 2,
      bathrooms: 2,
      squareFeet: 1200,
      isAvailable: true,
      userId: owner1.id,
    },
  });

  const property2 = await prisma.property.upsert({
    where: { id: 2 },
    update: {},
    create: {
      name: "Cozy Suburban House",
      description:
        "Charming 3-bedroom house in a quiet neighborhood with a large backyard, perfect for families. Close to schools and parks.",
      address: "456 Oak Avenue",
      city: "Austin",
      state: "TX",
      zipCode: "73301",
      price: 1800.0,
      bedrooms: 3,
      bathrooms: 2,
      squareFeet: 1800,
      isAvailable: true,
      userId: owner1.id,
    },
  });

  const property3 = await prisma.property.upsert({
    where: { id: 3 },
    update: {},
    create: {
      name: "Modern Studio Loft",
      description:
        "Stylish studio loft with high ceilings and industrial design. Ideal for young professionals and students.",
      address: "789 Pine Street",
      city: "San Francisco",
      state: "CA",
      zipCode: "94102",
      price: 2200.0,
      bedrooms: 1,
      bathrooms: 1,
      squareFeet: 650,
      isAvailable: true,
      userId: owner2.id,
    },
  });

  const property4 = await prisma.property.upsert({
    where: { id: 4 },
    update: {},
    create: {
      name: "Beachfront Villa",
      description:
        "Luxurious 4-bedroom villa with direct beach access, infinity pool, and stunning ocean views. Perfect for vacation rentals.",
      address: "321 Ocean Drive",
      city: "Miami",
      state: "FL",
      zipCode: "33139",
      price: 5000.0,
      bedrooms: 4,
      bathrooms: 3,
      squareFeet: 3000,
      isAvailable: false,
      userId: owner2.id,
    },
  });

  console.log("✅ Properties seeded successfully\n");

  // Seed Amenities
  console.log("✨ Seeding amenities...");
  await prisma.amenity.createMany({
    data: [
      // Property 1 amenities
      { name: "WiFi", icon: "📶", propertyId: property1.id },
      { name: "Air Conditioning", icon: "❄️", propertyId: property1.id },
      { name: "Gym", icon: "🏋️", propertyId: property1.id },
      { name: "Parking", icon: "🚗", propertyId: property1.id },
      // Property 2 amenities
      { name: "WiFi", icon: "📶", propertyId: property2.id },
      { name: "Backyard", icon: "🌳", propertyId: property2.id },
      { name: "Garage", icon: "🚗", propertyId: property2.id },
      { name: "Pet Friendly", icon: "🐕", propertyId: property2.id },
      // Property 3 amenities
      { name: "WiFi", icon: "📶", propertyId: property3.id },
      { name: "Air Conditioning", icon: "❄️", propertyId: property3.id },
      { name: "Laundry", icon: "🧺", propertyId: property3.id },
      // Property 4 amenities
      { name: "WiFi", icon: "📶", propertyId: property4.id },
      { name: "Pool", icon: "🏊", propertyId: property4.id },
      { name: "Beach Access", icon: "🏖️", propertyId: property4.id },
      { name: "Hot Tub", icon: "🛁", propertyId: property4.id },
      { name: "Ocean View", icon: "🌊", propertyId: property4.id },
    ],
    skipDuplicates: true,
  });

  console.log("✅ Amenities seeded successfully\n");

  // Seed Bookings
  console.log("📅 Seeding bookings...");
  const booking1 = await prisma.booking.upsert({
    where: { id: 1 },
    update: {},
    create: {
      propertyId: property1.id,
      userId: customer1.id,
      startDate: new Date("2025-01-15"),
      endDate: new Date("2025-02-15"),
      totalPrice: 2500.0,
      status: "CONFIRMED",
    },
  });

  await prisma.booking.upsert({
    where: { id: 2 },
    update: {},
    create: {
      propertyId: property2.id,
      userId: customer2.id,
      startDate: new Date("2025-02-01"),
      endDate: new Date("2025-03-01"),
      totalPrice: 1800.0,
      status: "PENDING",
    },
  });

  const booking3 = await prisma.booking.upsert({
    where: { id: 3 },
    update: {},
    create: {
      propertyId: property4.id,
      userId: customer1.id,
      startDate: new Date("2025-03-10"),
      endDate: new Date("2025-03-17"),
      totalPrice: 5000.0,
      status: "COMPLETED",
    },
  });

  console.log("✅ Bookings seeded successfully\n");

  // Seed Payments
  console.log("💳 Seeding payments...");
  await prisma.payment.upsert({
    where: { id: 1 },
    update: {},
    create: {
      bookingId: booking1.id,
      amount: 2500.0,
      status: "COMPLETED",
      paymentMethod: "Credit Card",
      transactionId: "TXN-2025-001",
    },
  });

  await prisma.payment.upsert({
    where: { id: 2 },
    update: {},
    create: {
      bookingId: booking3.id,
      amount: 5000.0,
      status: "COMPLETED",
      paymentMethod: "Debit Card",
      transactionId: "TXN-2025-002",
    },
  });

  console.log("✅ Payments seeded successfully\n");

  // Seed Reviews
  console.log("⭐ Seeding reviews...");
  await prisma.review.createMany({
    data: [
      {
        propertyId: property1.id,
        userId: customer1.id,
        rating: 5,
        comment:
          "Amazing apartment! The location is perfect and the amenities are top-notch. Highly recommend!",
      },
      {
        propertyId: property2.id,
        userId: customer2.id,
        rating: 4,
        comment:
          "Great house for families. The backyard is spacious and the neighborhood is very quiet.",
      },
      {
        propertyId: property3.id,
        userId: customer1.id,
        rating: 4,
        comment:
          "Perfect for a single person or couple. The loft design is beautiful and modern.",
      },
      {
        propertyId: property4.id,
        userId: customer1.id,
        rating: 5,
        comment:
          "Absolutely stunning villa! The beach access and ocean views are breathtaking. Worth every penny!",
      },
      {
        propertyId: property1.id,
        userId: customer2.id,
        rating: 5,
        comment:
          "Best rental experience ever. The host was responsive and the apartment exceeded expectations.",
      },
    ],
    skipDuplicates: true,
  });

  console.log("✅ Reviews seeded successfully\n");

  // Summary
  console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
  console.log("✨ Database seeding completed successfully!");
  console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
  console.log("\n📊 Summary:");
  console.log("  • 5 Users (1 Admin, 2 Owners, 2 Customers)");
  console.log("  • 4 Properties");
  console.log("  • 17 Amenities");
  console.log("  • 3 Bookings");
  console.log("  • 2 Payments");
  console.log("  • 5 Reviews");
  console.log("\n💡 Next steps:");
  console.log("  • Run 'npx prisma studio' to view the data");
  console.log("  • Re-run 'npm run prisma:seed' to test idempotency");
  console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n");
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error("❌ Seeding failed:", e);
    await prisma.$disconnect();
    process.exit(1);
  });
