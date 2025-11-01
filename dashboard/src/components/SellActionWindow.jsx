import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import GeneralContext from "./GeneralContext";
import { getStockQuote } from "../services/stockApi";
import "./BuyActionWindow.css"; // Reuse same CSS

const SellActionWindow = ({ uid }) => {
    const [stockQuantity, setStockQuantity] = useState(1);
    const [stockPrice, setStockPrice] = useState(0.0);
    const [currentMarketPrice, setCurrentMarketPrice] = useState(0.0);
    const [orderType, setOrderType] = useState("market");
    const [sellType, setSellType] = useState("regular"); // 'regular' or 'intraday'
    const [isLoading, setIsLoading] = useState(false);
    const [isPriceLoading, setIsPriceLoading] = useState(true);
    const [error, setError] = useState("");

    const { closeSellWindow } = useContext(GeneralContext);

    // Fetch current market price
    useEffect(() => {
        const fetchPrice = async () => {
            console.log('[SellWindow] Fetching price for:', uid); // Debug log

            if (!uid) {
                console.error('[SellWindow] No uid provided!');
                setError("Stock symbol not provided");
                setIsPriceLoading(false);
                return;
            }
            setIsPriceLoading(true);
            try {
                const stockData = await getStockQuote(uid);
                console.log('[SellWindow] Stock data received:', stockData); // Debug log
                if (stockData) {
                    const price = stockData.price;
                    console.log('[SellWindow] Setting price:', price); // Debug log
                    setCurrentMarketPrice(price);
                    setStockPrice(price);
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

    const totalValue = (stockQuantity * stockPrice).toFixed(2);

    const handleQuantityChange = (e) => {
        const value = parseInt(e.target.value);
        if (value > 0 && value <= 10000) {
            setStockQuantity(value);
            setError("");
        } else if (value > 10000) {
            setError("Maximum quantity is 10,000");
        }
    };

    const handlePriceChange = (e) => {
        const value = parseFloat(e.target.value);
        if (value > 0) {
            setStockPrice(value);
            setError("");
        }
    };

    const handleOrderTypeChange = (type) => {
        setOrderType(type);
        if (type === "market") {
            setStockPrice(currentMarketPrice);
        }
    };

    const handleSellClick = async () => {
        if (stockQuantity <= 0) {
            setError("Quantity must be greater than 0");
            return;
        }
        if (stockPrice <= 0) {
            setError("Price must be greater than 0");
            return;
        }

        setIsLoading(true);
        setError("");

        try {
            const token = localStorage.getItem("token");
            if (!token) {
                alert("Please login first");
                window.location.href = "http://localhost:5173/login";
                return;
            }

            // API call to sell stock
            const response = await axios.post(
                "http://localhost:3002/holdings/sellstock",
                {
                    name: uid,
                    qty: stockQuantity,
                    price: stockPrice,
                    sellType: sellType, // 'regular' or 'intraday'
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            console.log("Sell response:", response.data);

            alert(`✅ Successfully sold ${stockQuantity} shares of ${uid} at ₹${stockPrice}!\n\nTotal: ₹${totalValue}`);

            closeSellWindow();
            window.dispatchEvent(new Event("holdingsUpdated"));

        } catch (error) {
            console.error("Error selling stock:", error);
            setError(error.response?.data?.error || "Failed to sell stock");
        } finally {
            setIsLoading(false);
        }
    };

    const handleCancelClick = () => {
        closeSellWindow();
    };

    return (
        <div className="container" style={{ borderTop: "3px solid #e74c3c" }}>
            {/* Header - Red theme for SELL */}
            <div className="header" style={{ background: "#e74c3c" }}>
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
                <button
                    style={{
                        color: sellType === "regular" ? "#e74c3c" : "#666",
                        fontWeight: sellType === "regular" ? "bold" : "normal",
                    }}
                    onClick={() => setSellType("regular")}
                >
                    Regular
                </button>
                <button
                    style={{
                        color: sellType === "intraday" ? "#e74c3c" : "#666",
                        fontWeight: sellType === "intraday" ? "bold" : "normal",
                    }}
                    onClick={() => setSellType("intraday")}
                >
                    Intraday
                </button>
            </div>

            {/* Order Form */}
            <div className="regular-order">
                {/* Current Price Display */}
                {isPriceLoading ? (
                    <div style={{
                        padding: "10px",
                        background: "#fff5f5",
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
                        background: "#fff5f5",
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
                            color: "#e74c3c"
                        }}>
                            ₹{currentMarketPrice.toFixed(2)}
                        </span>
                    </div>
                )}

                {/* Sell Type Info */}
                <div style={{
                    padding: "8px",
                    background: "#fff9e6",
                    borderRadius: "4px",
                    marginBottom: "16px",
                    fontSize: "0.75rem",
                    color: "#856404"
                }}>
                    {sellType === "regular" ? (
                        <>📌 <strong>Regular Sell:</strong> Selling owned shares from your holdings</>
                    ) : (
                        <>⚡ <strong>Intraday Sell:</strong> Short selling (must buy back today)</>
                    )}
                </div>

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

                {/* Inputs */}
                <div className="inputs">
                    <fieldset>
                        <legend>Qty.</legend>
                        <input
                            type="number"
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
                                color: "#e74c3c",
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
                        Day
                    </label>
                    <label htmlFor="ioc">
                        <input
                            type="radio"
                            id="ioc"
                            name="validity"
                            value="ioc"
                            disabled={isLoading}
                        />
                        IOC
                    </label>
                </div>
            </div>

            {/* Action Buttons */}
            <div className="buttons">
                <span>Proceeds ₹{totalValue}</span>
                <div>
                    <a
                        href="#"
                        className="btn btn-grey"
                        onClick={(e) => {
                            e.preventDefault();
                            handleCancelClick();
                        }}
                    >
                        Cancel
                    </a>
                    <a
                        href="#"
                        className="btn btn-red"
                        onClick={(e) => {
                            e.preventDefault();
                            if (!isLoading) handleSellClick();
                        }}
                        style={{
                            background: "#e74c3c",
                            opacity: isLoading || isPriceLoading ? 0.5 : 1,
                            cursor: isLoading || isPriceLoading ? "not-allowed" : "pointer"
                        }}
                    >
                        {isLoading ? "Processing..." : "Sell"}
                    </a>
                </div>
            </div>
        </div>
    );
};

export default SellActionWindow;
