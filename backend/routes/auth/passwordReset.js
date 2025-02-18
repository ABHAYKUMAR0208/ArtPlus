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

    let user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(404).send({ message: "User with given email does not exist!" });
    }

    let token = await Token.findOne({ userId: user._id });
    if (!token) {
      token = new Token({
        userId: user._id,
        token: crypto.randomBytes(32).toString("hex"),
      });
      await token.save();
    }

    // ✅ FIXED: Correct frontend URL
    const url = `http://localhost:5173/reset-password/${user._id}/${token.token}`;
    await sendEmail(user.email, "Password Reset", `Click here to reset your password. This Password is only valid for 1 hour: ${url}`);

    res.status(200).send({ message: "Password reset link sent to your email account" });
  } catch (error) {
    res.status(500).send({ message: "Internal Server Error" });
  }
});

// Verify password reset link
router.get("/reset/:id/:token", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(400).json({ message: "Invalid or expired link" });
    }

    const token = await Token.findOne({ userId: user._id, token: req.params.token });
    if (!token) {
      return res.status(400).json({ message: "Invalid or expired token" });
    }

    res.status(200).json({ isValid: true });
  } catch (error) {
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
    if (!token) return res.status(400).send({ message: "Invalid token" });

    // Hash the new password
    const salt = await bcrypt.genSalt(Number(process.env.SALT));
    const hashPassword = await bcrypt.hash(req.body.password, salt);

    user.password = hashPassword;
    await user.save();
    await token.deleteOne(); // ✅ Use deleteOne() instead of remove() (deprecated)

    res.status(200).send({ message: "Password reset successfully" });
  } catch (error) {
    res.status(500).send({ message: "Internal Server Error" });
  }
});

module.exports = router;
