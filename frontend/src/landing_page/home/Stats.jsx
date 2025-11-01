import React from "react";

function Stats() {
    return (
        <div className="container mt-5">
            <div className="row">
                <div className="col-6 p-5 mt-3">
                    <h1 className="mb-5">Trust with confidence</h1>
                    <h2 className="stat-heading">Customer-first always</h2>
                    <p className="stat-record">That's why 1.3+ crore customers trust Zerodha with &#8377;3.5+ lakh crores worth of equity investments.</p>
                    <h2 className="stat-heading">No spam or gimmicks</h2>
                    <p className="stat-record">No gimmicks, spam, "gamification", or annoying push notifications. High quality apps that you use at your pace, the way you like.</p>
                    <h2 className="stat-heading">The Zerodha universe</h2>
                    <p className="stat-record">Not just an app, but a whole ecosystem. Our investments in 30+ fintech startups offer you tailored service specific to your needs.</p>
                    <h2 className="stat-heading">Do better with money</h2>
                    <p className="stat-record">With initiatives like Nudge and Kill Switch, we don't jsut facilitate transactions, but activelyhelp you do better with your money.</p>
                </div>
                <div className="col-6 p-5 mt-4 text-center">
                    <img src="\media\images\ecosystem.png" alt="" style={{ width: "85%", margin: "0 auto" }} />
                    <div className="mt-3">
                        <a className="text-decoration-none me-5 d-inline-flex align-items-center" href="">
                            <span className="pb-1">Explore our products</span>
                            <i className="fa-solid fa-arrow-right ms-2 d-inline-flex align-items-center" style={{ fontSize: "1em" }}></i>
                        </a>
                        <a className="text-decoration-none" href="">Try Kite demo</a>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Stats;