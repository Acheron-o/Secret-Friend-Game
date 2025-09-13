// The main goal of this challenge is to strengthen your programming logic skills.
// Here you should develop the logic to solve the Secret Friend problem.


// ===================================
// 🎁 Secret Friend Game - Main Logic
// ===================================

// Store player names
let players = [];

// Load audio files
const generalSound = new Audio('assets/sounds/general sound.mp3');
const drawSound = new Audio('assets/sounds/Draw.mp3');
const mainSound = new Audio('assets/sounds/main-theme.mp3');

// --------------------------
// Add friend to list
// --------------------------
function addFriend() {
    const input = document.getElementById('friend');
    let name = input.value.trim();

    // Check for empty input
    if (name === "") {
        displayMessage("h2", translations.invalid_name || "Please enter a valid name!");
        return;
    }

    // Check for duplicate name
    if (validateName(name)) {
        displayMessage("h2", translations.duplicate_name || "Name already added. Please enter a different name.");
        return;
    }

    // Play sound if not muted
    generalSound.currentTime = 0;
    if (!isMuted) generalSound.play();

    displayMessage("h2", translations.enter_names || "Enter your friends' names");
    players.push(name);

    input.value = "";
    updateList();
    document.getElementById("result").innerHTML = "";
}

// Update friends list display
function updateList() {
    const list = document.getElementById('friendsList');
    list.innerHTML = "";
    players.forEach(friend => {
        const li = document.createElement('li');
        li.textContent = friend;
        list.appendChild(li);
    });
}

// --------------------------
// Shuffle array (Fisher-Yates)
// --------------------------
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

// --------------------------
// Draw secret friend
// --------------------------
function drawFriend() {
    // Ensure minimum 2 players
    if (players.length < 2) {
        displayMessage("h2", translations.min_friends || "At least 2 friends are required to draw.");
        return;
    }

    // Play draw sound if not muted
    drawSound.currentTime = 0;
    if (!isMuted) drawSound.play();

    let shuffled = shuffle([...players]);
    const secretFriend = shuffled[0];

    // Display result
    const result = document.getElementById('result');
    result.innerHTML = "";
    const li = document.createElement('li');
    li.textContent = secretFriend;
    result.appendChild(li);

    // Reset players list
    players = [];
    document.getElementById('friendsList').innerHTML = "";

    displayMessage("h2", translations.success_draw || "Draw completed successfully!");
    document.getElementById("reset").disabled = false;
}

// --------------------------
// Reset game state
// --------------------------
function resetGame() {
    // Play sound if there's data to reset
    if (
        document.getElementById('friendsList').innerHTML !== "" ||
        document.getElementById('result').innerHTML !== ""
    ) {
        generalSound.currentTime = 0;
        if (!isMuted) generalSound.play();
    }

    players = [];
    document.getElementById('friendsList').innerHTML = "";
    document.getElementById('result').innerHTML = "";
    displayMessage("h2", translations.enter_names || "Enter your friends' names");
    document.getElementById("reset").disabled = true;
}

// --------------------------
// Check for duplicate names
// --------------------------
function validateName(name) {
    return players.includes(name);
}

// --------------------------
// Handle Enter key for input
// --------------------------
document.getElementById('friend').addEventListener('keypress', e => {
    if (e.key === 'Enter') addFriend();
});

// Show duplicate name warning while typing
document.getElementById('friend').addEventListener('input', function() {
    const name = this.value.trim();
    if (validateName(name)) {
        displayMessage("h2", translations.duplicate_name || "Name already added. Please enter a different name.");
    } else {
        displayMessage("h2", translations.enter_names || "Enter your friends' names");
    }
});

// --------------------------
// Toggle mute for sounds
// --------------------------
const muteBtn = document.getElementById('mute-btn');
const muteIcon = document.getElementById('mute-icon');
let isMuted = false;

muteBtn.addEventListener('click', () => {
    isMuted = !isMuted;
    generalSound.muted = isMuted;
    drawSound.muted = isMuted;
    muteIcon.src = isMuted ? './assets/icons/speaker icon-off.png' : './assets/icons/speaker icon.png';
    muteIcon.alt = isMuted ? 'Muted' : 'Sound on';
});

// --------------------------
// Toggle theme music
// --------------------------
const themeBtn = document.getElementById('theme-btn');
const themeIcon = document.getElementById('theme-icon');
let isThemePlaying = false;

mainSound.loop = true;

themeBtn.addEventListener('click', () => {
    if (isThemePlaying) {
        mainSound.pause();
        themeIcon.src = './assets/icons/music-theme-off.png';
        themeIcon.alt = 'Theme music off';
    } else {
        mainSound.currentTime = 0;
        if (!isMuted) mainSound.play();
        themeIcon.src = './assets/icons/music-theme-on.png';
        themeIcon.alt = 'Theme music on';
    }
    isThemePlaying = !isThemePlaying;
});

// --------------------------
// Language selection
// --------------------------
const languages = [
    { code: 'en', name: 'English', flag: 'flag-en.png' },
    { code: 'pt', name: 'Português', flag: 'flag-pt.png' },
    { code: 'es', name: 'Español', flag: 'flag-es.png' },
    { code: 'id', name: 'Bahasa Indonesia', flag: 'flag-id.png' },
    { code: 'zh', name: '中文', flag: 'flag-zh.png' }
];
let currentLang = 'en';
let translations = {};

// Show language selection modal
function showLanguageModal() {
    const modal = document.getElementById('language-modal');
    let modalContent = modal.querySelector('.language-modal-content') || document.createElement('div');
    modalContent.className = 'language-modal-content';
    modal.appendChild(modalContent);

    // Set modal title
    let langModalTitle = modalContent.querySelector('h2') || document.createElement('h2');
    langModalTitle.textContent = translations["lang-model-title"] || "Choose your language";
    modalContent.prepend(langModalTitle);

    // Populate language options
    let options = modalContent.querySelector('.language-options') || document.createElement('div');
    options.className = 'language-options';
    options.innerHTML = '';
    languages.filter(l => l.code !== currentLang).forEach(lang => {
        const div = document.createElement('div');
        div.className = 'language-option';
        div.innerHTML = `
            <img src="assets/flags/${lang.flag}" alt="${lang.name} flag">
            <span>${lang.name}</span>
        `;
        div.onclick = () => {
            loadLanguage(lang.code);
            currentLang = lang.code;
            modal.classList.add('hidden');
        };
        options.appendChild(div);
    });
    modalContent.appendChild(options);

    modal.classList.remove('hidden');
}

// Load language button
document.getElementById('lang-btn').addEventListener('click', showLanguageModal);

// Load language JSON and apply translations
function loadLanguage(lang) {
    fetch(`locales/lang-${lang}.json`)
        .then(response => response.json())
        .then(data => {
            translations = data;
            applyTranslations();
        });
}

// Apply translations to UI
function applyTranslations() {
    // Main UI elements
    document.querySelector('.main-title').textContent = translations.title;
    document.querySelector('.section-title').textContent = translations.enter_names;
    document.querySelector('.button-add').textContent = translations.add;
    document.querySelector('.button-draw span').textContent = translations.draw;
    document.querySelector('.button-reset span').textContent = translations.reset;
    const nameInput = document.getElementById('friend');
    if (nameInput && translations["type_name_placeholder"]) {
        nameInput.placeholder = translations["type_name_placeholder"];
    }

    // Instructions modal elements
    const instructionsModal = document.getElementById('instructions-modal');
    instructionsModal.querySelector('h2').textContent = translations.instructions_title || "How to Play";
    const instructionsText = document.getElementById('instructions-text');
    instructionsText.innerHTML = `
        <p>${translations.instructions_welcome || "Welcome to Secret Friend!"}</p>
        <p>1. ${translations.instructions_step1 || "Enter the names of all participants."}</p>
        <p>2. ${translations.instructions_step2 || "Click 'Draw Friend' to randomly select a secret friend."}</p>
        <p>3. ${translations.instructions_step3 || "Enjoy the game and have fun!"}</p>
        <p>${translations.instructions_language || "You can change the language using the button above."}</p>
    `;
    document.getElementById('close-instructions').textContent = translations.instructions_ok || "OK";
}

// Display translated or fallback message
function displayMessage(tag, keyOrText) {
    document.querySelector(tag).innerHTML = translations[keyOrText] || keyOrText;
}

// Close language modal on outside click
document.getElementById('language-modal').addEventListener('click', function(e) {
    if (e.target === this) {
        this.classList.add('hidden');
    }
});

// --------------------------
// Instructions modal logic
// --------------------------
window.addEventListener('DOMContentLoaded', () => {
    // Show instructions on first visit
    if (!localStorage.getItem('instructionsSeen')) {
        document.getElementById('instructions-modal').classList.remove('hidden');
    }
});

// Close instructions modal
document.getElementById('close-instructions').addEventListener('click', () => {
    document.getElementById('instructions-modal').classList.add('hidden');
    localStorage.setItem('instructionsSeen', 'true');
});

// Close instructions on outside click
document.getElementById('instructions-modal').addEventListener('click', function(e) {
    if (e.target === this) {
        this.classList.add('hidden');
        localStorage.setItem('instructionsSeen', 'true');
    }
});

// Show instructions modal
document.getElementById('help-btn').addEventListener('click', () => {
    document.getElementById('instructions-modal').classList.remove('hidden');
});

// Show language modal from instructions
document.getElementById('lang-btn-instructions').addEventListener('click', showLanguageModal);

// --------------------------
// Initialize default language
// --------------------------
loadLanguage('en');
displayMessage("h2", "Enter your friends' names");