import "./Login.css";
import React, { useState } from "react";

const Login = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("https://stdmgmtback1.onrender.com/api/admin/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      if (data.success) {
        localStorage.setItem("isAdminLoggedIn", "true");
        localStorage.setItem("adminUsername", formData.username);
        alert(data.message);
        window.location.href = "/";
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error("Login error:", error);
      alert("Server error! Please try again.");
    }
  };

  return (
    <div className="login-page">
      <div className="login-overlay"></div>
      <div className="login-container">
        <div className="login-left">
          <h1>Student Management System</h1>
          <p>
            Manage students, records, and administration with a secure admin
            panel.
          </p>
          <div className="login-badge">Admin Access Only</div>
        </div>
        <div className="login-right">
          <form className="login-card" onSubmit={handleSubmit}>
            <h2>Admin Login</h2>
            <p className="login-subtitle">Sign in to continue</p>
            <div className="input-group">
              <label>Username</label>
              <input
                type="text"
                name="username"
                placeholder="Enter admin username"
                value={formData.username}
                onChange={handleChange}
                required
              />
            </div>
            <div className="input-group">
              <label>Password</label>
              <div className="password-wrapper">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Enter password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
                <span
                  className="toggle-password"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? "Hide" : "Show"}
                </span>
              </div>
            </div>
            <button type="submit" className="login-btn">
              Login
            </button>
            <p className="login-footer-text">
              Secure Admin Portal • React + Spring Boot
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
