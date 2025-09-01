document.addEventListener('DOMContentLoaded', () => {
  // ==========================================================================
  // CONFIGURAÇÃO E UTILITÁRIOS
  // ==========================================================================
  
  const CONFIG = {
    API_BASE_URL: '/sabor_digital_organizado/Backend/api',
    ENDPOINTS: {
      CATEGORIAS: '/categorias.php',
      RECEITAS: '/receitas.php',
      USUARIOS: '/usuarios.php',
      COMENTARIOS: '/comentarios.php'
    }
  };

  // Cache simples para melhorar performance
  const cache = new Map();
  const CACHE_DURATION = 5 * 60 * 1000; // 5 minutos

  // Gerenciador de loading em botões
  const setButtonLoading = (button, loading = true, loadingText = 'Carregando...') => {
    if (!button) return;
    
    if (loading) {
      button.dataset.originalText = button.textContent;
      button.textContent = loadingText;
      button.disabled = true;
      button.style.opacity = '0.7';
      button.style.cursor = 'not-allowed';
    } else {
      button.textContent = button.dataset.originalText || 'Enviar';
      button.disabled = false;
      button.style.opacity = '1';
      button.style.cursor = 'pointer';
    }
  };

  // Sistema de notificações
  const showNotification = (message, type = 'info', duration = 4000) => {
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
      existingNotification.remove();
    }
    
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
      <span class="notification-message">${message}</span>
      <button class="notification-close" onclick="this.parentElement.remove()">&times;</button>
    `;
    
    notification.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      padding: 15px 20px;
      border-radius: 5px;
      color: white;
      z-index: 1000;
      display: flex;
      align-items: center;
      gap: 10px;
      max-width: 400px;
      box-shadow: 0 4px 6px rgba(0,0,0,0.1);
      font-family: Arial, sans-serif;
      ${type === 'success' ? 'background-color: #4CAF50;' : ''}
      ${type === 'error' ? 'background-color: #f44336;' : ''}
      ${type === 'info' ? 'background-color: #2196F3;' : ''}
    `;
    
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.style.cssText = `
      background: none;
      border: none;
      color: white;
      font-size: 18px;
      cursor: pointer;
      padding: 0;
      margin-left: auto;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
      if (notification.parentNode) {
        notification.remove();
      }
    }, duration);
  };

  // Função principal para requisições à API
  const apiRequest = async (endpoint, options = {}) => {
    const url = `${CONFIG.API_BASE_URL}${endpoint}`;
    
    try {
      console.log('🔄 Fazendo requisição para:', url);
      
      const defaultOptions = {
        headers: {
          'Content-Type': 'application/json',
        }
      };
      
      const response = await fetch(url, { ...defaultOptions, ...options });
      
      if (!response) {
        throw new Error('Sem resposta do servidor');
      }
      
      const contentType = response.headers.get('content-type');
      const textResponse = await response.text();
      
      // Extrair JSON mesmo com warnings PHP
      let cleanJsonText = textResponse;
      
      if (textResponse.includes('<br />') || textResponse.includes('Warning') || textResponse.includes('Notice')) {
        const jsonMatch = textResponse.match(/(\{.*\})\s*$/);
        if (jsonMatch) {
          cleanJsonText = jsonMatch[1];
        } else {
          throw new Error('Resposta contém erros PHP e JSON não encontrado');
        }
      }
      
      let data;
      try {
        data = JSON.parse(cleanJsonText);
      } catch (jsonError) {
        console.error('❌ Erro ao fazer parse do JSON:', jsonError);
        throw new Error('Resposta inválida do servidor');
      }
      
      if (!response.ok) {
        const errorMessage = data.message || `HTTP ${response.status}: ${response.statusText}`;
        throw new Error(errorMessage);
      }
      
      console.log('✅ Requisição bem-sucedida:', data);
      return data;
      
    } catch (error) {
      console.error(`❌ Erro na requisição para ${url}:`, error);
      throw error;
    }
  };

  // Validações simples
  const validators = {
    email: (email) => {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(email);
    },
    
    required: (value) => {
      return value && value.trim().length > 0;
    },
    
    minLength: (value, min) => {
      return value && value.trim().length >= min;
    }
  };

  // Gerenciador de autenticação
  const AuthManager = {
    isLoggedIn() {
      return localStorage.getItem('user_id') !== null;
    },
    
    getCurrentUser() {
      if (!this.isLoggedIn()) return null;
      
      return {
        id: localStorage.getItem('user_id'),
        name: localStorage.getItem('user_name'),
        email: localStorage.getItem('user_email')
      };
    },
    
    login(userData) {
      localStorage.setItem('user_id', userData.id);
      localStorage.setItem('user_name', userData.nome);
      localStorage.setItem('user_email', userData.email);
      
      // Atualizar interface imediatamente
      updateUserInterface();
      
      showNotification(`Bem-vindo, ${userData.nome}! 🎉`, 'success');
    },
    
    logout() {
      localStorage.removeItem('user_id');
      localStorage.removeItem('user_name');
      localStorage.removeItem('user_email');
      
      // Atualizar interface
      updateUserInterface();
      
      showNotification('Logout realizado com sucesso! 👋', 'info');
      
      // Redirecionar após delay
      setTimeout(() => {
        window.location.href = 'index.html';
      }, 1000);
    },
    
    requireAuth() {
      if (!this.isLoggedIn()) {
        showNotification('Você precisa estar logado para acessar esta funcionalidade! 🔐', 'error');
        setTimeout(() => {
          window.location.href = 'login.html';
        }, 2000);
        return false;
      }
      return true;
    }
  };

  // ==========================================================================
  // FUNÇÕES DO MENU E NAVEGAÇÃO
  // ==========================================================================
  
  window.toggleMenu = function() {
    const sidebar = document.getElementById("sidebar");
    if (sidebar) {
      sidebar.classList.toggle("active");
    }
  };

  window.toggleSubmenu = function(id) {
    const submenu = document.getElementById(id);
    if (!submenu) return;
    
    if (submenu.classList.contains("open")) {
      submenu.classList.remove("open");
      submenu.style.maxHeight = null;
    } else {
      submenu.classList.add("open");
      submenu.style.maxHeight = submenu.scrollHeight + "px";
    }
  };

  // ==========================================================================
  // SISTEMA DE LOGOUT E MENU DE USUÁRIO
  // ==========================================================================

  // Função para fazer logout
  window.logout = () => {
    if (confirm('Tem certeza que deseja sair?')) {
      console.log('🚪 Fazendo logout...');
      
      // Limpar dados do localStorage
      localStorage.removeItem('user_id');
      localStorage.removeItem('user_name');
      localStorage.removeItem('user_email');
      
      // Limpar cache
      cache.clear();
      
      // Atualizar interface
      updateUserInterface();
      
      // Mostrar notificação
      showNotification('Logout realizado com sucesso! 👋', 'info');
      
      // Redirecionar para home após 1 segundo
      setTimeout(() => {
        window.location.href = 'index.html';
      }, 1000);
    }
  };

  // Função para mostrar/esconder menu de usuário
  window.toggleUserMenu = () => {
    const dropdown = document.getElementById('userDropdown');
    if (dropdown) {
      dropdown.classList.toggle('show');
    }
  };

  // Fechar menu se clicar fora
  document.addEventListener('click', (e) => {
    const userMenu = document.querySelector('.user-menu');
    const dropdown = document.getElementById('userDropdown');
    
    if (userMenu && dropdown && !userMenu.contains(e.target)) {
      dropdown.classList.remove('show');
    }
  });

  // Funções placeholder para funcionalidades futuras
  window.showUserProfile = () => {
    showNotification('Funcionalidade em desenvolvimento! 🚧', 'info');
  };

  window.showUserRecipes = () => {
    showNotification('Funcionalidade em desenvolvimento! 🚧', 'info');
  };

  // Atualizar interface baseada no estado de login
  const updateUserInterface = () => {
    const isLoggedIn = AuthManager.isLoggedIn();
    const currentUser = AuthManager.getCurrentUser();
    
    console.log('🔐 Atualizando interface - Logado:', isLoggedIn, 'Usuário:', currentUser);
    
    // Atualizar classe do body
    if (isLoggedIn) {
      document.body.classList.add('logged-in');
    } else {
      document.body.classList.remove('logged-in');
    }
    
    // Atualizar elementos específicos
    const loginLinks = document.querySelectorAll('.login-link');
    const userMenus = document.querySelectorAll('.user-menu');
    const userNames = document.querySelectorAll('.user-name');
    const authRequired = document.querySelectorAll('.auth-required');
    
    if (isLoggedIn && currentUser) {
      // Usuário logado - mostrar menu de usuário
      loginLinks.forEach(el => el.style.display = 'none');
      userMenus.forEach(el => el.style.display = 'block');
      userNames.forEach(el => el.textContent = currentUser.name);
      authRequired.forEach(el => el.style.display = 'block');
    } else {
      // Usuário não logado - mostrar link de login
      loginLinks.forEach(el => el.style.display = 'block');
      userMenus.forEach(el => el.style.display = 'none');
      userNames.forEach(el => el.textContent = '');
      authRequired.forEach(el => el.style.display = 'none');
    }
  };

  // ==========================================================================
  // CARREGAR CATEGORIAS NO MENU
  // ==========================================================================
  
  const loadCategoriasMenu = async () => {
    const submenuCategorias = document.getElementById('submenuCategorias');
    if (!submenuCategorias) return;

    try {
      const cacheKey = 'categorias_menu';
      const cached = cache.get(cacheKey);
      if (cached && (Date.now() - cached.timestamp) < CACHE_DURATION) {
        renderCategorias(cached.data, submenuCategorias);
        return;
      }

      submenuCategorias.innerHTML = '<li style="color: #666;">Carregando categorias...</li>';
      
      const categorias = await apiRequest(CONFIG.ENDPOINTS.CATEGORIAS);

      cache.set(cacheKey, {
        data: categorias,
        timestamp: Date.now()
      });

      renderCategorias(categorias, submenuCategorias);
      
    } catch (error) {
      console.error('❌ Erro ao carregar categorias:', error);
      submenuCategorias.innerHTML = '<li style="color: #f44336;">Erro ao carregar categorias</li>';
    }
  };

  const renderCategorias = (categorias, container) => {
    if (categorias && categorias.length > 0) {
      container.innerHTML = categorias.map(cat => `
        <li><a href="resultado.html?categoria=${encodeURIComponent(cat.nome)}">${cat.nome}</a></li>
      `).join('');
    } else {
      container.innerHTML = '<li style="color: #666;">Nenhuma categoria disponível</li>';
    }
  };

  // ==========================================================================
  // SISTEMA DE BUSCA
  // ==========================================================================
  
  const initSearchSystem = () => {
    const searchInput = document.getElementById('searchInput');
    const searchIcon = document.getElementById('searchIcon');

    console.log('🔍 Inicializando sistema de busca...');
    console.log('🔍 SearchInput encontrado:', !!searchInput);
    console.log('🔍 SearchIcon encontrado:', !!searchIcon);

    const performSearch = () => {
      if (!searchInput) {
        console.error('❌ Elemento searchInput não encontrado!');
        return;
      }

      const searchTerm = searchInput.value.trim();
      console.log('🔍 Termo digitado:', searchTerm);
      
      if (searchTerm && searchTerm.length >= 2) {
        const cleanTerm = searchTerm.toLowerCase();
        const redirectUrl = `resultado.html?q=${encodeURIComponent(cleanTerm)}`;
        
        console.log('🔍 Redirecionando para:', redirectUrl);
        window.location.href = redirectUrl;
      } else {
        showNotification('Digite pelo menos 2 caracteres para pesquisar', 'info');
      }
    };

    // Event listener para Enter no campo de input
    if (searchInput) {
      searchInput.addEventListener('keypress', (e) => {
        console.log('🔍 Tecla pressionada:', e.key);
        if (e.key === 'Enter') {
          e.preventDefault();
          console.log('🔍 Enter detectado, executando busca...');
          performSearch();
        }
      });

      // Event listener para input (busca ao digitar)
      searchInput.addEventListener('input', (e) => {
        const value = e.target.value.trim();
        console.log('🔍 Texto digitado:', value);
        
        // Opcional: busca instantânea após 3 caracteres
        if (value.length >= 3) {
          clearTimeout(window.searchTimeout);
          window.searchTimeout = setTimeout(() => {
            console.log('🔍 Busca instantânea para:', value);
          }, 500);
        }
      });
    }

    // Event listener para clique no ícone da lupa
    if (searchIcon) {
      searchIcon.addEventListener('click', (e) => {
        e.preventDefault();
        console.log('🔍 Ícone de busca clicado');
        performSearch();
      });
      
      searchIcon.style.cursor = 'pointer';
    }

    // Função global para busca
    window.performSearch = performSearch;
  };

  // Inicializar sistema de busca
  initSearchSystem();

  // ==========================================================================
  // PÁGINA DE RESULTADOS (resultado.html)
  // ==========================================================================
  
  if (window.location.pathname.endsWith('resultado.html')) {
    const initResultadosPage = async () => {
      console.log('📄 Inicializando página de resultados...');
      
      const urlParams = new URLSearchParams(window.location.search);
      const searchTerm = urlParams.get('q');
      const categoriaTerm = urlParams.get('categoria');
      
      console.log('🔍 Parâmetros encontrados:', {
        searchTerm,
        categoriaTerm,
        fullUrl: window.location.href
      });
      
      const listaReceitas = document.getElementById('listaReceitas');
      const resultadoTitulo = document.getElementById('resultadoTitulo');

      if (!listaReceitas) {
        console.error('❌ Elemento listaReceitas não encontrado!');
        return;
      }

      if (!resultadoTitulo) {
        console.error('❌ Elemento resultadoTitulo não encontrado!');
        return;
      }

      let apiUrl = CONFIG.ENDPOINTS.RECEITAS;
      let titleText = 'Resultados da Pesquisa';

      if (searchTerm) {
        apiUrl += `?q=${encodeURIComponent(searchTerm)}`;
        titleText = `Resultados para "${searchTerm}"`;
      } else if (categoriaTerm) {
        apiUrl += `?q=${encodeURIComponent(categoriaTerm)}`;
        titleText = `Receitas na Categoria "${categoriaTerm}"`;
      } else {
        titleText = 'Todas as Receitas';
      }

      console.log('🔍 URL da API que será chamada:', CONFIG.API_BASE_URL + apiUrl);

      resultadoTitulo.textContent = titleText;
            listaReceitas.innerHTML = '<p style="text-align: center; padding: 20px;">🔄 Carregando receitas...</p>';

      try {
        const receitas = await apiRequest(apiUrl);
        console.log('🔍 Receitas recebidas da API:', receitas);
        console.log('🔍 Tipo dos dados recebidos:', typeof receitas);
        console.log('🔍 É um array?', Array.isArray(receitas));
        console.log('🔍 Quantidade de receitas:', receitas ? receitas.length : 'N/A');
        
        renderResultados(receitas, listaReceitas, searchTerm);
      } catch (error) {
        console.error('❌ Erro ao buscar receitas:', error);
        listaReceitas.innerHTML = `
          <div style="text-align: center; padding: 40px; color: #f44336;">
            <h3>❌ Erro ao carregar receitas</h3>
            <p>${error.message}</p>
            <button onclick="location.reload()" style="background: #007bff; color: white; border: none; padding: 10px 20px; border-radius: 5px; cursor: pointer; margin-top: 10px;">
              Tentar Novamente
            </button>
          </div>
        `;
      }
    };

    const renderResultados = (receitas, container, searchTerm = '') => {
      console.log('🎨 Renderizando resultados:', { 
        quantidade: receitas?.length || 0, 
        searchTerm 
      });

      if (receitas && receitas.length > 0) {
        container.innerHTML = receitas.map((receita, index) => {
          // Verificar e limpar dados
          const nome = receita.nome || `Receita ${index + 1}`;
          const descricao = receita.descricao || 'Sem descrição disponível';
          const imagem = receita.imagem && receita.imagem.trim() !== '' && receita.imagem !== 'null' ? receita.imagem.trim() : null;
          const id = receita.id || index;
          
          console.log(`🎨 Renderizando: ${nome} - Imagem: ${imagem ? 'Sim' : 'Não'}`);
          
          // Destacar termo buscado
          let nomeHighlight = nome;
          let descricaoHighlight = descricao.substring(0, 200);
          
          if (searchTerm && searchTerm.length > 0) {
            try {
              const regex = new RegExp(`(${searchTerm.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
              nomeHighlight = nome.replace(regex, '<mark style="background: #fff3cd; padding: 1px 2px; border-radius: 2px; font-weight: bold;">$1</mark>');
              descricaoHighlight = descricaoHighlight.replace(regex, '<mark style="background: #fff3cd; padding: 1px 2px; border-radius: 2px; font-weight: bold;">$1</mark>');
            } catch (e) {
              console.error('Erro ao destacar termo:', e);
            }
          }
          
          return `
            <article class="receita-resultado" style="
              border: 1px solid #ddd; 
              padding: 20px; 
              margin: 15px 0; 
              border-radius: 8px; 
              background: white; 
              box-shadow: 0 2px 4px rgba(0,0,0,0.1);
              transition: all 0.3s ease;
              cursor: pointer;
            " 
            onmouseover="this.style.transform='translateY(-3px)'; this.style.boxShadow='0 4px 12px rgba(0,0,0,0.15)';" 
            onmouseout="this.style.transform='translateY(0)'; this.style.boxShadow='0 2px 4px rgba(0,0,0,0.1)';"
            onclick="window.location.href='receita.html?id=${id}'">
              
              <div style="display: flex; gap: 20px; align-items: flex-start;">
                <!-- Área da imagem -->
                <div style="flex-shrink: 0; width: 180px;">
                  ${imagem ? `
                    <img 
                      src="${imagem}" 
                      alt="${nome}" 
                      style="
                        width: 100%; 
                        height: 120px; 
                        object-fit: cover; 
                        border-radius: 8px;
                        border: 1px solid #e9ecef;
                      "
                      onerror="
                        this.style.display='none'; 
                        this.nextElementSibling.style.display='flex';
                        console.log('❌ Erro ao carregar imagem:', this.src);
                      "
                    >
                    <div style="
                      width: 100%; 
                      height: 120px; 
                      background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%); 
                      border-radius: 8px; 
                      display: none; 
                      align-items: center; 
                      justify-content: center; 
                      color: #6c757d;
                      font-size: 2.5em;
                      border: 1px solid #e9ecef;
                    ">🍽️</div>
                  ` : `
                    <div style="
                      width: 100%; 
                      height: 120px; 
                      background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%); 
                      border-radius: 8px; 
                      display: flex; 
                      align-items: center; 
                      justify-content: center; 
                      color: #6c757d;
                      font-size: 2.5em;
                      border: 1px solid #e9ecef;
                    ">🍽️</div>
                  `}
                </div>
                
                <!-- Área do conteúdo -->
                <div style="flex: 1; min-width: 0;">
                  <h3 style="
                    margin: 0 0 12px 0; 
                    color: #333; 
                    font-size: 1.5em; 
                    font-weight: bold;
                    line-height: 1.3;
                    word-wrap: break-word;
                  ">${nomeHighlight}</h3>
                  
                  <p style="
                    color: #666; 
                    margin: 0 0 15px 0; 
                    line-height: 1.6;
                    word-wrap: break-word;
                    font-size: 0.95em;
                  ">${descricaoHighlight}${descricao.length > 200 ? '...' : ''}</p>
                  
                  <div style="
                    display: flex; 
                    justify-content: space-between; 
                    align-items: center;
                    margin-top: 15px;
                  ">
                    <span style="
                      color: #007bff; 
                      font-weight: bold; 
                      background: #f8f9fa; 
                      padding: 6px 12px; 
                      border-radius: 4px; 
                      font-size: 0.9em;
                      border: 1px solid #dee2e6;
                    ">📖 Ver Receita Completa</span>
                    
                    <small style="color: #999; font-size: 0.8em;">
                      ${receita.created_at ? new Date(receita.created_at).toLocaleDateString('pt-BR') : ''}
                    </small>
                  </div>
                </div>
              </div>
            </article>
          `;
        }).join('');
        
        console.log('✅ Renderização concluída com sucesso');
        
      } else {
        container.innerHTML = `
          <div style="text-align: center; padding: 60px 20px; color: #666;">
            <div style="font-size: 5em; margin-bottom: 25px; opacity: 0.7;">🔍</div>
            <h3 style="margin-bottom: 15px; color: #333;">Nenhuma receita encontrada</h3>
            <p style="font-size: 1.1em; margin-bottom: 30px;">
              ${searchTerm ? `Não encontramos receitas com "${searchTerm}"` : 'Nenhuma receita disponível'}
            </p>
            
            <div style="
              background: #f8f9fa; 
              padding: 25px; 
              border-radius: 12px; 
              margin: 30px auto; 
              text-align: left; 
              display: inline-block;
              max-width: 500px;
              border: 1px solid #e9ecef;
            ">
              <h4 style="margin-top: 0; color: #495057;">💡 Dicas para melhorar sua busca:</h4>
              <ul style="margin: 15px 0; padding-left: 20px; line-height: 1.6;">
                <li>Verifique a ortografia das palavras</li>
                <li>Tente termos mais gerais (ex: "bolo" em vez de "bolo de chocolate triplo")</li>
                <li>Busque por ingredientes principais (ex: "banana", "chocolate", "farinha")</li>
                <li>Use palavras-chave simples e diretas</li>
              </ul>
            </div>
            
            <div style="margin-top: 30px;">
              <a href="index.html" style="
                color: #007bff; 
                text-decoration: none; 
                font-weight: bold; 
                background: white; 
                padding: 12px 24px; 
                border-radius: 6px; 
                display: inline-block;
                margin-right: 15px;
                border: 2px solid #007bff;
                transition: all 0.3s ease;
              " onmouseover="this.style.background='#007bff'; this.style.color='white';" onmouseout="this.style.background='white'; this.style.color='#007bff';">
                ← Voltar ao início
              </a>
              
              <button onclick="
                const input = document.getElementById('searchInput');
                if(input) { input.focus(); input.select(); }
              " style="
                background: #28a745; 
                color: white; 
                border: none; 
                padding: 12px 24px; 
                border-radius: 6px; 
                cursor: pointer;
                font-weight: bold;
                transition: background 0.3s ease;
              " onmouseover="this.style.background='#218838';" onmouseout="this.style.background='#28a745';">
                🔍 Nova busca
              </button>
            </div>
          </div>
        `;
      }
    };

    initResultadosPage();
  }

  // ==========================================================================
  // PÁGINA DE LOGIN (login.html)
  // ==========================================================================
  
  const loginForm = document.getElementById('loginForm');
  if (loginForm) {
    console.log('🔐 Configurando formulário de login...');
    
    loginForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      
      const submitButton = e.target.querySelector('button[type="submit"]');
      
      try {
        console.log('🔐 Iniciando processo de login...');
        
        if (submitButton) {
          setButtonLoading(submitButton, true, 'Entrando...');
        }
        
        const emailInput = document.getElementById('email');
        const senhaInput = document.getElementById('senha');
        
        if (!emailInput || !senhaInput) {
          throw new Error('Campos de email ou senha não encontrados');
        }
        
        const email = emailInput.value.trim();
        const senha = senhaInput.value;
        
        console.log('🔐 Dados do login:', { email, senhaLength: senha.length });
        
        // Validações
        if (!validators.required(email)) {
          throw new Error('Email é obrigatório');
        }
        
        if (!validators.email(email)) {
          throw new Error('Email inválido');
        }
        
        if (!validators.required(senha)) {
          throw new Error('Senha é obrigatória');
        }

        const loginData = {
          email: email,
          senha: senha
        };

        console.log('🔐 Enviando requisição de login...');

        const response = await apiRequest(`${CONFIG.ENDPOINTS.USUARIOS}?action=login`, {
          method: 'POST',
          body: JSON.stringify(loginData)
        });

        console.log('🔐 Resposta do servidor:', response);

        if (response.user) {
          // Login bem-sucedido
          console.log('✅ Login bem-sucedido:', response.user);
          AuthManager.login(response.user);
          
          // Redirecionar para home
          setTimeout(() => {
            window.location.href = 'index.html';
          }, 1500);
        } else {
          throw new Error(response.message || 'Dados de login inválidos');
        }
        
      } catch (error) {
        console.error('❌ Erro no login:', error);
        showNotification('Erro no login: ' + error.message, 'error');
      } finally {
        if (submitButton) {
          setButtonLoading(submitButton, false);
        }
      }
    });
  } else {
    console.log('🔐 Formulário de login não encontrado nesta página');
  }

  // ==========================================================================
  // PÁGINA DE CADASTRO (cadastro.html)
  // ==========================================================================
  
  const cadastroForm = document.getElementById('cadastroForm');
  if (cadastroForm) {
    cadastroForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      
      const submitButton = e.target.querySelector('button[type="submit"]') || e.target.querySelector('input[type="submit"]');
      
      try {
        if (submitButton) setButtonLoading(submitButton, true, 'Cadastrando...');
        
        // Obter dados do formulário - SEM HASH
        const nome = document.getElementById('nome').value.trim();
        const email = document.getElementById('email').value.trim();
        const senha = document.getElementById('senha').value; // SENHA EM TEXTO PLANO
        
        // Validações detalhadas
        if (!validators.required(nome)) {
          throw new Error('Nome é obrigatório');
        }
        
        if (!validators.minLength(nome, 2)) {
          throw new Error('Nome deve ter pelo menos 2 caracteres');
        }
        
        if (!validators.required(email)) {
          throw new Error('Email é obrigatório');
        }
        
        if (!validators.email(email)) {
          throw new Error('Email inválido');
        }
        
        if (!validators.required(senha)) {
          throw new Error('Senha é obrigatória');
        }
        
        if (!validators.minLength(senha, 6)) {
          throw new Error('Senha deve ter pelo menos 6 caracteres');
        }

        const cadastroData = {
          nome: nome,
          email: email,
          senha: senha // TEXTO PLANO - será hasheado no backend
        };

        const response = await apiRequest(CONFIG.ENDPOINTS.USUARIOS, {
          method: 'POST',
          body: JSON.stringify(cadastroData)
        });

        showNotification('Cadastro realizado com sucesso! Redirecionando para login...', 'success');
        
        setTimeout(() => {
          window.location.href = 'login.html';
        }, 2000);
        
      } catch (error) {
        console.error('❌ Erro no cadastro:', error);
        
        let errorMessage = error.message;
        if (errorMessage.includes('Email já cadastrado') || errorMessage.includes('Email já está em uso')) {
          errorMessage = 'Este email já está em uso. Tente fazer login ou use outro email.';
        } else if (errorMessage.includes('erro no servidor')) {
          errorMessage = 'Erro interno do servidor. Tente novamente em alguns instantes.';
        }
        
        showNotification('Erro no cadastro: ' + errorMessage, 'error');
      } finally {
        if (submitButton) setButtonLoading(submitButton, false);
      }
    });
  }

  // ==========================================================================
  // PÁGINA DA RECEITA (receita.html)
  // ==========================================================================
  
  if (window.location.pathname.endsWith('receita.html')) {
    const initReceitaPage = async () => {
      const urlParams = new URLSearchParams(window.location.search);
      const receitaId = urlParams.get('id');

      if (!receitaId) {
        showNotification('ID da receita não fornecido', 'error');
        return;
      }

      const receitaTitulo = document.getElementById('receitaTitulo');
      const receitaImagem = document.getElementById('receitaImagem');
      const receitaIngredientes = document.getElementById('receitaIngredientes');
      const receitaPreparo = document.getElementById('receitaPreparo');
      const listaComentarios = document.getElementById('listaComentarios');
      const comentarioForm = document.getElementById('comentarioForm');

      // Carregar detalhes da receita
      try {
        if (receitaTitulo) receitaTitulo.textContent = 'Carregando receita...';
        
        const receita = await apiRequest(`${CONFIG.ENDPOINTS.RECEITAS}?id=${encodeURIComponent(receitaId)}`);
        
        if (receita) {
          if (receitaTitulo) receitaTitulo.textContent = receita.nome;
          if (receitaImagem) {
            receitaImagem.src = receita.imagem || './imagens/placeholder.png';
            receitaImagem.alt = receita.nome;
            receitaImagem.style.display = 'block';
          }
          if (receitaIngredientes) receitaIngredientes.textContent = receita.descricao;
          if (receitaPreparo) receitaPreparo.textContent = receita.descricao;
        } else {
          throw new Error('Receita não encontrada');
        }
      } catch (error) {
        console.error('❌ Erro ao carregar receita:', error);
        if (receitaTitulo) receitaTitulo.textContent = 'Erro ao carregar receita';
        if (receitaImagem) receitaImagem.style.display = 'none';
                if (receitaIngredientes) receitaIngredientes.textContent = 'Erro ao carregar detalhes';
        if (receitaPreparo) receitaPreparo.textContent = 'Erro ao carregar detalhes';
        showNotification('Erro ao carregar receita: ' + error.message, 'error');
      }

      // Carregar comentários
      const loadComentarios = async () => {
        if (!listaComentarios) return;
        
        try {
          listaComentarios.innerHTML = '<li style="color: #666;">🔄 Carregando comentários...</li>';
          
          console.log('📝 Carregando comentários para receita ID:', receitaId);
          
          const comentarios = await apiRequest(`${CONFIG.ENDPOINTS.COMENTARIOS}?receitaId=${encodeURIComponent(receitaId)}`);
          
          console.log('📝 Comentários recebidos:', comentarios);
          
          if (comentarios && comentarios.length > 0) {
            const comentariosHTML = comentarios.map((comentario, index) => {
              console.log(`📝 Processando comentário ${index + 1}:`, comentario);
              
              // Usar o nome que vem do banco ou fallback
              const userName = comentario.usuario_nome || `Usuário ${comentario.usuarioId}`;
              const conteudoComentario = comentario.conteudo || 'Comentário vazio';
              
              const commentDate = comentario.created_at ? 
                new Date(comentario.created_at).toLocaleDateString('pt-BR', {
                  day: '2-digit',
                  month: '2-digit', 
                  year: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit'
                }) : '';
              
              return `
                <li style="
                  background: #f9f9f9;
                  border-radius: 8px;
                  padding: 15px;
                  margin: 10px 0;
                  border-left: 4px solid #ff6600;
                ">
                  <div style="
                    display: flex; 
                    justify-content: space-between; 
                    align-items: center; 
                    margin-bottom: 8px;
                    border-bottom: 1px solid #ddd;
                    padding-bottom: 5px;
                  ">
                    <strong style="color: #ff6600; font-size: 1.1em;">👤 ${userName}</strong>
                    ${commentDate ? `<span style="color: #666; font-size: 0.9em;">📅 ${commentDate}</span>` : ''}
                  </div>
                  <div style="
                    color: #333; 
                    line-height: 1.6;
                    font-size: 1rem;
                    margin-top: 8px;
                    word-wrap: break-word;
                  ">${conteudoComentario}</div>
                </li>
              `;
            }).join('');
            
            listaComentarios.innerHTML = comentariosHTML;
            console.log('✅ Comentários renderizados com sucesso');
            
          } else {
            listaComentarios.innerHTML = `
              <li style="
                color: #666; 
                text-align: center; 
                padding: 30px;
                background: #f8f9fa;
                border-radius: 8px;
                margin: 10px 0;
              ">
                💬 Nenhum comentário ainda. Seja o primeiro a comentar!
              </li>
            `;
          }
        } catch (error) {
          console.error('❌ Erro ao carregar comentários:', error);
          listaComentarios.innerHTML = `
            <li style="color: #f44336; text-align: center; padding: 20px;">
              ❌ Erro ao carregar comentários: ${error.message}
            </li>
          `;
        }
      };

      await loadComentarios();

      // Form de comentários
      if (comentarioForm) {
        comentarioForm.addEventListener('submit', async (e) => {
          e.preventDefault();
          
          if (!AuthManager.requireAuth()) return;
          
          const submitButton = e.target.querySelector('button[type="submit"]') || e.target.querySelector('input[type="submit"]');
          const conteudoInput = document.getElementById('conteudoComentario');
          
          try {
            if (submitButton) setButtonLoading(submitButton, true, 'Enviando...');
            
            const conteudo = conteudoInput ? conteudoInput.value.trim() : '';
            const usuarioId = localStorage.getItem('user_id');
            
            console.log('📝 Enviando comentário:', {
              conteudo,
              usuarioId,
              receitaId
            });
            
            if (!validators.required(conteudo)) {
              throw new Error('Por favor, escreva um comentário');
            }
            
            if (conteudo.length < 3) {
              throw new Error('Comentário deve ter pelo menos 3 caracteres');
            }
            
            if (!usuarioId) {
              throw new Error('Usuário não está logado');
            }

            const comentarioData = {
              receitaId: parseInt(receitaId),
              usuarioId: parseInt(usuarioId),
              conteudo: conteudo
            };
            
            console.log('📝 Dados do comentário a serem enviados:', comentarioData);

            const response = await apiRequest(CONFIG.ENDPOINTS.COMENTARIOS, {
              method: 'POST',
              body: JSON.stringify(comentarioData)
            });
            
            console.log('📝 Resposta da API:', response);

            showNotification('Comentário adicionado com sucesso! 🎉', 'success');
            
            if (conteudoInput) conteudoInput.value = '';
            
            // Aguardar um pouco antes de recarregar para dar tempo da API processar
            setTimeout(async () => {
              await loadComentarios();
            }, 500);
            
          } catch (error) {
            console.error('❌ Erro ao enviar comentário:', error);
            showNotification('Erro ao enviar comentário: ' + error.message, 'error');
          } finally {
            if (submitButton) setButtonLoading(submitButton, false);
          }
        });
      }
    };

    initReceitaPage();
  }

  // ==========================================================================
  // ADICIONAR RECEITA (index.html - formulário)
  // ==========================================================================
  
  const addReceitaForm = document.getElementById('addReceitaForm');
  if (addReceitaForm) {
    console.log('📝 Formulário de receita encontrado, configurando eventos...');
    
    addReceitaForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      console.log('📤 Iniciando envio de receita...');

      if (!AuthManager.requireAuth()) return;

      const submitButton = e.target.querySelector('button[type="submit"]') || e.target.querySelector('input[type="submit"]');
      
      try {
        if (submitButton) setButtonLoading(submitButton, true, 'Enviando...');

        // Criar FormData para suportar upload de arquivos
        const formData = new FormData();
        
        // Obter dados do formulário
        const nome = document.getElementById('nomeReceita')?.value.trim() || 
                     document.getElementById('nome')?.value.trim() || '';
        const descricao = document.getElementById('descricaoReceita')?.value.trim() || 
                         document.getElementById('descricao')?.value.trim() || '';
        const imagemUrl = document.getElementById('imagemUrl')?.value.trim() || '';
        const imagemFile = document.getElementById('imagemFile')?.files[0];
        
        console.log('📋 Dados coletados:', { nome, descricao, imagemUrl, imagemFile: !!imagemFile });
        
        // Validações
        if (!validators.required(nome)) {
          throw new Error('Nome da receita é obrigatório');
        }
        
        if (!validators.minLength(nome, 3)) {
          throw new Error('Nome da receita deve ter pelo menos 3 caracteres');
        }
        
        if (!validators.required(descricao)) {
          throw new Error('Descrição da receita é obrigatória');
        }
        
        if (!validators.minLength(descricao, 10)) {
          throw new Error('Descrição deve ter pelo menos 10 caracteres');
        }

        // Adicionar dados básicos ao FormData
        formData.append('nome', nome);
        formData.append('descricao', descricao);
        
        // Processar imagem
        if (imagemFile) {
          console.log('📁 Processando arquivo:', imagemFile.name);
          
          // Validar arquivo no frontend
          const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
          const maxSize = 5 * 1024 * 1024; // 5MB
          
          if (!allowedTypes.includes(imagemFile.type.toLowerCase())) {
            throw new Error('Tipo de arquivo não permitido. Use: JPG, PNG, GIF ou WebP');
          }
          
          if (imagemFile.size > maxSize) {
            throw new Error('Arquivo muito grande. Máximo: 5MB');
          }
          
          formData.append('imagem', imagemFile);
          console.log('📁 Arquivo adicionado ao FormData');
          
        } else if (imagemUrl) {
          console.log('🔗 Usando URL da imagem:', imagemUrl);
          
          // Validar URL da imagem
          if (!imagemUrl.match(/^https?:\/\/.+/)) {
            throw new Error('URL da imagem deve começar com http:// ou https://');
          }
          
          formData.append('imagemUrl', imagemUrl);
        } else {
          console.log('📷 Nenhuma imagem fornecida');
        }

        console.log('📤 Enviando dados para API...');

        // Fazer requisição
        const response = await fetch(`${CONFIG.API_BASE_URL}${CONFIG.ENDPOINTS.RECEITAS}`, {
          method: 'POST',
          body: formData
          // NÃO definir Content-Type para FormData - o navegador define automaticamente
        });

        console.log('📡 Resposta recebida:', response.status, response.statusText);

        if (!response.ok) {
          const errorText = await response.text();
          console.error('❌ Erro da API:', errorText);
          throw new Error(`Erro ${response.status}: ${errorText}`);
        }

        const result = await response.json();
        console.log('✅ Resultado:', result);
        
        if (result.imagem_url) {
          console.log('📷 Imagem salva em:', result.imagem_url);
        }

        showNotification('Receita adicionada com sucesso! 🎉', 'success');
        
        // Limpar formulário
        addReceitaForm.reset();
        
        // Limpar preview de imagem
        const preview = document.getElementById('imagemPreview');
        if (preview) {
          preview.style.display = 'none';
          preview.innerHTML = '';
        }
        
        // Reabilitar campos
        const imagemFileInput = document.getElementById('imagemFile');
        const imagemUrlInput = document.getElementById('imagemUrl');
        if (imagemFileInput) {
          imagemFileInput.disabled = false;
          imagemFileInput.style.opacity = '1';
        }
        if (imagemUrlInput) {
          imagemUrlInput.disabled = false;
          imagemUrlInput.style.opacity = '1';
        }
        
        // Limpar cache
        cache.delete('receitas_latest');
        
        // Recarregar receitas se estivermos na página inicial
        if (window.location.pathname.endsWith('index.html') || window.location.pathname === '/') {
          setTimeout(() => {
            if (typeof loadLatestReceitas === 'function') {
              loadLatestReceitas();
            }
          }, 1000);
        }
        
      } catch (error) {
        console.error('❌ Erro completo:', error);
        showNotification('Erro ao adicionar receita: ' + error.message, 'error');
      } finally {
        if (submitButton) setButtonLoading(submitButton, false);
      }
    });

    // Configurar preview de imagem
    const imagemFileInput = document.getElementById('imagemFile');
    if (imagemFileInput) {
      console.log('📁 Configurando preview de arquivo...');
      
      imagemFileInput.addEventListener('change', (e) => {
        const file = e.target.files[0];
        const preview = document.getElementById('imagemPreview') || createImagePreview();
        
        console.log('📁 Arquivo selecionado:', file?.name || 'Nenhum');
        
        if (file) {
          // Validações
          const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
          const maxSize = 5 * 1024 * 1024; // 5MB
          
          if (!allowedTypes.includes(file.type.toLowerCase())) {
            showNotification('❌ Tipo de arquivo não permitido. Use: JPG, PNG, GIF ou WebP', 'error');
            e.target.value = '';
            preview.style.display = 'none';
            return;
          }
          
          if (file.size > maxSize) {
            showNotification('❌ Arquivo muito grande. Máximo: 5MB', 'error');
            e.target.value = '';
            preview.style.display = 'none';
            return;
          }
          
          // Mostrar preview
          const reader = new FileReader();
          reader.onload = (event) => {
            preview.innerHTML = `
              <div style="
                border: 2px solid #007bff;
                border-radius: 8px;
                padding: 15px;
                text-align: center;
                background: #f8f9fa;
                margin: 10px 0;
              ">
                <div style="margin-bottom: 10px;">
                  <img 
                    src="${event.target.result}" 
                    alt="Preview" 
                    style="
                      max-width: 200px;
                      max-height: 150px;
                      border-radius: 5px;
                      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
                    "
                  >
                </div>
                <div style="margin-bottom: 10px; font-size: 0.9em; color: #666;">
                  <strong>📁 ${file.name}</strong><br>
                  📊 Tamanho: ${(file.size / 1024 / 1024).toFixed(2)} MB
                </div>
                <button 
                  type="button" 
                  onclick="removeImagePreview()"
                  style="
                    background: #dc3545;
                    color: white;
                    border: none;
                    padding: 6px 12px;
                    border-radius: 4px;
                    cursor: pointer;
                    font-size: 0.9em;
                  "
                >
                  🗑️ Remover Imagem
                </button>
              </div>
            `;
            preview.style.display = 'block';
          };
          reader.readAsDataURL(file);
          
          // Desabilitar URL quando arquivo é selecionado
          const imagemUrl = document.getElementById('imagemUrl');
          if (imagemUrl) {
            imagemUrl.disabled = true;
            imagemUrl.style.opacity = '0.5';
            imagemUrl.value = '';
          }
          
        } else {
          preview.style.display = 'none';
          
          // Reabilitar URL
          const imagemUrl = document.getElementById('imagemUrl');
          if (imagemUrl) {
            imagemUrl.disabled = false;
            imagemUrl.style.opacity = '1';
          }
        }
      });
    }

    // Configurar campo URL
    const imagemUrlInput = document.getElementById('imagemUrl');
    if (imagemUrlInput) {
      console.log('🔗 Configurando campo URL...');
      
      imagemUrlInput.addEventListener('input', (e) => {
        const url = e.target.value.trim();
        const imagemFile = document.getElementById('imagemFile');
        
        if (url) {
          // Desabilitar upload de arquivo
          if (imagemFile) {
            imagemFile.disabled = true;
            imagemFile.style.opacity = '0.5';
            imagemFile.value = '';
            
            // Limpar preview
            const preview = document.getElementById('imagemPreview');
            if (preview) {
              preview.style.display = 'none';
            }
          }
        } else {
          // Reabilitar upload de arquivo
          if (imagemFile) {
            imagemFile.disabled = false;
            imagemFile.style.opacity = '1';
          }
        }
      });
    }
  }

  // ==========================================================================
  // CARREGAR RECEITAS RECENTES (index.html)
  // ==========================================================================
  
  const loadLatestReceitas = async () => {
    const receitasContainer = document.getElementById('receitasRecentes');
    if (!receitasContainer) return;

    try {
      const cacheKey = 'receitas_latest';
      const cached = cache.get(cacheKey);
      if (cached && (Date.now() - cached.timestamp) < CACHE_DURATION) {
        renderReceitasRecentes(cached.data, receitasContainer);
        return;
      }

      receitasContainer.innerHTML = '<p>🔄 Carregando receitas recentes...</p>';
      
      const receitas = await apiRequest(CONFIG.ENDPOINTS.RECEITAS);
      
      cache.set(cacheKey, {
        data: receitas,
        timestamp: Date.now()
      });
      
      renderReceitasRecentes(receitas, receitasContainer);
      
    } catch (error) {
      console.error('❌ Erro ao carregar receitas recentes:', error);
      receitasContainer.innerHTML = '<p style="color: #f44336;">❌ Erro ao carregar receitas</p>';
    }
  };

  const renderReceitasRecentes = (receitas, container) => {
    if (receitas && receitas.length > 0) {
      const receitasLimitadas = receitas.slice(0, 6);
      container.innerHTML = receitasLimitadas.map(receita => `
        <div style="border: 1px solid #ddd; border-radius: 8px; padding: 15px; margin: 10px; background: white; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
          ${receita.imagem ? `<img src="${receita.imagem}" alt="${receita.nome}" style="width: 100%; height: 150px; object-fit: cover; border-radius: 5px; margin-bottom: 10px;">` : ''}
          <h4 style="margin: 0 0 8px 0; color: #333;">${receita.nome}</h4>
                    <p style="color: #666; margin: 0 0 10px 0; font-size: 0.9em;">${receita.descricao ? receita.descricao.substring(0, 100) + '...' : ''}</p>
          <a href="receita.html?id=${receita.id}" style="color: #007bff; text-decoration: none; font-weight: bold;">Ver Receita →</a>
        </div>
      `).join('');
    } else {
      container.innerHTML = '<p style="color: #666; text-align: center;">📝 Nenhuma receita encontrada</p>';
    }
  };

  // ==========================================================================
  // FUNÇÕES UTILITÁRIAS GLOBAIS
  // ==========================================================================
  
  // Função global para remover preview
  window.removeImagePreview = function() {
    const preview = document.getElementById('imagemPreview');
    const imagemFile = document.getElementById('imagemFile');
    const imagemUrl = document.getElementById('imagemUrl');
    
    if (preview) {
      preview.style.display = 'none';
      preview.innerHTML = '';
    }
    
    if (imagemFile) {
      imagemFile.value = '';
    }
    
    // Reabilitar ambos os campos
    if (imagemFile) {
      imagemFile.disabled = false;
      imagemFile.style.opacity = '1';
    }
    if (imagemUrl) {
      imagemUrl.disabled = false;
      imagemUrl.style.opacity = '1';
    }
  };

  // Função para criar preview se não existir
  function createImagePreview() {
    let preview = document.getElementById('imagemPreview');
    if (!preview) {
      preview = document.createElement('div');
      preview.id = 'imagemPreview';
      preview.style.display = 'none';
      
      const imagemFile = document.getElementById('imagemFile');
      const imagemUrl = document.getElementById('imagemUrl');
      const insertAfter = imagemFile || imagemUrl;
      
      if (insertAfter && insertAfter.parentNode) {
        insertAfter.parentNode.insertBefore(preview, insertAfter.nextSibling);
      }
    }
    return preview;
  }

  window.goToReceita = (id) => {
    if (id) {
      window.location.href = `receita.html?id=${id}`;
    }
  };

  window.clearCache = () => {
    cache.clear();
    showNotification('Cache limpo com sucesso!', 'info');
  };

  // ==========================================================================
  // INICIALIZAÇÃO DA APLICAÇÃO
  // ==========================================================================
  
  const initApp = async () => {
    try {
      console.log('🚀 Inicializando aplicação...');
      
      // Atualizar interface baseada no login
      updateUserInterface();
      
      // Carregar dados necessários
      await loadCategoriasMenu();
      
      // Carregar receitas na página inicial
      if (window.location.pathname.endsWith('index.html') || 
          window.location.pathname === '/' || 
          window.location.pathname.endsWith('/')) {
        await loadLatestReceitas();
      }
      
      console.log('✅ Aplicação inicializada com sucesso');
      
    } catch (error) {
      console.error('❌ Erro na inicialização da aplicação:', error);
      showNotification('Erro na inicialização da aplicação', 'error');
    }
  };

  // Debug para desenvolvimento
  if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
    window.DEBUG = {
      apiRequest,
      AuthManager,
      cache,
      showNotification,
      CONFIG
    };
    console.log('🔧 Modo debug ativado. Use window.DEBUG para acessar funções de desenvolvimento.');
  }

  // Inicializar aplicação
  initApp();
  console.log('📱 Sistema Sabor Digital carregado com sucesso!');
});

// ==========================================================================
// ESTILOS CSS PARA NOTIFICAÇÕES (fora do DOMContentLoaded)
// ==========================================================================

if (!document.getElementById('notification-styles')) {
  const style = document.createElement('style');
  style.id = 'notification-styles';
  style.textContent = `
    .notification {
      animation: slideInRight 0.3s ease-out;
    }
    
    .notification:hover {
      transform: translateX(-5px);
      transition: transform 0.2s ease;
    }
    
    @keyframes slideInRight {
      from {
        transform: translateX(100%);
        opacity: 0;
      }
      to {
        transform: translateX(0);
        opacity: 1;
      }
    }
    
    .notification-close:hover {
      background-color: rgba(255,255,255,0.2) !important;
      border-radius: 50%;
    }
    
    .loading-spinner {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 10px;
      color: #666;
    }
    
    .spinner {
      width: 20px;
      height: 20px;
      border: 2px solid #f3f3f3;
      border-top: 2px solid #007bff;
      border-radius: 50%;
      animation: spin 1s linear infinite;
    }
    
    @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }
  `;
  document.head.appendChild(style);
}