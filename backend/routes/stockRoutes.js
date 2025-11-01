const express = require('express');
const router = express.Router();
const fetch = require('node-fetch');

// Yahoo Finance proxy endpoint
router.get('/yahoo/:symbol', async (req, res) => {
  try {
    const symbol = req.params.symbol;
    const url = `https://query1.finance.yahoo.com/v8/finance/chart/${symbol}?interval=1d&range=1d`;
    
    console.log(`[Backend] Fetching Yahoo data for ${symbol}...`);
    
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
      }
    });
    
    if (!response.ok) {
      throw new Error(`Yahoo Finance API error: ${response.status}`);
    }
    
    const data = await response.json();
    
    console.log(`[Backend] ✅ Successfully fetched ${symbol}`);
    res.json(data);
  } catch (error) {
    console.error(`[Backend] ❌ Error fetching ${req.params.symbol}:`, error.message);
    res.status(500).json({ 
      error: 'Failed to fetch stock data',
      message: error.message 
    });
  }
});

// Finnhub proxy endpoint (optional - for consistency)
router.get('/finnhub/:symbol', async (req, res) => {
  try {
    const symbol = req.params.symbol;
    const apiKey = process.env.FINNHUB_API_KEY;
    const url = `https://finnhub.io/api/v1/quote?symbol=${symbol}&token=${apiKey}`;
    
    console.log(`[Backend] Fetching Finnhub data for ${symbol}...`);
    
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`Finnhub API error: ${response.status}`);
    }
    
    const data = await response.json();
    
    console.log(`[Backend] ✅ Successfully fetched ${symbol}`);
    res.json(data);
  } catch (error) {
    console.error(`[Backend] ❌ Error fetching ${req.params.symbol}:`, error.message);
    res.status(500).json({ 
      error: 'Failed to fetch stock data',
      message: error.message 
    });
  }
});

module.exports = router;
