import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { apiService } from '../services/apiService';
import { authService } from '../services/authService';

function NovaReserva() {
  const [salas, setSalas] = useState([]);
  const [formData, setFormData] = useState({
    sala_id: '',
    data_inicio: '',
    data_fim: '',
    finalidade: '',
    observacoes: ''
  });
  const [loading, setLoading] = useState(false);
  const [loadingSalas, setLoadingSalas] = useState(true);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (!authService.isAuthenticated()) {
      navigate('/login');
      return;
    }
    loadSalas();
  }, [navigate]);

  const loadSalas = async () => {
    try {
      setLoadingSalas(true);
      const data = await apiService.getSalas();
      setSalas(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error('Erro ao carregar salas:', err);
      setMessage('Erro ao carregar salas');
      setMessageType('error');
    } finally {
      setLoadingSalas(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    setMessageType('');

    // Validação básica
    if (new Date(formData.data_inicio) >= new Date(formData.data_fim)) {
      setMessage('A data de fim deve ser posterior à data de início.');
      setMessageType('error');
      setLoading(false);
      return;
    }

    try {
      await apiService.createReserva(formData);
      setMessage('Reserva criada com sucesso!');
      setMessageType('success');
      
      // Limpa o formulário
      setFormData({
        sala_id: '',
        data_inicio: '',
        data_fim: '',
        finalidade: '',
        observacoes: ''
      });
      
      // Redireciona após 2 segundos
      setTimeout(() => {
        navigate('/reservas');
      }, 2000);
      
    } catch (err) {
      console.error('Erro ao criar reserva:', err);
      setMessage('Erro ao criar reserva. Verifique os dados e tente novamente.');
      setMessageType('error');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  if (loadingSalas) {
    return (
      <div className="container">
        <div className="loading">Carregando formulário...</div>
      </div>
    );
  }

  return (
    <div className="container" style={{ maxWidth: '600px', margin: '0 auto' }}>
      <div className="form-container">
        <h2 style={{ textAlign: 'center', marginBottom: '30px', color: '#333' }}>Nova Reserva</h2>
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="sala_id">Sala:</label>
            <select
              id="sala_id"
              name="sala_id"
              value={formData.sala_id}
              onChange={handleChange}
              required
              disabled={loading}
            >
              <option value="">Selecione uma sala</option>
              {salas.map((sala) => (
                <option key={sala.id} value={sala.id}>
                  {sala.nome} - {sala.localizacao} (Capacidade: {sala.capacidade})
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="data_inicio">Data/Hora Início:</label>
            <input
              id="data_inicio"
              type="datetime-local"
              name="data_inicio"
              value={formData.data_inicio}
              onChange={handleChange}
              required
              disabled={loading}
              min={new Date().toISOString().slice(0, 16)}
            />
          </div>

          <div className="form-group">
            <label htmlFor="data_fim">Data/Hora Fim:</label>
            <input
              id="data_fim"
              type="datetime-local"
              name="data_fim"
              value={formData.data_fim}
              onChange={handleChange}
              required
              disabled={loading}
              min={formData.data_inicio || new Date().toISOString().slice(0, 16)}
            />
          </div>

          <div className="form-group">
            <label htmlFor="finalidade">Finalidade:</label>
            <input
              id="finalidade"
              type="text"
              name="finalidade"
              value={formData.finalidade}
              onChange={handleChange}
              required
              disabled={loading}
              placeholder="Ex: Reunião de equipe, Aula, Apresentação..."
            />
          </div>

          <div className="form-group">
            <label htmlFor="observacoes">Observações (opcional):</label>
            <textarea
              id="observacoes"
              name="observacoes"
              value={formData.observacoes}
              onChange={handleChange}
              rows="3"
              disabled={loading}
              placeholder="Informações adicionais sobre a reserva..."
            />
          </div>

          {message && (
            <div className={messageType === 'success' ? 'success' : 'error'}>
              {message}
            </div>
          )}

          <button 
            type="submit" 
            disabled={loading || salas.length === 0}
            className="primary"
            style={{ width: '100%', padding: '12px', fontSize: '16px' }}
          >
            {loading ? 'Criando Reserva...' : 'Criar Reserva'}
          </button>
          
          {salas.length === 0 && (
            <p style={{ textAlign: 'center', color: '#666', marginTop: '10px', fontSize: '14px' }}>
              Nenhuma sala disponível para reserva
            </p>
          )}
        </form>
      </div>
    </div>
  );
}

export default NovaReserva;