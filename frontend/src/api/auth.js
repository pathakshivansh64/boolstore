import axios from 'axios'

const API_URL = 'https://bookstore-rop2.onrender.com/api/auth'

export const loginUser = async (username, password) => {
  const response = await axios.post(`${API_URL}/login`, { username, password })
  return response.data
}

export const registerUser = async (username, password) => {
  const response = await axios.post(`${API_URL}/register`, { username, password })
  return response.data
}