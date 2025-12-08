import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { AuthProvider } from './contexts/AuthContext';
import { SalaProvider } from './contexts/SalaContext';
import { ReservaProvider } from './contexts/ReservaContext';
import { GlobalStyles } from './styles/styled/GlobalStyles';
import { theme } from './styles/styled/theme';
import MainLayout from './layouts/MainLayout';
import AuthLayout from './layouts/AuthLayout';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import SalaDetalhes from './pages/SalaDetalhes';
import Reservas from './pages/Reservas';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <Router>
        <AuthProvider>
          <SalaProvider>
            <ReservaProvider>
              <Routes>
                <Route path="/" element={<Navigate to="/login" replace />} />

                <Route element={<AuthLayout />}>
                  <Route path="/login" element={<Login />} />
                  <Route path="/register" element={<Register />} />
                </Route>

                <Route element={<MainLayout />}>
                  <Route path="/dashboard" element={<Dashboard />} />
                  <Route path="/sala/:id" element={<SalaDetalhes />} />
                  <Route path="/reservas" element={<Reservas />} />
                </Route>

                <Route path="*" element={
                  <div style={{ 
                    textAlign: 'center', 
                    padding: '100px 20px',
                    minHeight: '100vh',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center'
                  }}>
                    <h1 style={{ fontSize: '72px', marginBottom: '20px', fontWeight: '700' }}>404</h1>
                    <h2 style={{ marginBottom: '10px' }}>Página não encontrada</h2>
                    <p style={{ marginTop: '20px' }}>
                      <a href="/dashboard" style={{ fontWeight: '600', borderBottom: '2px solid black' }}>
                        Voltar ao Dashboard
                      </a>
                    </p>
                  </div>
                } />
              </Routes>
            </ReservaProvider>
          </SalaProvider>
        </AuthProvider>
      </Router>
    </ThemeProvider>
  );
}

export default App;