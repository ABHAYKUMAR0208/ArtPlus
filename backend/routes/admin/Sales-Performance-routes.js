const express = require("express");
const {
  getSalesStats,
  getSalesGraphData,
} = require("../../controllers/admin/Sales-Performance-Controller");

const router = express.Router();

// Define routes
router.get("/sales-stats", getSalesStats);
router.get("/graph-data", getSalesGraphData);

module.exports = router;
