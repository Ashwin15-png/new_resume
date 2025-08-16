const express = require("express");
const nodemailer = require("nodemailer");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
app.use(bodyParser.json());
app.use(cors());

// ✅ Configure transporter (use Gmail / Outlook / etc.)
let transporter = nodemailer.createTransport({
  service: "gmail", // or "outlook", "yahoo"
  auth: {
    user: "your-email@gmail.com", // your email
    pass: "your-app-password"     // Gmail App Password (not your real password!)
  }
});

// ✅ Route to handle form submission
app.post("/send", (req, res) => {
  const { from_name, reply_to, message } = req.body;

  // 1️⃣ Email to YOU
  transporter.sendMail({
    from: reply_to,
    to: "your-email@gmail.com",
    subject: `📩 New Resume Inquiry from ${from_name}`,
    text: `Message: ${message}\n\nEmail: ${reply_to}`
  });

  // 2️⃣ Auto-reply to visitor
  transporter.sendMail({
    from: "your-email@gmail.com",
    to: reply_to,
    subject: `✅ Thanks ${from_name}, I received your details!`,
    text: "I’ll review your message and get back to you soon.\n\nBest regards,\nAshwin"
  });

  res.json({ success: true, message: "Emails sent successfully!" });
});

// ✅ Start server
const PORT = 5000;
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
