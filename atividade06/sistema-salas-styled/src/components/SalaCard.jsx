import { useNavigate } from 'react-router-dom';
import {
  Card,
  CardImage,
  CardContent,
  CardHeader,
  Badge,
  CardInfo,
  CardInfoItem,
  CardRecursos,
  RecursoTag,
  CardActions
} from '../styles/styled/Card.styled';
import { Button, ButtonSecondary } from '../styles/styled/Button.styled';

const SalaCard = ({ sala }) => {
  const navigate = useNavigate();

  const handleVerDetalhes = () => {
    navigate(`/sala/${sala.id}`);
  };

  const handleReservar = (e) => {
    e.stopPropagation();
    navigate(`/sala/${sala.id}`);
  };

  return (
    <Card onClick={handleVerDetalhes}>
      <CardImage src={sala.imagem} alt={sala.nome} />
      <CardContent>
        <CardHeader>
          <h3>{sala.nome}</h3>
          <Badge className={sala.disponivel ? 'success' : 'danger'}>
            {sala.disponivel ? 'Livre' : 'Ocupada'}
          </Badge>
        </CardHeader>

        <CardInfo>
          <CardInfoItem>
            <span>👥</span>
            <span>{sala.capacidade} alunos</span>
          </CardInfoItem>
          <CardInfoItem>
            <span>🏷️</span>
            <span>{sala.tipo}</span>
          </CardInfoItem>
          <CardInfoItem>
            <span>📍</span>
            <span>Bloco {sala.bloco} - {sala.andar}º andar</span>
          </CardInfoItem>
          <CardInfoItem>
            <span>👨‍🏫</span>
            <span>{sala.professor}</span>
          </CardInfoItem>
        </CardInfo>

        <CardRecursos>
          {sala.recursos.slice(0, 3).map((recurso, idx) => (
            <RecursoTag key={idx}>{recurso}</RecursoTag>
          ))}
          {sala.recursos.length > 3 && (
            <RecursoTag>+{sala.recursos.length - 3}</RecursoTag>
          )}
        </CardRecursos>

        <CardActions>
          <Button onClick={handleVerDetalhes}>
            Detalhes
          </Button>
          {sala.disponivel && (
            <ButtonSecondary onClick={handleReservar}>
              Reservar
            </ButtonSecondary>
          )}
        </CardActions>
      </CardContent>
    </Card>
  );
};

export default SalaCard;