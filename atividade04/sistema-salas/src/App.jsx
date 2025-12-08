import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import AuthLayout from './layouts/AuthLayout';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import SalaDetalhes from './pages/SalaDetalhes';
import Reservas from './pages/Reservas';
import './styles/global.css';

function App() {
  return (
    <Router>
      <Routes>
        {/* Rota raiz - redireciona para login */}
        <Route path="/" element={<Navigate to="/login" replace />} />

        {/* Rotas de autenticação (sem layout) */}
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>

        {/* Rotas protegidas (com layout - Header + Footer) */}
        <Route element={<MainLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/sala/:id" element={<SalaDetalhes />} />
          <Route path="/reservas" element={<Reservas />} />
        </Route>

        {/* Rota 404 */}
        <Route path="*" element={
          <div style={{ 
            textAlign: 'center', 
            padding: '100px 20px',
            minHeight: '100vh',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'var(--white)'
          }}>
            <h1 style={{ 
              fontSize: '72px', 
              marginBottom: '20px',
              fontWeight: '700',
              color: 'var(--black)'
            }}>404</h1>
            <h2 style={{ marginBottom: '10px', color: 'var(--black)' }}>Página não encontrada</h2>
            <p style={{ marginTop: '20px' }}>
              <a href="/dashboard" style={{ 
                color: 'var(--black)', 
                fontWeight: '600',
                borderBottom: '2px solid var(--black)'
              }}>
                Voltar ao Dashboard
              </a>
            </p>
          </div>
        } />
      </Routes>
    </Router>
  );
}

export default App;