import { useEffect, useState } from "react";
import API from "../../api/axios";
import { FiUpload, FiTrash2, FiDownload, FiFile, FiImage, FiMusic, FiVideo, FiCode } from "react-icons/fi";
import { MdOutlineInsertDriveFile } from "react-icons/md";
import "./Dashboard.css";

export default function Dashboard() {
  const [file, setFile] = useState(null);
  const [files, setFiles] = useState([]);
  const [isUploading, setIsUploading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const getFiles = async () => {
    try {
      const res = await API.get("/files");
      setFiles(res.data);
    } catch (error) {
      console.error("Dosyalar yüklenirken hata:", error);
    }
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file) return;
    
    setIsUploading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);
      await API.post("/files/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      await getFiles();
    } catch (error) {
      console.error("Yükleme hatası:", error);
    } finally {
      setIsUploading(false);
      setFile(null);
      document.getElementById("file-upload").value = "";
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Bu dosyayı silmek istediğinize emin misiniz?")) return;
    
    try {
      await API.delete(`/files/${id}`);
      await getFiles();
    } catch (error) {
      console.error("Silme hatası:", error);
    }
  };

  const getFileIcon = (filename) => {
    const extension = filename.split('.').pop().toLowerCase();
    
    if (['jpg', 'jpeg', 'png', 'gif', 'svg'].includes(extension)) {
      return <FiImage className="file-icon" />;
    } else if (['mp3', 'wav', 'ogg'].includes(extension)) {
      return <FiMusic className="file-icon" />;
    } else if (['mp4', 'mov', 'avi', 'mkv'].includes(extension)) {
      return <FiVideo className="file-icon" />;
    } else if (['js', 'jsx', 'ts', 'html', 'css', 'json'].includes(extension)) {
      return <FiCode className="file-icon" />;
    } else {
      return <MdOutlineInsertDriveFile className="file-icon" />;
    }
  };

  const filteredFiles = files.filter(file => 
    file.originalname.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    getFiles();
  }, []);

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1>Dosya Yöneticisi</h1>
        <p>Toplam {files.length} dosya</p>
      </div>

      <div className="dashboard-actions">
        <form onSubmit={handleUpload} className="upload-form">
          <label className="upload-area">
            <input 
              id="file-upload"
              type="file" 
              onChange={(e) => setFile(e.target.files[0])} 
              className="file-input"
            />
            <div className="upload-content">
              <FiUpload className="upload-icon" />
              {file ? (
                <p className="file-name">{file.name}</p>
              ) : (
                <p>Dosya seçin veya sürükleyin</p>
              )}
            </div>
          </label>
          <button 
            type="submit" 
            className="upload-button"
            disabled={!file || isUploading}
          >
            {isUploading ? 'Yükleniyor...' : 'Yükle'}
          </button>
        </form>

        <div className="search-container">
          <input
            type="text"
            placeholder="Dosyalarda ara..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>
      </div>

      <div className="files-container">
        {filteredFiles.length > 0 ? (
          <div className="files-grid">
            {filteredFiles.map((f) => (
              <div key={f._id} className="file-card">
                <div className="file-header">
                  {getFileIcon(f.filename)}
                  <h3 className="file-title">{f.originalname}</h3>
                </div>
                <div className="file-actions">
                  <a
                    href={`http://localhost:5000/uploads/${f.filename}`}
                    download
                    className="action-button download"
                  >
                    <FiDownload />
                  </a>
                  <button 
                    onClick={() => handleDelete(f._id)}
                    className="action-button delete"
                  >
                    <FiTrash2 />
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="empty-state">
            <FiFile className="empty-icon" />
            <p>{searchTerm ? 'Aradığınız dosya bulunamadı' : 'Henüz dosya yüklenmedi'}</p>
          </div>
        )}
      </div>
    </div>
  );
}