import axios from "axios";

// const BASE_URL = "http://calzlet.adamcal.com" // prod
const BASE_URL = ""
// lib/customAxios.js
export const instance = axios.create({
    baseURL: BASE_URL
  });
  
  instance.interceptors.response.use(
    response => response,
    error => {
      if (error.response.status === 401) {
        window.location.href = '/';
      }
    });
  
export default instance;