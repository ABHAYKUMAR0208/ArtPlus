const Order = require("../../models/Order");
const moment = require("moment");



const getSalesStats = async (req, res) => {
  try {
    const startOfDay = moment().startOf("day").toDate();
    const endOfDay = moment().endOf("day").toDate();
    const startOfMonth = moment().startOf("month").toDate();
    const startOfYear = moment().startOf("year").toDate();

    const salesData = await Promise.all([
      // Daily Sales
      Order.aggregate([
        {
          $match: { 
            orderStatus: "delivered", 
            orderDate: { $gte: startOfDay, $lt: endOfDay } 
          },
        },
        {
          $group: {
            _id: null,
            totalAmount: { $sum: "$totalAmount" },
            totalProducts: {
              $sum: {
                $reduce: {
                  input: "$cartItems",
                  initialValue: 0,
                  in: { $add: ["$$value", "$$this.quantity"] },
                },
              },
            },
          },
        },
      ]),

      // Monthly Sales
      Order.aggregate([
        {
          $match: { 
            orderStatus: "delivered", 
            orderDate: { $gte: startOfMonth } 
          },
        },
        {
          $group: {
            _id: null,
            totalAmount: { $sum: "$totalAmount" },
            totalProducts: {
              $sum: {
                $reduce: {
                  input: "$cartItems",
                  initialValue: 0,
                  in: { $add: ["$$value", "$$this.quantity"] },
                },
              },
            },
          },
        },
      ]),

      // Yearly Sales
      Order.aggregate([
        {
          $match: { 
            orderStatus: "delivered", 
            orderDate: { $gte: startOfYear } 
          },
        },
        {
          $group: {
            _id: { 
              year: { $year: "$orderDate" },  
              month: { $month: "$orderDate" }
            },
            totalAmount: { $sum: "$totalAmount" },
            totalProducts: {
              $sum: {
                $reduce: {
                  input: "$cartItems",
                  initialValue: 0,
                  in: { $add: ["$$value", "$$this.quantity"] },
                },
              },
            },
          },
        },
        { $sort: { "_id.year": 1, "_id.month": 1 } } 
      ]),
    ]);

    res.json({
      dailySales: salesData[0][0] || { totalAmount: 0, totalProducts: 0 },
      monthlySales: salesData[1][0] || { totalAmount: 0, totalProducts: 0 },
      yearlySales: salesData[2] || [],
    });
  } catch (error) {
    console.error("Error fetching sales stats:", error.message, error.stack);
    res.status(500).json({ message: "Error fetching sales data" });
  }
};

// Function to get sales graph data
const getSalesGraphData = async (req, res) => {
  try {
    const { period, month, year } = req.query; // Extract query parameters
    const matchCondition = { orderStatus: "delivered" };

    if (period === "monthly" && month && year) {
      const startOfMonth = new Date(year, month - 1, 1);
      const endOfMonth = moment(startOfMonth).endOf("month").toDate();
      matchCondition.orderDate = { $gte: startOfMonth, $lte: endOfMonth };
    } else if (period === "daily") {
      matchCondition.orderDate = {
        $gte: moment().startOf("day").toDate(),
        $lt: moment().endOf("day").toDate(),
      };
    } else if (period === "yearly" && year) {
      const startOfYear = new Date(year, 0, 1);
      const endOfYear = moment(startOfYear).endOf("year").toDate();
      matchCondition.orderDate = { $gte: startOfYear, $lte: endOfYear };
    }

    const salesGraphData = await Order.aggregate([
      { $match: matchCondition },
      {
        $group: {
          _id:
            period === "yearly"
              ? { year: { $year: "$orderDate" }, month: { $month: "$orderDate" } } 
              : period === "monthly"
              ? { year: { $year: "$orderDate" }, month: { $month: "$orderDate" }, day: { $dayOfMonth: "$orderDate" } } // ✅ FIXED: Added year
              : period === "daily"
              ? { year: { $year: "$orderDate" }, month: { $month: "$orderDate" }, day: { $dayOfMonth: "$orderDate" } } // ✅ FIXED: Full date grouping
              : null,
          totalAmount: { $sum: "$totalAmount" },
          totalProducts: {
            $sum: {
              $reduce: {
                input: "$cartItems",
                initialValue: 0,
                in: { $add: ["$$value", "$$this.quantity"] },
              },
            },
          },
        },
      },
      { $sort: { "_id.year": 1, "_id.month": 1, "_id.day": 1 } }, 
    ]);

    res.json(salesGraphData);
  } catch (error) {
    console.error("Error fetching sales graph data:", error.message, error.stack);
    res.status(500).json({ message: "Error fetching sales graph data" });
  }
};

module.exports = { getSalesStats, getSalesGraphData };
