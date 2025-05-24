import { createContext, useContext, useState, useEffect } from 'react'
import API from '../api/axios.js';

const AuthContext = createContext()

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = localStorage.getItem('token')
        if (token) {
          const res = await API.get('/auth/me')
          setUser(res.data)
        }
      } catch (err) {
        localStorage.removeItem('token')
        setUser(null)
      } finally {
        setLoading(false)
      }
    }
    checkAuth()
  }, [])

  const login = async (token) => {
  localStorage.setItem('token', token);

  try {
    const res = await API.get('/auth/me'); 
    setUser(res.data); 
  } catch (err) {
    console.error("Kullanıcı bilgisi alınamadı:", err);
    localStorage.removeItem('token');
    setUser(null);
  }
};

  const logout = () => {
    localStorage.removeItem('token')
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)