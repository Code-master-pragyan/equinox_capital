import React from "react";

function Education() {
    return (
        <div className="container mt-5 mb-5">
            <div className="row">
                <div className="col-6 p-3">
                    <img src="media/images/education.svg" alt="awards" style={{width:"80%", margin:"0 auto"}}/>
                </div>
                <div className="col-6 p-5 mt-4">
                    <h1 className="mb-5" style={{fontSize:"1.5rem"}}>Free and open market education</h1>
                    <p>Varsity,  the largest online stock market education book in the world covering everything from the basics to advanced trading.</p>
                    <a className="text-decoration-none me-5 d-inline-flex align-items-center mb-4" href="">
                        <span className="pb-1">Varsity</span>
                        <i className="fa-solid fa-arrow-right ms-2 d-inline-flex align-items-center" style={{ fontSize: "1em" }}></i>
                    </a>
                    <br />

                    <p className="mt-4" >TradingQ&A, the most active trading and investment community in India for all your market related queries.</p>
                    <a className="text-decoration-none me-5 d-inline-flex align-items-center" href="">
                        <span className="pb-1">TradingQ&A</span>
                        <i className="fa-solid fa-arrow-right ms-2 d-inline-flex align-items-center" style={{ fontSize: "1em" }}></i>
                    </a>
                </div>
            </div>
        </div>
    )
}

export default Education;