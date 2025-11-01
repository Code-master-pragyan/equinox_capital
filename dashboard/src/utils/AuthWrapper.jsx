import React, { useEffect, useState } from "react";

const AuthWrapper = ({ children }) => {
  const [isChecking, setIsChecking] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    console.log("[AuthWrapper] Starting authentication check...");

    // ✅ SOLUTION: Get token from URL parameter
    const urlParams = new URLSearchParams(window.location.search);
    const urlToken = urlParams.get('token');

    let token = urlToken;

    // If token in URL, store it in localStorage and clean URL
    if (urlToken) {
      console.log("[AuthWrapper] Token received via URL");
      localStorage.setItem("token", urlToken);
      
      // Clean URL (remove token parameter)
      window.history.replaceState({}, document.title, window.location.pathname);
    } else {
      // Check localStorage
      token = localStorage.getItem("token");
      console.log("[AuthWrapper] Token from localStorage:", token ? "EXISTS" : "MISSING");
    }

    if (!token) {
      console.log("[AuthWrapper] No token found, redirecting to signup...");
      window.location.href = "http://localhost:5173/signup";
      return;
    }

    // ✅ Verify token with backend
    fetch("http://localhost:3002/auth/verify-token", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
    })
      .then(async (res) => {
        console.log("[AuthWrapper] Response status:", res.status);

        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }

        const data = await res.json();
        console.log("[AuthWrapper] Backend response:", data);
        return data;
      })
      .then((data) => {
        if (data.valid) {
          console.log("[AuthWrapper] ✅ Token valid. Access granted.");
          
          // Store user info
          if (data.user) {
            localStorage.setItem("userName", data.user.name);
            localStorage.setItem("userEmail", data.user.email);
          }
          
          setIsAuthenticated(true);
        } else {
          console.log("[AuthWrapper] ❌ Token invalid");
          throw new Error("Invalid token");
        }
      })
      .catch((err) => {
        console.error("[AuthWrapper] ❌ Authentication failed:", err);
        localStorage.removeItem("token");
        localStorage.removeItem("userName");
        localStorage.removeItem("userEmail");
        
        setTimeout(() => {
          window.location.href = "http://localhost:5173/signup";
        }, 1000);
      })
      .finally(() => {
        setIsChecking(false);
      });
  }, []);

  if (isChecking) {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          fontSize: "1.5rem",
          gap: "1rem",
          fontFamily: "system-ui",
        }}
      >
        <div>🔐 Verifying authentication...</div>
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          fontSize: "1.2rem",
        }}
      >
        Redirecting to login...
      </div>
    );
  }

  return <>{children}</>;
};

export default AuthWrapper;
