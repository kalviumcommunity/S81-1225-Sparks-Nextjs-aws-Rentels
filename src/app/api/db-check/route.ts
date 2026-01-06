import { NextResponse } from "next/server";
import { Pool } from "pg";

// Create a new pool using the connection string from environment variables
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

export async function GET() {
  try {
    if (!process.env.DATABASE_URL) {
      return NextResponse.json(
        { error: "DATABASE_URL is not defined in environment variables" },
        { status: 500 }
      );
    }

    // specific query to check connection and time
    const result = await pool.query("SELECT NOW()");
    return NextResponse.json({
      status: "success",
      message: "Database connection established",
      serverTime: result.rows[0].now,
    });
  } catch (error) {
    console.error("Database connection error:", error);
    return NextResponse.json(
      {
        error: "Failed to connect to database",
        details: (error as Error).message,
      },
      { status: 500 }
    );
  }
}
