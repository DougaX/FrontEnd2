import { useAuth } from '../contexts/AuthContext';
import { Link, useNavigate } from 'react-router-dom'; // Adicionar useNavigate
import {
  HeaderContainer,
  HeaderContent,
  HeaderLogo,
  HeaderNav,
  NavLinkStyled,
  HeaderUser,
  UserInfo,
  UserAvatar,
  LogoutButton
} from '../styles/styled/Header.styled';

const Header = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    if (window.confirm('Deseja realmente sair do sistema?')) {
      logout();
      navigate('/login');
    }
  };

  return (
    <HeaderContainer>
      <HeaderContent>
        <Link to="/dashboard">
          <HeaderLogo>
            <span>🏫</span>
            <h1>Sistema Escolar de Salas</h1>
          </HeaderLogo>
        </Link>

        <HeaderNav>
          <NavLinkStyled to="/dashboard">Salas</NavLinkStyled>
          <NavLinkStyled to="/reservas">Minhas Reservas</NavLinkStyled>
        </HeaderNav>

        <HeaderUser>
          <UserInfo>
            <UserAvatar>
              {user?.nome?.charAt(0).toUpperCase() || 'U'}
            </UserAvatar>
            <span>{user?.nome || 'Usuário'}</span>
          </UserInfo>
          <LogoutButton onClick={handleLogout}>
            Sair
          </LogoutButton>
        </HeaderUser>
      </HeaderContent>
    </HeaderContainer>
  );
};

export default Header;