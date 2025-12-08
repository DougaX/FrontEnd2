import { createContext, useState, useContext } from 'react';
import salasData from '../data/salas.json';

const SalaContext = createContext();

export const useSalas = () => {
  const context = useContext(SalaContext);
  if (!context) {
    throw new Error('useSalas deve ser usado dentro de SalaProvider');
  }
  return context;
};

export const SalaProvider = ({ children }) => {
  const [salas] = useState(salasData);
  const [filtro, setFiltro] = useState('todos');

  const salasFiltradas = filtro === 'todos' 
    ? salas 
    : filtro === 'disponiveis'
    ? salas.filter(s => s.disponivel)
    : salas.filter(s => s.tipo === filtro);

  const getSalaById = (id) => {
    return salas.find(s => s.id === parseInt(id));
  };

  const totalSalas = salas.length;
  const salasDisponiveis = salas.filter(s => s.disponivel).length;
  const salasOcupadas = salas.filter(s => !s.disponivel).length;

  const value = {
    salas,
    salasFiltradas,
    filtro,
    setFiltro,
    getSalaById,
    totalSalas,
    salasDisponiveis,
    salasOcupadas
  };

  return (
    <SalaContext.Provider value={value}>
      {children}
    </SalaContext.Provider>
  );
};