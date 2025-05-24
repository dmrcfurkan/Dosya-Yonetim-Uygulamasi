import jwt from 'jsonwebtoken'
import User from '../models/User.js'

export const protect = async (req, res, next) => {
  const authHeader = req.headers.authorization

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Yetkisiz erişim, token eksik veya hatalı' })
  }

  const token = authHeader.split(' ')[1]

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    req.user = await User.findById(decoded.id).select('-password')

    if (!req.user) {
      return res.status(401).json({ error: 'Kullanıcı bulunamadı' })
    }

    next()
  } catch (err) {
    console.error('Token doğrulama hatası:', err.message)
    res.status(401).json({ error: 'Geçersiz token' })
  }
}
