import { useState } from "react";
import API from "../../api/axios";

import { useAuth } from "../../context/AuthContext";
import { FiUser, FiLock, FiArrowRight, FiMail } from "react-icons/fi";
import { useNavigate, Link } from "react-router-dom"; 
import "./LoginPage.css";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError(null); 
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await API.post("/auth/login", form);
      await login(res.data.token);
      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.error || "Giriş başarısız!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-glass">
        <div className="login-header">
          <h1 className="login-title">Hoş Geldiniz</h1>
          <p className="login-subtitle">Hesabınıza giriş yapın</p>
        </div>

        <form onSubmit={handleSubmit} className="login-form">
          {error && <div className="login-error">{error}</div>}

          <div className="input-group">
            <FiMail className="input-icon" />
            <input
              name="email"
              type="email"
              placeholder="Email Adresiniz"
              onChange={handleChange}
              value={form.email}
              required
              className="login-input"
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
              className="login-input"
            />
            <div className="input-highlight"></div>
          </div>

          <div className="login-options">
            <label className="remember-me">
              <input type="checkbox" />
              <span>Beni Hatırla</span>
            </label>
            <Link to="/forgot-password" className="forgot-password">
              Şifremi Unuttum?
            </Link>
          </div>

          <button type="submit" className="login-button" disabled={loading}>
            {loading ? (
              <span className="loading-spinner"></span>
            ) : (
              <>
                <span>Giriş Yap</span>
                <FiArrowRight className="button-icon" />
              </>
            )}
          </button>
        </form>

        <div className="login-footer">
          <p>
            Hesabınız yok mu?{" "}
            <Link to="/register" className="register-link">
              Kayıt Olun
            </Link>
          </p>
        </div>
      </div>

      <div className="login-background">
        <div className="bg-shape-1"></div>
        <div className="bg-shape-2"></div>
        <div className="bg-shape-3"></div>
      </div>
    </div>
  );
}
