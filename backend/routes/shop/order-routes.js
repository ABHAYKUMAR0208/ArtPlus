const express = require("express");
const {
  createOrder,
  getAllOrdersByUser,
  getOrderDetails,
  capturePayment,
  cancelOrder,
} = require("../../controllers/shop/order-controller");

const router = express.Router();

// Create an order
router.post("/", createOrder); 

// Capture payment & confirm order
router.put("/confirm-payment/:orderId", capturePayment);

// Get all orders by a specific user
router.get("/user/:userId", getAllOrdersByUser);

// Get order details by order ID
router.get("/:id", getOrderDetails);

// Cancel an order
router.put("/cancel/:id", cancelOrder);

module.exports = router;
