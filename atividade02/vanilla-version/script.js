// Selecionar elementos
const loginForm = document.getElementById('loginForm');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const rememberCheckbox = document.getElementById('remember');

// Carregar dados salvos (se existir)
window.addEventListener('DOMContentLoaded', () => {
    const savedEmail = localStorage.getItem('rememberedEmail');
    if (savedEmail) {
        emailInput.value = savedEmail;
        rememberCheckbox.checked = true;
    }
});

// Função de validação
function validateForm(email, password) {
    const errors = [];

    // Validar e-mail
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        errors.push('E-mail inválido');
    }

    // Validar senha
    if (password.length < 6) {
        errors.push('A senha deve ter no mínimo 6 caracteres');
    }

    return errors;
}

// Função para exibir mensagem
function showMessage(message, type = 'error') {
    // Remover mensagem anterior se existir
    const oldMessage = document.querySelector('.message');
    if (oldMessage) {
        oldMessage.remove();
    }

    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${type}`;
    messageDiv.textContent = message;
    messageDiv.style.cssText = `
        padding: 12px;
        margin-bottom: 20px;
        border: 2px solid #000000;
        background-color: ${type === 'success' ? '#e8f5e9' : '#ffebee'};
        color: #000000;
        text-align: center;
        font-weight: 600;
    `;

    loginForm.insertBefore(messageDiv, loginForm.firstChild);

    // Remover mensagem após 3 segundos
    setTimeout(() => {
        messageDiv.remove();
    }, 3000);
}

// Evento de submit do formulário
loginForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const email = emailInput.value.trim();
    const password = passwordInput.value;
    const remember = rememberCheckbox.checked;

    // Validar formulário
    const errors = validateForm(email, password);

    if (errors.length > 0) {
        showMessage(errors.join('. '), 'error');
        return;
    }

    // Salvar e-mail se "Lembrar-me" estiver marcado
    if (remember) {
        localStorage.setItem('rememberedEmail', email);
    } else {
        localStorage.removeItem('rememberedEmail');
    }

    // Simular login (aqui você faria a requisição para o backend)
    console.log('Login realizado:', { email, password });
    showMessage('Login realizado com sucesso!', 'success');

    // Limpar formulário
    setTimeout(() => {
        passwordInput.value = '';
        // Aqui você redirecionaria para o dashboard
        console.log('Redirecionando para o dashboard...');
    }, 1500);
});

// Botão de registro
const btnRegister = document.querySelector('.btn-register');
btnRegister.addEventListener('click', () => {
    console.log('Redirecionando para página de registro...');
    showMessage('Funcionalidade de registro em desenvolvimento', 'error');
});

// Link "Esqueceu a senha"
const forgotPassword = document.querySelector('.forgot-password');
forgotPassword.addEventListener('click', (e) => {
    e.preventDefault();
    console.log('Redirecionando para recuperação de senha...');
    showMessage('Funcionalidade de recuperação de senha em desenvolvimento', 'error');
});