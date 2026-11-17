import axios from 'axios';

/**
 * Centralized API client.
 * In development Vite proxies /api to the Express backend, so the base URL
 * can be empty. In production VITE_API_URL points at the Render backend.
 * withCredentials lets the HTTP-only auth cookie travel with cross-origin
 * requests.
 */
const BASE_URL = import.meta.env.VITE_API_URL || '';

const api = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
  headers: { 'Content-Type': 'application/json' },
});

export default api;

/* ---------------- About ---------------- */

export const getAbout = () => api.get('/api/about');
export const updateAbout = (data) => api.put('/api/about', data);

/* ---------------- Skills ---------------- */

export const getSkills = () => api.get('/api/skills');
export const getSkill = (id) => api.get(`/api/skills/${id}`);
export const createSkill = (data) => api.post('/api/skills', data);
export const updateSkill = (id, data) => api.put(`/api/skills/${id}`, data);
export const deleteSkill = (id) => api.delete(`/api/skills/${id}`);

/* ---------------- Experience ---------------- */

export const getExperiences = () => api.get('/api/experience');
export const getExperience = (id) => api.get(`/api/experience/${id}`);
export const createExperience = (data) => api.post('/api/experience', data);
export const updateExperience = (id, data) => api.put(`/api/experience/${id}`, data);
export const deleteExperience = (id) => api.delete(`/api/experience/${id}`);

/* ---------------- Projects ---------------- */

export const getProjects = (params) => api.get('/api/projects', { params });
export const getProject = (id) => api.get(`/api/projects/${id}`);
export const createProject = (data) => api.post('/api/projects', data);
export const updateProject = (id, data) => api.put(`/api/projects/${id}`, data);
export const deleteProject = (id) => api.delete(`/api/projects/${id}`);

/* ---------------- Contact ---------------- */

export const submitContact = (data) => api.post('/api/contact', data);
export const getContacts = (params) => api.get('/api/contact', { params });
export const getContact = (id) => api.get(`/api/contact/${id}`);
export const updateContactStatus = (id, status) =>
  api.patch(`/api/contact/${id}`, { status });
export const deleteContact = (id) => api.delete(`/api/contact/${id}`);

/* ---------------- Auth ---------------- */

export const adminLogin = (data) => api.post('/api/auth/login', data);
export const adminLogout = () => api.post('/api/auth/logout');
export const getMe = () => api.get('/api/auth/me');
