const OrdersModel = require("../models/OrdersModel");

// 📦 Controller to place a new order (buy stock)
exports.placeOrder = async (req, res) => {
  try {
    const { name, qty, price, mode } = req.body;

    if (!name || !qty || !price || !mode) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newOrder = new OrdersModel({
      name,
      qty,
      price,
      mode, // buy/sell
      date: new Date(),
    });

    await newOrder.save();
    res.status(201).json({ message: "Order placed successfully", order: newOrder });
  } catch (error) {
    res.status(500).json({ message: "Failed to place order", error: error.message });
  }
};

// 📜 Controller to get all orders
exports.getAllOrders = async (req, res) => {
  try {
    const orders = await OrdersModel.find({});
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch orders", error: error.message });
  }
};
