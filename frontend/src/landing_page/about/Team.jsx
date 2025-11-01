import React from "react";

function Team() {
    return (
        <div className="container p-5 border-top" >
            <div className="row">
                <h1 className="fs-3 text-center m-0">Team</h1>
            </div>
            <div className="row mt-5 text-muted" style={{ fontSize: "1rem", lineHeight: "1.8rem", color: " color: #424242;", fontWeight: "400", }}>
                <div className="col-6 py-5 ps-lg-5 text-center" >
                    <img src="media/images/nithinKamath.jpg" alt="" style={{borderRadius:"100%", width: "45%"}} />
                    <h4 className="mt-4 fs-5" style={{fontWeight:"400", color:"black" }}>Nithin Kamath</h4>
                    <p>Founder, CEO</p>
                </div>
                <div className="col-6 pe-lg-5" style={{paddingTop: "4rem"}}>
                    <p>Nithin bootstrapped and founded Zerodha in 2010 to overcome the hurdles he faced during his decade long stint as a trader. Today, Zerodha has changed the landscape of the Indian broking industry.</p>

                    <p>He is a member of the SEBI Secondary Market Advisory Committee (SMAC) and the Market Data Advisory Committee (MDAC).</p>

                    <p>Playing basketball is his zen.</p>

                    <p>Connect on <a style={{textDecoration:"none"}} href="">Homepage</a> / <a style={{textDecoration:"none"}} href="">TradingQnA</a> / <a style={{textDecoration:"none"}} href="">Twitter</a></p>
                </div>
            </div>
        </div>
    )
}

export default Team;