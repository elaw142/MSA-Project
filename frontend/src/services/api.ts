import axios from "axios";

const API_BASE_URL =
  // This for using Azure
  "https://msabackend001-d4cpahbqaqgshmdk.eastus-01.azurewebsites.net/api";

  // This for running locally with docker
  // "http://localhost:5278/api";

const api = axios.create({
  baseURL: API_BASE_URL,
});

export default api;
