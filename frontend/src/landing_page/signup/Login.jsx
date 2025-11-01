import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import showToast from "../../utils/toast";

function Login() {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3002';
    const DASHBOARD_URL = process.env.DASHBOARD_URL || 'http://localhost:5174';

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    const validateInputs = () => {
        if (!emailRegex.test(email)) {
            setError("Invalid email format");
            return false;
        }
        if (password.length < 8) {
            setError("Password must be at least 8 characters");
            return false;
        }
        setError("");
        return true;
    };

    const handleLogin = async (e) => {
        e.preventDefault();

        if (!validateInputs()) return;

        try {
            const res = await axios.post(`${API_URL}/auth/login`, {
                email: email.toLowerCase().trim(),
                password,
            }, { withCredentials: true });

            // DEBUG: inspect backend response shape
            // console.log("login response:", res.data);

            const token = res.data.token;

            // Store in localStorage for main site
            localStorage.setItem("token", token);

            window.dispatchEvent(new Event("authChange"));

            // show toast
            showToast("Signed up and logged in", "success");

            // ✅ SOLUTION: Pass token via URL to dashboard
            setTimeout(() => {
                window.location.href = `${DASHBOARD_URL}?token=${encodeURIComponent(token)}`;
            }, 1000);
        } catch (err) {
            // use err.response (axios) and guard access to avoid throwing inside catch
            console.error(err.response || err);
            const message = err.response?.data?.message || "Login failed";
            setError(message);
            showToast(message, "error");
        }
    };

    return (
        <div className="container py-5">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="card shadow-sm">
                        <div className="card-body p-4">
                            <h4 className="mb-3">Login</h4>
                            {error && <p className="text-danger">{error}</p>}
                            <form onSubmit={handleLogin}>
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

                                <div className="d-flex gap-2">
                                    <button type="submit" className="btn btn-primary">Login</button>
                                    <button type="button" className="btn btn-outline-secondary" onClick={() => navigate("/signup")}>
                                        Signup instead
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

export default Login;
