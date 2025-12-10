import { useState, useEffect } from 'react';
import { apiService } from '../services/apiService';

function Salas() {
  const [salas, setSalas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    loadSalas();
  }, []);

  const loadSalas = async () => {
    try {
      setLoading(true);
      setError('');
      const data = await apiService.getSalas();
      setSalas(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error('Erro ao carregar salas:', err);
      setError('Erro ao carregar salas. Verifique se a API está funcionando.');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="container">
        <div className="loading">Carregando salas...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container">
        <div className="error">{error}</div>
        <button onClick={loadSalas} className="primary">
          Tentar Novamente
        </button>
      </div>
    );
  }

  return (
    <div className="container">
      <h2 style={{ marginBottom: '30px', color: '#333' }}>Salas</h2>
      
      {salas.length === 0 ? (
        <div className="card text-center">
          <h3>Nenhuma sala encontrada</h3>
          <p>Não há salas cadastradas no sistema.</p>
        </div>
      ) : (
        <div className="grid">
          {salas.map((sala) => (
            <div key={sala.id} className="card">
              <h3 style={{ marginBottom: '15px', color: '#007bff' }}>
                {sala.nome}
              </h3>
              <div style={{ marginBottom: '10px' }}>
                <strong>Capacidade:</strong> 
                <span style={{ marginLeft: '8px' }}>{sala.capacidade} pessoas</span>
              </div>
              <div style={{ marginBottom: '10px' }}>
                <strong>Localização:</strong> 
                <span style={{ marginLeft: '8px' }}>{sala.localizacao}</span>
              </div>
              {sala.tipo && (
                <div style={{ marginBottom: '10px' }}>
                  <strong>Tipo:</strong> 
                  <span style={{ marginLeft: '8px' }}>{sala.tipo}</span>
                </div>
              )}
              {sala.responsavel && (
                <div style={{ marginBottom: '10px' }}>
                  <strong>Responsável:</strong> 
                  <span style={{ marginLeft: '8px' }}>{sala.responsavel.nome}</span>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Salas;