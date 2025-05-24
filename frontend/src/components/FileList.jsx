import { useState, useEffect } from 'react'
import API from '../api/axios'
import { useAuth } from '../context/AuthContext'

export default function FileList() {
  const [files, setFiles] = useState([])
  const [loading, setLoading] = useState(true)
  const { user } = useAuth()

  useEffect(() => {
    const fetchFiles = async () => {
      try {
        const res = await API.get('/files')
        setFiles(res.data)
      } catch (err) {
        console.error('Dosyalar yüklenirken hata:', err)
      } finally {
        setLoading(false)
      }
    }

    if (user) fetchFiles()
  }, [user])

  const handleDelete = async (id) => {
    try {
      await API.delete(`/files/${id}`)
      setFiles(files.filter(file => file._id !== id))
    } catch (err) {
      console.error('Silme hatası:', err)
    }
  }

  if (loading) return <div className="text-center py-8">Yükleniyor...</div>
  if (files.length === 0) return <div className="text-center py-8">Henüz dosya yok</div>

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
      {files.map((file) => (
        <div key={file._id} className="border rounded-lg p-4 shadow hover:shadow-md transition">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="font-medium truncate">{file.originalname}</h3>
              <p className="text-sm text-gray-500">
                {Math.round(file.size / 1024)} KB • {new Date(file.uploadDate).toLocaleDateString()}
              </p>
            </div>
            <button 
              onClick={() => handleDelete(file._id)}
              className="text-red-500 hover:text-red-700"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
          <a 
            href={`http://localhost:5000/uploads/${file.filename}`} 
            target="_blank" 
            rel="noopener noreferrer"
            className="mt-3 inline-block text-blue-600 hover:underline"
          >
            Dosyayı Görüntüle
          </a>
        </div>
      ))}
    </div>
  )
}