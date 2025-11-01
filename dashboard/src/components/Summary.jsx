import React, { useState, useEffect } from "react";
import axios from "axios";
import { getStockQuote } from "../services/stockApi";

const Summary = () => {
  const [userName, setUserName] = useState("User!");
  const [portfolioData, setPortfolioData] = useState({
    totalHoldings: 0,
    totalInvestment: 0.0,
    totalCurrentValue: 0.0,
    totalPL: 0.0,
    totalPLPercentage: 0.0,
  });
  const [isLoading, setIsLoading] = useState(true);

  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3002';
  const FRONTEND_URL = import.meta.env.VITE_FRONTEND_URL || 'http://localhost:5173';

  useEffect(() => {
    const token = localStorage.getItem("token");
    const storedName = localStorage.getItem("userName");

    if (!token) {
      window.location.href = `${FRONTEND_URL}/login`;
      return;
    }

    if (storedName) setUserName(storedName);

    // Fetch portfolio summary
    const fetchSummary = async () => {
      try {
        // Fetch holdings (same as Holdings page does)
        const response = await axios.get(`${API_URL}/holdings/allholdings`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const holdings = response.data;

        // Fetch current prices and calculate totals (exactly like Holdings.jsx)
        const enriched = await Promise.all(
          holdings.map(async (h) => {
            const quote = await getStockQuote(h.name);
            const ltp = quote?.price || h.avg; // fallback to avg if quote fails
            const currentValue = h.qty * ltp;
            const investment = h.qty * h.avg;
            const pl = currentValue - investment;
            return { currentValue, investment, pl };
          })
        );

        // Sum totals
        const totalInvestment = enriched.reduce((s, h) => s + h.investment, 0);
        const totalCurrentValue = enriched.reduce((s, h) => s + h.currentValue, 0);
        const totalPL = enriched.reduce((s, h) => s + h.pl, 0);
        const totalPLPercentage = totalInvestment > 0 ? (totalPL / totalInvestment) * 100 : 0;

        setPortfolioData({
          totalHoldings: holdings.length,
          totalInvestment,
          totalCurrentValue,
          totalPL,
          totalPLPercentage,
        });
      } catch (error) {
        console.error("Error fetching summary:", error);
      } finally {
        setIsLoading(false);
      }
    };


    fetchSummary();

    // Listen for holdings updates
    const handleUpdate = () => {
      fetchSummary();
    };

    window.addEventListener("holdingsUpdated", handleUpdate);

    return () => {
      window.removeEventListener("holdingsUpdated", handleUpdate);
    };
  }, []);

  const isProfitable = parseFloat(portfolioData.totalPL) >= 0;

  // Formatting helpers (no UI change)
  const toMoney = (n) => Number(n || 0);
  const toPct = (n) => Number(n || 0);

  const withSignMoney = (n) => {
    const v = toMoney(n);
    const sign = v > 0 ? "+" : v < 0 ? "" : ""; // no minus sign needed, number already carries it
    return `${sign}₹${v.toFixed(2)}`;
  };

  const withSignPct = (n) => {
    const v = toPct(n);
    const sign = v > 0 ? "+" : v < 0 ? "" : "";
    return `${sign}${v.toFixed(2)}%`;
  };

  const money = (n) => `₹${toMoney(n).toFixed(2)}`;


  return (
    <>
      <div className="username">
        <h6>Hi, {userName}!</h6>
        <hr className="divider" />
      </div>

      <div className="section">
        <span>
          <p>Equity</p>
        </span>

        <div className="data">
          <div className="first">
            <h3>
              {isLoading ? (
                "Loading..."
              ) : (
                money(portfolioData.totalCurrentValue)
              )}
            </h3>
            <p>Margin available</p>
          </div>
          <hr />

          <div className="second">
            <p>
              Margins used <span>0</span>
            </p>
            <p>
              Opening balance <span>{money(portfolioData.totalCurrentValue)}</span>
            </p>
          </div>
        </div>

        <hr className="divider" />
      </div>

      <div className="section">
        <span>
          <p>Holdings ({portfolioData.totalHoldings})</p>
        </span>

        <div className="data">
          <div className="first">
            <h3 className={isProfitable ? "profit" : "loss"}>
              {withSignMoney(portfolioData.totalPL)}
              <small>({withSignPct(portfolioData.totalPLPercentage)})</small>
            </h3>
            <p>P&L</p>
          </div>
          <hr />

          <div className="second">
            <p>
              Current Value{" "}
              <span>{money(portfolioData.totalCurrentValue)}</span>
            </p>
            <p>
              Investment{" "}
              <span>{money(portfolioData.totalInvestment)}</span>
            </p>
          </div>
        </div>

        <hr className="divider" />
      </div>
    </>
  );
};

export default Summary;
