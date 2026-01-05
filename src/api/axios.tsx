import axios from "axios";

// Create an axios instance
const api = axios.create({
  baseURL: "https://portfolio.naty25.com/api",
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
