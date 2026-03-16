import "./Footer.css";
import React from "react";
import { FaHeart } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <p className="footer-text">
          © {new Date().getFullYear()} Student Management System. Made with 
          <FaHeart className="footer-heart" /> <strong>Dinesh Roy</strong> for education.
        </p>
      </div>
    </footer>
  );
};

export default Footer;