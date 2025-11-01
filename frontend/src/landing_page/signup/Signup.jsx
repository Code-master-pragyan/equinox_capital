// ...existing code...
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import showToast from "../../utils/toast";

function Signup() {

    const navigate = useNavigate();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3002';
    const DASHBOARD_URL = process.env.DASHBOARD_URL || 'http://localhost:5174';

    // Validation regex
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$/;
    const nameRegex = /^[a-zA-Z\s]{2,50}$/;

    const validateInputs = () => {
        if (!nameRegex.test(name)) {
            setError("Name must be 2-50 characters, letters only");
            return false;
        }
        if (!emailRegex.test(email)) {
            setError("Invalid email format");
            return false;
        }
        if (!passwordRegex.test(password)) {
            setError("Password must be 8+ chars with uppercase, lowercase, number, and special char");
            return false;
        }
        setError("");
        return true;
    };



    const handleSignup = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post(`${API_URL}/auth/register`, {
                name: name.trim(),
                email: email.toLowerCase().trim(),
                password,
            }, { withCredentials: true });

            const token = res.data?.token;
            const userName = res.data?.user?.name || "";

            if (token) localStorage.setItem("token", token);
            if (userName) localStorage.setItem("userName", userName);

            window.dispatchEvent(new Event("authChange"));

            // show toast
            showToast("Signed up and logged in", "success");

            // ✅ SOLUTION: Pass token via URL to dashboard
            setTimeout(() => {
                window.location.href = `${DASHBOARD_URL}?token=${encodeURIComponent(token)}`;
            }, 1000);
        } catch (err) {
            console.error(err.response.data);
            setError(err.response?.data?.message || "Signup failed");
        }
    };


    return (
        <div className="container py-5">
            <div className="row mb-4 text-center pt-5">
                <div className="col">
                    <h1 style={{ fontSize: "1.85rem", color: "#000000b7", marginBottom: "0.75rem" }}>
                        Open a free demat and trading account online
                    </h1>
                    <p style={{ fontSize: "1.15rem", color: "#424242", marginBottom: "0.5rem" }}>
                        Start investing brokerage free and join a community of 1.6+ crore investors and traders
                    </p>
                </div>
            </div>

            <div className="row align-items-center gx-5">
                <div className="col-md-6 text-center">
                    <img
                        src="/media/images/account_open.svg"
                        alt="account_open"
                        className="img-fluid"
                    />
                </div>

                <div className="col-md-6">
                    <div className="card shadow-sm">
                        <div className="card-body p-4">
                            <h4 className="mb-3">Sign up</h4>
                            <p className="text-muted mb-4">Create a new account or track your existing account</p>

                            {error && <p className="text-danger">{error}</p>}
                            <form onSubmit={handleSignup}>
                                <div className="mb-3">
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Enter your name"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        required
                                        maxLength="50"
                                    />
                                </div>

                                <div className="mb-3">
                                    <input
                                        type="email"
                                        className="form-control"
                                        placeholder="Enter your email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                    />
                                </div>

                                <div className="mb-3">
                                    <input
                                        type="password"
                                        className="form-control"
                                        placeholder="Enter password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                        minLength="8"
                                    />
                                </div>

                                <div className="mb-3 form-check">
                                    <input type="checkbox" className="form-check-input" id="agree" />
                                    <label className="form-check-label" htmlFor="agree">I agree to the terms and privacy policy</label>
                                </div>

                                <div className="d-flex gap-2">
                                    <button type="submit" className="btn btn-primary">Create account</button>
                                    <button type="button" className="btn btn-outline-secondary" onClick={() => navigate("/login")}>
                                        Login instead
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Signup;
