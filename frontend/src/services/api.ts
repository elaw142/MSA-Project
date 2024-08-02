import axios from "axios";

const API_BASE_URL =
  "https://msabackend001-d4cpahbqaqgshmdk.eastus-01.azurewebsites.net";

const api = axios.create({
  baseURL: API_BASE_URL,
});

export default api;
