import React from "react";

function Awards() {
    return (
        <div className="container mt-5">
            <div className="row">
                <div className="col-6 p-5">
                    <img src="media/images/largestBroker.svg" alt="awards" />
                </div>
                <div className="col-6 p-5 mt-3">
                    <h1>Largest stock broker in India</h1>
                    <p className="mb-2 text-black-50">2+ million zerodha clients contribute to over 15% of all retail order volumes in india daily by trading and investing in: </p>
                    <div className="row mt-5 mb-4">
                        <div className="col">
                            <ul className="spaced-list">
                                <li>Future and Options</li>
                                <li>Commodity derivatives</li>
                                <li>Currency derivatives</li>
                            </ul>
                        </div>
                        <div className="col">
                            <ul className="spaced-list">
                                <li>Stocks & IPOs</li>
                                <li>Direct mutual funds</li>
                                <li>Bonds and Govt. Securities</li>
                            </ul>
                        </div>
                    </div>
                    <img src="media/images/pressLogos.png" alt="pressLogos" style={{width:"90%", margin:"0 auto"}}/>
                </div>
            </div>
        </div>
    )
}

export default Awards;