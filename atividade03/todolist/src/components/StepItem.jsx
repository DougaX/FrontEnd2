const StepItem = ({ step, taskId, onToggle, onDelete }) => {
  return (
    <div className={`step-item ${step.completed ? 'completed' : ''}`}>
      <input
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