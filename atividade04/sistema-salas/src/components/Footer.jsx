import '../styles/Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-section">
            <h3>🏫 Sistema Escolar</h3>
            <p>
              Sistema de gerenciamento de salas escolares para otimizar 
              o uso dos espaços educacionais e facilitar reservas.
            </p>
          </div>

          <div className="footer-section">
            <h3>Links Rápidos</h3>
            <ul>
              <li><a href="/dashboard">Salas Disponíveis</a></li>
              <li><a href="/reservas">Minhas Reservas</a></li>
              <li><a href="#">Calendário</a></li>
              <li><a href="#">Regulamento</a></li>
            </ul>
          </div>

          <div className="footer-section">
            <h3>Contato</h3>
            <ul>
              <li>📧 secretaria@escola.edu.br</li>
              <li>📱 (11) 3333-4444</li>
              <li>📍 Rua da Educação, 123 - SP</li>
            </ul>
          </div>

          <div className="footer-section">
            <h3>Horário de Atendimento</h3>
            <ul>
              <li>Segunda a Sexta: 7h - 22h</li>
              <li>Sábado: 8h - 14h</li>
              <li>Domingo: Fechado</li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; 2024 Sistema Escolar de Gerenciamento de Salas. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;