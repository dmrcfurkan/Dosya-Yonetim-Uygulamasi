import express from 'express'
import { uploadFile, listFiles, deleteFile } from '../controllers/fileController.js'
import upload from '../middleware/upload.js'
import { protect } from '../middleware/authMiddleware.js'

const router = express.Router()

router.post('/upload', protect, upload.single('file'), uploadFile)
router.get('/', protect, listFiles)
router.delete('/:id', protect, deleteFile)

export default router
