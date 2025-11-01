import React from "react";

function LeftImage({ imageURL, productName, productDescription, tryDemo, learnMore,tryDemoLinkName, learnMoreLinkName, googlePlay, googlePlayImage, appStore, appStoreImage }) {
    return (
        <div className="container px-5">
            <div className="row my-5 ">
                <div className="col-7 p-3 text-center">
                    <img src={imageURL} alt="img" />
                </div>
                <div className="col-1"></div>
                <div className="col-4 p-3 mt-5" style={{width:" 30.6666666667%", display:"flex", flexDirection:"column" ,justifyContent:"center"}}>
                    <h1 style={{fontSize:"1.7rem", marginBottom:"2rem"}}>{productName}</h1>
                    <p style={{lineHeight:"1.8", fontSize:"1.2rem", display:"block", fontWeight:"400", color:"#424242"}}>{productDescription}</p>
                    <div className="row mb-4">
                        <div className="col text-left">
                            {tryDemoLinkName && (
                                <a style={{textDecoration:"none", fontSize:"1rem"}} href={tryDemo}>{tryDemoLinkName} <i className="fa-solid fa-arrow-right ms-2 d-inline-flex align-items-center" style={{ fontSize: "0.8em", color:"blue" }}></i></a>
                            )}
                        </div>
                        <div className="col text-center">
                            {learnMoreLinkName && (
                                <a style={{textDecoration:"none", fontSize:"1rem"}} href={learnMore}>{learnMoreLinkName}<i className="fa-solid fa-arrow-right ms-2 d-inline-flex align-items-center" style={{ fontSize: "0.8em", color:"blue" }}></i></a>
                            )}
                            
                        </div>
                    </div>
                    <div style={{display:"flex", gap:"2rem", alignContent:"left"}}>
                        <div className="col text-center"><a href={googlePlay}><img src={googlePlayImage} /></a></div>
                        <div className="col text-center"><a href={appStore}><img src={appStoreImage} /></a></div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LeftImage;