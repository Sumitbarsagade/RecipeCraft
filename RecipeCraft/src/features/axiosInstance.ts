import axios from 'axios';

const URL = import.meta.env.VITE_API_URL;

const axiosInstance = axios.create({
  baseURL: URL || 'http://localhost:5000', // Use a fallback URL if undefined
});

// console.log("Base URL:", URL); 

export default axiosInstance;