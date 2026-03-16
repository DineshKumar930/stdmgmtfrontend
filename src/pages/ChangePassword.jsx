import "./ChangePassword.css";
import React, { useState } from "react";
import axios from "axios";

const ChangePassword = () => {
  const [formData, setFormData] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setMessage("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { oldPassword, newPassword, confirmPassword } = formData;

    if (!oldPassword || !newPassword || !confirmPassword) {
      setMessage("Please fill all fields.");
      setMessageType("error");
      return;
    }

    if (newPassword.length < 6) {
      setMessage("New password must be at least 6 characters.");
      setMessageType("error");
      return;
    }

    if (newPassword !== confirmPassword) {
      setMessage("New password and confirm password do not match.");
      setMessageType("error");
      return;
    }

    try {
      const username = localStorage.getItem("adminUsername"); // login ke time save hona chahiye

      const response = await axios.put(
        "http://localhost:8080/api/admin/change-password",
        {
          username,
          oldPassword,
          newPassword,
        }
      );

      setMessage(response.data?.message || "Password changed successfully!");
      setMessageType("success");

      setFormData({
        oldPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
    } catch (error) {
      setMessage(error.response?.data?.message || "Something went wrong.");
      setMessageType("error");
      console.error("Change password error:", error);
    }
  };
  const username = localStorage.getItem("adminUsername");
console.log("Username:", username); // What does this print?

  return (
    <div className="change-password-page">
      <div className="change-password-card">
        <h2>Change Password</h2>
        <p className="subtitle">Update your account password securely</p>

        {message && <div className={`message ${messageType}`}>{message}</div>}

        <form onSubmit={handleSubmit} className="change-password-form">
          <div className="form-group">
            <label>Current Password</label>
            <input
              type="password"
              name="oldPassword"
              placeholder="Enter current password"
              value={formData.oldPassword}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>New Password</label>
            <input
              type="password"
              name="newPassword"
              placeholder="Enter new password"
              value={formData.newPassword}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Confirm New Password</label>
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm new password"
              value={formData.confirmPassword}
              onChange={handleChange}
            />
          </div>

          <button type="submit" className="change-btn">
            Change Password
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChangePassword;