import { useState } from 'react';
import { useReservas } from '../contexts/ReservaContext';
import ReservaCard from '../components/ReservaCard';
import '../styles/Dashboard.css';

const Reservas = () => {
  const { 
    reservas, 
    cancelReserva,
    totalReservas,
    reservasConfirmadas,
    reservasPendentes
  } = useReservas();
  
  const [filtro, setFiltro] = useState('todas');

  const handleCancelReserva = (reservaId) => {
    if (window.confirm('Deseja realmente cancelar esta reserva?')) {
      cancelReserva(reservaId);
      alert('Reserva cancelada com sucesso!');
    }
  };

  const reservasFiltradas = filtro === 'todas' 
    ? reservas 
    : reservas.filter(r => r.status === filtro);

  return (
    <div className="dashboard">
      <div className="container">
        <div className="dashboard-header">
          <h1>Minhas Reservas</h1>
          <p>Gerencie suas reservas de salas</p>
        </div>

        <div className="dashboard-stats">
          <div className="stat-card">
            <div className="stat-info">
              <h3>{totalReservas}</h3>
              <p>Total</p>
            </div>
            <div className="stat-icon">📋</div>
          </div>

          <div className="stat-card">
            <div className="stat-info">
              <h3>{reservasConfirmadas}</h3>
              <p>Confirmadas</p>
            </div>
            <div className="stat-icon">✅</div>
          </div>

          <div className="stat-card">
            <div className="stat-info">
              <h3>{reservasPendentes}</h3>
              <p>Pendentes</p>
            </div>
            <div className="stat-icon">⏳</div>
          </div>
        </div>

        <div className="dashboard-filters">
          <button 
            className={`filter-btn ${filtro === 'todas' ? 'active' : ''}`}
            onClick={() => setFiltro('todas')}
          >
            Todas
          </button>
          <button 
            className={`filter-btn ${filtro === 'confirmada' ? 'active' : ''}`}
            onClick={() => setFiltro('confirmada')}
          >
            Confirmadas
          </button>
          <button 
            className={`filter-btn ${filtro === 'pendente' ? 'active' : ''}`}
            onClick={() => setFiltro('pendente')}
          >
            Pendentes
          </button>
          <button 
            className={`filter-btn ${filtro === 'cancelada' ? 'active' : ''}`}
            onClick={() => setFiltro('cancelada')}
          >
            Canceladas
          </button>
        </div>

        {reservasFiltradas.length === 0 ? (
          <div className="empty-state">
            <h2>Nenhuma reserva encontrada</h2>
            <p>Você ainda não tem reservas nesta categoria</p>
          </div>
        ) : (
          <div className="salas-grid">
            {reservasFiltradas.map(reserva => (
              <ReservaCard 
                key={reserva.id} 
                reserva={reserva}
                onCancel={handleCancelReserva}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Reservas;