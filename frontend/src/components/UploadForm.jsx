import axios from 'axios'
const handleUpload = async (e) => {
  const formData = new FormData()
  formData.append('file', e.target.files[0])
  await axios.post('http://localhost:5000/api/files/upload', formData, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
      'Content-Type': 'multipart/form-data'
    }
  })
}
