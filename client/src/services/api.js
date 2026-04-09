import axios from 'axios';

const BASE_URL = import.meta.env.VITE_API_URL || '/api';

const api = axios.create({
  baseURL: BASE_URL,
  headers: { 'Content-Type': 'application/json' },
});

// Attach JWT token to every request if available
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('medusa_admin_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Normalize error responses
api.interceptors.response.use(
  (res) => res,
  (error) => {
    const message =
      error.response?.data?.message || error.message || 'Something went wrong';
    return Promise.reject(new Error(message));
  }
);

// ─── Artwork endpoints ───
export const artworkAPI = {
  getAll: (params) => api.get('/artworks', { params }),
  getOne: (id) => api.get(`/artworks/${id}`),
  create: (formData) =>
    api.post('/artworks', formData, { headers: { 'Content-Type': 'multipart/form-data' } }),
  update: (id, data) => api.patch(`/artworks/${id}`, data),
  delete: (id) => api.delete(`/artworks/${id}`),
};

// ─── Commission endpoints ───
export const commissionAPI = {
  submit: (formData) =>
    api.post('/commissions', formData, { headers: { 'Content-Type': 'multipart/form-data' } }),
  getAll: (params) => api.get('/commissions', { params }),
  getOne: (id) => api.get(`/commissions/${id}`),
  updateStatus: (id, status) => api.patch(`/commissions/${id}/status`, { status }),
};

// ─── Auth endpoints ───
export const authAPI = {
  login: (credentials) => api.post('/auth/login', credentials),
};

export default api;
