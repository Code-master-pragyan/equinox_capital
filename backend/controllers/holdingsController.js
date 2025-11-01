const HoldingsModel = require("../models/HoldingsModel");
const { getLivePriceForHoldingName } = require("../utils/quoteService");
const OrdersModel = require("../models/OrdersModel");
const User = require("../models/UsersModel");

// Get all holdings for a specific user
exports.getAllHoldings = async (req, res) => {
  try {
    const userId = req.userId; // Set by auth middleware

    if (!userId) {
      return res.status(401).json({ error: "User not authenticated" });
    }

    const holdings = await HoldingsModel.find({ user: userId });
    res.json(holdings);
  } catch (err) {
    console.error("Error fetching holdings:", err);
    res.status(500).json({ error: err.message });
  }
};

// Create or update holding when user buys stock
exports.buyStock = async (req, res) => {
  try {
    const { name, qty, price } = req.body;
    const userId = req.userId; // From auth middleware

    if (!userId || !name || !qty || !price) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    // Create order record
    const order = new OrdersModel({
      name,
      qty,
      price,
      mode: "BUY",
      user: userId
    });
    await order.save();

    // Check if user already has this stock in holdings
    let holding = await HoldingsModel.findOne({ name, user: userId });

    if (holding) {
      // Update existing holding - calculate new average price
      const totalQty = holding.qty + qty;
      const totalInvestment = (holding.avg * holding.qty) + (price * qty);
      const newAvg = totalInvestment / totalQty;

      holding.qty = totalQty;
      holding.avg = newAvg;
      holding.price = price; // Update current price

      // Calculate net change percentage
      const netChange = ((price - newAvg) / newAvg) * 100;
      holding.net = netChange.toFixed(2) + "%";

      // For now, set day change to 0 (you can update this with real-time data)
      holding.day = "+0.00%";

      await holding.save();
    } else {
      // Create new holding
      holding = new HoldingsModel({
        name,
        qty,
        avg: price,
        price: price,
        net: "+0.00%",
        day: "+0.00%",
        user: userId
      });
      await holding.save();

      // Add holding reference to user
      await User.findByIdAndUpdate(userId, {
        $push: { holdings: holding._id }
      });
    }

    res.status(201).json({
      success: true,
      message: "Stock purchased successfully",
      holding,
      order
    });
  } catch (err) {
    console.error("Error buying stock:", err);
    res.status(500).json({ error: err.message });
  }
};

exports.sellstock = async (req, res) => {
  try {
    const { name, qty, price, sellType } = req.body;
    const userId = req.userId;

    console.log(`[Sell] User ${userId} selling ${qty} shares of ${name} at ₹${price}`);

    if (sellType === 'regular') {
      // Regular sell - check if user owns the stock
      const existingHolding = await HoldingsModel.findOne({
        name: name,
        user: userId
      });

      if (!existingHolding) {
        return res.status(400).json({
          error: "You don't own this stock"
        });
      }

      if (existingHolding.qty < qty) {
        return res.status(400).json({
          error: `Insufficient quantity. You own ${existingHolding.qty} shares`
        });
      }

      // Create sell order record
      const order = new OrdersModel({
        name,
        qty,
        price,
        mode: "SELL",
        user: userId
      });
      await order.save();

      // Reduce quantity or delete if selling all
      if (existingHolding.qty === qty) {
        await HoldingsModel.deleteOne({ _id: existingHolding._id });
        console.log(`[Sell] Sold all ${qty} shares, holding deleted`);

        return res.json({ // ✅ FIX: Add return
          success: true,
          message: `Sold all ${qty} shares of ${name}`,
          remaining: 0
        });
      } else {
        existingHolding.qty -= qty;
        await existingHolding.save();
        console.log(`[Sell] Reduced holding by ${qty}, remaining: ${existingHolding.qty}`);

        return res.json({ // ✅ FIX: Add return
          success: true,
          message: `Sold ${qty} shares of ${name}`,
          remaining: existingHolding.qty
        });
      }

    } else if (sellType === 'intraday') {
      // Intraday sell (short selling)
      // Create order record for tracking
      const order = new OrdersModel({
        name,
        qty,
        price,
        mode: "SELL_INTRADAY",
        user: userId
      });
      await order.save();

      console.log(`[Sell] Intraday short sell: ${qty} shares of ${name}`);
      res.json({
        success: true,
        message: `Intraday sell order placed for ${qty} shares of ${name}`
      });
    } else {
      res.status(400).json({ error: 'Invalid sell type' });
    }

  } catch (error) {
    console.error('[Sell] Error:', error);
    res.status(500).json({ error: 'Failed to sell stock' });
  }
}

// Get portfolio summary
exports.getPortfolioSummary = async (req, res) => {
  try {
    const userId = req.userId;
    if (!userId) {
      return res.status(401).json({ error: "User not authenticated" });
    }

    const holdings = await HoldingsModel.find({ user: userId });

    // Fetch live prices in parallel with graceful fallback to stored price
    const priced = await Promise.all(
      holdings.map(async (h) => {
        try {
          const live = await getLivePriceForHoldingName(h.name);
          return { qty: Number(h.qty) || 0, avg: Number(h.avg) || 0, live: Number(live) || Number(h.price) || 0 };
        } catch {
          return { qty: Number(h.qty) || 0, avg: Number(h.avg) || 0, live: Number(h.price) || 0 };
        }
      })
    );

    // Compute totals with the exact same math as Holdings
    let totalInvestment = 0;
    let totalCurrentValue = 0;

    for (const row of priced) {
      totalInvestment += row.qty * row.avg;
      totalCurrentValue += row.qty * row.live;
    }

    const totalPL = totalCurrentValue - totalInvestment;
    const totalPLPercentage = totalInvestment > 0 ? (totalPL / totalInvestment) * 100 : 0;

    // Return raw numbers; your existing Summary UI will format with toFixed
    res.json({
      totalHoldings: holdings.length,
      totalInvestment,
      totalCurrentValue,
      totalPL,
      totalPLPercentage
    });
  } catch (err) {
    console.error("Error fetching summary:", err);
    res.status(500).json({ error: err.message });
  }
};

