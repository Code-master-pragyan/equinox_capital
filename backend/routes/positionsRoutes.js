const express = require("express");
const router = express.Router();
const auth = require('../middleware/authMiddleware');
const { getAllPositions } = require("../controllers/positionsController");

// GET all positions
router.get("/", getAllPositions);

module.exports = router;
