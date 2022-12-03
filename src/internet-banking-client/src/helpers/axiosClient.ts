import axios from 'axios'

const apiClient = axios.create({
  baseURL: process.env.REACT_APP_API_SERVER_URL,
  headers: {
    'Content-type': 'application/json',
  },
})

export default apiClient