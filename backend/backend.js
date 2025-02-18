const dotenv = require("dotenv");
const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const cors = require("cors");

require('dotenv').config();
// Import routes
const authRouter = require("./routes/auth/auth-routes");
const passwordResetRoutes = require("./routes/auth/passwordReset");
const adminProductsRouter = require("./routes/admin/products-routes");
const adminOrderRouter = require("./routes/admin/order-routes");
const adminSalesRouter = require("./routes/admin/Sales-Performance-routes");
const contactRoutes = require("./routes/admin/contact-routes")
const shopProductsRouter = require("./routes/shop/products-routes");
const shopCartRouter = require("./routes/shop/cart-routes");
const shopAddressRouter = require("./routes/shop/address-routes");
const shopOrderRouter = require("./routes/shop/order-routes");
const shopSearchRouter = require("./routes/shop/search-routes");
const shopReviewRouter = require("./routes/shop/review-routes");
const commonFeatureRouter = require("./routes/common/feature-routes");
const emailRouter = require("./routes/common/email-routes");

// Database connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected..."))
  .catch((err) => console.error("MongoDB connection error:", err));

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "DELETE", "PUT"],
    allowedHeaders: [
      "Content-Type",
      "Authorization",
      "Cache-Control",
      "Expires",
      "Pragma",
    ],
    credentials: true,
  })
);
app.use(cookieParser());
app.use(express.json());

// Routes
app.use(express.json());
app.use("/api/auth", authRouter);
app.use("/api/reset-password", passwordResetRoutes);
app.use("/api/admin/products", adminProductsRouter);
app.use("/api/admin/orders", adminOrderRouter);
app.use("/api/admin/sales", adminSalesRouter);
app.use("/api/admin/contact", contactRoutes)
app.use("/api/shop/products", shopProductsRouter);
app.use("/api/shop/cart", shopCartRouter);
app.use("/api/shop/address", shopAddressRouter);
app.use("/api/shop/order", shopOrderRouter);
app.use("/api/shop/search", shopSearchRouter);
app.use("/api/shop/review", shopReviewRouter);
app.use("/api/common/feature", commonFeatureRouter);
app.use("/api/common/email", emailRouter);

// Start server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));


