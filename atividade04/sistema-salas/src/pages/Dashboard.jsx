import { useState } from 'react';
import salasData from '../data/salas.json';
import SalaCard from '../components/SalaCard';
import '../styles/Dashboard.css';

const Dashboard = () => {
  const [salas] = useState(salasData);
  const [filtro, setFiltro] = useState('todos');

  const salasFiltradas = filtro === 'todos' 
    ? salas 
    : filtro === 'disponiveis'
    ? salas.filter(s => s.disponivel)
    : salas.filter(s => s.tipo === filtro);

  const totalSalas = salas.length;
  const salasDisponiveis = salas.filter(s => s.disponivel).length;
  const salasOcupadas = salas.filter(s => !s.disponivel).length;

  return (
    <div className="dashboard">
      <div className="container">
        <div className="dashboard-header">
          <h1>Salas Disponíveis</h1>
          <p>Gerencie e reserve salas para suas aulas e atividades</p>
        </div>

        <div className="dashboard-stats">
          <div className="stat-card">
            <div className="stat-info">
              <h3>{totalSalas}</h3>
              <p>Total de Salas</p>
            </div>
            <div className="stat-icon">🏫</div>
          </div>

          <div className="stat-card">
            <div className="stat-info">
              <h3>{salasDisponiveis}</h3>
              <p>Salas Livres</p>
            </div>
            <div className="stat-icon">✅</div>
          </div>

          <div className="stat-card">
            <div className="stat-info">
              <h3>{salasOcupadas}</h3>
              <p>Salas Ocupadas</p>
            </div>
            <div className="stat-icon">🔒</div>
          </div>
        </div>

        <div className="dashboard-filters">
          <button 
            className={`filter-btn ${filtro === 'todos' ? 'active' : ''}`}
            onClick={() => setFiltro('todos')}
          >
            Todas
          </button>
          <button 
            className={`filter-btn ${filtro === 'disponiveis' ? 'active' : ''}`}
            onClick={() => setFiltro('disponiveis')}
          >
            Disponíveis
          </button>
          <button 
            className={`filter-btn ${filtro === 'Sala de Aula' ? 'active' : ''}`}
            onClick={() => setFiltro('Sala de Aula')}
          >
            Salas de Aula
          </button>
          <button 
            className={`filter-btn ${filtro === 'Laboratório' ? 'active' : ''}`}
            onClick={() => setFiltro('Laboratório')}
          >
            Laboratórios
          </button>
          <button 
            className={`filter-btn ${filtro === 'Auditório' ? 'active' : ''}`}
            onClick={() => setFiltro('Auditório')}
          >
            Auditório
          </button>
          <button 
            className={`filter-btn ${filtro === 'Sala Especial' ? 'active' : ''}`}
            onClick={() => setFiltro('Sala Especial')}
          >
            Especiais
          </button>
        </div>

        {salasFiltradas.length === 0 ? (
          <div className="empty-state">
            <h2>Nenhuma sala encontrada</h2>
            <p>Tente ajustar os filtros</p>
          </div>
        ) : (
          <div className="salas-grid">
            {salasFiltradas.map(sala => (
              <SalaCard key={sala.id} sala={sala} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;