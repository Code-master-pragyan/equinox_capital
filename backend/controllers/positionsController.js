const PositionsModel = require("../models/PositionsModel");

exports.getAllPositions = async (req, res) => {
  try {
    const positions = await PositionsModel.find({});
    res.json(positions);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
