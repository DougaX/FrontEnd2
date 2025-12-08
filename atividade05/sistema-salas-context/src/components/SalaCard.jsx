import { useNavigate } from 'react-router-dom';

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
    <div className="sala-card" onClick={handleVerDetalhes}>
      <img 
        src={sala.imagem} 
        alt={sala.nome} 
        className="sala-image"
      />
      <div className="sala-content">
        <div className="sala-header">
          <h3>{sala.nome}</h3>
          <span className={`badge ${sala.disponivel ? 'badge-success' : 'badge-danger'}`}>
            {sala.disponivel ? 'Livre' : 'Ocupada'}
          </span>
        </div>

        <div className="sala-info">
          <div className="sala-info-item">
            <span>👥</span>
            <span>{sala.capacidade} alunos</span>
          </div>
          <div className="sala-info-item">
            <span>🏷️</span>
            <span>{sala.tipo}</span>
          </div>
          <div className="sala-info-item">
            <span>📍</span>
            <span>Bloco {sala.bloco} - {sala.andar}º andar</span>
          </div>
          <div className="sala-info-item">
            <span>👨‍🏫</span>
            <span>{sala.professor}</span>
          </div>
        </div>

        <div className="sala-recursos">
          {sala.recursos.slice(0, 3).map((recurso, idx) => (
            <span key={idx} className="recurso-tag">
              {recurso}
            </span>
          ))}
          {sala.recursos.length > 3 && (
            <span className="recurso-tag">
              +{sala.recursos.length - 3}
            </span>
          )}
        </div>

        <div className="sala-actions">
          <button 
            className="btn btn-primary"
            onClick={handleVerDetalhes}
          >
            Detalhes
          </button>
          {sala.disponivel && (
            <button 
              className="btn btn-secondary"
              onClick={handleReservar}
            >
              Reservar
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default SalaCard;