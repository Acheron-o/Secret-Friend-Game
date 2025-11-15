// Estado da aplicação
let players = [];
let currentLang = localStorage.getItem('secretFriendLang') || 'pt';
let translations = {};

// Sons (Apenas efeitos sonoros pontuais)
const sounds = {
    add: new Audio('assets/sounds/general sound.mp3'),
    draw: new Audio('assets/sounds/Draw.mp3')
};

// Elementos DOM principais
const elInput = document.getElementById('friend');
const elList = document.getElementById('friendsList');
const elResult = document.getElementById('result');
const elResetBtn = document.getElementById('btn-reset');

// ===================================
// 🎮 Lógica do Jogo
// ===================================

function addFriend() {
    const name = elInput.value.trim();

    if (!name) {
        alert(getText('invalid_name'));
        return;
    }

    if (players.includes(name)) {
        alert(getText('duplicate_name'));
        return;
    }

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
    
    // Habilita reset se houver itens
    elResetBtn.disabled = players.length === 0 && elResult.innerHTML === "";
}

function drawFriend() {
    if (players.length < 2) {
        alert(getText('min_friends'));
        return;
    }

    playSound('draw');
    
    // Sorteia apenas um (conforme lógica original)
    const randomIndex = Math.floor(Math.random() * players.length);
    const secretFriend = players[randomIndex];

    elResult.innerHTML = `<li>🎉 ${secretFriend} 🎉</li>`;
    elList.innerHTML = ""; // Limpa lista visual para suspense
    players = []; // Limpa array para forçar reinício
    
    elResetBtn.disabled = false;
}

function resetGame() {
    players = [];
    elList.innerHTML = "";
    elResult.innerHTML = "";
    elResetBtn.disabled = true;
    elInput.value = "";
}

function playSound(type) {
    // Toca som se o arquivo existir e navegador permitir
    try {
        sounds[type].currentTime = 0;
        sounds[type].play().catch(() => {}); // Ignora erro de autoplay
    } catch (e) { console.log("Audio not available"); }
}

// Enter para adicionar
elInput.addEventListener('keypress', e => {
    if (e.key === 'Enter') addFriend();
});

// ===================================
// 🌍 Internacionalização (i18n)
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
    return translations[key] || key; // Retorna a chave se não achar tradução
}

function applyTranslations() {
    document.querySelector('h1').textContent = getText('title');
    document.getElementById('instruction-text').textContent = getText('enter_names');
    document.getElementById('btn-add').textContent = getText('add');
    document.getElementById('txt-draw').textContent = getText('draw');
    document.getElementById('txt-reset').textContent = getText('reset');
    document.getElementById('friend').placeholder = getText('type_name_placeholder');
    document.getElementById('modal-title').textContent = getText('lang-model-title');
}

// ===================================
// ⚙️ Modal de Idioma
// ===================================

const modal = document.getElementById('language-modal');
const langOptionsContainer = document.getElementById('lang-options');

// Preenche opções de idioma dinamicamente
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
    modal.classList.remove('hidden');
});

function closeModal() {
    modal.classList.add('hidden');
}

window.onclick = (event) => {
    if (event.target == modal) closeModal();
};

// Inicialização
loadLanguage(currentLang);