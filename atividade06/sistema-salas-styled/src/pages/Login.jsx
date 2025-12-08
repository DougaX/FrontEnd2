import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import {
  AuthContainer,
  AuthBox,
  AuthLogo,
  AuthForm,
  FormGroup,
  FormOptions,
  CheckboxLabel,
  ForgotLink,
  AuthDivider,
  AuthSwitch,
  Message
} from '../styles/styled/Auth.styled';
import { Button } from '../styles/styled/Button.styled';

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    remember: false
  });
  const [message, setMessage] = useState({ text: '', type: '' });

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

    const user = {
      id: 1,
      nome: 'Prof. João Silva',
      email: formData.email,
      tipo: 'professor'
    };

    login(user);

    if (formData.remember) {
      localStorage.setItem('rememberedEmail', formData.email);
    }

    setMessage({ text: 'Login realizado com sucesso!', type: 'success' });

    setTimeout(() => {
      navigate('/dashboard');
    }, 1000);
  };

  return (
    <AuthContainer>
      <AuthBox>
        <AuthLogo>
          <span>🏫</span>
          <h1>Sistema Escolar</h1>
          <p>Gerenciamento de Salas</p>
        </AuthLogo>

        {message.text && (
          <Message className={message.type}>
            {message.text}
          </Message>
        )}

        <AuthForm onSubmit={handleSubmit}>
          <FormGroup>
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
          </FormGroup>

          <FormGroup>
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
          </FormGroup>

          <FormOptions>
            <CheckboxLabel>
              <input
                type="checkbox"
                name="remember"
                checked={formData.remember}
                onChange={handleChange}
              />
              <span>Lembrar-me</span>
            </CheckboxLabel>
            <ForgotLink href="#">Esqueceu a senha?</ForgotLink>
          </FormOptions>

          <Button type="submit" style={{ width: '100%' }}>
            Entrar
          </Button>
        </AuthForm>

        <AuthDivider>
          <span>ou</span>
        </AuthDivider>

        <AuthSwitch>
          Não tem uma conta?
          <Link to="/register">Criar conta</Link>
        </AuthSwitch>
      </AuthBox>
    </AuthContainer>
  );
};

export default Login;