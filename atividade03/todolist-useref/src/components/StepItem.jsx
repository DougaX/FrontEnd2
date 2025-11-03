import { useRef, useEffect } from 'react';

const StepItem = ({ step, taskId, onToggle, onDelete }) => {
  const checkboxRef = useRef(null);

  // Usar useRef para evitar re-render ao focar
  useEffect(() => {
    if (checkboxRef.current && step.justAdded) {
      checkboxRef.current.focus();
    }
  }, [step.justAdded]);

  return (
    <div className={`step-item ${step.completed ? 'completed' : ''}`}>
      <input
        ref={checkboxRef}
        type="checkbox"
        className="step-checkbox"
        checked={step.completed}
        onChange={() => onToggle(taskId, step.id)}
      />
      <span className="step-text">{step.text}</span>
      <button
        className="btn-delete-step"
        onClick={() => onDelete(taskId, step.id)}
        aria-label="Remover passo"
      >
        ×
      </button>
    </div>
  );
};

export default StepItem;