import React, { useState } from "react";
import "./Charges.css"; // Import CSS file

function Charges() {
    const [activeTab, setActiveTab] = useState("equities");

    const handleTabClick = (tab) => {
        setActiveTab(tab);
    };

    return (
        <section className="charges-sections">
            <div className="container">
                <div className="row mx-5">
                    {/* ==== Tabs Navigation ==== */}
                    <nav className="tabs">
                        <button
                            className={`tab ${activeTab === "equities" ? "active" : ""}`}
                            onClick={() => handleTabClick("equities")}
                        >
                            Equity
                        </button>
                        <button
                            className={`tab ${activeTab === "currency" ? "active" : ""}`}
                            onClick={() => handleTabClick("currency")}
                        >
                            Currency
                        </button>
                        <button
                            className={`tab ${activeTab === "commodities" ? "active" : ""}`}
                            onClick={() => handleTabClick("commodities")}
                        >
                            Commodity
                        </button>
                    </nav>

                    {/* ==== EQUITY SECTION ==== */}
                    {activeTab === "equities" && (
                        <div className="section">
                            <div className="table-container">
                                <table id="charges-table">
                                    <thead>
                                        <tr>
                                            <th>&nbsp;</th>
                                            <th>Equity delivery</th>
                                            <th>Equity intraday</th>
                                            <th>F&amp;O - Futures</th>
                                            <th>F&amp;O - Options</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td class="charges-heads">Brokerage</td>
                                            <td>Zero Brokerage</td>
                                            <td>0.03% or ₹20/executed order whichever is lower</td>
                                            <td class="hide-on-mobile">0.03% or ₹20/executed order whichever is lower</td>
                                            <td class="hide-on-mobile">Flat ₹20 per executed order</td>
                                        </tr>

                                        <tr class="grey-back">
                                            <td class="charges-heads">STT/CTT</td>
                                            <td>0.1% on buy & sell</td>
                                            <td>0.025% on the sell side</td>
                                            <td class="hide-on-mobile">0.02% on the sell side</td>
                                            <td class="hide-on-mobile">
                                                <ul class="list-items">
                                                    <li>0.125% of the intrinsic value on options that are bought and exercised</li>
                                                    <li>0.1% on sell side (on premium)</li>
                                                </ul>
                                            </td>
                                        </tr>

                                        <tr>
                                            <td class="charges-heads">Transaction charges</td>
                                            <td>NSE: 0.00297%<br></br>BSE: 0.00375%</td>
                                            <td>NSE: 0.00297%<br></br>BSE: 0.00375%</td>
                                            <td class="hide-on-mobile">NSE: 0.00173%<br></br>BSE: 0</td>
                                            <td class="hide-on-mobile">NSE: 0.03503% (on premium)<br></br>BSE: 0.0325% (on premium)</td>
                                        </tr>

                                        <tr class="grey-back">
                                            <td class="charges-heads">GST</td>
                                            <td>18% on (brokerage + SEBI charges + transaction charges)</td>
                                            <td>18% on (brokerage + SEBI charges + transaction charges)</td>
                                            <td class="hide-on-mobile">18% on (brokerage + SEBI charges + transaction charges)</td>
                                            <td class="hide-on-mobile">18% on (brokerage + SEBI charges + transaction charges)</td>
                                        </tr>

                                        <tr>
                                            <td class="charges-heads">SEBI charges</td>
                                            <td>₹10 / crore</td>
                                            <td>₹10 / crore</td>
                                            <td class="hide-on-mobile">₹10 / crore</td>
                                            <td class="hide-on-mobile">₹10 / crore</td>
                                        </tr>

                                        <tr class="grey-back">
                                            <td class="charges-heads">Stamp charges</td>
                                            <td>0.015% or ₹1500 / crore on buy side</td>
                                            <td>0.003% or ₹300 / crore on buy side</td>
                                            <td class="hide-on-mobile">0.002% or ₹200 / crore on buy side</td>
                                            <td class="hide-on-mobile">0.003% or ₹300 / crore on buy side</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}

                    {/* ==== CURRENCY SECTION ==== */}
                    {activeTab === "currency" && (
                        <div className="section">
                            <div className="table-container">
                                <table id="charges-table">
                                    <thead>
                                        <tr>
                                            <th>&nbsp;</th>
                                            <th>Currency Futures</th>
                                            <th>Currency Options</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>Brokerage</td>
                                            <td>₹20 or 0.03% per executed order whichever is lower</td>
                                            <td>Flat ₹20 per executed order</td>
                                        </tr>
                                        <tr className="grey-back">
                                            <td>STT/CTT</td>
                                            <td>None</td>
                                            <td>None</td>
                                        </tr>
                                        <tr>
                                            <td>Transaction charges</td>
                                            <td>NSE: 0.0009%</td>
                                            <td>NSE: 0.0009%</td>
                                        </tr>
                                        <tr className="grey-back">
                                            <td>GST</td>
                                            <td>18% on (brokerage + SEBI + transaction charges)</td>
                                            <td>18% on (brokerage + SEBI + transaction charges)</td>
                                        </tr>
                                        <tr>
                                            <td>Stamp charges</td>
                                            <td>0.0001% or ₹10 per crore on buy side</td>
                                            <td>0.0001% or ₹10 per crore on buy side</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}

                    {/* ==== COMMODITY SECTION ==== */}
                    {activeTab === "commodities" && (
                        <div className="section">
                            <div className="table-container">
                                <table id="charges-table">
                                    <thead>
                                        <tr>
                                            <th>&nbsp;</th>
                                            <th>Commodity Futures</th>
                                            <th>Commodity Options</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>Brokerage</td>
                                            <td>₹20 or 0.03% per executed order whichever is lower</td>
                                            <td>Flat ₹20 per executed order</td>
                                        </tr>
                                        <tr className="grey-back">
                                            <td>STT/CTT</td>
                                            <td>0.01% on sell side</td>
                                            <td>0.05% on sell side (on premium)</td>
                                        </tr>
                                        <tr>
                                            <td>Transaction charges</td>
                                            <td>0.0026%</td>
                                            <td>0.0026%</td>
                                        </tr>
                                        <tr className="grey-back">
                                            <td>GST</td>
                                            <td>18% on (brokerage + SEBI + transaction charges)</td>
                                            <td>18% on (brokerage + SEBI + transaction charges)</td>
                                        </tr>
                                        <tr>
                                            <td>Stamp charges</td>
                                            <td>0.002% or ₹200 per crore on buy side</td>
                                            <td>0.002% or ₹200 per crore on buy side</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}

                    <p className="text-center brokerage-link mt-5" style={{ fontSize: "1.3rem" }}>
                        <a className="underline" href="/brokerage-calculator" style={{ textDecoration: "none" }}>
                            Calculate your costs upfront
                        </a>{" "}
                        using our brokerage calculator
                    </p>
                </div>

                {/* ==== Account Opening Charges Section ==== */}

                <div className="row m-5 pt-5">
                    <div className="container mt-5">
                        <h2 style={{ fontSize: "1.7rem", color: "#000000a9" }}>Charges for account opening</h2>
                        <div className="table-container">
                            <table id="charges-table">
                                <thead>
                                    <tr className="grey-back">
                                        <th>Type of account</th>
                                        <th>Charges</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>Online account</td>
                                        <td><span className="free-tag">Free</span></td>
                                    </tr>
                                    <tr className="grey-back">
                                        <td>Offline account</td>
                                        <td><span className="free-tag">Free</span></td>
                                    </tr>
                                    <tr>
                                        <td>NRI account (offline only)</td>
                                        <td>₹500</td>
                                    </tr>
                                    <tr className="grey-back">
                                        <td>Corporate / LLP / HUF accounts</td>
                                        <td>₹500</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                <div className="row m-5 pt-4">
                    <div className="container mt-5">
                        <h2 style={{ fontSize: "1.7rem", color: "#000000a9" }}>Demat AMC (Annual Maintenance Charge)</h2>
                        <div className="table-container">
                            <table id="charges-table">
                                <thead>
                                    <tr className="grey-back">
                                        <th>Value of holdings</th>
                                        <th>AMC</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>Up to ₹4 lakh</td>
                                        <td><span class="free-tag">free<sup>*</sup></span></td>
                                    </tr>
                                    <tr className="grey-back">
                                        <td>₹4 lakh - ₹10 lakh</td>
                                        <td>₹ 100 per year, charged quarterly<sup>*</sup></td>
                                    </tr>
                                    <tr>
                                        <td>Above ₹10 lakh</td>
                                        <td>₹ 300 per year, charged quarterly</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        <p className="mt-3" style={{ fontSize: "0.85rem", color: "#0000008c" }}>
                            * Lower AMC is applicable only if the account qualifies as a Basic Services Demat Account (BSDA). BSDA account holders cannot hold more than one demat account. To learn more about BSDA, <a href="https://support.zerodha.com/category/account-opening/offline-account-opening/bsda/articles/how-to-open-a-basic-service-demat-account-at-zerodha" style={{ textDecoration: "none" }}>click here</a>.
                        </p>
                    </div>
                </div>

                <div className="row m-5 pt-4">
                    <div className="container mt-5">
                        <h2 style={{ fontSize: "1.7rem", color: "#000000a9" }}>Charges for optional value added services</h2>
                        <div class="table-container">
                            <table id="charges-table">
                                <thead>
                                    <tr className="grey-back">
                                        <th>Service</th>
                                        <th>Billing Frquency</th>
                                        <th>Charges</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>Tickertape</td>
                                        <td>Monthly / Annual</td>
                                        <td>Free: 0 | Pro: 249/2399</td>
                                    </tr>
                                    <tr className="grey-back">
                                        <td>Smallcase</td>
                                        <td>Per transaction</td>
                                        <td>Buy &amp; Invest More: 100 | SIP: 10</td>
                                    </tr>
                                    <tr>
                                        <td>Kite Connect</td>
                                        <td>Monthly</td>
                                        <td>Connect: 500 | Personal: Free</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                <div className="row m-5 pt-4">
                    <h1 style={{ fontSize: "1.65rem", color: "#000000d1", marginBottom: "1.5rem", marginTop: "2rem" }}>Charges explained</h1>
                    <div className="col left-content">
                        <h3 className="charges-heading">Securities/Commodities transaction tax</h3>
                        <p>Tax by the government when transacting on the exchanges. Charged as above on both buy and sell sides when trading equity delivery. Charged only on selling side when trading intraday or on F&O.</p>
                        <p>When trading at Zerodha, STT/CTT can be a lot more than the brokerage we charge. Important to keep a tab.</p>

                        <h3 className="charges-heading">Transaction/Turnover Charges</h3>
                        <p>Charged by exchanges (NSE, BSE, MCX) on the value of your transactions.</p>
                        <p>BSE has revised transaction charges in XC, XD, XT, Z and ZP groups to ₹10,000 per crore w.e.f 01.01.2016. (XC and XD groups have been merged into a new group X w.e.f 01.12.2017)</p>
                        <p>BSE has revised transaction charges in SS and ST groups to ₹1,00,000 per crore of gross turnover.</p>
                        <p>BSE has revised transaction charges for group A, B and other non exclusive scrips (non-exclusive scrips from group E, F, FC, G, GC, W, T) at ₹375 per crore of turnover on flat rate basis w.e.f. December 1, 2022.</p>
                        <p>BSE has revised transaction charges in M, MT, TS and MS groups to ₹275 per crore of gross turnover.</p>

                        <h3 className="charges-heading">Call & trade</h3>
                        <p>Additional charges of ₹50 per order for orders placed through a dealer at Zerodha including auto square off orders.</p>

                        <h3 className="charges-heading">Stamp charges</h3>
                        <p>Stamp charges by the Government of India as per the Indian Stamp Act of 1899 for transacting in instruments on the stock exchanges and depositories.</p>

                        <h3 className="charges-heading">NRI brokerage charges</h3>
                        <ul>
                            <li>For a non-PIS account, 0.5% or ₹50 per executed order for equity and F&O (whichever is lower).</li>
                            <li>For a PIS account, 0.5% or ₹200 per executed order for equity (whichever is lower).</li>
                            <li>₹500 + GST as yearly account maintenance charges (AMC) charges.</li>
                        </ul>

                        <h3 className="charges-heading">Account with debit balance</h3>
                        <p>If the account is in debit balance, any order placed will be charged ₹40 per executed order instead of ₹20 per executed order.</p>

                        <h3 className="charges-heading">Charges for Investor's Protection Fund Trust (IPFT) by NSE</h3>
                        <ul>
                            <li>Equity and Futures - ₹10 per crore + GST of the traded value.</li>
                            <li>Options - ₹50 per crore + GST traded value (premium value).</li>
                            <li>Currency - ₹0.05 per lakh + GST of turnover for Futures and ₹2 per lakh + GST of premium for Options.</li>
                        </ul>

                        <h3 className="charges-heading">Margin Trading Facility (MTF)</h3>
                        <ul>
                            <li>MTF Interest: 0.04% per day (₹40 per lakh) on the funded amount. The interest is applied from T+1 day until the day MTF stocks are sold.</li>
                            <li>MTF Brokerage: 0.3% or Rs. 20/executed order, whichever is lower.</li>
                            <li>MTF pledge charge: ₹15 + GST per pledge and unpledge request per ISIN.</li>
                        </ul>
                    </div>
                    <div className="col right-content">
                        <h3 className="charges-heading">GST</h3>
                        <p>Tax levied by the government on the services rendered. 18% of ( brokerage + SEBI charges + transaction charges)</p>

                        <h3 className="charges-heading">SEBI Charges</h3>
                        <p>Charged at ₹10 per crore + GST by Securities and Exchange Board of India for regulating the markets.</p>

                        <h3 className="charges-heading">DP (Depository participant) charges</h3>
                        <p>₹15.34 per scrip (₹3.5 CDSL fee + ₹9.5 Zerodha fee + ₹2.34 GST) is charged on the trading account ledger when stocks are sold, irrespective of quantity.</p>
                        <p>Female demat account holders (as first holder) will enjoy a discount of ₹0.25 per transaction on the CDSL fee.</p>
                        <p>Debit transactions of mutual funds & bonds get an additional discount of ₹0.25 on the CDSL fee.</p>

                        <h3 className="charges-heading">Pledging charges</h3>
                        <p>₹30 + GST per pledge request per ISIN.</p>

                        <h3 className="charges-heading">AMC (Account maintenance charges)</h3>
                        <p>For BSDA demat account: Zero charges if the holding value is less than ₹4,00,000. To learn more about BSDA, <a style={{textDecoration:"none"}} href="">Click here</a> </p>
                        <p>For non-BSDA demat accounts: ₹300/year + 18% GST charged quarterly (90 days). To learn more about AMC, <a style={{textDecoration:"none"}} href="">Click here</a> </p>

                        <h3 className="charges-heading">Corporate action order charges</h3>
                        <p>₹20 plus GST will be charged for OFS / buyback / takeover / delisting orders placed through Console.</p>

                        <h3 className="charges-heading">Off-market transfer charges</h3>
                        <p>₹25 per transaction.</p>

                        <h3 className="charges-heading">Physical CMR request</h3>
                        <p>First CMR request is free. ₹20 + ₹100 (courier charge) + 18% GST for subsequent requests.</p>

                        <h3 className="charges-heading">Payment gateway charges</h3>
                        <p>₹9 + GST (Not levied on transfers done via UPI)</p>

                        <h3 className="charges-heading">Delayed Payment Charges</h3>
                        <p>Interest is levied at 18% a year or 0.05% per day on the debit balance in your trading account. <a style={{textDecoration:"none"}} href="">Learn more</a>.</p>

                        <h3 className="charges-heading">Trading using 3-in-1 account with block functionality</h3>
                        <ul>
                            <li><span style={{fontWeight:"600"}}>Delivery & MTF Brokerage:</span> 0.5% per executed order.</li>
                            <li><span style={{fontWeight:"600"}}>Intraday Brokerage: </span> 0.05% per executed order.</li>
                        </ul>
                    </div>
                    <h2 style={{fontSize:"1.1rem", margin:"2rem 0"}}>Disclaimer</h2>
                    <p style={{fontSize:"0.75rem", lineHeight:"1.8", letterSpacing:"0.4px", color:"#000000c3", width:"95%"}}>For Delivery based trades, a minimum of ₹0.01 will be charged per contract note. Clients who opt to receive physical contract notes will be charged ₹20 per contract note plus courier charges. Brokerage will not exceed the rates specified by SEBI and the exchanges. All statutory and regulatory charges will be levied at actuals. Brokerage is also charged on expired, exercised, and assigned options contracts. Free investments are available only for our retail individual clients. Companies, Partnerships, Trusts, and HUFs need to pay 0.1% or ₹20 (whichever is less) as delivery brokerage. A brokerage of 0.25% of the contract value will be charged for contracts where physical delivery happens. For netted off positions in physically settled contracts, a brokerage of 0.1% will be charged.</p>
                </div>
            </div>
        </section>
    );
}

export default Charges;

