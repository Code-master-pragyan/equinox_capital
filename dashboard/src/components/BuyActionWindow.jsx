import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import GeneralContext from "./GeneralContext";
import { getStockQuote } from "../services/stockApi";
import "./BuyActionWindow.css";

const BuyActionWindow = ({ uid }) => {
  const [stockQuantity, setStockQuantity] = useState(1);
  const [stockPrice, setStockPrice] = useState(0.0);
  const [currentMarketPrice, setCurrentMarketPrice] = useState(0.0);
  const [orderType, setOrderType] = useState("market"); // 'market' or 'limit'
  const [isLoading, setIsLoading] = useState(false);
  const [isPriceLoading, setIsPriceLoading] = useState(true);
  const [error, setError] = useState("");

  // ✅ FIX: Use useContext to access the context
  const { closeBuyWindow } = useContext(GeneralContext);

  // Fetch current market price
  useEffect(() => {
    const fetchPrice = async () => {
      setIsPriceLoading(true);
      try {
        const stockData = await getStockQuote(uid);
        if (stockData) {
          const price = stockData.price;
          setCurrentMarketPrice(price);
          setStockPrice(price); // Set default price
        }
      } catch (error) {
        console.error("Error fetching price:", error);
        setError("Could not fetch current price");
      } finally {
        setIsPriceLoading(false);
      }
    };

    fetchPrice();
  }, [uid]);

  // Calculate total value
  const totalValue = (stockQuantity * stockPrice).toFixed(2);

  // Handle quantity change with validation
  const handleQuantityChange = (e) => {
    const value = parseInt(e.target.value);
    if (value > 0 && value <= 10000) {
      setStockQuantity(value);
      setError("");
    } else if (value > 10000) {
      setError("Maximum quantity is 10,000");
    }
  };

  // Handle price change with validation
  const handlePriceChange = (e) => {
    const value = parseFloat(e.target.value);
    if (value > 0) {
      setStockPrice(value);
      setError("");
    }
  };

  // Handle order type change
  const handleOrderTypeChange = (type) => {
    setOrderType(type);
    if (type === "market") {
      setStockPrice(currentMarketPrice);
    }
  };

  const handleBuyClick = async () => {
    // Validation
    if (stockQuantity <= 0) {
      setError("Quantity must be greater than 0");
      return;
    }
    if (stockPrice <= 0) {
      setError("Price must be greater than 0");
      return;
    }
    if (stockQuantity > 10000) {
      setError("Maximum quantity is 10,000");
      return;
    }
    setIsLoading(true);
    setError("");

    try {
      // Get token from localStorage
      const token = localStorage.getItem("token");

      if (!token) {
        alert("Please login first");
        window.location.href = "http://localhost:5173/login";
        return;
      }

      // Send buy request with auth token
      const response = await axios.post(
        "http://localhost:3002/holdings/buystock",
        {
          name: uid,
          qty: stockQuantity,
          price: stockPrice,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("Buy response:", response.data);
      alert(`✅ Successfully bought ${stockQuantity} shares of ${uid} at ₹${stockPrice}!\n\nTotal: ₹${totalValue}`);

      // ✅ FIX: Close window using context function
      closeBuyWindow();

      // Trigger refresh of holdings
      window.dispatchEvent(new Event("holdingsUpdated"));


    } catch (error) {
      console.error("Error buying stock:", error);
      alert(error.response?.data?.error || "Failed to buy stock");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancelClick = () => {
    // ✅ FIX: Close window using context function
    closeBuyWindow();
  };

  return (
    <div className="container">
      {/* Header */}
      <div className="header">
        <h3>
          {uid} <span>NSE</span>
        </h3>
        <div className="market-options">
          <label>
            <input
              type="radio"
              name="order-type"
              value="market"
              checked={orderType === "market"}
              onChange={() => handleOrderTypeChange("market")}
              disabled={isLoading}
            />
            Market
          </label>
          <label>
            <input
              type="radio"
              name="order-type"
              value="limit"
              checked={orderType === "limit"}
              onChange={() => handleOrderTypeChange("limit")}
              disabled={isLoading}
            />
            Limit
          </label>
        </div>
      </div>

      {/* Tabs */}
      <div className="tab">
        <button style={{ color: "#4184f3", fontWeight: "bold" }}>
          Regular
        </button>
        <button>Cover</button>
        <button>AMO</button>
      </div>

      {/* Order Form */}
      <div className="regular-order">
        {/* Current Price Display */}
        {isPriceLoading ? (
          <div style={{
            padding: "10px",
            background: "#f0f8ff",
            borderRadius: "4px",
            marginBottom: "16px",
            textAlign: "center",
            fontSize: "0.85rem",
            color: "#666"
          }}>
            Loading current price...
          </div>
        ) : (
          <div style={{
            padding: "10px",
            background: "#f0f8ff",
            borderRadius: "4px",
            marginBottom: "16px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center"
          }}>
            <span style={{ fontSize: "0.85rem", color: "#666" }}>
              Current Market Price:
            </span>
            <span style={{
              fontSize: "1.1rem",
              fontWeight: "bold",
              color: "#4184f3"
            }}>
              ₹{currentMarketPrice.toFixed(2)}
            </span>
          </div>
        )}

        {/* Error Message */}
        {error && (
          <div style={{
            padding: "10px",
            background: "#fff0f0",
            border: "1px solid #ffcccc",
            borderRadius: "4px",
            marginBottom: "16px",
            color: "#d32f2f",
            fontSize: "0.85rem"
          }}>
            ⚠️ {error}
          </div>
        )}

        {/* Quantity and Price Inputs */}
        <div className="inputs">
          <fieldset>
            <legend>Qty.</legend>
            <input
              type="number"
              name="qty"
              id="qty"
              value={stockQuantity}
              onChange={handleQuantityChange}
              min="1"
              max="10000"
              disabled={isLoading}
            />
          </fieldset>
          <fieldset>
            <legend>Price</legend>
            <input
              type="number"
              name="price"
              id="price"
              step="0.05"
              value={stockPrice}
              onChange={handlePriceChange}
              disabled={isLoading || orderType === "market"}
            />
          </fieldset>
          <fieldset>
            <legend style={{ color: "#999" }}>Total</legend>
            <input
              type="text"
              value={`₹${totalValue}`}
              disabled
              style={{
                color: "#4184f3",
                fontWeight: "bold",
                background: "#f9f9f9"
              }}
            />
          </fieldset>
        </div>

        {/* Order Validity */}
        <div className="order-validity">
          <label htmlFor="day">
            <input
              type="radio"
              id="day"
              name="validity"
              value="day"
              defaultChecked
              disabled={isLoading}
            />
            Day <span>(Intraday)</span>
          </label>
          <label htmlFor="ioc">
            <input
              type="radio"
              id="ioc"
              name="validity"
              value="ioc"
              disabled={isLoading}
            />
            IOC <span>(Immediate or Cancel)</span>
          </label>
        </div>

        {/* Additional Options */}
        <div className="options">
          <span>+ SL</span>
          <span>+ Target</span>
          <span>+ GTT</span>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="buttons">
        <span>Margin required ₹{totalValue}</span>
        <div>
          <a
            href="#"
            className="btn btn-grey"
            onClick={(e) => {
              e.preventDefault();
              handleCancelClick();
            }}
            style={{ opacity: isLoading ? 0.5 : 1 }}
          >
            Cancel
          </a>
          <a
            href="#"
            className="btn btn-blue"
            onClick={(e) => {
              e.preventDefault();
              if (!isLoading) handleBuyClick();
            }}
            style={{
              opacity: isLoading || isPriceLoading ? 0.5 : 1,
              cursor: isLoading || isPriceLoading ? "not-allowed" : "pointer",
              pointerEvents: isLoading || isPriceLoading ? "none" : "auto"
            }}
          >
            {isLoading ? "Processing..." : "Buy"}
          </a>
        </div>
      </div>
    </div>
  );
};

export default BuyActionWindow;
