import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { authService } from '../services/authService';

function Register() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password_confirmation: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (authService.isAuthenticated()) {
      navigate('/');
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    if (formData.password !== formData.password_confirmation) {
      setError('As senhas não coincidem.');
      setLoading(false);
      return;
    }

    try {
      await authService.register(formData);
      navigate('/');
    } catch (err) {
      console.error('Erro no registro:', err);
      if (err.response?.data?.errors?.email) {
        setError('Este email já está em uso.');
      } else {
        setError('Erro ao criar conta. Verifique os dados e tente novamente.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="container" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}>
      <div className="form-container">
        <h2 style={{ textAlign: 'center', marginBottom: '30px', color: '#333' }}>Criar Conta</h2>
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Nome:</label>
            <input
              id="name"
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              placeholder="Digite seu nome completo"
              disabled={loading}
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              id="email"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
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
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              placeholder="Digite sua senha (mínimo 6 caracteres)"
              disabled={loading}
              minLength="6"
            />
          </div>

          <div className="form-group">
            <label htmlFor="password_confirmation">Confirmar Senha:</label>
            <input
              id="password_confirmation"
              type="password"
              name="password_confirmation"
              value={formData.password_confirmation}
              onChange={handleChange}
              required
              placeholder="Confirme sua senha"
              disabled={loading}
              minLength="6"
            />
          </div>
          
          {error && <div className="error">{error}</div>}
          
          <button 
            type="submit" 
            disabled={loading}
            className="primary"
            style={{ width: '100%', padding: '12px', fontSize: '16px' }}
          >
            {loading ? 'Criando Conta...' : 'Criar Conta'}
          </button>
        </form>
        
        <div style={{ marginTop: '20px', textAlign: 'center', fontSize: '14px', color: '#666' }}>
          <p>
            Já tem uma conta? <Link to="/login" style={{ color: '#007bff', textDecoration: 'none' }}>Fazer Login</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Register;