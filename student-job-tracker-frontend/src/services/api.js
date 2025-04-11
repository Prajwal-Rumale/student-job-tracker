import axios from 'axios';

// ✅ Backend base URL (use local or deployed)
const API = axios.create({
  baseURL: 'http://localhost:5000/api', // Update to your backend base URL
});

// ✅ Add Job
export const addJob = (jobData) => API.post('/jobs', jobData);

// ✅ Get All Jobs (with optional query params)
export const getJobs = (filters = {}) => API.get('/jobs', { params: filters });

// ✅ Update Job
export const updateJob = (id, updatedData) => API.patch(`/jobs/${id}`, updatedData);

// ✅ Delete Job
export const deleteJob = (id) => API.delete(`/jobs/${id}`);

export default API;
