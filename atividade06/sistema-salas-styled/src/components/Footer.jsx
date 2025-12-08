import {
  FooterContainer,
  FooterContent,
  FooterSection,
  FooterBottom
} from '../styles/styled/Footer.styled';

const Footer = () => {
  return (
    <FooterContainer>
      <FooterContent>
        <FooterSection>
          <h3>🏫 Sistema Escolar</h3>
          <p>
            Sistema de gerenciamento de salas escolares para otimizar 
            o uso dos espaços educacionais e facilitar reservas.
          </p>
        </FooterSection>

        <FooterSection>
          <h3>Links Rápidos</h3>
          <ul>
            <li><a href="/dashboard">Salas Disponíveis</a></li>
            <li><a href="/reservas">Minhas Reservas</a></li>
            <li><a href="#">Calendário</a></li>
            <li><a href="#">Regulamento</a></li>
          </ul>
        </FooterSection>

        <FooterSection>
          <h3>Contato</h3>
          <ul>
            <li>📧 secretaria@escola.edu.br</li>
            <li>📱 (11) 3333-4444</li>
            <li>📍 Rua da Educação, 123 - SP</li>
          </ul>
        </FooterSection>

        <FooterSection>
          <h3>Horário de Atendimento</h3>
          <ul>
            <li>Segunda a Sexta: 7h - 22h</li>
            <li>Sábado: 8h - 14h</li>
            <li>Domingo: Fechado</li>
          </ul>
        </FooterSection>
      </FooterContent>

      <FooterBottom>
        <p>&copy; 2024 Sistema Escolar de Gerenciamento de Salas. Todos os direitos reservados.</p>
      </FooterBottom>
    </FooterContainer>
  );
};

export default Footer;