// shop/product-routes.js
const express = require("express");
const {
  getFilteredProducts,
  getProductDetails,
  getSaleProducts, // Add this
} = require("../../controllers/shop/products-controller");

const router = express.Router();

router.get("/get", getFilteredProducts);
router.get("/get/:id", getProductDetails);
router.get("/sale/get", getSaleProducts); // Add this route

module.exports = router;