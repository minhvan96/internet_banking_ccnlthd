import axios from "axios";

const apiInstance = axios.create({
  baseURL: process.env.REACT_APP_API_SECRET || 'http://localhost:8001/',
  headers: {
    'Content-type': 'application/json',
  },
});

export default apiInstance;
