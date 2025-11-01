import React from "react";

function NotFound() {
    return (
        <div classsName="container mt-5">
            <div className="row text-center m-5">
                <h1 className="mt-2 fs-2">404 Not Found</h1>
                <p className="fw-normal text-black-50" style={{color:"gray"}}>Sorry,the page you are looking for is not exist.</p>
            </div>
        </div>
    )
}

export default NotFound;