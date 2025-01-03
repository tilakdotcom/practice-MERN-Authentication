import { ApiError } from "../utils/API/ApiError";
import { mailSender, mailTransport } from "./mail.config";
import { VERIFICATION_EMAIL_TEMPLATE, WELCOME_MESSAGE_TEMPLATE } from "./MailTemplate";

export const sendVerificationEmail = (email: string, verificationCode: string) => {
  const recipients = [email];
  try {
    mailTransport
      .sendMail({
        from: mailSender,
        to: recipients,
        subject: "Verify Your Account!",
        html: VERIFICATION_EMAIL_TEMPLATE.replace("{verificationCode}", verificationCode),
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

export const sendWelcomeEmail =(name:string,email:string)=>{
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
    console.error(
      `Error sending verification email to ${email}: ${error.message}`
    );
    throw new ApiError(500, `Error in sending verification`);
  }
}
