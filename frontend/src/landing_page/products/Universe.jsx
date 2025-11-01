import React from "react";

function Universe() {
    return (
        <div className="container">
            <div className="row text-center p-5 ">
                <h1 style={{ fontSize: "1.7rem", color: "#000000b1", marginBottom: "2rem" }}>The Zerodha Universe</h1>
                <p style={{ fontSize: "1.05rem", fontWeight: "400", color: "#000000a6", marginBottom: "4rem" }}>Extend your trading and investment experience even further with our partner platforms</p>
                <div className="row">
                    <div className="col-4 p-3  d-flex flex-column align-items-center">
                        <img src="media\images\zerodhaFundhouse.png" alt="" style={{ width: "50%", marginBottom: "1.8rem" }} />
                        <p style={{ fontSize: "0.8rem", textAlign: "center", width: "60%", color: "#00000088" }}>Our asset management venture
                            that is creating simple and transparent index
                            funds to help you save for your goals.
                        </p>
                    </div>
                    <div className="col-4 p-3 d-flex flex-column align-items-center">
                        <img src="media\images\sensibullLogo.svg" alt="" style={{ width: "50%", marginBottom: "1.8rem" }} />
                        <p style={{ fontSize: "0.8rem", textAlign: "center", width: "60%", color: "#00000088" }}>Options trading platform that lets you
                            create strategies, analyze positions, and examine
                            data points like open interest, FII/DII, and more.
                        </p>
                    </div>
                    <div className="col-4 p-3 d-flex flex-column align-items-center">
                        <img src="media\images\tijori.svg" alt="" style={{ width: "50%", marginBottom: "1.8rem" }} />
                        <p style={{ fontSize: "0.8rem", textAlign: "center", width: "60%", color: "#00000088" }}>Investment research platform
                            that offers detailed insights on stocks,
                            sectors, supply chains, and more.
                        </p>
                    </div>
                    <div className="col-4 p-3  d-flex flex-column align-items-center">
                        <img src="media\images\streakLogo.png" alt="" style={{ width: "50%", marginBottom: "1.8rem" }} />
                        <p style={{ fontSize: "0.8rem", textAlign: "center", width: "60%", color: "#00000088" }}>Our asset management venture
                            that is creating simple and transparent index
                            funds to help you save for your goals.
                        </p>
                    </div>
                    <div className="col-4 p-3  d-flex flex-column align-items-center">
                        <img src="media\images\smallcaseLogo.png" alt="" style={{ width: "50%", marginBottom: "1.8rem" }} />
                        <p style={{ fontSize: "0.8rem", textAlign: "center", width: "60%", color: "#00000088" }}>Options trading platform that lets you
                            create strategies, analyze positions, and examine
                            data points like open interest, FII/DII, and more.
                        </p>
                    </div>
                    <div className="col-4 p-3  d-flex flex-column align-items-center">
                        <img src="media\images\dittoLogo.png" alt="" style={{ width: "50%", marginBottom: "1.8rem" }} />
                        <p style={{ fontSize: "0.8rem", textAlign: "center", width: "60%", color: "#00000088" }}>Investment research platform
                            that offers detailed insights on stocks,
                            sectors, supply chains, and more.
                        </p>
                    </div>
                    <button className="btn mt-4" style={{width:"20%",height:"10%", margin:"0 auto", borderRadius:"4px", background:"#387ed1", color:"white", fontSize:"1.3rem", fontWeight:"500"}}>Signup for free</button>
                </div>

            </div>
        </div>
    )
}

export default Universe;