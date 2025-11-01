import React from "react";

function Hero() {
    return (
        <div className="container p-5" >
            <div className="row mb-4 p-5 text-center">
                <h1 className="fs-2" style={{color:"#000000b8", fontSize:"1.7rem"}}>Charges</h1>
                <p style={{color:"#0000006f", marginTop:"0.7rem", fontSize:"1.3rem"}}>
                    List of all charges and taxes
                </p>
            </div>
            <div className="row pt-5 mx-5 mb-4">
                <div className="col py-5 text-center">
                    <img src="media\images\pricing0.svg" alt="0" style={{width:"60%", marginBottom:"1.5rem"}}/>
                    <h1 style={{fontSize:"1.8rem", color:"#000000ba", marginBottom:"2rem"}}>Free equity delivery</h1>
                    <p style={{fontSize:"1.1rem", color:"#00000092", lineHeight:"1.8"}}>All equity delivery investments (NSE, BSE), are absolutely free — ₹ 0 brokerage.</p>
                </div>
                <div className="col py-5  text-center">
                    <img src="media\images\intradayTrades.svg" alt="20" style={{width:"60%", marginBottom:"1.5rem"}} />
                    <h1 style={{fontSize:"1.8rem", color:"#000000ba", marginBottom:"2rem"}}>Intraday and F&O trades</h1>
                    <p style={{fontSize:"1.1rem", color:"#00000092", lineHeight:"1.8"}}>Flat ₹ 20 or 0.03% (whichever is lower) per executed order on intraday trades across equity, currency, and commodity trades. Flat ₹20 on all option trades.</p>
                </div>
                <div className="col py-5 text-center">
                    <img src="media\images\pricing0.svg" alt="0" style={{width:"60%", marginBottom:"1.5rem"}} />
                    <h1 style={{fontSize:"1.8rem", color:"#000000ba", marginBottom:"2rem"}}>Free direct MF</h1>
                    <p style={{fontSize:"1.1rem", color:"#00000092", lineHeight:"1.8"}}>All direct mutual fund investments are absolutely free — ₹ 0 commissions & DP charges.</p>
                </div>
            </div>
        </div>
    )
}

export default Hero;