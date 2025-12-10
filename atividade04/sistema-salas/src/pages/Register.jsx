import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/Auth.css';

const Register = () => {
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    tipo: 'professor',
    password: '',
    confirmPassword: ''
  });
  const [message, setMessage] = useState({ text: '', type: '' });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validações
    if (!formData.nome || !formData.email || !formData.password || !formData.confirmPassword) {
      setMessage({ text: 'Preencha todos os campos', type: 'error' });
      return;
    }

    if (formData.password.length < 6) {
      setMessage({ text: 'A senha deve ter no mínimo 6 caracteres', type: 'error' });
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setMessage({ text: 'As senhas não coincidem', type: 'error' });
      return;
    }

    // Simulação de registro
    const user = {
      id: Date.now(),
      nome: formData.nome,
      email: formData.email,
      tipo: formData.tipo
    };

    localStorage.setItem('user', JSON.stringify(user));

    setMessage({ text: 'Conta criada com sucesso!', type: 'success' });

    setTimeout(() => {
      navigate('/dashboard');
    }, 1000);
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <div className="auth-logo">
          <span>🏫</span>
          <h1>Criar Conta</h1>
          <p>Sistema Escolar de Salas</p>
        </div>

        {message.text && (
          <div className={`message ${message.type}`}>
            {message.text}
          </div>
        )}

        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="nome">Nome Completo</label>
            <input
              type="text"
              id="nome"
              name="nome"
              value={formData.nome}
              onChange={handleChange}
              placeholder="Prof. João Silva"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">E-mail Institucional</label>
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
            <label htmlFor="tipo">Tipo de Usuário</label>
            <select
              id="tipo"
              name="tipo"
              value={formData.tipo}
              onChange={handleChange}
              required
            >
              <option value="professor">Professor</option>
              <option value="coordenador">Coordenador</option>
              <option value="administrativo">Administrativo</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="password">Senha</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Mínimo 6 caracteres"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="confirmPassword">Confirmar Senha</label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Digite a senha novamente"
              required
            />
          </div>

          <button type="submit" className="btn btn-primary btn-auth">
            Criar Conta
          </button>
        </form>

        <div className="auth-divider">
          <span>ou</span>
        </div>

        <div className="auth-switch">
          Já tem uma conta?
          <Link to="/login">Fazer login</Link>
        </div>
      </div>
    </div>
  );
};

export default Register;