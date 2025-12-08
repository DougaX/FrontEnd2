import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSalas } from '../contexts/SalaContext';
import { useReservas } from '../contexts/ReservaContext';
import { useAuth } from '../contexts/AuthContext';
import '../styles/Detalhes.css';

const SalaDetalhes = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getSalaById } = useSalas();
  const { addReserva } = useReservas();
  const { user } = useAuth();
  
  const [showReservaForm, setShowReservaForm] = useState(false);
  const [reservaData, setReservaData] = useState({
    data: '',
    horaInicio: '',
    horaFim: '',
    disciplina: '',
    turma: '',
    objetivo: ''
  });

  const sala = getSalaById(id);

  if (!sala) {
    return (
      <div className="detalhes">
        <div className="container">
          <h1>Sala não encontrada</h1>
          <button className="btn btn-primary" onClick={() => navigate('/dashboard')}>
            Voltar ao Dashboard
          </button>
        </div>
      </div>
    );
  }

  const handleReserva = (e) => {
    e.preventDefault();
    
    addReserva({
      salaId: sala.id,
      salaNome: sala.nome,
      professor: user.nome,
      ...reservaData
    });

    alert('Reserva solicitada com sucesso! Aguardando aprovação da coordenação.');
    setShowReservaForm(false);
    setReservaData({ data: '', horaInicio: '', horaFim: '', disciplina: '', turma: '', objetivo: '' });
  };

  return (
    <div className="detalhes">
      <div className="container">
        <div 
          className="back-button" 
          onClick={() => navigate('/dashboard')}
        >
          ← Voltar
        </div>

        <div className="detalhes-content">
          <img 
            src={sala.imagem} 
            alt={sala.nome} 
            className="detalhes-image"
          />

          <div className="detalhes-info">
            <div className="detalhes-header">
              <h1>{sala.nome}</h1>
              <span className={`badge ${sala.disponivel ? 'badge-success' : 'badge-danger'}`}>
                {sala.disponivel ? 'Disponível' : 'Ocupada'}
              </span>
            </div>

            <p className="detalhes-description">{sala.descricao}</p>

            <div className="detalhes-grid">
              <div className="info-box">
                <label>Capacidade</label>
                <div className="value">👥 {sala.capacidade} alunos</div>
              </div>

              <div className="info-box">
                <label>Tipo</label>
                <div className="value">🏷️ {sala.tipo}</div>
              </div>

              <div className="info-box">
                <label>Localização</label>
                <div className="value">📍 Bloco {sala.bloco} - {sala.andar}º</div>
              </div>

              <div className="info-box">
                <label>Responsável</label>
                <div className="value">👨‍🏫 {sala.professor}</div>
              </div>
            </div>

            <div className="detalhes-section">
              <h2>Recursos Disponíveis</h2>
              <div className="recursos-list">
                {sala.recursos.map((recurso, idx) => (
                  <div key={idx} className="recurso-item">
                    <span>✓</span>
                    {recurso}
                  </div>
                ))}
              </div>
            </div>

            <div className="detalhes-actions">
              {sala.disponivel ? (
                <>
                  <button 
                    className="btn btn-primary"
                    onClick={() => setShowReservaForm(!showReservaForm)}
                  >
                    {showReservaForm ? 'Cancelar' : 'Reservar Sala'}
                  </button>
                  <button className="btn btn-secondary">
                    Ver Agenda
                  </button>
                </>
              ) : (
                <button className="btn btn-secondary" disabled>
                  Sala Indisponível
                </button>
              )}
            </div>

            {showReservaForm && (
              <form className="reserva-form" onSubmit={handleReserva}>
                <h3>Fazer Reserva</h3>
                
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="data">Data</label>
                    <input
                      type="date"
                      id="data"
                      value={reservaData.data}
                      onChange={(e) => setReservaData({...reservaData, data: e.target.value})}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="horaInicio">Hora Início</label>
                    <input
                      type="time"
                      id="horaInicio"
                      value={reservaData.horaInicio}
                      onChange={(e) => setReservaData({...reservaData, horaInicio: e.target.value})}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="horaFim">Hora Fim</label>
                    <input
                      type="time"
                      id="horaFim"
                      value={reservaData.horaFim}
                      onChange={(e) => setReservaData({...reservaData, horaFim: e.target.value})}
                      required
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="disciplina">Disciplina</label>
                    <input
                      type="text"
                      id="disciplina"
                      value={reservaData.disciplina}
                      onChange={(e) => setReservaData({...reservaData, disciplina: e.target.value})}
                      placeholder="Ex: Matemática"
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="turma">Turma</label>
                    <input
                      type="text"
                      id="turma"
                      value={reservaData.turma}
                      onChange={(e) => setReservaData({...reservaData, turma: e.target.value})}
                      placeholder="Ex: 3º Ano A"
                      required
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="objetivo">Objetivo da Aula</label>
                  <textarea
                    id="objetivo"
                    value={reservaData.objetivo}
                    onChange={(e) => setReservaData({...reservaData, objetivo: e.target.value})}
                    placeholder="Descreva o objetivo da aula..."
                    rows="3"
                    required
                  />
                </div>

                <button type="submit" className="btn btn-primary">
                  Confirmar Reserva
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SalaDetalhes;