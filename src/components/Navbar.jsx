import "./Navbar.css";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import {
  FaBars,
  FaHome,
  FaList,
  FaPlus,
  FaTimes,
  FaUserGraduate,
  FaSignOutAlt,
} from "react-icons/fa";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  const handleLogout = () => {
    localStorage.removeItem("isAdminLoggedIn");
    closeMenu();
    navigate("/");
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        {/* Logo */}
        <Link to="/home" className="navbar-logo" onClick={closeMenu}>
          <FaUserGraduate className="logo-icon" />
          <span>
            Student<span className="logo-highlight">MS</span>
          </span>
        </Link>

        {/* Mobile Menu Icon */}
        <div className="menu-icon" onClick={toggleMenu}>
          {isOpen ? <FaTimes /> : <FaBars />}
        </div>

        {/* Nav Menu */}
        <ul className={isOpen ? "nav-menu active" : "nav-menu"}>
          <li className="nav-item">
            <Link to="/home" className="nav-link" onClick={closeMenu}>
              <FaHome className="nav-icon" />
              <span>Home</span>
            </Link>
          </li>

          <li className="nav-item">
            <Link to="/students" className="nav-link" onClick={closeMenu}>
              <FaList className="nav-icon" />
              <span>Students</span>
            </Link>
          </li>

          <li className="nav-item">
            <Link to="/add-student" className="nav-link" onClick={closeMenu}>
              <FaPlus className="nav-icon" />
              <span>Add Student</span>
            </Link>
          </li>

          {/* Logout Button */}
          <li className="nav-item">
            <button className="nav-link logout-btn" onClick={handleLogout}>
              <FaSignOutAlt className="nav-icon" />
              <span>Logout</span>
            </button>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;