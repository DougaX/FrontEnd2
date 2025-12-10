import { Link } from 'react-router-dom';
import { authService } from '../services/authService';

function Navbar() {
  const isAuthenticated = authService.isAuthenticated();

  const handleLogout = () => {
    authService.logout();
    window.location.href = '/login';
  };

  const navStyle = {
    backgroundColor: '#007bff',
    padding: '1rem 2rem',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    position: 'sticky',
    top: 0,
    zIndex: 1000
  };

  const linkStyle = {
    color: 'white',
    textDecoration: 'none',
    marginRight: '20px',
    padding: '8px 12px',
    borderRadius: '4px',
    transition: 'background-color 0.2s ease'
  };

  const buttonStyle = {
    backgroundColor: 'transparent',
    color: 'white',
    border: '1px solid white',
    padding: '8px 16px',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '14px',
    transition: 'all 0.2s ease'
  };

  return (
    <nav style={navStyle}>
      <div>
        <Link to="/" style={{ ...linkStyle, fontSize: '18px', fontWeight: 'bold', marginRight: 0 }}>
          Sistema de Reservas
        </Link>
      </div>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <Link to="/professores" style={linkStyle}>
          Professores
        </Link>
        <Link to="/salas" style={linkStyle}>
          Salas
        </Link>
        <Link to="/reservas" style={linkStyle}>
          Reservas
        </Link>
        {isAuthenticated && (
          <Link to="/nova-reserva" style={linkStyle}>
            Nova Reserva
          </Link>
        )}
        {isAuthenticated ? (
          <button onClick={handleLogout} style={buttonStyle}>
            Logout
          </button>
        ) : (
          <>
            <Link to="/login" style={linkStyle}>
              Login
            </Link>
            <Link to="/register" style={{ ...linkStyle, marginRight: 0 }}>
              Registrar
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;