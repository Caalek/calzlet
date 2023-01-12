import axios from "axios";

// const BASE_URL = "http://calzlet.adamcal.com" // prod
const BASE_URL = "/"
// lib/customAxios.js
export const instance = axios.create({
    baseURL: BASE_URL
  });

export default instance;