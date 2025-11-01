import React from "react";

function Hero() {
    return (
        <div classsName="container">
            <div className="row text-center m-5">
                <img src="media/images/homeHero.png" alt="home_hero_banner" className="mb-5" style={{ width: "90%", height: "auto", margin:"0 auto" }}/>
                <h1 className="mt-2">Invest in everything</h1>
                <p className="fw-normal text-black-50" style={{color:"gray"}}>Online Platform to invest in stocks, derivatives, mutual funds and more..</p>
                <button className="btn mt-4" style={{width:"18%",height:"10%", margin:"0 auto", borderRadius:"4px", background:"#387ed1", color:"white", fontSize:"1.3rem", fontWeight:"500"}}>Sign up for free</button>
            </div>
        </div>
    )
}

export default Hero;