import { useState } from 'react';
import '../styles/TaskForm.css';

const TaskForm = ({ onCreateTask }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [stepText, setStepText] = useState('');
  const [steps, setSteps] = useState([]);

  const handleAddStep = (e) => {
    e.preventDefault();
    if (stepText.trim()) {
      setSteps([...steps, {
        id: Date.now(),
        text: stepText.trim(),
        completed: false
      }]);
      setStepText('');
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
      setStepText('');
    }
  };

  return (
    <div className="task-form">
      <h2>📝 Nova Tarefa</h2>
      
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">Título da Tarefa *</label>
          <input
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
              type="text"
              id="step"
              value={stepText}
              onChange={(e) => setStepText(e.target.value)}
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