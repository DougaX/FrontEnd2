# Sistema de Reservas - Frontend

Sistema de reservas de salas desenvolvido em React para a disciplina de Frontend 2.

## 📋 Funcionalidades

### Rotas Públicas (sem autenticação)
- ✅ Visualizar lista de professores
- ✅ Visualizar lista de salas
- ✅ Visualizar lista de reservas
- ✅ Detalhes individuais de cada recurso

### Rotas Autenticadas (com Bearer Token)
- ✅ Login de usuário
- ✅ Registro de novo usuário
- ✅ Criar nova reserva
- ✅ Logout automático em token inválido
- ✅ Validação de email único

## 🚀 Instalação e Execução

### Pré-requisitos
- Node.js (versão 16 ou superior)
- npm ou yarn
- API Backend rodando (Laravel)

### Passos para instalação

1. **Clone o repositório:**
```bash
git clone <URL_DO_REPOSITORIO>
cd sistema-reservas
```

2. **Instale as dependências:**
```bash
npm install
```

3. **Configure as variáveis de ambiente:**
```bash
cp .env.example .env
```

Edite o arquivo `.env` e configure a URL da API:
```env
VITE_API_URL=http://localhost:8000/api
```

4. **Inicie o servidor de desenvolvimento:**
```bash
npm run dev
```

5. **Acesse a aplicação:**
```
http://localhost:5173
```

## 📦 Scripts Disponíveis

- `npm run dev` - Inicia o servidor de desenvolvimento
- `npm run build` - Gera build de produção
- `npm run preview` - Visualiza o build de produção
- `npm run test` - Executa os testes
- `npm run test:ui` - Executa os testes com interface gráfica
- `npm run lint` - Executa o linter

## 🏗️ Estrutura do Projeto

```
sistema-reservas/
├── public/
│   └── vite.svg
├── src/
│   ├── components/
│   │   └── Navbar.jsx          # Barra de navegação
│   ├── pages/
│   │   ├── Login.jsx           # Página de login
│   │   ├── Professores.jsx     # Lista de professores
│   │   ├── Salas.jsx           # Lista de salas
│   │   ├── Reservas.jsx        # Lista de reservas
│   │   └── NovaReserva.jsx     # Formulário de nova reserva
│   ├── services/
│   │   ├── api.js              # Configuração do Axios
│   │   ├── apiService.js       # Métodos da API
│   │   └── authService.js      # Serviços de autenticação
│   ├── tests/
│   │   ├── setup.js            # Configuração dos testes
│   │   ├── apiService.test.js  # Testes da API
│   │   └── components.test.jsx # Testes dos componentes
│   ├── config/
│   │   └── config.js           # Configurações da aplicação
│   ├── App.jsx                 # Componente principal
│   ├── App.css                 # Estilos do App
│   ├── index.css               # Estilos globais
│   └── main.jsx                # Ponto de entrada
├── .env.example               # Exemplo de variáveis de ambiente
├── package.json               # Dependências e scripts
├── vite.config.js            # Configuração do Vite
└── README.md                 # Este arquivo
```

## 🛠️ Tecnologias Utilizadas

- **React 19** - Biblioteca para interfaces de usuário
- **Vite** - Build tool e servidor de desenvolvimento
- **React Router DOM** - Roteamento da aplicação
- **Axios** - Cliente HTTP para requisições à API
- **Vitest** - Framework de testes
- **Testing Library** - Utilitários para testes de componentes

## 🔧 Configuração da API

O sistema se conecta com uma API Laravel que deve estar rodando em `http://localhost:8000/api`.

### Rotas da API utilizadas:

#### Rotas Públicas:
- `GET /api/professores` - Lista professores
- `GET /api/professores/{id}` - Detalhes do professor
- `GET /api/salas` - Lista salas
- `GET /api/salas/{id}` - Detalhes da sala
- `GET /api/reservas` - Lista reservas
- `GET /api/reservas/{id}` - Detalhes da reserva

#### Rotas Autenticadas:
- `POST /api/login` - Autenticação
- `POST /api/register` - Registro de novo usuário
- `POST /api/reservas` - Criar reserva
- `POST /api/logout` - Logout

## 🧪 Testes

O projeto está configurado para testes com Vitest e Testing Library. A estrutura de testes inclui:

### Funcionalidades Testáveis:
- ✅ Integração com API (rotas públicas e protegidas)
- ✅ Carregamento de dados dos professores
- ✅ Carregamento de dados das salas
- ✅ Carregamento de dados das reservas
- ✅ Autenticação com Bearer Token
- ✅ Criação de novas reservas
- ✅ Tratamento de erros de rede
- ✅ Estados de loading
- ✅ Formulários e interações do usuário

### Executar testes:
```bash
# Instalar dependências de teste (se necessário)
npm install

# Executar testes (configuração em desenvolvimento)
npm run test

# Executar testes com interface gráfica
npm run test:ui
```

**Nota:** Os testes estão estruturados para verificar todas as funcionalidades principais da aplicação, incluindo integração com a API backend e comportamento dos componentes React.

## 🔐 Autenticação

O sistema utiliza **Bearer Token** para autenticação:

1. O usuário faz login com email e senha
2. A API retorna um token JWT
3. O token é armazenado no localStorage
4. Todas as requisições autenticadas incluem o token no header `Authorization: Bearer {token}`
5. Em caso de token inválido (401), o usuário é redirecionado para login

## 📱 Rotas da Aplicação

- `/` - Página inicial (lista de professores)
- `/login` - Página de login
- `/register` - Página de registro de novo usuário
- `/professores` - Lista de professores
- `/salas` - Lista de salas
- `/reservas` - Lista de reservas
- `/nova-reserva` - Criar nova reserva (requer autenticação)

## 🎨 Estilos

O projeto utiliza CSS puro com:
- Design responsivo
- Tema claro e limpo
- Componentes reutilizáveis
- Estados visuais para loading e erros
- Layout em grid para listas
- Formulários estilizados

## 🚀 Deploy

Para fazer deploy da aplicação:

1. **Gere o build de produção:**
```bash
npm run build
```

2. **Os arquivos serão gerados na pasta `dist/`**

3. **Configure o servidor web para servir os arquivos estáticos**

4. **Configure as variáveis de ambiente de produção**

## 📝 Requisitos Atendidos

### ✅ Atividade 07 - Frontend 2

1. **Desenvolvimento de páginas com recursos da API (3+ recursos):**
   - Professores (GET /api/professores)
   - Salas (GET /api/salas)
   - Reservas (GET /api/reservas)

2. **Integração com rotas públicas da API backend:**
   - Todas as rotas GET funcionam sem autenticação
   - Carregamento dinâmico de dados
   - Tratamento de erros de rede

3. **Testes para cada rota pública:**
   - Testes unitários dos serviços
   - Testes de integração dos componentes
   - Verificação de carregamento de dados
   - Cobertura de cenários de erro

4. **Autenticação com Bearer Token usando Axios:**
   - Interceptors configurados
   - Token armazenado no localStorage
   - Redirecionamento automático em caso de erro 401
   - Rotas protegidas funcionais

5. **README.md com instruções completas:**
   - Instalação detalhada
   - Configuração da API
   - Documentação dos testes
   - Estrutura do projeto

## 🤝 Colaboradores

- **Professor:** gillgonzales (GitHub)

## 📄 Licença

Este projeto foi desenvolvido para fins educacionais na disciplina de Frontend 2.