import { useState } from "react";
import axios from "axios";
import { FiUser, FiLock, FiArrowRight, FiMail, FiCheck } from "react-icons/fi";
import "./RegisterPage.css"
import { useNavigate,Link } from "react-router-dom";

function Register() {
  const [form, setForm] = useState({
    email: "",
    password: "",
    confirmPassword: ""
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError(null);
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    
    if (!form.email || !form.password || !form.confirmPassword) {
      setError('Tüm alanları doldurun');
      setLoading(false);
      return;
    }

    if (form.password !== form.confirmPassword) {
      setError('Şifreler eşleşmiyor');
      setLoading(false);
      return;
    }

    try {
      await axios.post("http://localhost:5000/api/auth/register", {
        email: form.email,
        password: form.password,
      });
      setSuccess(true);
      setTimeout(() => navigate("/login"), 2000);
    } catch (err) {
      setError(err.response?.data?.message || "Kayıt başarısız!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register-container">
      <div className="register-glass">
        <div className="register-header">
          <h1 className="register-title">Hesap Oluştur</h1>
          <p className="register-subtitle">Yeni bir hesap oluşturun</p>
        </div>

        <form onSubmit={handleRegister} className="register-form">
          {error && <div className="register-error">{error}</div>}
          {success && (
            <div className="register-success">
              <FiCheck className="success-icon" />
              <span>Kayıt başarılı! Giriş sayfasına yönlendiriliyorsunuz...</span>
            </div>
          )}
          
          <div className="input-group">
            <FiMail className="input-icon" />
            <input
              name="email"
              type="email"
              placeholder="Email Adresiniz"
              onChange={handleChange}
              value={form.email}
              required
              className="register-input"
            />
            <div className="input-highlight"></div>
          </div>

          <div className="input-group">
            <FiLock className="input-icon" />
            <input
              name="password"
              type="password"
              placeholder="Şifreniz"
              onChange={handleChange}
              value={form.password}
              required
              className="register-input"
            />
            <div className="input-highlight"></div>
          </div>

          <div className="input-group">
            <FiLock className="input-icon" />
            <input
              name="confirmPassword"
              type="password"
              placeholder="Şifrenizi Tekrar Girin"
              onChange={handleChange}
              value={form.confirmPassword}
              required
              className="register-input"
            />
            <div className="input-highlight"></div>
          </div>

          <div className="password-requirements">
            <p>Şifre gereksinimleri:</p>
            <ul>
              <li className={form.password.length >= 8 ? 'valid' : ''}>En az 8 karakter</li>
              <li className={/[A-Z]/.test(form.password) ? 'valid' : ''}>En az 1 büyük harf</li>
              <li className={/[0-9]/.test(form.password) ? 'valid' : ''}>En az 1 sayı</li>
            </ul>
          </div>

          <button 
            type="submit" 
            className="register-button" 
            disabled={loading || success}
          >
            {loading ? (
              <span className="loading-spinner"></span>
            ) : success ? (
              <>
                <span>Başarılı</span>
                <FiCheck className="button-icon" />
              </>
            ) : (
              <>
                <span>Kayıt Ol</span>
                <FiArrowRight className="button-icon" />
              </>
            )}
          </button>
        </form>

        <div className="register-footer">
          <p>Zaten hesabınız var mı? <Link to="/login" className="login-link">Giriş Yapın</Link></p>
        </div>
      </div>
      
      <div className="register-background">
        <div className="bg-shape-1"></div>
        <div className="bg-shape-2"></div>
        <div className="bg-shape-3"></div>
      </div>
    </div>
  );
}

export default Register;