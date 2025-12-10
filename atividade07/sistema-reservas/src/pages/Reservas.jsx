import { useState, useEffect } from 'react';
import { apiService } from '../services/apiService';

function Reservas() {
  const [reservas, setReservas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    loadReservas();
  }, []);

  const loadReservas = async () => {
    try {
      setLoading(true);
      setError('');
      const data = await apiService.getReservas();
      setReservas(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error('Erro ao carregar reservas:', err);
      setError('Erro ao carregar reservas. Verifique se a API está funcionando.');
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    try {
      return new Date(dateString).toLocaleString('pt-BR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    } catch {
      return dateString;
    }
  };

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'ativa':
      case 'confirmada':
        return '#28a745';
      case 'pendente':
        return '#ffc107';
      case 'cancelada':
        return '#dc3545';
      default:
        return '#6c757d';
    }
  };

  if (loading) {
    return (
      <div className="container">
        <div className="loading">Carregando reservas...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container">
        <div className="error">{error}</div>
        <button onClick={loadReservas} className="primary">
          Tentar Novamente
        </button>
      </div>
    );
  }

  return (
    <div className="container">
      <h2 style={{ marginBottom: '30px', color: '#333' }}>Reservas</h2>
      
      {reservas.length === 0 ? (
        <div className="card text-center">
          <h3>Nenhuma reserva encontrada</h3>
          <p>Não há reservas cadastradas no sistema.</p>
        </div>
      ) : (
        <div className="grid">
          {reservas.map((reserva) => (
            <div key={reserva.id} className="card">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
                <h3 style={{ color: '#007bff', margin: 0 }}>Reserva #{reserva.id}</h3>
                <span 
                  style={{ 
                    backgroundColor: getStatusColor(reserva.status),
                    color: 'white',
                    padding: '4px 8px',
                    borderRadius: '4px',
                    fontSize: '12px',
                    fontWeight: 'bold'
                  }}
                >
                  {reserva.status || 'N/A'}
                </span>
              </div>
              
              <div style={{ marginBottom: '10px' }}>
                <strong>Sala:</strong> 
                <span style={{ marginLeft: '8px' }}>{reserva.sala?.nome || 'N/A'}</span>
              </div>
              
              <div style={{ marginBottom: '10px' }}>
                <strong>Usuário:</strong> 
                <span style={{ marginLeft: '8px' }}>{reserva.user?.name || reserva.usuario?.nome || 'N/A'}</span>
              </div>
              
              <div style={{ marginBottom: '10px' }}>
                <strong>Data Início:</strong> 
                <span style={{ marginLeft: '8px' }}>{formatDate(reserva.data_inicio)}</span>
              </div>
              
              <div style={{ marginBottom: '10px' }}>
                <strong>Data Fim:</strong> 
                <span style={{ marginLeft: '8px' }}>{formatDate(reserva.data_fim)}</span>
              </div>
              
              <div style={{ marginBottom: '10px' }}>
                <strong>Finalidade:</strong> 
                <span style={{ marginLeft: '8px' }}>{reserva.finalidade || 'N/A'}</span>
              </div>
              
              {reserva.observacoes && (
                <div style={{ marginTop: '15px', padding: '10px', backgroundColor: '#f8f9fa', borderRadius: '4px' }}>
                  <strong>Observações:</strong>
                  <p style={{ margin: '5px 0 0 0', fontSize: '14px' }}>{reserva.observacoes}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Reservas;