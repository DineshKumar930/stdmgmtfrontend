import axios from "axios";

const API_BASE_URL = 'https://stdmgmtback1.onrender.com';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const studentService = {
  getAllStudents: async () => {
    try {
      const response = await api.get('/api/students');
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },
  getStudentById: async (id) => {
    try {
      const response = await api.get(`/api/students/${id}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },
  createStudent: async (student) => {
    try {
      const response = await api.post('/api/students', student);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },
  updateStudent: async (id, student) => {
    try {
      const response = await api.put(`/api/students/${id}`, student);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },
  deleteStudent: async (id) => {
    try {
      await api.delete(`/api/students/${id}`);
      return true;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },
  searchStudents: async (name) => {
    try {
      const response = await api.get(`/api/students/search?name=${name}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },
};

export default api;
