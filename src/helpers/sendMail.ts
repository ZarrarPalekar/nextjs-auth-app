import nodemailer from "nodemailer";
import User from "@/models/userModel";
import bcryptjs from "bcryptjs";

export const sendMail = async ({ email, emailType, userId }: any) => {
  try {
    const hashedToken = await bcryptjs.hash(userId.toString(), 10);

    switch (emailType) {
      case "VERIFY":
        await User.findByIdAndUpdate(userId, {
          verifyToken: hashedToken,
          verifyTokenExpiry: Date.now() + 3600000,
        });
        break;

      case "RESET":
        await User.findByIdAndUpdate(userId, {
          forgotPasswordToken: hashedToken,
          forgotPasswordTokenExpiry: Date.now() + 3600000,
        });
        break;

      default:
        break;
    }

    const transporter = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: process.env.MAIL_TRAP_USER,
        pass: process.env.MAIL_TRAP_PASSWORD,
      },
    });

    const mailOptions = {
      from: "zarrar@yopmail.com",
      to: email,
      subject:
        emailType === "VERIFY" ? "Account Verification" : "Reset Password",
      html: `<h1>Hello ${email}</h1><p>Please ${
        emailType === "VERIFY" ? "verify your account" : "reset your password"
      } by clicking the </p><a href="${
        process.env.DOMAIN
      }/verifyemail?token=${hashedToken}">link</a>`,
    };

    const mailResponse = await transporter.sendMail(mailOptions);
    return mailResponse;
  } catch (error: any) {
    throw new Error(error.message);
  }
};
