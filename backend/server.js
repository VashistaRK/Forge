require("dotenv").config();
const express = require("express");
const nodemailer = require("nodemailer");
const cors = require("cors");
const fs = require("fs"); // Added for file system operations
const path = require("path"); // Added for path management

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());

// Nodemailer Transporter Setup
const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL_USER, // Your email
        pass: process.env.EMAIL_PASS, // Your email password or App Password
    },
});

// Email Sending API
app.post("/send-email", async (req, res) => {
    const { name, company, email, phone, message } = req.body;

    const mailOptions = {
        from: email,
        to: "shoterking1357@gmail.com", // Change to your recipient email
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
        res.status(200).json({ success: true, message: "Email sent successfully!" });
    } catch (error) {
        console.error("Email sending failed:", error);
        res.status(500).json({ success: false, message: "Failed to send email." });
    }
});

// File Count API (Newly Added)
const directoryPath = path.join(__dirname, "..", "public", "Documents");
console.log("Directory Path:", directoryPath);

app.get("/api/file-count", (req, res) => {
    if (!fs.existsSync(directoryPath)) {
        console.log("Documents folder does not exist. Creating now...");
        fs.mkdirSync(directoryPath, { recursive: true });
    }

    fs.readdir(directoryPath, (err, files) => {
        if (err) {
            console.error("Error reading directory:", err);
            return res.status(500).json({
                error: "Error reading directory",
                details: err.message
            });
        }

        const fileCount = files.filter(file => {
            try {
                return fs.statSync(path.join(directoryPath, file)).isFile();
            } catch (err) {
                console.error(`Error reading file: ${file}`, err);
                return false;
            }
        }).length;

        console.log(`Total number of files: ${fileCount}`);
        res.json({ fileCount });
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});