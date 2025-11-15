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

// Map das imagens para cada tipo de erro
const alertImages = {
    invalid: 'assets/icons/valido.png',     // Gatinho do peixe
    duplicate: 'assets/icons/repetido.png', // Gatinho no copo
    limit: 'assets/icons/limite.png'        // Gatinho azul
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
    elList.innerHTML = ""; 
    players = []; 
    
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
    alertImg.src = alertImages[type];
    alertMsg.textContent = message;
    alertModal.classList.remove('hidden');
}

function closeAlert() {
    alertModal.classList.add('hidden');
    elInput.focus(); 
}

function playSound(type) {
    try {
        sounds[type].currentTime = 0;
        sounds[type].play().catch(() => {}); 
    } catch (e) { console.log("Audio not available"); }
}

elInput.addEventListener('keypress', e => {
    if (e.key === 'Enter') addFriend();
});

// ===================================
// 🌍 Internacionalização
// ===================================

// Lista completa de idiomas usando os SVGs
const availableLangs = [
    { code: 'pt', flag: 'br.svg', name: 'Português' },
    { code: 'en', flag: 'us.svg', name: 'English' },
    { code: 'es', flag: 'es.svg', name: 'Español' },
    { code: 'fr', flag: 'fr.svg', name: 'Français' },
    { code: 'it', flag: 'it.svg', name: 'Italiano' },
    { code: 'de', flag: 'de.svg', name: 'Deutsch' },
    { code: 'zh', flag: 'cn.svg', name: '中文' },
    { code: 'jp', flag: 'jp.svg', name: '日本語' }
];

async function loadLanguage(lang) {
    try {
        const response = await fetch(`locales/lang-${lang}.json`);
        translations = await response.json();
        applyTranslations();
        localStorage.setItem('secretFriendLang', lang);
    } catch (error) {
        console.error('Erro ao carregar idioma:', error);
        // Fallback para português se falhar
        if(lang !== 'pt') loadLanguage('pt');
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
    
    // Atualiza texto do alerta se estiver visível
    const alertTitle = document.querySelector('.alert-title');
    if(alertTitle) alertTitle.textContent = getText('attention'); 
}

// ===================================
// ⚙️ Modal de Idioma (Geração Dinâmica)
// ===================================
const langModal = document.getElementById('language-modal');
const langOptionsContainer = document.getElementById('lang-options');

// Limpa o container antes de adicionar para evitar duplicatas em recarregamentos
langOptionsContainer.innerHTML = '';

availableLangs.forEach(lang => {
    const div = document.createElement('div');
    div.className = 'lang-option';
    // Título da bandeira ao passar o mouse (title attribute)
    div.innerHTML = `<img src="assets/flags/${lang.flag}" alt="${lang.name}" title="${lang.name}">`;
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

window.onclick = (event) => {
    if (event.target == langModal) closeModal();
    if (event.target == alertModal) closeAlert();
};

// Iniciar
loadLanguage(currentLang);