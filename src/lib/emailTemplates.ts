/**
 * Email Templates for Transactional Emails
 * 
 * This module contains reusable HTML email templates for various
 * transactional emails sent by the application.
 */

/**
 * Welcome Email Template
 * Sent when a new user signs up for the platform
 * 
 * @param userName - The name of the user to personalize the email
 * @returns HTML string for the welcome email
 */
export const welcomeTemplate = (userName: string): string => `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Welcome to Sparks Rentals</title>
</head>
<body style="margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f4f4f4;">
  <table role="presentation" style="width: 100%; border-collapse: collapse;">
    <tr>
      <td align="center" style="padding: 40px 0;">
        <table role="presentation" style="width: 600px; border-collapse: collapse; background-color: #ffffff; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
          <!-- Header -->
          <tr>
            <td style="padding: 40px 40px 20px 40px; text-align: center; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); border-radius: 8px 8px 0 0;">
              <h1 style="margin: 0; color: #ffffff; font-size: 28px; font-weight: 600;">Welcome to Sparks Rentals! 🎉</h1>
            </td>
          </tr>
          
          <!-- Body -->
          <tr>
            <td style="padding: 40px;">
              <h2 style="margin: 0 0 20px 0; color: #333333; font-size: 22px;">Hello ${userName}!</h2>
              <p style="margin: 0 0 15px 0; color: #666666; font-size: 16px; line-height: 1.6;">
                We're thrilled to have you onboard! Your account has been successfully created, and you're now part of the Sparks Rentals community.
              </p>
              <p style="margin: 0 0 25px 0; color: #666666; font-size: 16px; line-height: 1.6;">
                Get started by exploring our platform and discovering amazing rental opportunities.
              </p>
              
              <!-- CTA Button -->
              <table role="presentation" style="margin: 30px 0;">
                <tr>
                  <td style="border-radius: 6px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);">
                    <a href="https://app.kalvium.community" style="display: inline-block; padding: 14px 40px; color: #ffffff; text-decoration: none; font-size: 16px; font-weight: 600;">
                      Go to Dashboard
                    </a>
                  </td>
                </tr>
              </table>
              
              <p style="margin: 25px 0 0 0; color: #666666; font-size: 14px; line-height: 1.6;">
                If you have any questions, feel free to reach out to our support team.
              </p>
            </td>
          </tr>
          
          <!-- Footer -->
          <tr>
            <td style="padding: 30px 40px; background-color: #f8f9fa; border-radius: 0 0 8px 8px; border-top: 1px solid #e9ecef;">
              <p style="margin: 0; color: #999999; font-size: 12px; line-height: 1.5; text-align: center;">
                This is an automated email from Sparks Rentals. Please do not reply to this message.
              </p>
              <p style="margin: 10px 0 0 0; color: #999999; font-size: 12px; text-align: center;">
                © ${new Date().getFullYear()} Sparks Rentals. All rights reserved.
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
`;

/**
 * Password Reset Email Template
 * Sent when a user requests a password reset
 * 
 * @param userName - The name of the user
 * @param resetLink - The password reset link (should include token)
 * @param expiryTime - How long the link is valid (e.g., "1 hour")
 * @returns HTML string for the password reset email
 */
export const passwordResetTemplate = (
  userName: string,
  resetLink: string,
  expiryTime: string = "1 hour"
): string => `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Reset Your Password</title>
</head>
<body style="margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f4f4f4;">
  <table role="presentation" style="width: 100%; border-collapse: collapse;">
    <tr>
      <td align="center" style="padding: 40px 0;">
        <table role="presentation" style="width: 600px; border-collapse: collapse; background-color: #ffffff; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
          <!-- Header -->
          <tr>
            <td style="padding: 40px 40px 20px 40px; text-align: center; background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%); border-radius: 8px 8px 0 0;">
              <h1 style="margin: 0; color: #ffffff; font-size: 28px; font-weight: 600;">Password Reset Request 🔐</h1>
            </td>
          </tr>
          
          <!-- Body -->
          <tr>
            <td style="padding: 40px;">
              <h2 style="margin: 0 0 20px 0; color: #333333; font-size: 22px;">Hello ${userName},</h2>
              <p style="margin: 0 0 15px 0; color: #666666; font-size: 16px; line-height: 1.6;">
                We received a request to reset your password for your Sparks Rentals account.
              </p>
              <p style="margin: 0 0 25px 0; color: #666666; font-size: 16px; line-height: 1.6;">
                Click the button below to create a new password. This link will expire in <strong>${expiryTime}</strong>.
              </p>
              
              <!-- CTA Button -->
              <table role="presentation" style="margin: 30px 0;">
                <tr>
                  <td style="border-radius: 6px; background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);">
                    <a href="${resetLink}" style="display: inline-block; padding: 14px 40px; color: #ffffff; text-decoration: none; font-size: 16px; font-weight: 600;">
                      Reset Password
                    </a>
                  </td>
                </tr>
              </table>
              
              <!-- Security Warning -->
              <div style="margin: 30px 0; padding: 20px; background-color: #fff3cd; border-left: 4px solid #ffc107; border-radius: 4px;">
                <p style="margin: 0; color: #856404; font-size: 14px; line-height: 1.6;">
                  <strong>⚠️ Security Notice:</strong> If you didn't request this password reset, please ignore this email or contact our support team immediately. Your account is still secure.
                </p>
              </div>
              
              <p style="margin: 25px 0 0 0; color: #999999; font-size: 13px; line-height: 1.6;">
                If the button doesn't work, copy and paste this link into your browser:<br>
                <a href="${resetLink}" style="color: #667eea; word-break: break-all;">${resetLink}</a>
              </p>
            </td>
          </tr>
          
          <!-- Footer -->
          <tr>
            <td style="padding: 30px 40px; background-color: #f8f9fa; border-radius: 0 0 8px 8px; border-top: 1px solid #e9ecef;">
              <p style="margin: 0; color: #999999; font-size: 12px; line-height: 1.5; text-align: center;">
                This is an automated email from Sparks Rentals. Please do not reply to this message.
              </p>
              <p style="margin: 10px 0 0 0; color: #999999; font-size: 12px; text-align: center;">
                © ${new Date().getFullYear()} Sparks Rentals. All rights reserved.
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
`;

/**
 * Generic Notification Email Template
 * Used for various activity alerts and notifications
 * 
 * @param userName - The name of the user
 * @param subject - The notification subject/title
 * @param message - The main notification message
 * @param actionUrl - Optional URL for a call-to-action button
 * @param actionText - Text for the CTA button (default: "View Details")
 * @returns HTML string for the notification email
 */
export const notificationTemplate = (
  userName: string,
  subject: string,
  message: string,
  actionUrl?: string,
  actionText: string = "View Details"
): string => `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${subject}</title>
</head>
<body style="margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f4f4f4;">
  <table role="presentation" style="width: 100%; border-collapse: collapse;">
    <tr>
      <td align="center" style="padding: 40px 0;">
        <table role="presentation" style="width: 600px; border-collapse: collapse; background-color: #ffffff; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
          <!-- Header -->
          <tr>
            <td style="padding: 40px 40px 20px 40px; text-align: center; background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%); border-radius: 8px 8px 0 0;">
              <h1 style="margin: 0; color: #ffffff; font-size: 28px; font-weight: 600;">${subject} 🔔</h1>
            </td>
          </tr>
          
          <!-- Body -->
          <tr>
            <td style="padding: 40px;">
              <h2 style="margin: 0 0 20px 0; color: #333333; font-size: 22px;">Hello ${userName},</h2>
              <div style="margin: 0 0 25px 0; color: #666666; font-size: 16px; line-height: 1.6;">
                ${message}
              </div>
              
              ${actionUrl ? `
              <!-- CTA Button -->
              <table role="presentation" style="margin: 30px 0;">
                <tr>
                  <td style="border-radius: 6px; background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);">
                    <a href="${actionUrl}" style="display: inline-block; padding: 14px 40px; color: #ffffff; text-decoration: none; font-size: 16px; font-weight: 600;">
                      ${actionText}
                    </a>
                  </td>
                </tr>
              </table>
              ` : ''}
              
              <p style="margin: 25px 0 0 0; color: #666666; font-size: 14px; line-height: 1.6;">
                Thank you for being a valued member of Sparks Rentals!
              </p>
            </td>
          </tr>
          
          <!-- Footer -->
          <tr>
            <td style="padding: 30px 40px; background-color: #f8f9fa; border-radius: 0 0 8px 8px; border-top: 1px solid #e9ecef;">
              <p style="margin: 0; color: #999999; font-size: 12px; line-height: 1.5; text-align: center;">
                This is an automated email from Sparks Rentals. Please do not reply to this message.
              </p>
              <p style="margin: 10px 0 0 0; color: #999999; font-size: 12px; text-align: center;">
                © ${new Date().getFullYear()} Sparks Rentals. All rights reserved.
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
`;

/**
 * Simple text-based email template
 * For basic notifications without heavy styling
 * 
 * @param subject - Email subject
 * @param content - Plain text or simple HTML content
 * @returns HTML string for a simple email
 */
export const simpleTemplate = (subject: string, content: string): string => `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${subject}</title>
</head>
<body style="margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f4f4f4;">
  <table role="presentation" style="width: 100%; border-collapse: collapse;">
    <tr>
      <td align="center" style="padding: 40px 20px;">
        <table role="presentation" style="width: 600px; border-collapse: collapse; background-color: #ffffff; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
          <tr>
            <td style="padding: 40px;">
              ${content}
            </td>
          </tr>
          <tr>
            <td style="padding: 20px 40px; background-color: #f8f9fa; border-radius: 0 0 8px 8px; border-top: 1px solid #e9ecef;">
              <p style="margin: 0; color: #999999; font-size: 12px; text-align: center;">
                © ${new Date().getFullYear()} Sparks Rentals. All rights reserved.
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
`;
