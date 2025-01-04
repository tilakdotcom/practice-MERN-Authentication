export const VERIFICATION_EMAIL_TEMPLATE = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Verify Your Email</title>
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f0fdf4;">
  <div style="background: linear-gradient(to right, #28a745, #218838); padding: 20px; text-align: center; border-radius: 10px 10px 0 0;">
    <h1 style="color: white; margin: 0; font-size: 1.8em;">Verify Your Email</h1>
  </div>
  <div style="background-color: #ffffff; padding: 20px; border-radius: 0 0 10px 10px; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);">
    <p style="font-size: 1.2em;">Hello,</p>
    <p style="font-size: 1em; margin: 10px 0;">Thank you for signing up! Your verification code is:</p>
    <div style="text-align: center; margin: 30px 0;">
      <span style="font-size: 32px; font-weight: bold; color: #28a745;">{verificationCode}</span>
    </div>
    <p style="font-size: 1em; margin: 10px 0;">Enter this code on the verification page to complete your registration.</p>
    <p style="font-size: 1em; color: #666; margin: 10px 0;">This code will expire in 15 minutes for security reasons.</p>
    <p style="font-size: 1em; margin: 20px 0;">If you didn't create an account with us, please ignore this email.</p>
    <p style="font-size: 1em; margin: 20px 0;">Best regards,<br><strong>Your App Team</strong></p>
  </div>
  <div style="text-align: center; margin-top: 20px; color: #888; font-size: 0.8em;">
    <p>This is an automated message, please do not reply to this email.</p>
  </div>
</body>
</html>
`;

export const PASSWORD_RESET_SUCCESS_TEMPLATE = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Password Reset Successful</title>
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f0fdf4;">
  <div style="background: linear-gradient(to right, #28a745, #218838); padding: 20px; text-align: center; border-radius: 10px 10px 0 0;">
    <h1 style="color: white; margin: 0;">Password Reset Successful</h1>
  </div>
  <div style="background-color: #ffffff; padding: 20px; border-radius: 0 0 10px 10px; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);">
    <p style="font-size: 1.2em;">Hello,</p>
    <p style="font-size: 1em; margin: 10px 0;">We're writing to confirm that your password has been successfully reset.</p>
    <div style="text-align: center; margin: 30px 0;">
      <div style="background-color: #28a745; color: white; width: 60px; height: 60px; line-height: 60px; border-radius: 50%; display: inline-block; font-size: 30px;">
        ✓
      </div>
    </div>
    <p style="font-size: 1em; margin: 10px 0;">If you did not initiate this password reset, please contact our support team immediately.</p>
    <p style="font-size: 1em; margin: 10px 0;">For security reasons, we recommend that you:</p>
    <ul style="font-size: 1em; margin: 10px 0; padding-left: 20px;">
      <li>Use a strong, unique password</li>
      <li>Enable two-factor authentication if available</li>
      <li>Avoid using the same password across multiple sites</li>
    </ul>
    <p style="font-size: 1em; margin: 20px 0;">Thank you for helping us keep your account secure.</p>
    <p style="font-size: 1em; margin: 20px 0;">Best regards,<br><strong>Your App Team</strong></p>
  </div>
  <div style="text-align: center; margin-top: 20px; color: #888; font-size: 0.8em;">
    <p>This is an automated message, please do not reply to this email.</p>
  </div>
</body>
</html>
`;

export const PASSWORD_RESET_REQUEST_TEMPLATE = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Reset Your Password</title>
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f0fdf4;">
  <div style="background: linear-gradient(to right, #28a745, #218838); padding: 20px; text-align: center; border-radius: 10px 10px 0 0;">
    <h1 style="color: white; margin: 0;">Password Reset</h1>
  </div>
  <div style="background-color: #ffffff; padding: 20px; border-radius: 0 0 10px 10px; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);">
    <p style="font-size: 1.2em;">Hello,</p>
    <p style="font-size: 1em; margin: 10px 0;">We received a request to reset your password. If you didn't make this request, please ignore this email.</p>
    <p style="font-size: 1em; margin: 10px 0;">To reset your password, click the button below:</p>
    <div style="text-align: center; margin: 30px 0;">
      <a href="{resetURL}" 
         style="background-color: #28a745; color: white; padding: 12px 20px; text-decoration: none; border-radius: 5px; font-weight: bold; font-size: 1em;">
         Reset Password
      </a>
    </div>
    <p style="font-size: 1em; margin: 10px 0;">This link will expire in 15 mins for security reasons.</p>
    <p style="font-size: 1em; margin: 20px 0;">Best regards,<br><strong>Your App Team</strong></p>
  </div>
  <div style="text-align: center; margin-top: 20px; color: #888; font-size: 0.8em;">
    <p>This is an automated message, please do not reply to this email.</p>
  </div>
</body>
</html>
`;

export const WELCOME_MESSAGE_TEMPLATE = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Welcome</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      color: #333;
      background-color: #f4f4f4;
      margin: 0;
      padding: 0;
    }
    .container {
      max-width: 600px;
      margin: 20px auto;
      background-color: #ffffff;
      border-radius: 10px;
      box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
      overflow: hidden;
    }
    .header {
      background: linear-gradient(to right, #4CAF50, #81C784);
      color: white;
      text-align: center;
      padding: 20px;
      text: capitalize;
    }
    .header h1 {
      margin: 0;
      font-size: 2em;
    }
    .content {
      padding: 20px;
      text-align: center;
    }
    .content p {
      font-size: 1.2em;
      margin: 10px 0;
    }
    .footer {
      text-align: center;
      padding: 15px;
      font-size: 0.9em;
      color: #888;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>Welcome, {userName}!</h1>
    </div>
    <div class="content">
      <p>We're thrilled to have you join us!</p>
      <p>Feel free to explore and make the most of your journey with us.</p>
    </div>
    <div class="footer">
      <p>Best regards,<br>Your App Team</p>
    </div>
  </div>
</body>
</html>
`;
