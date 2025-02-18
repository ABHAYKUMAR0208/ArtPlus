const nodemailer = require("nodemailer");

const sendEmail = async (to, subject, text) => {
  try {
    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST || "smtp.gmail.com", 
      service: "gmail",
      port: 587, 
      secure: false, 
      auth: {
        user: process.env.EMAIL_USER, 
        pass: process.env.EMAIL_PASS, 
      },
    });

    const mailOptions = {
      from: `"Art Plus" <${process.env.EMAIL_USER}>`,
      to,
      subject,
      text,
    };

    const info = await transporter.sendMail(mailOptions);
    // console.log(` Email sent: ${info.messageId}`);
    return info;
  } catch (error) {
    console.error(" Email not sent! Error:", error);
    throw new Error("Failed to send email");
  }
};

module.exports = sendEmail;
