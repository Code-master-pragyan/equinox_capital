// backend/utils/quoteService.js
const fetch = require('node-fetch');

const cache = new Map();
const TTL = 60 * 1000; // 60s cache

function setCache(key, value) { cache.set(key, { value, ts: Date.now() }); }
function getCache(key) {
  const item = cache.get(key);
  if (!item) return null;
  if (Date.now() - item.ts > TTL) { cache.delete(key); return null; }
  return item.value;
}

// Map your holding name to quote symbol and market
function mapToQuoteSymbol(name) {
  const upper = (name || '').toUpperCase();
  const US = ['AAPL','GOOGL','MSFT','TSLA','AMZN','META','NVDA'];
  if (US.includes(upper)) return { market: 'US', symbol: upper };
  return { market: 'IN', symbol: `${upper}.NS` };
}

async function getUSQuote(symbol) {
  const key = `US:${symbol}`;
  const fromCache = getCache(key);
  if (fromCache) return fromCache;
  const res = await fetch(`http://localhost:3002/api/stocks/finnhub/${symbol}`);
  if (!res.ok) throw new Error(`Finnhub ${symbol} ${res.status}`);
  const data = await res.json();
  const price = Number(data?.c) || 0;
  setCache(key, price);
  return price;
}

async function getINQuote(symbolDotNS) {
  const key = `IN:${symbolDotNS}`;
  const fromCache = getCache(key);
  if (fromCache) return fromCache;
  const res = await fetch(`http://localhost:3002/api/stocks/yahoo/${symbolDotNS}`, {
    headers: { 'User-Agent': 'Mozilla/5.0' }
  });
  if (!res.ok) throw new Error(`Yahoo ${symbolDotNS} ${res.status}`);
  const data = await res.json();
  const result = data?.chart?.result?.[0];
  const price = Number(result?.meta?.regularMarketPrice || result?.meta?.previousClose) || 0;
  setCache(key, price);
  return price;
}

async function getLivePriceForHoldingName(name) {
  const { market, symbol } = mapToQuoteSymbol(name);
  return market === 'US' ? getUSQuote(symbol) : getINQuote(symbol);
}

module.exports = { getLivePriceForHoldingName };
