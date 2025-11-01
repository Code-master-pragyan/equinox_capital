import React from "react";

function Pricing() {
    return (
        <div className="container mt-5 mb-5">
            <div className="row">
                <div className="col-4 p-4">
                    <h1 className="mb-3">Unbeatable pricing</h1>
                    <p className="mt-5" style={{fontSize:"1.1rem",color:"gray"}}>We pioneered the concept of discout broking and price transparancy in India. Flat fees and no hidden charges.</p>
                    <a className="text-decoration-none me-5 d-inline-flex align-items-center" href="">
                        <span className="pb-1">See Pricing</span>
                        <i className="fa-solid fa-arrow-right ms-2 d-inline-flex align-items-center" style={{ fontSize: "1em" }}></i>
                    </a>
                </div>
                <div className="col-2"></div>
                <div className="col-6 p-4 mt-3">
                    <div className="row text-center">
                        <div className="col p-4 border">
                            <h1 className="mb-4">&#8377;0</h1>
                            <p>Free equity delivey and <br></br> direct mutual funds</p>
                        </div>
                        <div className="col p-4 border">
                            <h1  className="mb-4">&#8377;20</h1>
                            <p>Intraday and F&O</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Pricing;