// API Configuration
// In production (Vercel), API requests use the same origin, so base URL is empty string.
const API_BASE_URL = import.meta.env.PROD 
  ? "" 
  : (import.meta.env.VITE_API_BASE_URL || "http://localhost:5000");

export default API_BASE_URL;
