import { createContext, useState, useEffect, useRef, useContext } from 'react';

// Criar o contexto
const TaskContext = createContext();

// Hook customizado para usar o contexto
export const useTasks = () => {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error('useTasks deve ser usado dentro de TaskProvider');
  }
  return context;
};

// Provider do contexto
export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);
  const isFirstRender = useRef(true);

  // Carregar tarefas do localStorage ao montar
  useEffect(() => {
    const savedTasks = localStorage.getItem('todolist-context-tasks');
    if (savedTasks) {
      try {
        setTasks(JSON.parse(savedTasks));
        console.log('✅ Tarefas carregadas do localStorage');
      } catch (error) {
        console.error('❌ Erro ao carregar tarefas:', error);
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
      localStorage.setItem('todolist-context-tasks', JSON.stringify(tasks));
      console.log('💾 Tarefas salvas no localStorage');
    } else {
      localStorage.removeItem('todolist-context-tasks');
      console.log('🗑️ localStorage limpo');
    }
  }, [tasks]);

  // Criar nova tarefa
  const createTask = (taskData) => {
    const newTask = {
      id: Date.now(),
      ...taskData,
      createdAt: new Date().toISOString()
    };
    setTasks(prev => [newTask, ...prev]);
    console.log('✅ Tarefa criada:', newTask.title);
  };

  // Deletar tarefa
  const deleteTask = (taskId) => {
    setTasks(prev => prev.filter(task => task.id !== taskId));
    console.log('🗑️ Tarefa deletada:', taskId);
  };

  // Alternar status de um passo
  const toggleStep = (taskId, stepId) => {
    setTasks(prev => prev.map(task => {
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
    console.log('✓ Passo alterado:', stepId);
  };

  // Deletar passo
  const deleteStep = (taskId, stepId) => {
    setTasks(prev => prev.map(task => {
      if (task.id === taskId) {
        return {
          ...task,
          steps: task.steps.filter(step => step.id !== stepId)
        };
      }
      return task;
    }));
    console.log('🗑️ Passo deletado:', stepId);
  };

  // Adicionar passo a uma tarefa
  const addStep = (taskId, stepText) => {
    setTasks(prev => prev.map(task => {
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
    console.log('✅ Passo adicionado:', stepText);
  };

  // Valor do contexto
  const value = {
    tasks,
    createTask,
    deleteTask,
    toggleStep,
    deleteStep,
    addStep
  };

  return (
    <TaskContext.Provider value={value}>
      {children}
    </TaskContext.Provider>
  );
};