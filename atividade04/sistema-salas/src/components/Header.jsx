import { Link, NavLink } from 'react-router-dom';
import '../styles/Header.css';

const Header = ({ user, onLogout }) => {
  return (
    <header className="header">
      <div className="container">
        <div className="header-content">
          <Link to="/dashboard" className="header-logo">
            <span>🏫</span>
            <h1>Sistema Escolar de Salas</h1>
          </Link>

          <nav className="header-nav">
            <NavLink to="/dashboard">Salas</NavLink>
            <NavLink to="/reservas">Minhas Reservas</NavLink>
          </nav>

          <div className="header-user">
            <div className="user-info">
              <div className="user-avatar">
                {user?.nome?.charAt(0).toUpperCase() || 'U'}
              </div>
              <span>{user?.nome || 'Usuário'}</span>
            </div>
            <button className="btn-logout" onClick={onLogout}>
              Sair
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;