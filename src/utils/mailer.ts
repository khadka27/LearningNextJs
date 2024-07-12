import User from "@/models/usersModel";
import { verify, Verify } from "crypto";
import nodemailer from "nodemailer";
import bcrypt from "bcryptjs";

export const sendEmail = async ({ email, emailType, userId }: any) => {
  try {
    const hashedToken = await bcrypt.hash(userId.toString(), 10);
    if (emailType === Verify) {
      await User.findByIdAndUpdate(userId, {
        verifyToken: hashedToken,
        verifyTokenExpire: Date.now() + 3600000,
      });
      console.log("Sending verification email");
    } else if (emailType === "RESET") {
      await User.findByIdAndUpdate(userId, {
        resetToken: hashedToken,
        resetTokenExpire: Date.now() + 3600000,
      });
    }
    console.log("Sending reset password email");

    const transport = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: "8329998cdae660",
        pass: "********b504",
      },
    });

    const mailOptions = {
      from: '"Maddison Foo Koch 👻"khadkaoffical27@gmail.com', // sender address
      to: email, // list of receivers
      subject:
        emailType === Verify ? "Verify your email" : "Rest your password", // Subject line
      html: `<a href="${process.env.DOMAIN}/${
        emailType === Verify ? "verify" : "reset"
      }/${hashedToken}">Click here to ${
        emailType === Verify ? "verify" : "reset"
      } your password</a>`,
    };

    const mailRespones = await transport.sendMail(mailOptions);

    return mailRespones;
  } catch (error: any) {
    throw new Error(error.massages);
  }
};
