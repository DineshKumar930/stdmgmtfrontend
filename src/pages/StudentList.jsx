import "./StudentList.css";
import React, { useEffect, useState } from "react";
import SearchBar from "../components/SearchBar";
import { FaEdit, FaSpinner, FaTrash, FaUserPlus } from "react-icons/fa";
import { Link } from "react-router-dom";
import { studentService } from "../services/api";

const StudentList = () => {
  const [students, setStudents] = useState([]);
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [deleteModal, setDeleteModal] = useState({ show: false, id: null, name: '' });

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      setLoading(true);
      const data = await studentService.getAllStudents();
      setStudents(data);
      setFilteredStudents(data);
    } catch (err) {
      setError('Failed to fetch students');
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async (searchTerm) => {
    if (searchTerm.trim() === '') {
      setFilteredStudents(students);
      return;
    }

    try {
      setLoading(true);
      const results = await studentService.searchStudents(searchTerm);
      setFilteredStudents(results);
    } catch (err) {
      setError('Search failed');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteClick = (id, name) => {
    setDeleteModal({ show: true, id, name });
  };

  const handleDeleteConfirm = async () => {
    try {
      setLoading(true);
      await studentService.deleteStudent(deleteModal.id);
      setSuccessMessage('Student deleted successfully!');
      setDeleteModal({ show: false, id: null, name: '' });
      fetchStudents();
      setTimeout(() => setSuccessMessage(''), 3000);
    } catch (err) {
      setError('Failed to delete student');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteCancel = () => {
    setDeleteModal({ show: false, id: null, name: '' });
  };

  if (loading && students.length === 0) {
    return (
      <div className="loading-container">
        <FaSpinner className="spinner" />
        <p>Loading students...</p>
      </div>
    );
  }

  return (
    <div className="student-list">
      <div className="list-header">
        <h1 className="list-title">Student Management</h1>
        <Link to="/add-student" className="btn-add">
          <FaUserPlus />
          Add New Student
        </Link>
      </div>

      <SearchBar onSearch={handleSearch} />

      {error && <div className="error-message">{error}</div>}
      {successMessage && <div className="success-message">{successMessage}</div>}

      {deleteModal.show && (
        <div className="modal-overlay">
          <div className="modal">
            <h3 className="modal-title">Confirm Delete</h3>
            <p className="modal-message">
              Are you sure you want to delete <strong>{deleteModal.name}</strong>?
              This action cannot be undone.
            </p>
            <div className="modal-actions">
              <button className="btn-cancel" onClick={handleDeleteCancel}>
                Cancel
              </button>
              <button className="btn-confirm-delete" onClick={handleDeleteConfirm}>
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {filteredStudents.length === 0 ? (
        <div className="no-results">
          <p>No students found.</p>
        </div>
      ) : (
        <div className="table-container">
          <table className="students-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Full Name</th>
                <th>Email</th>
                <th>Course</th>
                <th>Mobile</th>
                <th>City</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredStudents.map((student) => (
                <tr key={student.id}>
                  <td data-label="ID">#{student.id}</td>
                  <td data-label="Name">{student.fullName}</td>
                  <td data-label="Email">{student.email}</td>
                  <td data-label="Course">{student.course}</td>
                  <td data-label="Mobile">{student.mobile}</td>
                  <td data-label="City">{student.city}</td>
                  <td data-label="Actions">
                    <div className="action-buttons">
                      <Link
                        to={`/edit-student/${student.id}`}
                        className="btn-edit"
                        title="Edit"
                      >
                        <FaEdit />
                      </Link>
                      <button
                        className="btn-delete"
                        onClick={() => handleDeleteClick(student.id, student.fullName)}
                        title="Delete"
                      >
                        <FaTrash />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default StudentList;