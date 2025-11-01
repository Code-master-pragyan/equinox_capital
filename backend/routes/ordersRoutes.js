const express = require("express");
const router = express.Router();
const { placeOrder, getAllOrders } = require("../controllers/ordersController");

// POST - Buy stock
router.post("/", placeOrder);

// GET - Show all orders
router.get("/", getAllOrders);

module.exports = router;
