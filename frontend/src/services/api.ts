import axios from "axios";

const API_BASE_URL =
  "https://msabackendwebapp-b7b6bqfda6fbhafk.australiasoutheast-01.azurewebsites.net/";

const api = axios.create({
  baseURL: API_BASE_URL,
});

export default api;
