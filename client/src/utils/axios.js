import axios from "axios";

const BASE_URL = "http://calzlet.adamcal.com"

const instance = axios.create({
    baseURL: BASE_URL
})

export default instance