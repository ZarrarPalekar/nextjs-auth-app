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

    // check is user exists
    const user = await User.findOne({ email });

    const transporter = nodemailer.createTransport({
      host: "smtp-relay.brevo.com",
      port: 587,
      auth: {
        user: process.env.MAIL_TRAP_USER,
        pass: process.env.MAIL_TRAP_PASSWORD,
      },
    });

    const mailOptions = {
      from: "meetzarrar@gmail.com",
      to: email,
      subject:
        emailType === "VERIFY" ? "Account Verification" : "Reset Password",
      html: `<h1>Hello ${user.username}</h1><p>Please ${
        emailType === "VERIFY" ? "verify your account" : "reset your password"
      } by clicking the link below.</p><a href="${
        process.env.DOMAIN
      }/verifyemail?token=${hashedToken}">Click here</a>`,
    };

    const mailResponse = await transporter.sendMail(mailOptions);
    return mailResponse;
  } catch (error: any) {
    throw new Error(error.message);
  }
};
