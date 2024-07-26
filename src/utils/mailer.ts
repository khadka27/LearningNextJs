import User from "@/models/usersModel";
import nodemailer from "nodemailer";
import bcrypt from "bcryptjs";

export const sendEmail = async ({ email, emailType, userId }: any) => {
  try {
    const hashedToken = await bcrypt.hash(userId.toString(), 10);
    if (emailType === "Verify") {
      const updateuser = await User.findByIdAndUpdate(userId, {
        $set: {
          verifyToken: hashedToken,
          verifyTokenExpiry: Date.now() + 3600000,
        },
      });
      console.log(updateuser);

      console.log("Sending verification email");
    } else if (emailType === "RESET") {
      await User.findByIdAndUpdate(userId, {
        $set: {
          resetToken: hashedToken,
          resetTokenExpiry: Date.now() + 3600000,
        },
      });
    }
    console.log("Sending reset password email");

    var transport = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: "69e693b390b556",
        pass: "e989815213f35e",
      },
    });

    const mailOptions = {
      from: '"Maddison Foo Koch 👻"khadkaoffical27@gmail.com', // sender address
      to: email, // list of receivers
      subject:
        emailType === "Verify" ? "Verify your email" : "Rest your password", // Subject line
      html: `<p>Click <a herf="${
        process.env.DOMAIN
      }/verifyemail?token=${hashedToken}">here</a> to ${
        emailType === "verify" ? "Verify your email" : "Reset your password"
      }<br>${process.env.DOMAIN}/verifyemail?token=${hashedToken}</p>`, // html body
    };

    const mailRespones = await transport.sendMail(mailOptions);

    return mailRespones;
  } catch (error: any) {
    throw new Error(error.massages);
  }
};
