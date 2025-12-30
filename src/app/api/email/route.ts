import { NextResponse } from "next/server";
import sendgrid from "@sendgrid/mail";
import { z } from "zod";

// Initialize SendGrid with API key from environment variables
const apiKey = process.env.SENDGRID_API_KEY;
if (!apiKey) {
  console.error("❌ SENDGRID_API_KEY is not configured in environment variables");
} else {
  sendgrid.setApiKey(apiKey);
}

// Validation schema for email request
const emailSchema = z.object({
  to: z.string().email("Invalid recipient email address"),
  subject: z.string().min(1, "Subject is required").max(200, "Subject too long"),
  message: z.string().min(1, "Message is required"),
  from: z.string().email("Invalid sender email address").optional(),
});

/**
 * POST /api/email
 * 
 * Send a transactional email via SendGrid
 * 
 * Request Body:
 * - to: string (required) - Recipient email address
 * - subject: string (required) - Email subject line
 * - message: string (required) - HTML email content
 * - from: string (optional) - Sender email (defaults to SENDGRID_SENDER env var)
 * 
 * Response:
 * - success: boolean
 * - messageId: string (on success)
 * - error: object (on failure)
 */
export async function POST(req: Request) {
  try {
    // Check if SendGrid is configured
    if (!apiKey) {
      console.error("❌ SendGrid API key not configured");
      return NextResponse.json(
        {
          success: false,
          error: {
            message: "Email service not configured. Please set SENDGRID_API_KEY in environment variables.",
            code: "SENDGRID_NOT_CONFIGURED",
          },
        },
        { status: 500 }
      );
    }

    // Parse and validate request body
    const body = await req.json();
    const validation = emailSchema.safeParse(body);

    if (!validation.success) {
      console.error("❌ Email validation failed:", validation.error.issues);
      return NextResponse.json(
        {
          success: false,
          error: {
            message: "Invalid email data",
            code: "VALIDATION_ERROR",
            details: validation.error.issues,
          },
        },
        { status: 400 }
      );
    }

    const { to, subject, message, from } = validation.data;

    // Get sender email from request or environment variable
    const senderEmail = from || process.env.SENDGRID_SENDER;
    if (!senderEmail) {
      console.error("❌ Sender email not configured");
      return NextResponse.json(
        {
          success: false,
          error: {
            message: "Sender email not configured. Please set SENDGRID_SENDER in environment variables.",
            code: "SENDER_NOT_CONFIGURED",
          },
        },
        { status: 500 }
      );
    }

    // Prepare email data
    const emailData = {
      to,
      from: senderEmail,
      subject,
      html: message,
    };

    console.log("📧 Sending email...");
    console.log(`   To: ${to}`);
    console.log(`   From: ${senderEmail}`);
    console.log(`   Subject: ${subject}`);

    // Send email via SendGrid
    const response = await sendgrid.send(emailData);

    // Extract message ID from response headers
    const messageId = response[0]?.headers?.["x-message-id"] || "unknown";

    console.log("✅ Email sent successfully!");
    console.log(`   Message ID: ${messageId}`);
    console.log(`   Status Code: ${response[0]?.statusCode}`);

    return NextResponse.json({
      success: true,
      messageId,
      statusCode: response[0]?.statusCode,
      timestamp: new Date().toISOString(),
    });
  } catch (error: unknown) {
    // Handle SendGrid-specific errors
    if (error && typeof error === "object" && "response" in error) {
      const sendgridError = error as {
        response?: {
          body?: {
            errors?: Array<{ message: string; field?: string }>;
          };
        };
        code?: number;
        message?: string;
      };

      console.error("❌ SendGrid API error:");
      console.error(`   Code: ${sendgridError.code}`);
      console.error(`   Message: ${sendgridError.message}`);
      console.error(`   Details:`, sendgridError.response?.body);

      return NextResponse.json(
        {
          success: false,
          error: {
            message: sendgridError.message || "Failed to send email",
            code: "SENDGRID_ERROR",
            details: sendgridError.response?.body?.errors || [],
          },
        },
        { status: sendgridError.code || 500 }
      );
    }

    // Handle generic errors
    console.error("❌ Unexpected error sending email:", error);
    return NextResponse.json(
      {
        success: false,
        error: {
          message: error instanceof Error ? error.message : "Unknown error occurred",
          code: "INTERNAL_ERROR",
        },
      },
      { status: 500 }
    );
  }
}

/**
 * GET /api/email
 * 
 * Health check endpoint to verify email service configuration
 */
export async function GET() {
  const isConfigured = !!(apiKey && process.env.SENDGRID_SENDER);

  return NextResponse.json({
    service: "SendGrid Email Service",
    configured: isConfigured,
    sender: process.env.SENDGRID_SENDER || "not configured",
    timestamp: new Date().toISOString(),
  });
}
