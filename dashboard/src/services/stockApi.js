// Stock Market API Service - Hybrid: Finnhub (US) + Yahoo Finance (Indian)

const BACKEND_URL = 'http://localhost:3002';

// Indian stocks configuration
const INDIAN_STOCKS = {
    'INFY': { name: 'Infosys', symbol: 'INFY.NS', type: 'indian' },
    'TCS': { name: 'TCS', symbol: 'TCS.NS', type: 'indian' },
    'RELIANCE': { name: 'Reliance Industries', symbol: 'RELIANCE.NS', type: 'indian' },
    'WIPRO': { name: 'Wipro', symbol: 'WIPRO.NS', type: 'indian' },
    'ONGC': { name: 'ONGC', symbol: 'ONGC.NS', type: 'indian' },
    'HUL': { name: 'Hindustan Unilever', symbol: 'HINDUNILVR.NS', type: 'indian' },
    'M&M': { name: 'Mahindra & Mahindra', symbol: 'M&M.NS', type: 'indian' },
    'KPITTECH': { name: 'KPIT Technologies', symbol: 'KPITTECH.NS', type: 'indian' },
    'QUICKHEAL': { name: 'Quick Heal', symbol: 'QUICKHEAL.NS', type: 'indian' },
    'TATAMOTORS': { name: 'Tata Motors', symbol: 'TATAMOTORS.NS', type: 'indian' },
    'HDFC': { name: 'HDFC Bank', symbol: 'HDFCBANK.NS', type: 'indian' },
    'ICICI': { name: 'ICICI Bank', symbol: 'ICICIBANK.NS', type: 'indian' },
    'SBIN': { name: 'State Bank of India', symbol: 'SBIN.NS', type: 'indian' }, // New
    'BHARTIARTL': { name: 'Bharti Airtel', symbol: 'BHARTIARTL.NS', type: 'indian' }, // New
    'ITC': { name: 'ITC Limited', symbol: 'ITC.NS', type: 'indian' }, // New
    'LT': { name: 'Larsen & Toubro', symbol: 'LT.NS', type: 'indian' }, // New
    'AXISBANK': { name: 'Axis Bank', symbol: 'AXISBANK.NS', type: 'indian' }, // New
    'KOTAKBANK': { name: 'Kotak Mahindra Bank', symbol: 'KOTAKBANK.NS', type: 'indian' }, // New
    'MARUTI': { name: 'Maruti Suzuki', symbol: 'MARUTI.NS', type: 'indian' }, // New
    'SUNPHARMA': { name: 'Sun Pharma', symbol: 'SUNPHARMA.NS', type: 'indian' }, // New
    'ASIANPAINT': { name: 'Asian Paints', symbol: 'ASIANPAINT.NS', type: 'indian' } // New

};

// US stocks configuration
const US_STOCKS = {
    'AAPL': { name: 'Apple Inc.', symbol: 'AAPL', type: 'us' },
    'GOOGL': { name: 'Alphabet Inc.', symbol: 'GOOGL', type: 'us' },
    'MSFT': { name: 'Microsoft Corp.', symbol: 'MSFT', type: 'us' },
    'TSLA': { name: 'Tesla Inc.', symbol: 'TSLA', type: 'us' },
    'AMZN': { name: 'Amazon.com Inc.', symbol: 'AMZN', type: 'us' },
    'META': { name: 'Meta Platforms', symbol: 'META', type: 'us' },
    'NVDA': { name: 'NVIDIA Corp.', symbol: 'NVDA', type: 'us' }
};

// Combined stock database
const ALL_STOCKS = { ...INDIAN_STOCKS, ...US_STOCKS };

// Check if stock is Indian
const isIndianStock = (symbol) => {
    return INDIAN_STOCKS.hasOwnProperty(symbol.toUpperCase());
};

// Yahoo Finance API (for Indian stocks)
export const getYahooQuote = async (symbol) => {
    try {
        const stockConfig = INDIAN_STOCKS[symbol.toUpperCase()];
        if (!stockConfig) {
            console.error(`${symbol} not found in Indian stocks config`);
            return null;
        }

        const yahooSymbol = stockConfig.symbol;

        // ✅ Call backend proxy
        const url = `${BACKEND_URL}/api/stocks/yahoo/${yahooSymbol}`;

        console.log(`📊 Fetching ${symbol} (Indian) via backend...`);

        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        if (!data.chart || !data.chart.result || data.chart.result.length === 0) {
            console.error(`No data found for ${symbol}`);
            return null;
        }

        const result = data.chart.result[0];
        const quote = result.meta;

        const currentPrice = quote.regularMarketPrice || quote.previousClose;
        const previousClose = quote.previousClose || quote.chartPreviousClose;
        const change = currentPrice - previousClose;
        const percentChange = (change / previousClose) * 100;

        return {
            symbol: symbol.toUpperCase(),
            fullName: stockConfig.name,
            type: 'indian',
            price: currentPrice,
            change: change,
            percentChange: percentChange,
            high: quote.regularMarketDayHigh,
            low: quote.regularMarketDayLow,
            open: quote.regularMarketOpen,
            previousClose: previousClose
        };
    } catch (error) {
        console.error(`❌ Error fetching Yahoo quote for ${symbol}:`, error);
        return null;
    }
};

// Finnhub via Backend (for US stocks)
export const getFinnhubQuote = async (symbol) => {
    try {
        const stockConfig = US_STOCKS[symbol.toUpperCase()];
        if (!stockConfig) {
            console.error(`${symbol} not found in US stocks config`);
            return null;
        }

        // ✅ Call backend proxy
        const url = `${BACKEND_URL}/api/stocks/finnhub/${stockConfig.symbol}`;

        console.log(`📈 Fetching ${symbol} (US) via backend...`);

        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        // Check if data is valid
        if (data.c === 0 && data.d === 0 && data.dp === 0) {
            console.error(`No valid data for ${symbol}`);
            return null;
        }

        return {
            symbol: symbol.toUpperCase(),
            fullName: stockConfig.name,
            type: 'us',
            price: data.c,
            change: data.d,
            percentChange: data.dp,
            high: data.h,
            low: data.l,
            open: data.o,
            previousClose: data.pc
        };
    } catch (error) {
        console.error(`❌ Error fetching Finnhub quote for ${symbol}:`, error);
        return null;
    }
};

// Smart quote fetcher
export const getStockQuote = async (symbol) => {
    const upperSymbol = symbol.toUpperCase();

    if (isIndianStock(upperSymbol)) {
        return await getYahooQuote(upperSymbol);
    } else if (US_STOCKS[upperSymbol]) {
        return await getFinnhubQuote(upperSymbol);
    } else {
        console.error(`Stock ${symbol} not found in database`);
        return null;
    }
};

// Get multiple stocks data
export const getMultipleStocks = async (symbols) => {
    try {
        console.log('🔄 Fetching stocks:', symbols);

        const promises = symbols.map(symbol => getStockQuote(symbol));
        const results = await Promise.all(promises);

        const validResults = results.filter(result => {
            if (result === null) {
                return false;
            }
            console.log(`✅ ${result.symbol} (${result.type.toUpperCase()}): ${result.type === 'indian' ? '₹' : '$'}${result.price.toFixed(2)} (${result.percentChange >= 0 ? '+' : ''}${result.percentChange.toFixed(2)}%)`);
            return true;
        });

        console.log(`✅ Successfully fetched ${validResults.length} out of ${symbols.length} stocks`);

        return validResults;
    } catch (error) {
        console.error('❌ Error fetching multiple stocks:', error);
        return [];
    }
};

// Search stocks by name or symbol
export const searchStocks = (query) => {
    if (!query || query.trim().length === 0) {
        return [];
    }

    const searchTerm = query.toLowerCase().trim();

    const results = Object.entries(ALL_STOCKS)
        .filter(([symbol, config]) => {
            return (
                symbol.toLowerCase().includes(searchTerm) ||
                config.name.toLowerCase().includes(searchTerm)
            );
        })
        .map(([symbol, config]) => ({
            symbol: symbol,
            name: config.name,
            type: config.type
        }));

    return results;
};

// Export stock lists
export const getIndianStocksList = () => Object.keys(INDIAN_STOCKS);
export const getUSStocksList = () => Object.keys(US_STOCKS);
export const getAllAvailableStocks = () => {
    return Object.entries(ALL_STOCKS).map(([symbol, config]) => ({
        symbol: symbol,
        name: config.name,
        type: config.type
    }));
};
