import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { authService } from '../services/authService';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // Se já está logado, redireciona para home
    if (authService.isAuthenticated()) {
      navigate('/');
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await authService.login(email, password);
      navigate('/');
    } catch (err) {
      console.error('Erro no login:', err);
      setError('Erro ao fazer login. Verifique suas credenciais.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}>
      <div className="form-container">
        <h2 style={{ textAlign: 'center', marginBottom: '30px', color: '#333' }}>Login</h2>
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="Digite seu email"
              disabled={loading}
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="password">Senha:</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="Digite sua senha"
              disabled={loading}
            />
          </div>
          
          {error && <div className="error">{error}</div>}
          
          <button 
            type="submit" 
            disabled={loading}
            className="primary"
            style={{ width: '100%', padding: '12px', fontSize: '16px' }}
          >
            {loading ? 'Entrando...' : 'Entrar'}
          </button>
        </form>
        
        <div style={{ marginTop: '20px', textAlign: 'center', fontSize: '14px', color: '#666' }}>
          <p>Use as credenciais do sistema para acessar</p>
          <p style={{ marginTop: '10px' }}>
            Não tem uma conta? <Link to="/register" style={{ color: '#007bff', textDecoration: 'none' }}>Criar Conta</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;