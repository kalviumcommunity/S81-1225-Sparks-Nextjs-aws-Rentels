/**
 * Email Service Test Examples
 * 
 * This file demonstrates how to use the email API and templates.
 * Copy and paste the curl commands below to test the email service.
 */

console.log("=".repeat(70));
console.log("📧 EMAIL SERVICE TEST EXAMPLES");
console.log("=".repeat(70));

console.log("\n🏥 HEALTH CHECK");
console.log("─".repeat(70));
console.log("Check if email service is configured:");
console.log("\ncurl http://localhost:3000/api/email\n");

console.log("\n📧 EXAMPLE 1: Simple Test Email");
console.log("─".repeat(70));
console.log(`
curl -X POST http://localhost:3000/api/email \\
  -H "Content-Type: application/json" \\
  -d '{
    "to": "your-email@example.com",
    "subject": "Test Email from Sparks Rentals",
    "message": "<h1>Hello from Sparks Rentals! 🚀</h1><p>This is a test email to verify the email service is working correctly.</p>"
  }'
`);

console.log("\n📧 EXAMPLE 2: Welcome Email (Using Template)");
console.log("─".repeat(70));
console.log(`
To use the welcome template, first import it in your code:

import { welcomeTemplate } from '@/lib/emailTemplates';

const htmlMessage = welcomeTemplate("Alice Johnson");

Then send via API:

curl -X POST http://localhost:3000/api/email \\
  -H "Content-Type: application/json" \\
  -d '{
    "to": "newuser@example.com",
    "subject": "Welcome to Sparks Rentals!",
    "message": "<!-- Use welcomeTemplate() output here -->"
  }'
`);

console.log("\n📧 EXAMPLE 3: Password Reset Email");
console.log("─".repeat(70));
console.log(`
To use the password reset template:

import { passwordResetTemplate } from '@/lib/emailTemplates';

const htmlMessage = passwordResetTemplate(
  "Bob Smith",
  "https://app.kalvium.community/reset-password?token=abc123",
  "1 hour"
);

Then send via API with the generated HTML.
`);

console.log("\n📧 EXAMPLE 4: Notification Email");
console.log("─".repeat(70));
console.log(`
To use the notification template:

import { notificationTemplate } from '@/lib/emailTemplates';

const htmlMessage = notificationTemplate(
  "Charlie Davis",
  "New Rental Request",
  "<p>You have received a new rental request for your property <strong>Sunset Villa</strong>.</p>",
  "https://app.kalvium.community/rentals/requests/123",
  "View Request"
);
`);

console.log("\n" + "=".repeat(70));
console.log("✅ SETUP CHECKLIST");
console.log("=".repeat(70));
console.log(`
1. ✓ SendGrid SDK installed (@sendgrid/mail)
2. ✓ Email API route created (src/app/api/email/route.ts)
3. ✓ Email templates created (src/lib/emailTemplates.ts)
4. ✓ Environment variables configured in env.example
5. ⚠ YOU NEED TO: Create .env.local with your SendGrid credentials
6. ⚠ YOU NEED TO: Start dev server (npm run dev)
7. ⚠ YOU NEED TO: Test with curl commands above
`);

console.log("\n" + "=".repeat(70));
console.log("📝 NEXT STEPS");
console.log("=".repeat(70));
console.log(`
1. Create a SendGrid account at https://sendgrid.com
2. Verify your sender email address
3. Generate an API key with Full Access permissions
4. Create .env.local and add:
   SENDGRID_API_KEY=your_api_key_here
   SENDGRID_SENDER=your-verified-email@example.com
5. Start the dev server: npm run dev
6. Test the health check endpoint
7. Send a test email using the curl commands above
8. Check your inbox (and spam folder) for the email
9. Monitor console logs for message IDs
10. Check SendGrid dashboard for delivery stats
`);

console.log("\n" + "=".repeat(70));
console.log("🎯 EXPECTED CONSOLE OUTPUT (When Email Sent)");
console.log("=".repeat(70));
console.log(`
📧 Sending email...
   To: user@example.com
   From: no-reply@yourdomain.com
   Subject: Welcome to Sparks Rentals!
✅ Email sent successfully!
   Message ID: 01010189b2example123
   Status Code: 202
`);

console.log("\n" + "=".repeat(70));
console.log("📚 DOCUMENTATION");
console.log("=".repeat(70));
console.log(`
Full documentation is available in README.md under the section:
"📧 Email Service Integration (SendGrid)"

It includes:
- Complete setup instructions
- API endpoint documentation
- Template usage examples
- Testing procedures
- Troubleshooting guide
- Production deployment considerations
- Rate limiting strategies
- Bounce handling best practices
`);

console.log("\n" + "=".repeat(70));
console.log("✨ Email Service Integration Complete!");
console.log("=".repeat(70));
console.log("\n");
