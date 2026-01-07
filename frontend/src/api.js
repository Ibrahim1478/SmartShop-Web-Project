import axios from 'axios';

// Backend base URL
// If needed, change to your backend URL (e.g., a deployed server)
export const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:8080/api';

export const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
});
