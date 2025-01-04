import { ApiError } from "../utils/API/ApiError";
import { mailSender, mailTransport } from "./mail.config";
import {
  PASSWORD_RESET_REQUEST_TEMPLATE,
  PASSWORD_RESET_SUCCESS_TEMPLATE,
  VERIFICATION_EMAIL_TEMPLATE,
  WELCOME_MESSAGE_TEMPLATE,
} from "./MailTemplate";

export const sendVerificationEmail = (
  email: string,
  verificationCode: string
) => {
  const recipients = [email];
  try {
    mailTransport
      .sendMail({
        from: mailSender,
        to: recipients,
        subject: "Verify Your Account!",
        html: VERIFICATION_EMAIL_TEMPLATE.replace(
          "{verificationCode}",
          verificationCode
        ),
        category: "Email Verification",
      })
      .then(console.log)
      .catch(console.error);
  } catch (error: any) {
    console.error(
      `Error sending verification email to ${email}: ${error.message}`
    );
    throw new ApiError(500, `Error in sending verification`);
  }
};

export const sendWelcomeEmail = (name: string, email: string) => {
  const recipients = [email];
  try {
    mailTransport
      .sendMail({
        from: mailSender,
        to: recipients,
        subject: "Welcome To MERN!",
        html: WELCOME_MESSAGE_TEMPLATE.replace("{userName}", name),
        category: "Welcome",
      })
      .then(console.log)
      .catch(console.error);
  } catch (error: any) {
    console.error(`Error in Welcome email to ${email}: ${error.message}`);
    throw new ApiError(500, `Error in Welcome email`);
  }
};

export const sendForgotPasswordEmail = (email: string,url:string) => {
  const recipients = [email];
  try {
    mailTransport
      .sendMail({
        from: mailSender,
        to: recipients,
        subject: "Reset Password Link",
        html: PASSWORD_RESET_REQUEST_TEMPLATE.replace("{resetURL}", url),
        category: "Forgot Password",
      })
      .then(console.log)
      .catch(console.error);
  } catch (error: any) {
    console.error(
      `Error in Reset Password email to ${email}: ${error.message}`
    );
    throw new ApiError(500, `Error in Reset Password email`);
  }
};

export const sendPasswordSucessEmail = (email: string) => {
  const recipients = [email];
  try {
    mailTransport
      .sendMail({
        from: mailSender,
        to: recipients,
        subject: "Successfully Reset Password",
        html: PASSWORD_RESET_SUCCESS_TEMPLATE,
        category: "Successfully Reset Password",
      })
      .then(console.log)
      .catch(console.error);
  } catch (error: any) {
    console.error(
      `Error in sendPasswordSucessEmail email to ${email}: ${error.message}`
    );
    throw new ApiError(500, `Error in sendPasswordSucessEmail email`);
  }
};
