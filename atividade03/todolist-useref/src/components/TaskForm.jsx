import { useState, useRef } from 'react';
import '../styles/TaskForm.css';

const TaskForm = ({ onCreateTask }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [steps, setSteps] = useState([]);
  
  // Usar useRef para inputs ao invés de useState
  const stepInputRef = useRef(null);
  const titleInputRef = useRef(null);

  const handleAddStep = (e) => {
    e.preventDefault();
    const stepText = stepInputRef.current.value.trim();
    
    if (stepText) {
      setSteps([...steps, {
        id: Date.now(),
        text: stepText,
        completed: false
      }]);
      stepInputRef.current.value = '';
      stepInputRef.current.focus();
    }
  };

  const handleRemoveStep = (stepId) => {
    setSteps(steps.filter(step => step.id !== stepId));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (title.trim()) {
      const newTask = {
        id: Date.now(),
        title: title.trim(),
        description: description.trim(),
        steps: steps,
        createdAt: new Date().toISOString()
      };

      onCreateTask(newTask);

      // Limpar formulário
      setTitle('');
      setDescription('');
      setSteps([]);
      stepInputRef.current.value = '';
      titleInputRef.current.focus();
    }
  };

  return (
    <div className="task-form">
      <h2>📝 Nova Tarefa (com useRef)</h2>
      
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">Título da Tarefa *</label>
          <input
            ref={titleInputRef}
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Ex: Estudar React Hooks"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="description">Descrição (opcional)</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Descreva sua tarefa..."
          />
        </div>

        <div className="form-group">
          <label htmlFor="step">Passos da Tarefa</label>
          <div className="steps-input-container">
            <input
              ref={stepInputRef}
              type="text"
              id="step"
              placeholder="Ex: Assistir aula sobre useState"
            />
            <button
              type="button"
              className="btn-add-step"
              onClick={handleAddStep}
            >
              + Adicionar Passo
            </button>
          </div>

          {steps.length > 0 && (
            <div className="steps-list">
              {steps.map(step => (
                <div key={step.id} className="step-preview">
                  <span>{step.text}</span>
                  <button
                    type="button"
                    className="btn-remove-step"
                    onClick={() => handleRemoveStep(step.id)}
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        <button
          type="submit"
          className="btn-create-task"
          disabled={!title.trim()}
        >
          Criar Tarefa
        </button>
      </form>
    </div>
  );
};

export default TaskForm;