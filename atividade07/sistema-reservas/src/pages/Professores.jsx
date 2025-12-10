import { useState, useEffect } from 'react';
import { apiService } from '../services/apiService';

function Professores() {
  const [professores, setProfessores] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    loadProfessores();
  }, []);

  const loadProfessores = async () => {
    try {
      setLoading(true);
      setError('');
      const data = await apiService.getProfessores();
      setProfessores(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error('Erro ao carregar professores:', err);
      setError('Erro ao carregar professores. Verifique se a API está funcionando.');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="container">
        <div className="loading">Carregando professores...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container">
        <div className="error">{error}</div>
        <button onClick={loadProfessores} className="primary">
          Tentar Novamente
        </button>
      </div>
    );
  }

  return (
    <div className="container">
      <h2 style={{ marginBottom: '30px', color: '#333' }}>Professores</h2>
      
      {professores.length === 0 ? (
        <div className="card text-center">
          <h3>Nenhum professor encontrado</h3>
          <p>Não há professores cadastrados no sistema.</p>
        </div>
      ) : (
        <div className="grid">
          {professores.map((professor) => (
            <div key={professor.id} className="card">
              <h3 style={{ marginBottom: '15px', color: '#007bff' }}>
                {professor.nome}
              </h3>
              <div style={{ marginBottom: '10px' }}>
                <strong>Email:</strong> 
                <span style={{ marginLeft: '8px' }}>{professor.email}</span>
              </div>
              <div style={{ marginBottom: '10px' }}>
                <strong>Departamento:</strong> 
                <span style={{ marginLeft: '8px' }}>{professor.departamento}</span>
              </div>
              {professor.telefone && (
                <div style={{ marginBottom: '10px' }}>
                  <strong>Telefone:</strong> 
                  <span style={{ marginLeft: '8px' }}>{professor.telefone}</span>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Professores;