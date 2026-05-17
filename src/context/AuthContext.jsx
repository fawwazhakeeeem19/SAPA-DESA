import { createContext, useContext, useState } from 'react'
import { authAPI } from '../services/api'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      const saved = localStorage.getItem('sapa_desa_user')
      return saved ? JSON.parse(saved) : null
    } catch { return null }
  })

  const login = async (email, password) => {
    const data = await authAPI.login({ email, password })
    localStorage.setItem('sapa_desa_token', data.token)
    localStorage.setItem('sapa_desa_user', JSON.stringify(data.user))
    setUser(data.user)
    return data.user
  }

  const register = async (formData) => {
    const data = await authAPI.register(formData)
    localStorage.setItem('sapa_desa_token', data.token)
    localStorage.setItem('sapa_desa_user', JSON.stringify(data.user))
    setUser(data.user)
    return data.user
  }

  const logout = () => {
    localStorage.removeItem('sapa_desa_token')
    localStorage.removeItem('sapa_desa_user')
    setUser(null)
  }

  const updateUser = (updated) => {
    const merged = { ...user, ...updated }
    localStorage.setItem('sapa_desa_user', JSON.stringify(merged))
    setUser(merged)
  }

  return (
    <AuthContext.Provider value={{ user, login, register, logout, updateUser }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
