import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { useState, useEffect } from 'react'
import { FiUser, FiLogOut, FiSettings, FiChevronDown, FiHome } from 'react-icons/fi'
import './Navbar.css' 

export default function Navbar() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const [scrolled, setScrolled] = useState(false)
  const [showDropdown, setShowDropdown] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <nav className={`navbar ${scrolled ? 'navbar-scrolled' : ''}`}>
      <div className="navbar-container">
        <Link to="/" className="navbar-brand">
          <FiHome className="navbar-brand-icon" />
          <span className="navbar-brand-text">CloudDrive</span>
        </Link>
        
        <div className="navbar-menu">
          {user ? (
            <div className="navbar-user">
              <button 
                className="navbar-user-button"
                onClick={() => setShowDropdown(!showDropdown)}
              >
                <div className="navbar-user-avatar">
                  <FiUser className="navbar-user-icon" />
                </div>
                <span className="navbar-user-email">{user.email.split('@')[0]}</span>
                <FiChevronDown className={`navbar-dropdown-icon ${showDropdown ? 'rotate' : ''}`} />
              </button>
              
              {showDropdown && (
                <div className="navbar-dropdown">
                  <div className="dropdown-header">
                    <p className="dropdown-status">Oturum açıldı</p>
                    <p className="dropdown-email">{user.email}</p>
                  </div>
                  <div className="dropdown-menu">
                    <Link 
                      to="/settings" 
                      className="dropdown-item"
                      onClick={() => setShowDropdown(false)}
                    >
                      <FiSettings className="dropdown-item-icon" />
                      <span>Ayarlar</span>
                    </Link>
                    <button 
                      onClick={handleLogout}
                      className="dropdown-item logout"
                    >
                      <FiLogOut className="dropdown-item-icon" />
                      <span>Çıkış Yap</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="navbar-auth">
              <Link to="/login" className="navbar-login">Giriş Yap</Link>
              <Link to="/register" className="navbar-register">Kayıt Ol</Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  )
}