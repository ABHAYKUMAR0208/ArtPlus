const router = require("express").Router();
const User = require("../../models/User");
const Token = require("../../models/token");
const crypto = require("crypto");
const sendEmail = require("../../services/email-services");
const Joi = require("joi");
const bcrypt = require("bcrypt");

// Send password reset link
router.post("/forget", async (req, res) => {
  try {
    const emailSchema = Joi.object({
      email: Joi.string().email().required().label("Email"),
    });

    const { error } = emailSchema.validate(req.body);
    if (error) {
      return res.status(400).send({ message: error.details[0].message });
    }

    const user = await User.findOne({ email: req.body.email }).lean();
    if (!user) {
      return res.status(404).send({ message: "User with given email does not exist!" });
    }

    let token = await Token.findOne({ userId: user._id });
    if (!token) {
      token = new Token({
        userId: user._id,
        token: crypto.randomBytes(32).toString("hex"),
        expiresAt: Date.now() + 3600000, // Token valid for 1 hour
      });
      await token.save();
    }

    // ✅ Check if CLIENT_BASE_URL is set
    if (!process.env.CLIENT_BASE_URL) {
      throw new Error("CLIENT_BASE_URL is not defined in environment variables.");
    }

    // ✅ Encode userId & token to prevent errors
    const resetUrl = `${process.env.CLIENT_BASE_URL}/reset-password/${encodeURIComponent(user._id)}/${encodeURIComponent(token.token)}`;

    await sendEmail(
      user.email,
      "Password Reset",
      `Click here to reset your password. This link is only valid for 1 hour: ${resetUrl}`
    );

    res.status(200).send({ message: "Password reset link sent to your email account" });

  } catch (error) {
    console.error("Error in forget password:", error);
    res.status(500).send({ message: "Internal Server Error" });
  }
});

// Verify password reset link
router.get("/reset/:id/:token", async (req, res) => {
  try {
    const user = await User.findById(req.params.id).lean();
    if (!user) {
      return res.status(400).json({ message: "Invalid or expired link" });
    }

    const token = await Token.findOne({ userId: user._id, token: req.params.token }).lean();
    if (!token || token.expiresAt < Date.now()) {
      return res.status(400).json({ message: "Invalid or expired token" });
    }

    res.status(200).json({ isValid: true });

  } catch (error) {
    console.error("Error in verifying reset token:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// Set new password
router.post("/reset/:id/:token", async (req, res) => {
  try {
    const passwordSchema = Joi.object({
      password: Joi.string()
        .pattern(new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[\\W]).{8,}$"))
        .required()
        .label("Password")
        .messages({
          "string.pattern.base": "Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, and one special character.",
        }),
    });

    const { error } = passwordSchema.validate(req.body);
    if (error) return res.status(400).send({ message: error.details[0].message });

    const user = await User.findById(req.params.id);
    if (!user) return res.status(400).send({ message: "Invalid link" });

    const token = await Token.findOne({ userId: user._id, token: req.params.token });
    if (!token || token.expiresAt < Date.now()) return res.status(400).send({ message: "Invalid or expired token" });

    // ✅ Ensure SALT is defined
    const saltRounds = Number(process.env.SALT);
    if (!saltRounds) {
      throw new Error("SALT environment variable is not set correctly.");
    }

    // Hash the new password
    const hashPassword = await bcrypt.hash(req.body.password, saltRounds);

    user.password = hashPassword;
    await user.save();
    await token.deleteOne(); // ✅ Use deleteOne() (remove() is deprecated)

    res.status(200).send({ message: "Password reset successfully" });

  } catch (error) {
    console.error("Error in resetting password:", error);
    res.status(500).send({ message: "Internal Server Error" });
  }
});

module.exports = router;
