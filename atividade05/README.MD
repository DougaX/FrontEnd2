# 📚 Atividade 05 - Context API + Rotas Protegidas

Esta atividade contém **2 projetos** implementados com **Context API**, **useRef** e **Rotas Protegidas**.

---


## 📁 Estrutura da Atividade

- atividade05/
- ├── todolist-context/ # Projeto 1: TodoList com Context API
- └── sistema-salas-context/ # Projeto 2: Sistema Escolar refatorado

---

---

# 🎯 PROJETO 1: TodoList com Context API + useRef

Sistema completo de gerenciamento de tarefas usando **Context API** para evitar **props drilling**.

## 🚀 Tecnologias

- React 18
- Context API
- useRef (otimização de performance)
- localStorage (persistência)
- Vite

## ✨ Funcionalidades

- ✅ Criar tarefas com título e descrição
- ✅ Adicionar múltiplos passos por tarefa
- ✅ Marcar passos como concluídos
- ✅ Remover tarefas e passos
- ✅ Barra de progresso visual
- ✅ Tarefas completas mudam de cor
- ✅ Salvar automaticamente no localStorage
- ✅ **Zero props drilling** (Context API)
- ✅ **useRef** para inputs (sem re-renders)

## 🎨 Destaques Técnicos

### Context API
```jsx
// TaskContext.jsx
export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);
  // ... lógica centralizada
  
  return (
    <TaskContext.Provider value={value}>
      {children}
    </TaskContext.Provider>
  );
};

// Hook customizado
export const useTasks = () => {
  const context = useContext(TaskContext);
  return context;
};
```
- useRef para Performance

## 📦 Como executar

- cd todolist-context
- npm install
- npm run dev

# 🏫 PROJETO 2: Sistema Escolar com Context API
Sistema de gerenciamento de salas escolares refatorado com Context API e Rotas Protegidas.

## 🚀 Tecnologias

- React 18
- React Router DOM 6
- Context API (3 contextos)
- Protected Routes
- localStorage (autenticação simulada)
- Vite

## ✨ Funcionalidades

- ✅ Login e Registro com autenticação
- ✅ Rotas protegidas (somente usuários autenticados)
- ✅ Dashboard com listagem de salas
- ✅ Filtros por tipo e disponibilidade
 ✅ Detalhes da sala com reserva
 ✅ Sistema de reservas completo
 ✅ Gerenciamento de minhas reservas
 ✅ Zero props drilling em todo o app
 ✅ 3 Contextos (Auth, Sala, Reserva)

## 🎨 Arquitetura de Contextos

1️⃣ AuthContext

- Gerencia autenticação e usuário logado.

```jsx
const { user, login, logout, isAuthenticated } = useAuth();

```

- Funcionalidades:

 Login/Logout
 Verificar autenticação
 Gerenciar dados do usuário
 Persistência no localStorage

2️⃣ SalaContext
Gerencia lista de salas, filtros e estatísticas.

```jsx
const { 
  salas, 
  salasFiltradas, 
  filtro, 
  setFiltro,
  getSalaById,
  totalSalas,
  salasDisponiveis,
  salasOcupadas
} = useSalas();

```
- Funcionalidades:

Lista de salas
Filtros dinâmicos
Estatísticas automáticas
Buscar sala por ID

3️⃣ ReservaContext
Gerencia reservas de salas.

```jsx
const { 
  reservas, 
  addReserva, 
  cancelReserva,
  totalReservas,
  reservasConfirmadas,
  reservasPendentes
} = useReservas();
```
- Funcionalidades:

Criar reserva
Cancelar reserva
Estatísticas de reservas
Persistência no localStorage

## 🔐 Rotas Protegidas

- MainLayout (Protegido)

```jsx
const MainLayout = () => {
  const { isAuthenticated, loading } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
};
```
- AuthLayout (Redireciona se autenticado)

```jsx
const AuthLayout = () => {
  const { isAuthenticated } = useAuth();

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  return <Outlet />;
};
```

## 📁 Estrutura de Pastas
```bash

text
sistema-salas-context/
├── src/
│   ├── components/
│   │   ├── Header.jsx          (usa useAuth)
│   │   ├── Footer.jsx
│   │   ├── SalaCard.jsx
│   │   └── ReservaCard.jsx
│   ├── contexts/
│   │   ├── AuthContext.jsx     (autenticação)
│   │   ├── SalaContext.jsx     (salas)
│   │   └── ReservaContext.jsx  (reservas)
│   ├── layouts/
│   │   ├── MainLayout.jsx      (rotas protegidas)
│   │   └── AuthLayout.jsx
│   ├── pages/
│   │   ├── Login.jsx           (usa useAuth)
│   │   ├── Register.jsx        (usa useAuth)
│   │   ├── Dashboard.jsx       (usa useSalas)
│   │   ├── SalaDetalhes.jsx    (usa 3 contextos)
│   │   └── Reservas.jsx        (usa useReservas)
│   ├── data/
│   │   ├── salas.json
│   │   └── reservas.json
│   ├── styles/
│   │   └── ... (CSS files)
│   ├── App.jsx                 (3 Providers)
│   └── main.jsx
🔗 App.jsx com Providers
```
```jsx
function App() {
  return (
    <Router>
      <AuthProvider>
        <SalaProvider>
          <ReservaProvider>
            <Routes>
              {/* Rotas aqui */}
            </Routes>
          </ReservaProvider>
        </SalaProvider>
      </AuthProvider>
    </Router>
  );
}
```
## 📦 Como executar

- cd sistema-salas-context
- npm install
- npm run dev
- Acesse: http://localhost:5173/

## 🔑 Login

- Email: qualquer email válido
- Senha: qualquer senha (mínimo 6 caracteres)
- Sistema simula autenticação via localStorage

## 🎯 Fluxo de Navegação

```bash
/ → Redireciona para /login
/login → Página de login
/register → Página de registro
/dashboard 🔒 → Lista de salas (protegido)
/sala/:id 🔒 → Detalhes da sala (protegido)
/reservas 🔒 → Minhas reservas (protegido)
🔒 = Rota Protegida (requer autenticação)
```

## 📊 Comparação: Antes vs Depois

❌ Antes (Props Drilling)

```jsx

// App passa props para todos componentes
<Dashboard 
  salas={salas} 
  onFilter={handleFilter}
  user={user}
/>

// Dashboard passa para SalaCard
<SalaCard 
  sala={sala} 
  user={user}
  onReservar={onReservar}
/>
```
✅ Depois (Context API)

```jsx
// Componente usa diretamente o contexto
function Dashboard() {
  const { salasFiltradas } = useSalas();
  const { user } = useAuth();
  
  return <SalaCard sala={sala} />;
}
```

## 🎓 Conceitos Aplicados

Context API

- ✅ Evita props drilling
- ✅ Estado global centralizado
- ✅ Hooks customizados
- ✅ Providers aninhados

useRef

- ✅ Referências a elementos DOM
- ✅ Valores mutáveis sem re-render
- ✅ Controle de primeiro render
- ✅ Otimização de performance

React Router

- ✅ Rotas aninhadas
- ✅ Protected Routes
- ✅ Navigate component
- ✅ useNavigate hook 
- ✅ useParams hook

localStorage

- ✅ Persistência de dados
- ✅ Autenticação simulada
- ✅ Salvamento automático
- ✅ Carregamento inicial

