import multer from 'multer'
import path from 'path'


import fs from 'fs'
const uploadDir = './uploads'
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir)

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/')
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname)
    const name = file.fieldname + '-' + Date.now() + ext
    cb(null, name)
  }
})

const fileFilter = (req, file, cb) => {
  const allowedTypes = ['application/pdf', 'image/png', 'image/jpeg']
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true)
  } else {
    cb(new Error('Sadece PDF, PNG veya JPG yüklenebilir'), false)
  }
}

const upload = multer({ storage, fileFilter })

export default upload
