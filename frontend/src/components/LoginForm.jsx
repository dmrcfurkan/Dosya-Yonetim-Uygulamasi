import { useState } from 'react'
import axios from 'axios'

export default function LoginForm({ onLogin }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    const res = await axios.post('http://localhost:5000/api/auth/login', { email, password })
    localStorage.setItem('token', res.data.token)
    onLogin()
  }

  return (
    <form onSubmit={handleSubmit}>
      
      <input value={email} onChange={e => setEmail(e.target.value)} placeholder="E-posta" />
      <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Şifre" />
      <button type="submit">Giriş Yap</button>
    </form>
  )
}
