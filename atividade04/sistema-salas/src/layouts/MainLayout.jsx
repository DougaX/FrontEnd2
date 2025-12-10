import { Outlet, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Header from '../components/header.jsx';
import Footer from '../components/footer.jsx';

const MainLayout = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const loggedUser = localStorage.getItem('user');
    if (!loggedUser) {
      navigate('/login');
    } else {
      setUser(JSON.parse(loggedUser));
    }
  }, [navigate]);

  const handleLogout = () => {
    if (window.confirm('Deseja realmente sair do sistema?')) {
      localStorage.removeItem('user');
      navigate('/login');
    }
  };

  if (!user) {
    return null;
  }

  return (
    <>
      <Header user={user} onLogout={handleLogout} />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default MainLayout;