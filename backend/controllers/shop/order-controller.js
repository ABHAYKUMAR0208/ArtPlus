const Order = require("../../models/Order");
const Cart = require("../../models/Cart");
const Product = require("../../models/Product");

const createOrder = async (req, res) => {
  try {
    const {
      userId,
      cartItems,
      addressInfo,
      orderStatus = "pending", 
      paymentMethod = "COD",
      paymentStatus = "pending",
      totalAmount,
      cartId,
    } = req.body;

    // Create the order
    const newlyCreatedOrder = new Order({
      userId,
      cartId,
      cartItems,
      addressInfo,
      orderStatus,
      paymentMethod,
      paymentStatus,
      totalAmount,
      orderDate: Date.now(), // Ensure orderDate is set properly
      orderUpdateDate: Date.now(), // Set initial update date
    });

    // Save the order to the database
    await newlyCreatedOrder.save();

    // Delete the cart after the order is created
    await Cart.findByIdAndDelete(cartId);

    res.status(201).json({
      success: true,
      message: "Order created successfully and cart cleared.",
      orderId: newlyCreatedOrder._id,
    });
  } catch (e) {
    console.error("Error in createOrder:", e);
    res.status(500).json({
      success: false,
      message: "Some error occurred!",
      error: e.message,
    });
  }
};

const capturePayment = async (req, res) => {
  try {
    const { orderId } = req.body;

    let order = await Order.findById(orderId);
    if (!order) {
      return res.status(404).json({ success: false, message: "Order not found!" });
    }

    // Fetch all product IDs in a single query
    const productIds = order.cartItems.map(item => item.productId);
    const products = await Product.find({ _id: { $in: productIds } });

    // Check stock availability
    const insufficientStock = order.cartItems.some(item => {
      const product = products.find(p => p._id.toString() === item.productId.toString());
      return !product || product.totalStock < item.quantity;
    });

    if (insufficientStock) {
      return res.status(400).json({ success: false, message: "Not enough stock!" });
    }

    // Deduct stock using `bulkWrite`
    const bulkOps = order.cartItems.map(item => ({
      updateOne: {
        filter: { _id: item.productId },
        update: { $inc: { totalStock: -item.quantity } },
      },
    }));
    await Product.bulkWrite(bulkOps);

    // Update order & delete cart
    order.paymentStatus = "paid";
    order.orderStatus = "confirmed";
    await Cart.findByIdAndDelete(order.cartId);
    await order.save();

    res.status(200).json({ success: true, message: "Order confirmed", data: order });
  } catch (e) {
    console.error("Error in capturePayment:", e);
    res.status(500).json({ success: false, message: "Some error occurred!", error: e.message });
  }
};



const getAllOrdersByUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const orders = await Order.find({ userId }).sort({ orderDate: -1 });

    res.status(200).json({
      success: true,
      data: orders,
    });
  } catch (e) {
    console.error("Error in getAllOrdersByUser:", e);
    res.status(500).json({
      success: false,
      message: "Some error occurred!",
      error: e.message,
    });
  }
};


const getOrderDetails = async (req, res) => {
  try {
    const { id } = req.params;

    const order = await Order.findById(id);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found!",
      });
    }

    res.status(200).json({
      success: true,
      data: order,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Some error occurred!",
    });
  }
};

const cancelOrder = async (req, res) => {
  try {
    const { id } = req.params;
    let order = await Order.findById(id);

    if (!order) {
      return res.status(404).json({ success: false, message: "Order not found!" });
    }

    if (order.orderStatus !== "pending" || order.paymentStatus === "paid") {
      return res.status(400).json({ success: false, message: "Only unpaid and pending orders can be canceled!" });
    }

    // Restore stock using `bulkWrite`
    const bulkOps = order.cartItems.map(item => ({
      updateOne: {
        filter: { _id: item.productId },
        update: { $inc: { totalStock: item.quantity } },
      },
    }));
    await Product.bulkWrite(bulkOps);

    // Update order status
    order.orderStatus = "canceled";
    await order.save();

    res.status(200).json({ success: true, message: "Order canceled successfully!", data: order });
  } catch (e) {
    console.error("Error in cancelOrder:", e);
    res.status(500).json({ success: false, message: "Some error occurred!", error: e.message });
  }
};


module.exports = {
  createOrder,
  capturePayment,
  getAllOrdersByUser,
  getOrderDetails,
  cancelOrder,
};
