import axios from "axios";

const API_BASE_URL = "http://backend:8080/api";

const api = axios.create({
  baseURL: API_BASE_URL,
});

export default api;
