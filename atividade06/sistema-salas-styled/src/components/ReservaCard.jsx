const ReservaCard = ({ reserva, onCancel }) => {
  const formatDate = (dateString) => {
    const date = new Date(dateString + 'T00:00:00');
    return date.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: 'long',
      year: 'numeric'
    });
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'confirmada':
        return 'badge-success';
      case 'pendente':
        return 'badge-warning';
      case 'cancelada':
        return 'badge-danger';
      default:
        return '';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'confirmada':
        return 'Confirmada';
      case 'pendente':
        return 'Pendente';
      case 'cancelada':
        return 'Cancelada';
      default:
        return status;
    }
  };

  return (
    <div className="card">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '15px' }}>
        <div>
          <h3 style={{ fontSize: '20px', marginBottom: '8px', color: 'var(--black)', fontWeight: '700' }}>
            {reserva.salaNome}
          </h3>
          <span className={`badge ${getStatusColor(reserva.status)}`}>
            {getStatusText(reserva.status)}
          </span>
        </div>
      </div>

      <div style={{ marginBottom: '15px', color: 'var(--gray-dark)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
          <span>📅</span>
          <span><strong>Data:</strong> {formatDate(reserva.data)}</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
          <span>⏰</span>
          <span><strong>Horário:</strong> {reserva.horaInicio} - {reserva.horaFim}</span>
        </div>
        {reserva.professor && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
            <span>👨‍🏫</span>
            <span><strong>Professor:</strong> {reserva.professor}</span>
          </div>
        )}
        {reserva.disciplina && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
            <span>📚</span>
            <span><strong>Disciplina:</strong> {reserva.disciplina}</span>
          </div>
        )}
        {reserva.turma && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
            <span>🎓</span>
            <span><strong>Turma:</strong> {reserva.turma}</span>
          </div>
        )}
      </div>

      {reserva.objetivo && (
        <div style={{ 
          backgroundColor: 'var(--gray-light)', 
          border: '2px solid var(--black)',
          padding: '12px', 
          marginBottom: '15px',
          fontSize: '14px',
          lineHeight: '1.5'
        }}>
          <strong>Objetivo:</strong>
          <p style={{ marginTop: '5px', color: 'var(--gray-dark)' }}>{reserva.objetivo}</p>
        </div>
      )}

      <div style={{ display: 'flex', gap: '10px' }}>
        <button 
          className="btn btn-primary" 
          style={{ flex: 1 }}
          onClick={() => alert('Funcionalidade de edição em desenvolvimento')}
        >
          Editar
        </button>
        <button 
          className="btn btn-danger"
          style={{ flex: 1 }}
          onClick={() => onCancel(reserva.id)}
        >
          Cancelar
        </button>
      </div>
    </div>
  );
};

export default ReservaCard;