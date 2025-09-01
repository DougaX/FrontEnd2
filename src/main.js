import './style.css'
import javascriptLogo from './javascript.svg'
import viteLogo from '/vite.svg'
import './dashboard.js'

document.querySelector('#app').innerHTML = `
  <div class="sidebar" id="sidebar">
  <a href="#" class="close-btn" onclick="toggleMenu()">×</a>

  <div class="menu-grupo">
    <button class="menu-titulo" onclick="toggleSubmenu('submenu1')">Pratos ▾</button>
    <ul id="submenu1" class="submenu">
      <li><a href="resultado.html?categoria=arroz">Arroz</a></li>
      <li><a href="resultado.html?categoria=feijao">Feijão</a></li>
      <li><a href="resultado.html?categoria=peixes">Peixes</a></li>
      <li><a href="resultado.html?categoria=aves">Aves</a></li>
      <li><a href="resultado.html?categoria=saladas">Saladas e Molhos</a></li>
      <li><a href="resultado.html?categoria=sopas">Sopas</a></li>
      <li><a href="resultado.html?categoria=massas">Massas</a></li>
      <li><a href="resultado.html?categoria=lanches">Lanches</a></li>
      <li><a href="resultado.html?categoria=saudavel">Saudável</a></li>
    </ul>
  </div>

  <div class="menu-grupo">
    <button class="menu-titulo" onclick="toggleSubmenu('submenu2')">Sobremesas ▾</button>
    <ul id="submenu2" class="submenu">
      <li><a href="resultado.html?categoria=bolos">Bolos</a></li>
      <li><a href="resultado.html?categoria=doces">Doces</a></li>
      <li><a href="resultado.html?categoria=gelados">Gelados</a></li>
    </ul>
  </div>

  <div class="menu-grupo">
    <button class="menu-titulo" onclick="toggleSubmenu('submenu3')">Bebidas ▾</button>
    <ul id="submenu3" class="submenu">
      <li><a href="resultado.html?categoria=sumos">Sumos</a></li>
      <li><a href="resultado.html?categoria=cocktails">Cocktails</a></li>
    </ul>
  </div>

  <!-- Nova seção para Categorias Dinâmicas -->
  <div class="menu-grupo">
    <button class="menu-titulo" onclick="toggleSubmenu('submenuCategorias')">Outras Categorias ▾</button>
    <ul id="submenuCategorias" class="submenu">
      <!-- Categorias serão carregadas aqui via JavaScript -->
    </ul>
  </div>
</div>

<!-- CABEÇALHO -->
<header>
  <button class="menu-btn" onclick="toggleMenu()">☰</button>
  <a href="index.html" class="home-icon">🏠</a>
  <div class="search-bar">
    <input type="text" id="searchInput" placeholder="Pesquisar receitas...">
    <span class="search-icon" id="searchIcon">🔍</span>
  </div>
  
  <!-- Link de login (quando não logado) -->
  <a href="login.html" class="login-link">Login</a>
  
  <!-- Menu de usuário (quando logado) -->
  <div class="user-menu auth-required">
    <div class="user-info" onclick="toggleUserMenu()">
      <span>👤</span>
      <span class="user-name">Usuário</span>
      <span>▾</span>
    </div>
    <div class="user-dropdown" id="userDropdown">
      <a href="#" onclick="showUserProfile()">👤 Meu Perfil</a>
      <a href="#" onclick="showUserRecipes()">📝 Minhas Receitas</a>
      <a href="#" onclick="logout()" class="logout-btn">🚪 Sair</a>
    </div>
  </div>
</header>

<!-- CONTEÚDO PRINCIPAL -->
<main>

  <!-- Carrossel de receitas em destaque -->
<section class="receitas-slider">
  <div class="slider" id="slider">
    <!-- 4 slides originais -->
    <div class="slide">
      <img src="../imagens/cenoura.png" alt="Bolo de Cenoura com Cobertura">
      <h3>Bolo de Cenoura com Cobertura</h3>
    </div>
    <div class="slide">
      <img src="../imagens/feijoada.png" alt="Feijoada Completa">
      <h3>Feijoada Completa</h3>
    </div>
    <div class="slide">
      <img src="../imagens/moqueca.png" alt="Moqueca de Camarão">
      <h3>Moqueca de Camarão</h3>
    </div>
    <div class="slide">
      <img src="../imagens/escondidinho.png" alt="Escondidinho de Carne Seca">
      <h3>Escondidinho de Carne Seca</h3>
    </div>
    
    <!-- 4 slides duplicados para loop infinito -->
    <div class="slide">
      <img src="../imagens/cenoura.png" alt="Bolo de Cenoura com Cobertura">
      <h3>Bolo de Cenoura com Cobertura</h3>
    </div>
    <div class="slide">
      <img src="../imagens/feijoada.png" alt="Feijoada Completa">
      <h3>Feijoada Completa</h3>
    </div>
    <div class="slide">
      <img src="../imagens/moqueca.png" alt="Moqueca de Camarão">
      <h3>Moqueca de Camarão</h3>
    </div>
    <div class="slide">
      <img src="../imagens/escondidinho.png" alt="Escondidinho de Carne Seca">
      <h3>Escondidinho de Carne Seca</h3>
    </div>
  </div>
</section>

  <!-- Seção de Notícias com Imagens -->
  <section class="noticias">
  <h2>Novidades e Dicas</h2>
  <div class="noticia-grid">
    <article class="noticia">
      <div class="noticia-imagem">
        <img src="../imagens/culinaria-italiana.jpg" alt="Culinária Italiana" onerror="this.style.background='linear-gradient(135deg, #ff6600 0%, #ff8533 100%)'; this.innerHTML='🍝'; this.style.display='flex'; this.style.alignItems='center'; this.style.justifyContent='center'; this.style.fontSize='3rem'; this.style.color='white';">
      </div>
      <div class="noticia-conteudo">
        <h3>Descubra os Segredos da Culinária Italiana</h3>
        <p>Aprenda a preparar massas frescas e molhos autênticos que vão transformar suas refeições em uma festa de sabores mediterrâneos.</p>
        <a href="#">Leia Mais</a>
      </div>
    </article>
    
    <article class="noticia">
      <div class="noticia-imagem">
        <img src="../imagens/dicas-cozinha.jpg" alt="Dicas de Cozinha" onerror="this.style.background='linear-gradient(135deg, #ff6600 0%, #ff8533 100%)'; this.innerHTML='👨‍🍳'; this.style.display='flex'; this.style.alignItems='center'; this.style.justifyContent='center'; this.style.fontSize='3rem'; this.style.color='white';">
      </div>
      <div class="noticia-conteudo">
        <h3>10 Dicas Essenciais para Cozinheiros Iniciantes</h3>
        <p>Desde o corte de vegetais até o tempero perfeito, domine o básico e cozinhe com confiança e técnica.</p>
        <a href="#">Leia Mais</a>
      </div>
    </article>
    
    <article class="noticia">
      <div class="noticia-imagem">
        <img src="../imagens/receitas-veganas.jpg" alt="Receitas Veganas" onerror="this.style.background='linear-gradient(135deg, #ff6600 0%, #ff8533 100%)'; this.innerHTML='🥗'; this.style.display='flex'; this.style.alignItems='center'; this.style.justifyContent='center'; this.style.fontSize='3rem'; this.style.color='white';">
      </div>
      <div class="noticia-conteudo">
        <h3>Receitas Veganas Rápidas para o Dia a Dia</h3>
        <p>Explore opções deliciosas e nutritivas que provam que a culinária vegana é muito mais do que salada.</p>
        <a href="#">Leia Mais</a>
      </div>
    </article>
  </div>
</section>

  <!-- FORMULÁRIO DE ADICIONAR RECEITA -->
  <aside class="add-receita-form-container">
    <h4>Adicionar Nova Receita</h4>
    <!-- Formulário para adicionar receita -->
    <form id="addReceitaForm" enctype="multipart/form-data" style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
      <h3 style="margin-top: 0; color: #333;">➕ Adicionar Nova Receita</h3>
      
      <div style="margin-bottom: 15px;">
        <label for="nomeReceita" style="display: block; margin-bottom: 5px; font-weight: bold;">Nome da Receita *</label>
        <input 
          type="text" 
          id="nomeReceita" 
          name="nome"
          required 
          style="width: 100%; padding: 10px; border: 1px solid #ddd; border-radius: 4px; box-sizing: border-box;"
          placeholder="Ex: Bolo de Chocolate"
        >
      </div>
      
      <div style="margin-bottom: 15px;">
        <label style="display: block; margin-bottom: 10px; font-weight: bold;">Imagem da Receita</label>
        
        <!-- Opção 1: Upload de arquivo -->
        <div style="margin-bottom: 10px;">
          <label for="imagemFile" style="display: block; margin-bottom: 5px; color: #666;">📁 Enviar arquivo (JPG, PNG, GIF, WebP - máx. 5MB)</label>
          <input 
            type="file" 
            id="imagemFile" 
            name="imagem"
            accept="image/jpeg,image/jpg,image/png,image/gif,image/webp"
            style="width: 100%; padding: 8px; border: 1px solid #ddd; border-radius: 4px; box-sizing: border-box;"
          >
        </div>
        
        <!-- OU -->
        <div style="text-align: center; margin: 10px 0; color: #999;">
          <span style="background: #f8f9fa; padding: 0 10px;">OU</span>
        </div>
        
        <!-- Opção 2: URL da imagem -->
        <div style="margin-bottom: 10px;">
          <label for="imagemUrl" style="display: block; margin-bottom: 5px; color: #666;">🔗 URL da imagem</label>
          <input 
            type="url" 
            id="imagemUrl" 
            name="imagemUrl"
            style="width: 100%; padding: 10px; border: 1px solid #ddd; border-radius: 4px; box-sizing: border-box;"
            placeholder="https://exemplo.com/imagem.jpg"
          >
        </div>
        
        <!-- Preview da imagem -->
        <div id="imagemPreview" style="display: none;"></div>
      </div>
      
      <div style="margin-bottom: 15px;">
        <label for="descricaoReceita" style="display: block; margin-bottom: 5px; font-weight: bold;">Ingredientes e Modo de Preparo *</label>
        <textarea 
          id="descricaoReceita" 
          name="descricao"
          required 
          rows="6"
          style="width: 100%; padding: 10px; border: 1px solid #ddd; border-radius: 4px; box-sizing: border-box; resize: vertical;"
          placeholder="Ingredientes:
- 3 ovos
- 2 xícaras de farinha
- 1 xícara de açúcar
- 1/2 xícara de chocolate em pó

Modo de preparo:
1. Misture todos os ingredientes secos
2. Adicione os ovos e misture bem
3. Leve ao forno por 30 minutos a 180°C"
        ></textarea>
      </div>
      
      <button 
        type="submit" 
        style="
          background: #28a745; 
          color: white; 
          border: none; 
          padding: 12px 24px; 
          border-radius: 5px; 
          cursor: pointer; 
          font-weight: bold;
          width: 100%;
          font-size: 1.1em;
        "
      >
        ➕ Adicionar Receita
      </button>
      
      <small style="display: block; margin-top: 10px; color: #666; text-align: center;">
        * Campos obrigatórios
      </small>
    </form>
  </aside>

</main>

<!-- RODAPÉ -->
<footer>
  &copy; 2025 Receitas Gostosas • Todos os direitos reservados
</footer>
`

setupCounter(document.querySelector('#counter'))
