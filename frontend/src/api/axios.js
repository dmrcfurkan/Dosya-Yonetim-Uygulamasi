import axios from 'axios'

const instance = axios.create({
  baseURL: 'http://localhost:5000/api', // Backend adresiniz
  headers: {
    'Content-Type': 'application/json',
  },
})

// Her istek öncesi token ekleme
instance.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

// Hata yönetimi
instance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token')
      window.location.href = '/login'
    }
    return Promise.reject(error)
  }
)

export default instance