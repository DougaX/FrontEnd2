import api from './api';

export const apiService = {
  // Professores
  async getProfessores() {
    const response = await api.get('/professores');
    return response.data;
  },

  async getProfessor(id) {
    const response = await api.get(`/professores/${id}`);
    return response.data;
  },

  // Salas
  async getSalas() {
    const response = await api.get('/salas');
    return response.data;
  },

  async getSala(id) {
    const response = await api.get(`/salas/${id}`);
    return response.data;
  },

  // Reservas
  async getReservas() {
    const response = await api.get('/reservas');
    return response.data;
  },

  async getReserva(id) {
    const response = await api.get(`/reservas/${id}`);
    return response.data;
  },

  async createReserva(reserva) {
    const response = await api.post('/reservas', reserva);
    return response.data;
  }
};