import { useState, useEffect } from 'react';
import ReservaCard from '../components/ReservaCard';
import reservasData from '../data/reservas.json';
import '../styles/Dashboard.css';

const Reservas = () => {
  const [reservas, setReservas] = useState([]);
  const [filtro, setFiltro] = useState('todas');

  useEffect(() => {
    const minhasReservas = JSON.parse(localStorage.getItem('minhasReservas') || '[]');
    const todasReservas = [...reservasData, ...minhasReservas];
    setReservas(todasReservas);
  }, []);

  const handleCancelReserva = (reservaId) => {
    if (window.confirm('Deseja realmente cancelar esta reserva?')) {
      const reservasAtualizadas = reservas.map(r => 
        r.id === reservaId ? { ...r, status: 'cancelada' } : r
      );
      setReservas(reservasAtualizadas);

      const minhasReservas = reservasAtualizadas.filter(r => 
        !reservasData.find(rd => rd.id === r.id)
      );
      localStorage.setItem('minhasReservas', JSON.stringify(minhasReservas));

      alert('Reserva cancelada com sucesso!');
    }
  };

  const reservasFiltradas = filtro === 'todas' 
    ? reservas 
    : reservas.filter(r => r.status === filtro);

  const totalReservas = reservas.length;
  const reservasConfirmadas = reservas.filter(r => r.status === 'confirmada').length;
  const reservasPendentes = reservas.filter(r => r.status === 'pendente').length;

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