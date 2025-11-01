import React, { useState, useEffect } from "react";
import { Link, useNavigate } from 'react-router-dom';
import showToast from "../utils/toast";

function Navbar() {

    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("token");
        setIsLoggedIn(!!token);

        const handler = () => {
            const t = localStorage.getItem("token");
            setIsLoggedIn(!!t);
        };
        window.addEventListener("authChange", handler);
        return () => window.removeEventListener("authChange", handler);
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("userName");
        window.dispatchEvent(new Event("authChange"));
        showToast("Logged out", "success");
        navigate("/"); // or reload if needed
    };

    return (
        <nav className="navbar navbar-expand-lg border-bottom py-3">
            <div className="container d-flex justify-content-around align-items-center">
                {/* Left Logo */}
                <Link className="navbar-brand" to="/">
                    <img src="media/images/logo.svg" style={{ width: "150px", marginLeft: "2rem" }} alt="logo" />
                </Link>

                {/* Toggler for Mobile */}
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarSupportedContent"
                    aria-controls="navbarSupportedContent"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>

                {/* Center Menu */}
                <div className="collapse navbar-collapse " id="navbarSupportedContent">
                    <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                        {!isLoggedIn && (
                            <li className="nav-item">
                                <Link className="nav-link" to="/signup" >Signup</Link>
                            </li>
                        )}
                        <li className="nav-item">
                            <Link className="nav-link" to="/about">About</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/product">Product</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/pricing">Pricing</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/support">Support</Link>
                        </li>

                        {/* Dashboard link shown only if logged in */}
                        {isLoggedIn && (
                            <>
                                <li className="nav-item">
                                    <a className="nav-link" href="http://localhost:5174"
                                        target="_blank"  // ✅ Opens in new tab
                                        rel="noopener noreferrer"> Dashboard
                                    </a>
                                </li>
                                <li className="nav-item">
                                    <button className="btn btn-link nav-link" style={{ cursor: "pointer" }} onClick={handleLogout}>Logout</button>
                                </li>
                            </>
                        )}
                    </ul>
                </div>
            </div>
        </nav >
    )
}

export default Navbar;
