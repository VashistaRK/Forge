require("dotenv").config(); // Add this to load .env

import fs from "fs";
import path from "path";
import nodemailer from "nodemailer";
import { Context } from "koa";

export default {
  async fileCount(ctx: Context) {
    try {
      const directoryPath = path.join(process.cwd(), "public", "Documents");

      if (!fs.existsSync(directoryPath)) {
        fs.mkdirSync(directoryPath, { recursive: true });
      }
      console.log(directoryPath);
      const files = fs.readdirSync(directoryPath);
      const count = files.filter((file) => {
        return fs.statSync(path.join(directoryPath, file)).isFile();
      }).length;

      ctx.send({ fileCount: count });
    } catch (err) {
      console.error("Error in fileCount:", err);
      ctx.throw(500, "Failed to count files");
    }
  },

  async sendEmail(ctx: Context) {
    const { name, email, company, phone, message } = ctx.request.body as {
      name: string;
      email: string;
      company: string;
      phone: string;
      message: string;
    };

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: email,
      to: "your-email@example.com", // replace with actual recipient
      subject: `New Contact Form Submission from ${name}`,
      text: `
        Name: ${name}
        Company: ${company}
        Email: ${email}
        Phone: ${phone}
        Message: ${message}
      `,
    };

    try {
      await transporter.sendMail(mailOptions);
      ctx.send({ success: true, message: "Email sent successfully!" });
    } catch (err) {
      console.error("Error sending email:", err);
      ctx.throw(500, "Email sending failed");
    }
  },
};
