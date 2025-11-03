import { useState, useEffect } from 'react';
import Logo from './Logo';
import '../styles/Login.css';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    remember: false
  });

  const [message, setMessage] = useState({ text: '', type: '' });

  // Carregar email salvo ao montar o componente
  useEffect(() => {
    const savedEmail = localStorage.getItem('rememberedEmail');
    if (savedEmail) {
      setFormData(prev => ({
        ...prev,
        email: savedEmail,
        remember: true
      }));
    }
  }, []);

  // Limpar mensagem após 3 segundos
  useEffect(() => {
    if (message.text) {
      const timer = setTimeout(() => {
        setMessage({ text: '', type: '' });
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [message]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const validateForm = (email, password) => {
    const errors = [];
    
    // Validar e-mail
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      errors.push('E-mail inválido');
    }

    // Validar senha
    if (password.length < 6) {
      errors.push('A senha deve ter no mínimo 6 caracteres');
    }

    return errors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const { email, password, remember } = formData;

    // Validar formulário
    const errors = validateForm(email, password);

    if (errors.length > 0) {
      setMessage({ text: errors.join('. '), type: 'error' });
      return;
    }

    // Salvar email se "Lembrar-me" estiver marcado
    if (remember) {
      localStorage.setItem('rememberedEmail', email);
    } else {
      localStorage.removeItem('rememberedEmail');
    }

    // Simular login
    console.log('Login realizado:', { email, password });
    setMessage({ text: 'Login realizado com sucesso!', type: 'success' });

    // Limpar senha
    setTimeout(() => {
      setFormData(prev => ({ ...prev, password: '' }));
      console.log('Redirecionando para o dashboard...');
    }, 1500);
  };

  const handleRegister = () => {
    console.log('Redirecionando para página de registro...');
    setMessage({ 
      text: 'Funcionalidade de registro em desenvolvimento', 
      type: 'error' 
    });
  };

  const handleForgotPassword = (e) => {
    e.preventDefault();
    console.log('Redirecionando para recuperação de senha...');
    setMessage({ 
      text: 'Funcionalidade de recuperação de senha em desenvolvimento', 
      type: 'error' 
    });
  };

  return (
    <div className="container">
      <div className="login-box">
        <Logo />

        <h1>Sistema de Gerenciamento de Salas</h1>
        <p className="subtitle">Faça login para continuar</p>

        {message.text && (
          <div className={`message ${message.type}`}>
            {message.text}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">E-mail</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="seu.email@exemplo.com"
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
            <label className="checkbox">
              <input
                type="checkbox"
                id="remember"
                name="remember"
                checked={formData.remember}
                onChange={handleChange}
              />
              <span>Lembrar-me</span>
            </label>
            <a 
              href="#" 
              className="forgot-password"
              onClick={handleForgotPassword}
            >
              Esqueceu a senha?
            </a>
          </div>

          <button type="submit" className="btn-login">
            Entrar
          </button>
        </form>

        <div className="divider">
          <span>ou</span>
        </div>

        <button 
          type="button" 
          className="btn-register"
          onClick={handleRegister}
        >
          Criar nova conta
        </button>

        <footer className="login-footer">
          <p>&copy; 2024 Sistema de Gerenciamento de Salas. Todos os direitos reservados.</p>
        </footer>
      </div>
    </div>
  );
};

export default Login;