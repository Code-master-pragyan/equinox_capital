import React from "react";

function Hero() {
    return (
        <div className="container border-bottom">
            <div className="row text-center p-5 ">
                <h1 style={{fontSize:"2.2rem"}}>Technology</h1>
                <h3 className="text-muted my-3" style={{fontSize:"1.1rem", fontWeight:"400"}}>Sleek, modern and intuitive trading platforms</h3>
                <p>Check out our <a style={{textDecoration:"none"}} href="">investment offerings</a> <i className="fa-solid fa-arrow-right ms-1 d-inline-flex align-items-center" style={{ fontSize: "0.85em", color:"blue" }}></i></p>
            </div>
        </div>
    )
}

export default Hero;