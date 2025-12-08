import { useRef } from 'react';
import { useTasks } from '../contexts/TaskContext';
import StepItem from './StepItem';
import '../styles/TaskCard.css';

const TaskCard = ({ task }) => {
  const { deleteTask, addStep } = useTasks();
  const newStepInputRef = useRef(null);

  const completedSteps = task.steps.filter(step => step.completed).length;
  const totalSteps = task.steps.length;
  const progress = totalSteps > 0 ? (completedSteps / totalSteps) * 100 : 0;
  const isTaskCompleted = totalSteps > 0 && completedSteps === totalSteps;

  const handleAddStep = (e) => {
    e.preventDefault();
    const stepText = newStepInputRef.current.value.trim();
    
    if (stepText) {
      addStep(task.id, stepText);
      newStepInputRef.current.value = '';
      newStepInputRef.current.focus();
    }
  };

  const handleDelete = () => {
    if (window.confirm('Tem certeza que deseja deletar esta tarefa?')) {
      deleteTask(task.id);
    }
  };

  return (
    <div className={`task-card ${isTaskCompleted ? 'completed' : ''}`}>
      <div className="task-header">
        <h3>{task.title}</h3>
        <button
          className="btn-delete-task"
          onClick={handleDelete}
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