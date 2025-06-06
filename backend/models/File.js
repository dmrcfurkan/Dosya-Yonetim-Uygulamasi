import mongoose from 'mongoose'

const fileSchema = new mongoose.Schema({
  filename: String,
  originalname: String,
  mimetype: String,
  size: Number,
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  uploadDate: {
    type: Date,
    default: Date.now
  }
})

export default mongoose.model('File', fileSchema)
