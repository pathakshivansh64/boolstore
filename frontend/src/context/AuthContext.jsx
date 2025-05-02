import { createContext, useState, useContext } from 'react'
import { loginUser, registerUser } from '../api/auth'

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [token, setToken] = useState(localStorage.getItem('token') || null)

  const login = async (username, password) => {
    try {
      const { token } = await loginUser(username, password)
      localStorage.setItem('token', token)
      setToken(token)
      setUser({ username })
      return true
    } catch (error) {
      console.error('Login failed:', error)
      return false
    }
  }

  const register = async (username, password) => {
    try {
      await registerUser(username, password)
      return true
    } catch (error) {
      console.error('Registration failed:', error)
      return false
    }
  }

  const logout = () => {
    localStorage.removeItem('token')
    setToken(null)
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, token, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)