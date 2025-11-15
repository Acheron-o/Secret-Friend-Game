// Estado da aplicação
let players = [];
let currentLang = localStorage.getItem('secretFriendLang') || 'pt';
let translations = {};

// Sons
const sounds = {
    add: new Audio('assets/sounds/general sound.mp3'),
    draw: new Audio('assets/sounds/Draw.mp3')
};

// Elementos DOM Principais
const elInput = document.getElementById('friend');
const elList = document.getElementById('friendsList');
const elResult = document.getElementById('result');
const elResetBtn = document.getElementById('btn-reset');

// Elementos do Modal de Alerta
const alertModal = document.getElementById('custom-alert');
const alertImg = document.getElementById('alert-img');
const alertMsg = document.getElementById('alert-msg');

// Map das imagens para cada tipo de erro (Certifique-se que os arquivos estão em assets/icons/)
const alertImages = {
    invalid: 'assets/icons/valido.png',     // Gatinho do peixe
    duplicate: 'assets/icons/repetido.png', // Gatinho no copo
    limit: 'assets/icons/limite.png'        // Gatinho azul (limite)
};

// ===================================
// 🎮 Lógica do Jogo
// ===================================

function addFriend() {
    const name = elInput.value.trim();

    // Erro 1: Nome vazio
    if (!name) {
        showCustomAlert(getText('invalid_name'), 'invalid');
        return;
    }

    // Erro 2: Nome duplicado
    if (players.includes(name)) {
        showCustomAlert(getText('duplicate_name'), 'duplicate');
        return;
    }

    // Sucesso
    playSound('add');
    players.push(name);
    elInput.value = "";
    updateUI();
    elInput.focus();
}

function updateUI() {
    elList.innerHTML = "";
    players.forEach(friend => {
        const li = document.createElement('li');
        li.textContent = friend;
        elList.appendChild(li);
    });
    
    // Habilita reset apenas se houver dados
    elResetBtn.disabled = players.length === 0 && elResult.innerHTML === "";
}

function drawFriend() {
    // Erro 3: Menos de 2 amigos
    if (players.length < 2) {
        showCustomAlert(getText('min_friends'), 'limit');
        return;
    }

    playSound('draw');
    
    const randomIndex = Math.floor(Math.random() * players.length);
    const secretFriend = players[randomIndex];

    elResult.innerHTML = `<li>🎉 ${secretFriend} 🎉</li>`;
    elList.innerHTML = ""; // Limpa lista visual para suspense
    players = []; // Reseta array
    
    elResetBtn.disabled = false;
}

function resetGame() {
    players = [];
    elList.innerHTML = "";
    elResult.innerHTML = "";
    elResetBtn.disabled = true;
    elInput.value = "";
}

// ===================================
// 🚨 Sistema de Alerta Personalizado
// ===================================

function showCustomAlert(message, type) {
    // Define a imagem correta baseada no tipo do erro
    alertImg.src = alertImages[type];
    
    // Define a mensagem traduzida
    alertMsg.textContent = message;
    
    // Mostra o modal
    alertModal.classList.remove('hidden');
}

function closeAlert() {
    alertModal.classList.add('hidden');
    elInput.focus(); // Devolve o foco para o input
}

function playSound(type) {
    try {
        sounds[type].currentTime = 0;
        sounds[type].play().catch(() => {}); 
    } catch (e) { console.log("Audio not available"); }
}

// Enter para adicionar
elInput.addEventListener('keypress', e => {
    if (e.key === 'Enter') addFriend();
});

// ===================================
// 🌍 Internacionalização
// ===================================
const availableLangs = [
    { code: 'pt', flag: 'flag-pt.png', name: 'Português' },
    { code: 'en', flag: 'flag-en.png', name: 'English' },
    { code: 'es', flag: 'flag-es.png', name: 'Español' },
    { code: 'zh', flag: 'flag-zh.png', name: '中文' }
];

async function loadLanguage(lang) {
    try {
        const response = await fetch(`locales/lang-${lang}.json`);
        translations = await response.json();
        applyTranslations();
        localStorage.setItem('secretFriendLang', lang);
    } catch (error) {
        console.error('Erro ao carregar idioma:', error);
    }
}

function getText(key) {
    return translations[key] || key; 
}

function applyTranslations() {
    document.querySelector('h1').textContent = getText('title');
    document.getElementById('instruction-text').textContent = getText('enter_names');
    document.getElementById('btn-add').textContent = getText('add');
    document.getElementById('txt-draw').textContent = getText('draw');
    document.getElementById('txt-reset').textContent = getText('reset');
    document.getElementById('friend').placeholder = getText('type_name_placeholder');
    document.getElementById('modal-title').textContent = getText('lang-model-title');
    
    // Atualiza texto do modal de alerta se estiver visível
    const alertTitle = document.querySelector('.alert-title');
    if(alertTitle) alertTitle.textContent = translations['attention'] || "Atenção"; 
}

// ===================================
// ⚙️ Modal de Idioma
// ===================================
const langModal = document.getElementById('language-modal');
const langOptionsContainer = document.getElementById('lang-options');

availableLangs.forEach(lang => {
    const div = document.createElement('div');
    div.className = 'lang-option';
    div.innerHTML = `<img src="assets/flags/${lang.flag}" alt="${lang.name}">`;
    div.onclick = () => {
        loadLanguage(lang.code);
        closeModal();
    };
    langOptionsContainer.appendChild(div);
});

document.getElementById('lang-btn').addEventListener('click', () => {
    langModal.classList.remove('hidden');
});

function closeModal() {
    langModal.classList.add('hidden');
}

// Fechar modais clicando fora
window.onclick = (event) => {
    if (event.target == langModal) closeModal();
    if (event.target == alertModal) closeAlert();
};

// Iniciar
loadLanguage(currentLang);