require("dotenv").config();
const express = require("express");
const nodemailer = require("nodemailer");

const router = express.Router();

router.post("/send-email", async (req, res) => {
  const { subject, email, message } = req.body;

  if (!subject || !email || !message) {
    return res.status(400).json({ error: "All fields are required." });
  }

  try {
    const transporter = nodemailer.createTransport({
      service: "gmail", // lowercase 'gmail'
      auth: {
        user: process.env.EMAIL_USER,  // Your email (must match the one in .env)
        pass: process.env.EMAIL_PASS,  // Your app password (if using Gmail)
      },
    });

    const mailOptions = {
      from: `"Contact Form" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_USER,  // Send to your email
      subject: `New Contact Form Submission: ${subject}`,
      text: `Message from ${email}:\n\n${message}`,
      replyTo: email,  // Add the sender's email in the reply-to field
    };

    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: "Email sent successfully!" });
  } catch (error) {
    console.error("Error sending email:", error.message, error.stack);
    res.status(500).json({ error: "Failed to send email. Try again later." });
  }
});

module.exports = router;
