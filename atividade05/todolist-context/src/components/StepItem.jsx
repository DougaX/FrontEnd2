import { useRef, useEffect } from 'react';
import { useTasks } from '../contexts/TaskContext';

const StepItem = ({ step, taskId }) => {
  const { toggleStep, deleteStep } = useTasks();
  const checkboxRef = useRef(null);

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
        onChange={() => toggleStep(taskId, step.id)}
      />
      <span className="step-text">{step.text}</span>
      <button
        className="btn-delete-step"
        onClick={() => deleteStep(taskId, step.id)}
        aria-label="Remover passo"
      >
        ×
      </button>
    </div>
  );
};

export default StepItem;