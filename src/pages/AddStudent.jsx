import "./AddStudent.css";
import React, { useState } from "react";
import { FaSpinner, FaUserGraduate } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { studentService } from "../services/api";

const AddStudent = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    course: '',
    mobile: '',
    city: ''
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear field error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full name is required';
    } else if (formData.fullName.length < 2) {
      newErrors.fullName = 'Full name must be at least 2 characters';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }

    if (!formData.course.trim()) {
      newErrors.course = 'Course is required';
    }

    if (!formData.mobile.trim()) {
      newErrors.mobile = 'Mobile number is required';
    } else if (!/^\d{10}$/.test(formData.mobile)) {
      newErrors.mobile = 'Mobile number must be 10 digits';
    }

    if (!formData.city.trim()) {
      newErrors.city = 'City is required';
    }

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const newErrors = validateForm();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      setLoading(true);
      setApiError('');
      await studentService.createStudent(formData);
      navigate('/students');
    } catch (err) {
      if (typeof err === 'object') {
        // Handle field-specific errors from backend
        setErrors(err);
      } else {
        setApiError('Failed to add student. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="add-student">
      <div className="form-header">
        <FaUserGraduate className="form-icon" />
        <h1 className="form-title">Add New Student</h1>
        <p className="form-subtitle">Enter the student details below</p>
      </div>

      {apiError && <div className="error-message">{apiError}</div>}

      <form className="student-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="fullName">Full Name *</label>
          <input
            type="text"
            id="fullName"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            placeholder="Enter full name"
            className={errors.fullName ? 'error' : ''}
          />
          {errors.fullName && <span className="error-text">{errors.fullName}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="email">Email *</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter email address"
            className={errors.email ? 'error' : ''}
          />
          {errors.email && <span className="error-text">{errors.email}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="course">Course *</label>
          <input
            type="text"
            id="course"
            name="course"
            value={formData.course}
            onChange={handleChange}
            placeholder="Enter course name"
            className={errors.course ? 'error' : ''}
          />
          {errors.course && <span className="error-text">{errors.course}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="mobile">Mobile Number *</label>
          <input
            type="tel"
            id="mobile"
            name="mobile"
            value={formData.mobile}
            onChange={handleChange}
            placeholder="Enter 10 digit mobile number"
            maxLength="10"
            className={errors.mobile ? 'error' : ''}
          />
          {errors.mobile && <span className="error-text">{errors.mobile}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="city">City *</label>
          <input
            type="text"
            id="city"
            name="city"
            value={formData.city}
            onChange={handleChange}
            placeholder="Enter city name"
            className={errors.city ? 'error' : ''}
          />
          {errors.city && <span className="error-text">{errors.city}</span>}
        </div>

        <div className="form-actions">
          <button
            type="button"
            className="btn-cancel"
            onClick={() => navigate('/students')}
            disabled={loading}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="btn-submit"
            disabled={loading}
          >
            {loading ? (
              <>
                <FaSpinner className="spinner-icon" />
                Adding...
              </>
            ) : (
              'Add Student'
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddStudent;