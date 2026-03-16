import "./Home.css";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { studentService } from "../services/api";

import {
  FaChartBar,
  FaList,
  FaUserGraduate,
  FaUserPlus,
  FaKey,
} from "react-icons/fa";

const Home = () => {
  const [stats, setStats] = useState({
    totalStudents: 0,
    totalCourses: 0,
    totalCities: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      setLoading(true);
      const students = await studentService.getAllStudents();

      const uniqueCourses = [...new Set(students.map((s) => s.course))];
      const uniqueCities = [...new Set(students.map((s) => s.city))];

      setStats({
        totalStudents: students.length,
        totalCourses: uniqueCourses.length,
        totalCities: uniqueCities.length,
      });
    } catch (err) {
      setError("Failed to load statistics");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="loading">Loading dashboard...</div>;
  }

  return (
    <div className="home">
      <div className="home-header">
        <h1 className="home-title">
          <FaChartBar className="home-title-icon" />
          Dashboard
        </h1>
        <p className="home-subtitle">Welcome to Student Management System</p>
      </div>

      {error && <div className="error-message">{error}</div>}

      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon-wrapper total-students">
            <FaUserGraduate className="stat-icon" />
          </div>
          <div className="stat-details">
            <h3 className="stat-value">{stats.totalStudents}</h3>
            <p className="stat-label">Total Students</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon-wrapper total-courses">
            <FaList className="stat-icon" />
          </div>
          <div className="stat-details">
            <h3 className="stat-value">{stats.totalCourses}</h3>
            <p className="stat-label">Unique Courses</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon-wrapper total-cities">
            <FaChartBar className="stat-icon" />
          </div>
          <div className="stat-details">
            <h3 className="stat-value">{stats.totalCities}</h3>
            <p className="stat-label">Cities</p>
          </div>
        </div>
      </div>

      <div className="action-cards">
        <div className="action-card">
          <h3 className="action-card-title">Manage Students</h3>
          <p className="action-card-description">
            View, edit, or delete existing student records
          </p>
          <Link to="/students" className="action-button">
            View All Students
          </Link>
        </div>

        <div className="action-card">
          <h3 className="action-card-title">Add New Student</h3>
          <p className="action-card-description">
            Register a new student in the system
          </p>
          <Link to="/add-student" className="action-button">
            <FaUserPlus className="button-icon" />
            Add Student
          </Link>
        </div>

        {/* Change Password Card */}
        <div className="action-card">
          <h3 className="action-card-title">Change Password</h3>
          <p className="action-card-description">
            Update your account password securely
          </p>
          <Link to="/change-password" className="action-button">
            <FaKey className="button-icon" />
            Change Password
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;