import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { VerticalGraph } from "./VerticalGraph";
import { getStockQuote } from "../services/stockApi";
import GeneralContext from "./GeneralContext";

const Holdings = () => {
    const [allHoldings, setAllHoldings] = useState([]);
    const [isLoading, setIsLoading] = useState(true);


    const { openSellWindow } = useContext(GeneralContext);

    const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3002';
    const FRONTEND_URL = import.meta.env.VITE_FRONTEND_URL || 'http://localhost:5173';

    const fetchHoldings = async () => {
        try {
            const token = localStorage.getItem("token");

            if (!token) {
                window.location.href = `${FRONTEND_URL}/login`;
                return;
            }

            const response = await axios.get(
                `${API_URL}/holdings/allholdings`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            const holdings = response.data;

            // Fetch current prices for all holdings
            const updatedHoldings = await Promise.all(
                holdings.map(async (holding) => {
                    const currentData = await getStockQuote(holding.name);

                    if (currentData) {
                        // Update with real-time price
                        const currentPrice = currentData.price;
                        const currentValue = holding.qty * currentPrice;
                        const investment = holding.qty * holding.avg;
                        const pl = currentValue - investment;
                        const netChangePercent = ((currentPrice - holding.avg) / holding.avg) * 100;
                        const dayChangePercent = currentData.percentChange;

                        return {
                            ...holding,
                            price: currentPrice,
                            currentValue,
                            pl,
                            net: `${netChangePercent >= 0 ? '+' : ''}${netChangePercent.toFixed(2)}%`,
                            day: `${dayChangePercent >= 0 ? '+' : ''}${dayChangePercent.toFixed(2)}%`
                        };
                    }

                    return holding;
                })
            );

            setAllHoldings(updatedHoldings);
        } catch (error) {
            console.error("Error fetching holdings:", error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchHoldings();

        // Refresh every 5 minutes
        const interval = setInterval(() => {
            fetchHoldings();
        }, 2 * 60 * 1000);

        // Listen for holdings updates
        const handleUpdate = () => {
            fetchHoldings();
        };

        window.addEventListener("holdingsUpdated", handleUpdate);

        return () => {
            clearInterval(interval);
            window.removeEventListener("holdingsUpdated", handleUpdate);
        };
    }, []);

    // Calculate totals
    const totalInvestment = allHoldings.reduce(
        (acc, stock) => acc + stock.avg * stock.qty,
        0
    );

    const totalCurrentValue = allHoldings.reduce(
        (acc, stock) => acc + (stock.currentValue || stock.price * stock.qty),
        0
    );

    const totalPL = totalCurrentValue - totalInvestment;

    if (isLoading) {
        return <div className="text-center p-5">Loading holdings...</div>;
    }

    if (allHoldings.length === 0) {
        return (
            <div className="text-center p-5">
                <h3>No holdings yet</h3>
                <p>Buy some stocks to see them here!</p>
            </div>
        );
    }

    // Create data for chart
    const data = allHoldings.map(stock => ({
        label: stock.name,
        value: Number((stock.price * stock.qty).toFixed(2))
    }));

    const chartData = {
        labels: data.map(d => d.label),
        datasets: [
            {
                label: "Current value",
                data: data.map(d => d.value),
                backgroundColor: data.map((_, i) =>
                    ["#4e79a7", "#f28e2b", "#e15759", "#76b7b2", "#59a14f", "#edc949"][i % 6]
                ),
                borderWidth: 0
            }
        ]
    };

    return (
        <>
            <div className="holdings">
                <h3 className="title">Holdings ({allHoldings.length})</h3>

                <div className="order-table">
                    <table>
                        <thead>
                            <tr>
                                <th>Instrument</th>
                                <th>Qty.</th>
                                <th>Avg. cost</th>
                                <th>LTP</th>
                                <th>Cur. val</th>
                                <th>P&L</th>
                                <th>Net chg.</th>
                                <th>Day chg.</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {allHoldings.map((stock, index) => {
                                const curValue = stock.price * stock.qty;
                                const pl = curValue - stock.avg * stock.qty;

                                return (
                                    <tr key={index}>
                                        <td>{stock.name}</td>
                                        <td>{stock.qty}</td>
                                        <td>{stock.avg.toFixed(2)}</td>
                                        <td>{stock.price.toFixed(2)}</td>
                                        <td>{curValue.toFixed(2)}</td>
                                        <td className={pl >= 0 ? "profit" : "loss"}>
                                            {pl.toFixed(2)}
                                        </td>
                                        <td className={stock.net.includes("+") ? "profit" : "loss"}>
                                            {stock.net}
                                        </td>
                                        <td className={stock.day.includes("+") ? "profit" : "loss"}>
                                            {stock.day}
                                        </td>
                                        <td>
                                            {/* ✅ Add Sell Button */}
                                            <button
                                                onClick={() => openSellWindow(stock.name)}
                                                style={{
                                                    padding: "4px 12px",
                                                    background: "#e74c3c",
                                                    color: "white",
                                                    border: "none",
                                                    borderRadius: "4px",
                                                    cursor: "pointer",
                                                    fontSize: "0.85rem"
                                                }}
                                            >
                                                Sell
                                            </button>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>

                <div className="row">
                    <div className="col">
                        <h5>
                            Total investment{" "}
                            <span className="value">₹{totalInvestment.toFixed(2)}</span>
                        </h5>
                    </div>
                    <div className="col">
                        <h5>
                            Current value{" "}
                            <span className="value">₹{totalCurrentValue.toFixed(2)}</span>
                        </h5>
                    </div>
                    <div className="col">
                        <h5>
                            P&L{" "}
                            <span className={totalPL >= 0 ? "profit value" : "loss value"}>
                                ₹{totalPL.toFixed(2)}
                            </span>
                        </h5>
                    </div>
                </div>

                <VerticalGraph data={chartData} />
            </div>
        </>
    );
};

export default Holdings;
