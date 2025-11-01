// src/components/Positions.jsx
import React, { useEffect, useState } from "react";

const money = (n) => `₹${Number(n || 0).toFixed(2)}`;
const pct = (n) => `${Number(n || 0).toFixed(2)}%`;

const Positions = () => {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);

  // Dummy positions to show UI
  const DUMMY = [
    {
      _id: "p1",
      symbol: "RELIANCE.NS",
      side: "LONG",
      qty: 10,
      avg: 2400.5,
      lastPrice: 2425.8,
      mtmPL: (2425.8 - 2400.5) * 10, // 253.0
      mtmPct: ((2425.8 - 2400.5) * 10) / (2400.5 * 10) * 100,
      realizedPL: 0
    },
    {
      _id: "p2",
      symbol: "TCS.NS",
      side: "SHORT",
      qty: 5,
      avg: 3920.0,
      lastPrice: 3895.0,
      mtmPL: (3920 - 3895) * 5, // 125.0
      mtmPct: ((3920 - 3895) * 5) / (3920 * 5) * 100,
      realizedPL: 0
    },
    {
      _id: "p3",
      symbol: "AAPL",
      side: "LONG",
      qty: 2,
      avg: 220.15,
      lastPrice: 217.80,
      mtmPL: (217.8 - 220.15) * 2, // -4.70
      mtmPct: ((217.8 - 220.15) * 2) / (220.15 * 2) * 100,
      realizedPL: 15.5
    }
  ];

  useEffect(() => {
    // Simulate async load to keep UX consistent
    const t = setTimeout(() => {
      setRows(DUMMY);
      setLoading(false);
    }, 300);
    return () => clearTimeout(t);
  }, []);

  const totalMTM = rows.reduce((s, r) => s + Number(r.mtmPL || 0), 0);
  const totalRealized = rows.reduce((s, r) => s + Number(r.realizedPL || 0), 0);

  return (
    <div className="section">
      <span><p>Positions ({rows.length})</p></span>
      <div className="data">
        {loading ? (
          <div>Loading...</div>
        ) : (
          <div className="order-table">
            <table>
              <thead>
                <tr>
                  <th>Instrument</th>
                  <th>Side</th>
                  <th>Qty</th>
                  <th>Avg</th>
                  <th>LTP</th>
                  <th>MTM P&L</th>
                  <th>%</th>
                  <th>Realized</th>
                </tr>
              </thead>
              <tbody>
                {rows.length === 0 ? (
                  <tr>
                    <td colSpan="8" style={{ textAlign: "center", padding: 16, color: "#888" }}>
                      No open positions
                    </td>
                  </tr>
                ) : rows.map((r) => {
                  const isProfit = Number(r.mtmPL) >= 0;
                  return (
                    <tr key={r._id}>
                      <td>{r.symbol}</td>
                      <td>{r.side}</td>
                      <td>{r.qty}</td>
                      <td>{money(r.avg)}</td>
                      <td>{money(r.lastPrice)}</td>
                      <td className={isProfit ? "profit" : "loss"}>{money(r.mtmPL)}</td>
                      <td className={isProfit ? "profit" : "loss"}>{pct(r.mtmPct)}</td>
                      <td>{money(r.realizedPL)}</td>
                    </tr>
                  );
                })}
              </tbody>
              <tfoot>
                <tr>
                  <td colSpan="5" style={{ textAlign: "right" }}>Totals:</td>
                  <td className={totalMTM >= 0 ? "profit" : "loss"}>{money(totalMTM)}</td>
                  <td></td>
                  <td>{money(totalRealized)}</td>
                </tr>
              </tfoot>
            </table>
          </div>
        )}
      </div>
      <hr className="divider" />
    </div>
  );
};

export default Positions;
