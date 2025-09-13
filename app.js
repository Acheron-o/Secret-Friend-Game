// ===================================
// 🎁 Secret Friend Game - Main Logic
// ===================================

// Array to store player names
let players = [];

// Load audio files
const generalSound = new Audio('assets/sounds/general sound.mp3');
const drawSound = new Audio('assets/sounds/Draw.mp3');

// --------------------------
// Add a friend to the list
// --------------------------
function addFriend() {
    const input = document.getElementById('friend');
    let name = input.value.trim();

    // Validate empty input
    if (name === "") {
        displayMessage("h2", translations.invalid_name || "Please enter a valid name!");
        return;
    }

    // Validate duplicate name
    if (validateName(name)) {
        displayMessage("h2", translations.duplicate_name || "Name already added. Please enter a different name.");
        return;
    }

    // Play sound only if not muted
    generalSound.currentTime = 0;
    if (!isMuted) generalSound.play();

    displayMessage("h2", translations.enter_names || "Enter your friends' names");
    players.push(name);

    input.value = "";
    updateList();
    document.getElementById("result").innerHTML = "";
}

// Update the friends list on the screen
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
    // Require at least 2 friends
    if (players.length < 2) {
        displayMessage("h2", translations.min_friends || "At least 2 friends are required to draw.");
        return;

    }

    // Play draw sound if not muted
    drawSound.currentTime = 0;
    if (!isMuted) drawSound.play();

    let shuffled = shuffle([...players]);
    const secretFriend = shuffled[0];

    // Show result
    const result = document.getElementById('result');
    result.innerHTML = "";
    const li = document.createElement('li');
    li.textContent = secretFriend;
    result.appendChild(li);

    // Clear players list
    players = [];
    document.getElementById('friendsList').innerHTML = "";

    displayMessage("h2", translations.success_draw || "Draw completed successfully!");
    document.getElementById("reset").disabled = false;
}

// --------------------------
// Reset the game
// --------------------------
function resetGame() {
    // Play sound only if there is something to reset
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
// Add friend on Enter key
// --------------------------
document.getElementById('friend').addEventListener('keypress', e => {
    if (e.key === 'Enter') addFriend();
});

// Show message if name is duplicate while typing
document.getElementById('friend').addEventListener('input', function() {
    const name = this.value.trim();
    if (validateName(name)) {
        displayMessage("h2", translations.duplicate_name || "Name already added. Please enter a different name.");
    } else {
        displayMessage("h2", translations.enter_names || "Enter your friends' names");
    }
});

// --------------------------
// Mute/unmute sounds
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

// ===================================
// 🌍 Language modal logic
// ===================================
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
    let modalContent = modal.querySelector('.language-modal-content');
    if (!modalContent) {
        modalContent = document.createElement('div');
        modalContent.className = 'language-modal-content';
        modal.appendChild(modalContent);
    }

    // Ensure the modal title exists and update it according to current language
    let langModalTitle = modalContent.querySelector('h2');
    if (!langModalTitle) {
        langModalTitle = document.createElement('h2');
        modalContent.prepend(langModalTitle);
    }
    if (translations["lang-model-title"]) {
        langModalTitle.textContent = translations["lang-model-title"];
    } else {
        langModalTitle.textContent = "Choose your language";
    }

    // Create or select language options container
    let options = modalContent.querySelector('.language-options');
    if (!options) {
        options = document.createElement('div');
        options.className = 'language-options';
        modalContent.appendChild(options);
    }
    options.innerHTML = '';

    // Filter out the current language so its flag doesn't show
    const langsToShow = languages.filter(l => l.code !== currentLang);

    langsToShow.forEach(lang => {
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

    modal.classList.remove('hidden');
}

// Language button event
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

// Apply translations to UI elements
function applyTranslations() {
    // Main UI translations
    document.querySelector('.main-title').textContent = translations.title;
    document.querySelector('.section-title').textContent = translations.enter_names;
    document.querySelector('.button-add').textContent = translations.add;
    document.querySelector('.button-draw span').textContent = translations.draw;
    document.querySelector('.button-reset span').textContent = translations.reset;
    // Update modal title if exists
    const langModalTitle = document.getElementById('language-modal-title');
    if (langModalTitle && translations["lang-model-title"]) {
        langModalTitle.textContent = translations["lang-model-title"];
    }
    // Update input placeholder
    const nameInput = document.getElementById('friend');
    if (nameInput && translations["type_name_placeholder"]) {
        nameInput.placeholder = translations["type_name_placeholder"];
    }
}

// Display messages using translation keys or fallback text
function displayMessage(tag, keyOrText) {
    document.querySelector(tag).innerHTML = translations[keyOrText] || keyOrText;
}

// Initialize with English
loadLanguage('en');
displayMessage("h2", "Enter your friends' names");