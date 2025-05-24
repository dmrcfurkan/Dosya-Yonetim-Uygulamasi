import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import { connectDB } from './config/db.js'
import authRoutes from './routes/authRoutes.js'
import fileRoutes from './routes/fileRoutes.js'

dotenv.config()
connectDB()

const app = express()

app.use(cors())
app.use(express.json({ limit: '10mb' }))
app.use(express.urlencoded({ limit: '10mb', extended: true }))

app.use('/api/auth', authRoutes)
app.use('/api/files', fileRoutes)
app.use('/uploads', express.static('uploads'))

const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log(`Server ${PORT} portunda çalışıyor`))
