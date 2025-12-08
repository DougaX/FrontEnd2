import { TaskProvider, useTasks } from './contexts/TaskContext';
import TaskForm from './components/TaskForm';
import TaskCard from './components/TaskCard';
import './styles/global.css';

// Componente interno que usa o contexto
const TodoListContent = () => {
  const { tasks } = useTasks();

  return (
    <div className="app-container">
      <div className="app-header">
        <h1>📋 TodoList</h1>
        <p>Gerenciado com Context API + useRef</p>
        <span className="badge">Zero Props Drilling 🎯</span>
      </div>

      <TaskForm />

      {tasks.length === 0 ? (
        <div className="empty-state">
          <h2>Nenhuma tarefa ainda</h2>
          <p>Crie sua primeira tarefa acima!</p>
        </div>
      ) : (
        <div className="tasks-container">
          {tasks.map(task => (
            <TaskCard key={task.id} task={task} />
          ))}
        </div>
      )}
    </div>
  );
};

// Componente principal com Provider
function App() {
  return (
    <TaskProvider>
      <TodoListContent />
    </TaskProvider>
  );
}

export default App;