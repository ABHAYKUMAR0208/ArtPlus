const Product = require("../../models/Product");

const getFilteredProducts = async (req, res) => {
  try {
    const { category = [], brand = [], sortBy = "price-lowtohigh" } = req.query;

    let filters = {};

    if (category.length) {
      filters.category = { $in: category.split(",") };
    }

    if (brand.length) {
      filters.brand = { $in: brand.split(",") };
    }

    // Fetch products without sorting
    const products = await Product.find(filters);

    // Sort products
    let sortedProducts;
    switch (sortBy) {
      case "price-lowtohigh":
        sortedProducts = products.sort((a, b) => {
          const priceA = a.salePrice > 0 ? a.salePrice : a.price;
          const priceB = b.salePrice > 0 ? b.salePrice : b.price;
          return priceA - priceB;
        });
        break;
      case "price-hightolow":
        sortedProducts = products.sort((a, b) => {
          const priceA = a.salePrice > 0 ? a.salePrice : a.price;
          const priceB = b.salePrice > 0 ? b.salePrice : b.price;
          return priceB - priceA;
        });
        break;
      case "title-atoz":
        sortedProducts = products.sort((a, b) =>
          a.title.localeCompare(b.title)
        );
        break;
      case "title-ztoa":
        sortedProducts = products.sort((a, b) =>
          b.title.localeCompare(a.title)
        );
        break;
      default:
        sortedProducts = products; // No sorting
        break;
    }

    res.status(200).json({
      success: true,
      data: sortedProducts,
    });
  } catch (e) {
    console.log(e); // Corrected error logging
    res.status(500).json({
      success: false,
      message: "Some error occurred",
    });
  }
};

const getProductDetails = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);

    if (!product)
      return res.status(404).json({
        success: false,
        message: "Product not found!",
      });

    res.status(200).json({
      success: true,
      data: product,
    });
  } catch (e) {
    console.log(e); // Corrected error logging
    res.status(500).json({
      success: false,
      message: "Some error occurred",
    });
  }
};

const getSaleProducts = async (req, res) => {
  try {
    // Fetch products where salePrice > 0
    const saleProducts = await Product.find({ salePrice: { $gt: 0 } });

    res.status(200).json({
      success: true,
      data: saleProducts,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Some error occurred",
    });
  }
};

module.exports = {
  getFilteredProducts,
  getProductDetails,
  getSaleProducts, 
};

