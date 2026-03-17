import axios from "axios";

const API_BASE_URL = 'https://stdmgmtback1.onrender.com/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const studentService = {
  // Get all students
  getAllStudents: async () => {
    try {
      const response = await api.get('/students');
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Get student by ID
  getStudentById: async (id) => {
    try {
      const response = await api.get(`/students/${id}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Create new student
  createStudent: async (student) => {
    try {
      const response = await api.post('/students', student);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Update student
  updateStudent: async (id, student) => {
    try {
      const response = await api.put(`/students/${id}`, student);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Delete student
  deleteStudent: async (id) => {
    try {
      await api.delete(`/students/${id}`);
      return true;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Search students by name
  searchStudents: async (name) => {
    try {
      const response = await api.get(`/students/search?name=${name}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },
};

export default api;
