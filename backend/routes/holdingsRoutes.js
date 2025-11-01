const express = require('express');
const router = express.Router();
const { getAllHoldings, buyStock, sellstock, getPortfolioSummary } = require('../controllers/holdingsController');
const authMiddleware = require('../middleware/authMiddleware');

// Protected routes - require authentication
router.get('/allholdings', authMiddleware, getAllHoldings);
router.post('/buystock', authMiddleware, buyStock);
router.post('/sellstock', authMiddleware , sellstock);
router.get('/portfolio-summary', authMiddleware, getPortfolioSummary);

module.exports = router;
