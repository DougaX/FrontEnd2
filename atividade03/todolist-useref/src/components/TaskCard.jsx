import { useState, useRef } from 'react';
import StepItem from './StepItem';
import '../styles/TaskCard.css';

const TaskCard = ({ task, onDeleteTask, onToggleStep, onDeleteStep, onAddStep }) => {
  const [steps, setSteps] = useState(task.steps);
  
  // Usar useRef para o input de adicionar passo
  const newStepInputRef = useRef(null);

  const completedSteps = steps.filter(step => step.completed).length;
  const totalSteps = steps.length;
  const progress = totalSteps > 0 ? (completedSteps / totalSteps) * 100 : 0;
  const isTaskCompleted = totalSteps > 0 && completedSteps === totalSteps;

  const handleAddStep = (e) => {
    e.preventDefault();
    const stepText = newStepInputRef.current.value.trim();
    
    if (stepText) {
      onAddStep(task.id, stepText);
      
      // Atualizar steps localmente
      const newStep = {
        id: Date.now(),
        text: stepText,
        completed: false,
        justAdded: true
      };
      setSteps([...steps, newStep]);
      
      newStepInputRef.current.value = '';
      newStepInputRef.current.focus();
    }
  };

  const handleToggleLocal = (taskId, stepId) => {
    setSteps(steps.map(step =>
      step.id === stepId
        ? { ...step, completed: !step.completed }
        : step
    ));
    onToggleStep(taskId, stepId);
  };

  const handleDeleteLocal = (taskId, stepId) => {
    setSteps(steps.filter(step => step.id !== stepId));
    onDeleteStep(taskId, stepId);
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
        
        {steps.length === 0 ? (
          <p style={{ 
            color: isTaskCompleted ? 'white' : '#999', 
            fontSize: '14px',
            fontStyle: 'italic' 
          }}>
            Nenhum passo adicionado ainda.
          </p>
        ) : (
          <div className="steps-list-container">
            {steps.map(step => (
              <StepItem
                key={step.id}
                step={step}
                taskId={task.id}
                onToggle={handleToggleLocal}
                onDelete={handleDeleteLocal}
              />
            ))}
          </div>
        )}

        <form className="add-step-form" onSubmit={handleAddStep}>
          <input
            ref={newStepInputRef}
            type="text"
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