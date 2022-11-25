import axios from "axios";

const BASE_URL = "http://calzlet.adamcal.com" // prod

const instance = axios.create({
    baseURL: BASE_URL
})

export default instance