import { useState } from 'react';
import StepItem from './StepItem';
import '../styles/TaskCard.css';

const TaskCard = ({ task, onDeleteTask, onToggleStep, onDeleteStep, onAddStep }) => {
  const [newStepText, setNewStepText] = useState('');

  const completedSteps = task.steps.filter(step => step.completed).length;
  const totalSteps = task.steps.length;
  const progress = totalSteps > 0 ? (completedSteps / totalSteps) * 100 : 0;
  const isTaskCompleted = totalSteps > 0 && completedSteps === totalSteps;

  const handleAddStep = (e) => {
    e.preventDefault();
    if (newStepText.trim()) {
      onAddStep(task.id, newStepText.trim());
      setNewStepText('');
    }
  };

  return (
    <div className={`task-card ${isTaskCompleted ? 'completed' : ''}`}>
      <div className="task-header">
        <h3>{task.title}</h3>
        <button
          className="btn-delete-task"
          onClick={() => onDeleteTask(task.id)}
        >
          Deletar
        </button>
      </div>

      {task.description && (
        <p className="task-description">{task.description}</p>
      )}

      <div className="task-progress">
        <div className="progress-text">
          Progresso: {completedSteps} de {totalSteps} passos
          {isTaskCompleted && ' ✓ Concluída!'}
        </div>
        <div className="progress-bar">
          <div
            className="progress-fill"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      <div className="steps-section">
        <h4>Passos:</h4>
        
        {task.steps.length === 0 ? (
          <p style={{ 
            color: isTaskCompleted ? 'white' : '#999', 
            fontSize: '14px',
            fontStyle: 'italic' 
          }}>
            Nenhum passo adicionado ainda.
          </p>
        ) : (
          <div className="steps-list-container">
            {task.steps.map(step => (
              <StepItem
                key={step.id}
                step={step}
                taskId={task.id}
                onToggle={onToggleStep}
                onDelete={onDeleteStep}
              />
            ))}
          </div>
        )}

        <form className="add-step-form" onSubmit={handleAddStep}>
          <input
            type="text"
            value={newStepText}
            onChange={(e) => setNewStepText(e.target.value)}
            placeholder="Adicionar novo passo..."
          />
          <button type="submit" className="btn-add-step-card">
            Adicionar
          </button>
        </form>
      </div>
    </div>
  );
};

export default TaskCard;