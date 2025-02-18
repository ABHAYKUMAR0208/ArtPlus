// routes/contactRoutes.js
const express = require("express");
const router = express.Router();
const contactController = require("../../controllers/admin/contact-controllers");

// POST /api/contact - Submit a contact form
router.post("/", contactController.submitContactForm);

// GET /api/contact - Fetch all contact messages (for admin)
router.get("/", contactController.getAllContactMessages);

module.exports = router;