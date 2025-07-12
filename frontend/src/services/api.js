import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5001/api';

const api = axios.create({
  baseURL: API_BASE_URL,
});

// Add auth token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Auth API
export const authAPI = {
  register: (userData) => api.post('/auth/register', userData),
  login: (credentials) => api.post('/auth/login', credentials),
};

// Users API
export const usersAPI = {
  getProfile: () => api.get('/users/profile'),
  updateProfile: (data) => api.put('/users/profile', data),
  searchUsers: (params) => api.get('/users/search', { params }),
};

// Skills API
export const skillsAPI = {
  getSkills: () => api.get('/skills'),
  addSkill: (skill) => api.post('/skills', skill),
  deleteSkill: (id) => api.delete(`/skills/${id}`),
};

// Swaps API
export const swapsAPI = {
  getSwaps: () => api.get('/swaps'),
  sendSwapRequest: (data) => api.post('/swaps', data),
  updateSwapStatus: (id, status) => api.put(`/swaps/${id}`, { status }),
};

// Ratings API
export const ratingsAPI = {
  getUserRatings: (userId) => api.get(`/ratings/user/${userId}`),
  addRating: (rating) => api.post('/ratings', rating),
};

// Upload API
export const uploadAPI = {
  uploadProfileImage: (formData) => api.post('/upload/profile-image', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  }),
};

export default api;