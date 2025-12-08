import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/Auth.css';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    remember: false
  });
  const [message, setMessage] = useState({ text: '', type: '' });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      setMessage({ text: 'Preencha todos os campos', type: 'error' });
      return;
    }

    // Simulação de login
    const user = {
      id: 1,
      nome: 'Prof. João Silva',
      email: formData.email,
      tipo: 'professor'
    };

    localStorage.setItem('user', JSON.stringify(user));

    if (formData.remember) {
      localStorage.setItem('rememberedEmail', formData.email);
    }

    setMessage({ text: 'Login realizado com sucesso!', type: 'success' });

    setTimeout(() => {
      navigate('/dashboard');
    }, 1000);
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <div className="auth-logo">
          <span>🏫</span>
          <h1>Sistema Escolar</h1>
          <p>Gerenciamento de Salas</p>
        </div>

        {message.text && (
          <div className={`message ${message.type}`}>
            {message.text}
          </div>
        )}

        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">E-mail</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="professor@escola.edu.br"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Senha</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="••••••••"
              required
            />
          </div>

          <div className="form-options">
            <label className="checkbox-label">
              <input
                type="checkbox"
                name="remember"
                checked={formData.remember}
                onChange={handleChange}
              />
              <span>Lembrar-me</span>
            </label>
            <Link to="#" className="forgot-link">Esqueceu a senha?</Link>
          </div>

          <button type="submit" className="btn btn-primary btn-auth">
            Entrar
          </button>
        </form>

        <div className="auth-divider">
          <span>ou</span>
        </div>

        <div className="auth-switch">
          Não tem uma conta?
          <Link to="/register">Criar conta</Link>
        </div>
      </div>
    </div>
  );
};

export default Login;