import React from "react";
import "./support.css";

function Hero() {
    return (
        <div style={{ backgroundColor: "#ededed82", padding: "24px 0" }}>
            <div className="container p-3">
                <div className="row m-5">
                    <div className="col text-left"><h1 style={{fontSize:"2.3rem"}}>Support Portal</h1></div>
                    <div className="col btn" style={{ display: "flex", justifyContent: "flex-end" }}>
                        <button className="ticket-btn">My Tickets</button>
                    </div>
                </div>
                <div className="row m-5">
                    <div className="col">
                        <div className="input-group">
                            <span className="input-group-text" id="search-icon">
                                <i className="fa-solid fa-magnifying-glass"></i>
                            </span>
                            <input
                                type="text"
                                name="search"
                                id="search"
                                className="form-control custom-search-input"
                                placeholder="Eg: How do I open my account"
                                aria-label="Search"
                                aria-describedby="search-icon"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Hero;