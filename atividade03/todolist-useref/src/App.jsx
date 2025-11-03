import { useState, useEffect, useRef } from 'react';
import TaskForm from './components/TaskForm';
import TaskCard from './components/TaskCard';
import './styles/global.css';

function App() {
  const [tasks, setTasks] = useState([]);
  
  // Usar useRef para evitar re-renders desnecessários ao checar localStorage
  const isFirstRender = useRef(true);

  // Carregar tarefas do localStorage ao montar o componente
  useEffect(() => {
    const savedTasks = localStorage.getItem('todolist-useref-tasks');
    if (savedTasks) {
      try {
        setTasks(JSON.parse(savedTasks));
      } catch (error) {
        console.error('Erro ao carregar tarefas:', error);
      }
    }
  }, []);

  // Salvar tarefas no localStorage sempre que houver mudanças
  useEffect(() => {
    // Evitar salvar no primeiro render
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    if (tasks.length > 0) {
      localStorage.setItem('todolist-useref-tasks', JSON.stringify(tasks));
      console.log('✅ Tarefas salvas no localStorage (useRef)');
    } else {
      localStorage.removeItem('todolist-useref-tasks');
      console.log('🗑️ localStorage limpo (useRef)');
    }
  }, [tasks]);

  // Criar nova tarefa
  const handleCreateTask = (newTask) => {
    setTasks([newTask, ...tasks]);
  };

  // Deletar tarefa
  const handleDeleteTask = (taskId) => {
    if (window.confirm('Tem certeza que deseja deletar esta tarefa?')) {
      setTasks(tasks.filter(task => task.id !== taskId));
    }
  };

  // Alternar status de um passo
  const handleToggleStep = (taskId, stepId) => {
    setTasks(tasks.map(task => {
      if (task.id === taskId) {
        return {
          ...task,
          steps: task.steps.map(step =>
            step.id === stepId
              ? { ...step, completed: !step.completed }
              : step
          )
        };
      }
      return task;
    }));
  };

  // Deletar passo
  const handleDeleteStep = (taskId, stepId) => {
    setTasks(tasks.map(task => {
      if (task.id === taskId) {
        return {
          ...task,
          steps: task.steps.filter(step => step.id !== stepId)
        };
      }
      return task;
    }));
  };

  // Adicionar passo a uma tarefa existente
  const handleAddStep = (taskId, stepText) => {
    setTasks(tasks.map(task => {
      if (task.id === taskId) {
        return {
          ...task,
          steps: [...task.steps, {
            id: Date.now(),
            text: stepText,
            completed: false
          }]
        };
      }
      return task;
    }));
  };

  return (
    <div className="app-container">
      <div className="app-header">
        <h1>📋 TodoList com useRef</h1>
        <p>Versão otimizada com menos re-renders</p>
      </div>

      <TaskForm onCreateTask={handleCreateTask} />

      {tasks.length === 0 ? (
        <div className="empty-state">
          <h2>Nenhuma tarefa ainda</h2>
          <p>Crie sua primeira tarefa acima!</p>
        </div>
      ) : (
        <div className="tasks-container">
          {tasks.map(task => (
            <TaskCard
              key={task.id}
              task={task}
              onDeleteTask={handleDeleteTask}
              onToggleStep={handleToggleStep}
              onDeleteStep={handleDeleteStep}
              onAddStep={handleAddStep}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default App;