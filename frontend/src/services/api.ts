import axios from "axios";

const API_BASE_URL = "http://localhost:5278/api";

const api = axios.create({
  baseURL: API_BASE_URL,
});

export default api;
