import { useState, useEffect } from 'react';
import '../styles/CardImc.css';

const CardImc = () => {
  const [peso, setPeso] = useState(70);
  const [altura, setAltura] = useState(1.75);
  const [imc, setImc] = useState(0);
  const [cor, setCor] = useState('#4caf50'); // Verde padrão
  const [classificacao, setClassificacao] = useState('');

  // Calcular IMC
  const calcularImc = () => {
    if (altura > 0) {
      const imcCalculado = peso / (altura * altura);
      return imcCalculado.toFixed(2);
    }
    return 0;
  };

  // Determinar cor e classificação com base no IMC
  const determinarCor = (imcValor) => {
    if (imcValor <= 24.5) {
      setCor('#4caf50'); // Verde
      setClassificacao('Peso Normal');
    } else if (imcValor > 24.5 && imcValor < 30) {
      setCor('#ffeb3b'); // Amarelo
      setClassificacao('Sobrepeso');
    } else {
      setCor('#f44336'); // Vermelho
      setClassificacao('Obesidade');
    }
  };

  // useEffect para atualizar IMC e cor sempre que peso ou altura mudar
  useEffect(() => {
    const novoImc = calcularImc();
    setImc(novoImc);
    determinarCor(parseFloat(novoImc));
  }, [peso, altura]);

  // Funções para aumentar/diminuir peso
  const aumentarPeso = () => {
    setPeso(prev => Math.min(prev + 1, 300)); // Limite máximo 300kg
  };

  const diminuirPeso = () => {
    setPeso(prev => Math.max(prev - 1, 1)); // Limite mínimo 1kg
  };

  // Funções para aumentar/diminuir altura
  const aumentarAltura = () => {
    setAltura(prev => Math.min(prev + 0.01, 2.5)); // Limite máximo 2.5m
  };

  const diminuirAltura = () => {
    setAltura(prev => Math.max(prev - 0.01, 0.5)); // Limite mínimo 0.5m
  };

  return (
    <div className="card-imc" style={{ backgroundColor: cor }}>
      <h1 className="title">Calculadora de IMC</h1>
      
      <div className="imc-display">
        <div className="imc-value">{imc}</div>
        <div className="imc-classificacao">{classificacao}</div>
      </div>

      <div className="controles">
        {/* Controle de Peso */}
        <div className="controle-grupo">
          <label>Peso (kg)</label>
          <div className="controle-botoes">
            <button 
              onClick={diminuirPeso}
              className="btn-controle"
              aria-label="Diminuir peso"
            >
              −
            </button>
            <input
              type="number"
              value={peso}
              onChange={(e) => setPeso(Number(e.target.value))}
              min="1"
              max="300"
              step="1"
            />
            <button 
              onClick={aumentarPeso}
              className="btn-controle"
              aria-label="Aumentar peso"
            >
              +
            </button>
          </div>
        </div>

        {/* Controle de Altura */}
        <div className="controle-grupo">
          <label>Altura (m)</label>
          <div className="controle-botoes">
            <button 
              onClick={diminuirAltura}
              className="btn-controle"
              aria-label="Diminuir altura"
            >
              −
            </button>
            <input
              type="number"
              value={altura.toFixed(2)}
              onChange={(e) => setAltura(Number(e.target.value))}
              min="0.5"
              max="2.5"
              step="0.01"
            />
            <button 
              onClick={aumentarAltura}
              className="btn-controle"
              aria-label="Aumentar altura"
            >
              +
            </button>
          </div>
        </div>
      </div>

      <div className="legenda">
        <h3>Classificação do IMC</h3>
        <div className="legenda-item">
          <span className="cor-box verde"></span>
          <span>Peso Normal: ≤ 24.5</span>
        </div>
        <div className="legenda-item">
          <span className="cor-box amarelo"></span>
          <span>Sobrepeso: 24.5 - 30</span>
        </div>
        <div className="legenda-item">
          <span className="cor-box vermelho"></span>
          <span>Obesidade: ≥ 30</span>
        </div>
      </div>
    </div>
  );
};

export default CardImc;