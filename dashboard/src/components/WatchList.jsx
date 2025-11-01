import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import GeneralContext from "./GeneralContext";
import { Tooltip, Grow } from "@mui/material";
import {
  BarChartOutlined,
  KeyboardArrowDown,
  KeyboardArrowUp,
  MoreHoriz,
} from "@mui/icons-material";
import { DoughnutChart } from "./DoughnoutChart";
import {
  getMultipleStocks,
  searchStocks,
  getIndianStocksList,
  getUSStocksList
} from "../services/stockApi";

const WatchList = () => {
  const [watchlistStocks, setWatchlistStocks] = useState([]);
  const [filteredStocks, setFilteredStocks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  const { openBuyWindow, openSellWindow } = useContext(GeneralContext);

  // Default stock list (Indian stocks first, then US)
  const defaultIndianStocks = ['INFY', 'TCS', 'RELIANCE', 'WIPRO', 'ONGC', 'HUL', 'ITC', 'SBIN', 'TATAMOTORS'];
  const defaultUSStocks = ['AAPL', 'GOOGL', 'MSFT', 'TSLA', 'AMZN'];
  const allDefaultStocks = [...defaultIndianStocks, ...defaultUSStocks];

  // Fetch stock data on component mount
  useEffect(() => {
    fetchStockData();

    // Refresh every 5 minutes (to stay within API limits)
    const interval = setInterval(() => {
      fetchStockData();
    }, 5 * 60 * 1000); // 5 minutes

    return () => clearInterval(interval);
  }, []);

  // Filter stocks when search query changes
  useEffect(() => {
    if (searchQuery.trim() === '') {
      setFilteredStocks(watchlistStocks);
    } else {
      const filtered = watchlistStocks.filter(stock =>
        stock.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        stock.symbol.toLowerCase().includes(searchQuery.toLowerCase()) ||
        stock.fullName.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredStocks(filtered);
    }
  }, [searchQuery, watchlistStocks]);

  const fetchStockData = async () => {
    try {
      setIsLoading(true);
      const data = await getMultipleStocks(allDefaultStocks);

      // Separate Indian and US stocks
      const indianStocks = data.filter(stock => stock.type === 'indian');
      const usStocks = data.filter(stock => stock.type === 'us');

      // Sort each category alphabetically
      indianStocks.sort((a, b) => a.symbol.localeCompare(b.symbol));
      usStocks.sort((a, b) => a.symbol.localeCompare(b.symbol));

      // Combine: Indian stocks first, then US stocks
      const sortedData = [...indianStocks, ...usStocks];

      // Transform API data
      const transformedData = sortedData.map(stock => ({
        symbol: stock.symbol,
        name: stock.symbol,
        fullName: stock.fullName,
        type: stock.type,
        price: stock.price,
        percent: `${stock.percentChange >= 0 ? '+' : ''}${stock.percentChange.toFixed(2)}%`,
        isDown: stock.percentChange < 0,
        rawChange: stock.change,
        rawPercent: stock.percentChange
      }));

      setWatchlistStocks(transformedData);
      setFilteredStocks(transformedData);
    } catch (error) {
      console.error('Error fetching watchlist data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleBuyClick = (stock) => {
    openBuyWindow(stock.name);
  };

  const handleSellClick = (stock) => {
    openSellWindow(stock.symbol); // Use symbol
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  // Prepare data for chart
  const labels = watchlistStocks.map((stock) => stock.name);
  const chartData = {
    labels,
    datasets: [
      {
        label: "Price",
        data: watchlistStocks.map((stock) => stock.price),
        backgroundColor: [
          "rgba(255, 99, 132, 0.5)",
          "rgba(54, 162, 235, 0.5)",
          "rgba(255, 206, 86, 0.5)",
          "rgba(75, 192, 192, 0.5)",
          "rgba(153, 102, 255, 0.5)",
          "rgba(255, 159, 64, 0.5)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  if (isLoading) {
    return (
      <div className="watchlist-container">
        <div className="search-container">
          <input
            type="text"
            placeholder="Loading stocks..."
            className="search"
            disabled
          />
        </div>
      </div>
    );
  }

  return (
    <div className="watchlist-container">
      <div className="search-container">
        <input
          type="text"
          name="search"
          id="search"
          placeholder="Search stocks... (e.g., INFY, Apple, TCS)"
          className="search"
          value={searchQuery}
          onChange={handleSearch}
        />
        <span className="counts">
          {filteredStocks.length} / {watchlistStocks.length}
        </span>
      </div>

      <ul className="list">
        {/* Section Header for Indian Stocks */}
        {filteredStocks.some(stock => stock.type === 'indian') && (
          <li className="section-header" style={{
            background: '#f0f0f0',
            padding: '8px 12px',
            fontWeight: 'bold',
            fontSize: '12px',
            color: '#555',
            borderBottom: '2px solid #ddd'
          }}>
            🇮🇳 INDIAN STOCKS (NSE)
          </li>
        )}

        {/* Indian Stocks */}
        {filteredStocks
          .filter(stock => stock.type === 'indian')
          .map((stock, index) => (
            <li key={`indian-${index}`}>
              <div className="item">
                <div>
                  <p className={stock.isDown ? "down" : "up"}>{stock.symbol}</p>
                  <span style={{ fontSize: '10px', color: '#888' }}>{stock.fullName}</span>
                </div>
                <div className="itemInfo">
                  <span className="percent">{stock.percent}</span>
                  {stock.isDown ? (
                    <KeyboardArrowDown className="down" />
                  ) : (
                    <KeyboardArrowUp className="up" />
                  )}
                  <span className="price">₹{stock.price.toFixed(2)}</span>
                </div>
              </div>
              <div className="actions">
                <span>
                  <Tooltip
                    title="Buy (B)"
                    placement="top"
                    arrow
                    TransitionComponent={Grow}
                  >
                    <button
                      className="buy"
                      onClick={() => handleBuyClick(stock)}
                    >
                      Buy
                    </button>
                  </Tooltip>
                </span>
                <span>
                  <Tooltip
                    title="Sell (S)"
                    placement="top"
                    arrow
                    TransitionComponent={Grow}
                  >
                    <button
                      className="sell"
                      onClick={() => handleSellClick(stock)}
                    >
                      Sell
                    </button>
                  </Tooltip>
                </span>
                <span>
                  <Tooltip
                    title="Analytics (A)"
                    placement="top"
                    arrow
                    TransitionComponent={Grow}
                  >
                    <button className="action">
                      <BarChartOutlined className="icon" />
                    </button>
                  </Tooltip>
                </span>
                <span>
                  <Tooltip
                    title="More"
                    placement="top"
                    arrow
                    TransitionComponent={Grow}
                  >
                    <button className="action">
                      <MoreHoriz className="icon" />
                    </button>
                  </Tooltip>
                </span>
              </div>
            </li>
          ))}

        {/* Section Header for US Stocks */}
        {filteredStocks.some(stock => stock.type === 'us') && (
          <li className="section-header" style={{
            background: '#f0f0f0',
            padding: '8px 12px',
            fontWeight: 'bold',
            fontSize: '12px',
            color: '#555',
            borderBottom: '2px solid #ddd',
            marginTop: '10px'
          }}>
            🇺🇸 US STOCKS (NASDAQ/NYSE)
          </li>
        )}

        {/* US Stocks */}
        {filteredStocks
          .filter(stock => stock.type === 'us')
          .map((stock, index) => (
            <li key={`us-${index}`}>
              <div className="item">
                <div>
                  <p className={stock.isDown ? "down" : "up"}>{stock.symbol}</p>
                  <span style={{ fontSize: '10px', color: '#888' }}>{stock.fullName}</span>
                </div>
                <div className="itemInfo">
                  <span className="percent">{stock.percent}</span>
                  {stock.isDown ? (
                    <KeyboardArrowDown className="down" />
                  ) : (
                    <KeyboardArrowUp className="up" />
                  )}
                  <span className="price">${stock.price.toFixed(2)}</span>
                </div>
              </div>
              <div className="actions">
                <span>
                  <Tooltip
                    title="Buy (B)"
                    placement="top"
                    arrow
                    TransitionComponent={Grow}
                  >
                    <button
                      className="buy"
                      onClick={() => handleBuyClick(stock)}
                    >
                      Buy
                    </button>
                  </Tooltip>
                </span>
                <span>
                  <Tooltip
                    title="Sell (S)"
                    placement="top"
                    arrow
                    TransitionComponent={Grow}
                  >
                    <button
                      className="sell"
                      onClick={() => handleSellClick(stock)}
                    >
                      Sell
                    </button>
                  </Tooltip>
                </span>
                <span>
                  <Tooltip
                    title="Analytics (A)"
                    placement="top"
                    arrow
                    TransitionComponent={Grow}
                  >
                    <button className="action">
                      <BarChartOutlined className="icon" />
                    </button>
                  </Tooltip>
                </span>
                <span>
                  <Tooltip
                    title="More"
                    placement="top"
                    arrow
                    TransitionComponent={Grow}
                  >
                    <button className="action">
                      <MoreHoriz className="icon" />
                    </button>
                  </Tooltip>
                </span>
              </div>
            </li>
          ))}
      </ul>

      {filteredStocks.length === 0 && (
        <div style={{ textAlign: 'center', padding: '20px', color: '#999' }}>
          No stocks found matching "{searchQuery}"
        </div>
      )}

      <DoughnutChart data={chartData} />
    </div>
  );
};

export default WatchList;
