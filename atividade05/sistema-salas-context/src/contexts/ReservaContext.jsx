import { createContext, useState, useEffect, useContext } from 'react';
import reservasData from '../data/reservas.json';

const ReservaContext = createContext();

export const useReservas = () => {
  const context = useContext(ReservaContext);
  if (!context) {
    throw new Error('useReservas deve ser usado dentro de ReservaProvider');
  }
  return context;
};

export const ReservaProvider = ({ children }) => {
  const [reservas, setReservas] = useState([]);

  useEffect(() => {
    const minhasReservas = JSON.parse(localStorage.getItem('minhasReservas') || '[]');
    const todasReservas = [...reservasData, ...minhasReservas];
    setReservas(todasReservas);
  }, []);

  const addReserva = (reservaData) => {
    const novaReserva = {
      id: Date.now(),
      ...reservaData,
      status: 'pendente'
    };

    const reservasAtualizadas = [novaReserva, ...reservas];
    setReservas(reservasAtualizadas);

    const minhasReservas = reservasAtualizadas.filter(r => 
      !reservasData.find(rd => rd.id === r.id)
    );
    localStorage.setItem('minhasReservas', JSON.stringify(minhasReservas));

    return novaReserva;
  };

  const cancelReserva = (reservaId) => {
    const reservasAtualizadas = reservas.map(r => 
      r.id === reservaId ? { ...r, status: 'cancelada' } : r
    );
    setReservas(reservasAtualizadas);

    const minhasReservas = reservasAtualizadas.filter(r => 
      !reservasData.find(rd => rd.id === r.id)
    );
    localStorage.setItem('minhasReservas', JSON.stringify(minhasReservas));
  };

  const totalReservas = reservas.length;
  const reservasConfirmadas = reservas.filter(r => r.status === 'confirmada').length;
  const reservasPendentes = reservas.filter(r => r.status === 'pendente').length;

  const value = {
    reservas,
    addReserva,
    cancelReserva,
    totalReservas,
    reservasConfirmadas,
    reservasPendentes
  };

  return (
    <ReservaContext.Provider value={value}>
      {children}
    </ReservaContext.Provider>
  );
};