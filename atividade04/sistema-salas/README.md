# 🏫 Sistema Escolar de Gerenciamento de Salas

Sistema completo para gerenciamento e reserva de salas em ambiente escolar.

## 🎯 Funcionalidades

- ✅ Login e Registro de professores
- ✅ Listagem de salas disponíveis
- ✅ Filtros por tipo e disponibilidade
- ✅ Detalhes completos de cada sala
- ✅ Sistema de reservas
- ✅ Gerenciamento de reservas
- ✅ Autenticação via localStorage

## 🛠️ Tecnologias

- React 18
- React Router DOM 6
- Vite
- CSS Modules

## 📦 Instalação

```bash
# Instalar dependências
npm install

# Rodar em desenvolvimento
npm run dev

# Build para produção
npm run build

## 🎨 Design

Sistema desenvolvido com design preto e branco minimalista, inspirado no estilo brutalista.

## 📁 Estrutura

src/
├── components/     # Componentes reutilizáveis
├── layouts/        # Layouts (Auth e Main)
├── pages/          # Páginas da aplicação
├── data/           # Dados mockados (JSON)
└── styles/         # Estilos CSS

## 🔐 Dados de Teste

Qualquer email e senha funcionam para login.

📚 Páginas

- /login - Login
- /register - Cadastro
- /dashboard - Lista de salas
- /sala/:id - Detalhes da sala (useParams)
- /reservas - Minhas reservas
