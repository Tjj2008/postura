document.getElementById('start-btn').addEventListener('click', startGame);
document.getElementById('close-popup').addEventListener('click', closePopup);

let currentLevel = 1;
let score = 0;

const incorrectMessages = [
    "Una mala postura puede causar dolor de espalda, cuello y hombros.",
    "Mantener una postura incorrecta puede provocar problemas de circulación.",
    "Una postura deficiente afecta negativamente tu respiración y digestión.",
    "La mala postura puede causar fatiga muscular y dolor crónico."
];

// Rutas de las imágenes para las cartas correctas e incorrectas
const correctImages = ['img/correcto1.jpg', 'img/correcto2.png', 'img/correcto3.png'];
const incorrectImages = ['img/incorrecto1.jpg', 'img/incorrecto2.png', 'img/incorrecto11.jpg'];

function startGame() {
    document.getElementById('start-btn').classList.add('hidden');
    document.getElementById('game-container').classList.remove('hidden');
    showLevel();
}

function showLevel() {
    const levelDisplay = document.getElementById('level-display');
    const scoreDisplay = document.getElementById('score-display');
    const cardContainer = document.getElementById('card-container');
    
    levelDisplay.textContent = `Nivel ${currentLevel}`;
    levelDisplay.classList.remove('hidden');
    scoreDisplay.textContent = `Puntos: ${score}`;
    scoreDisplay.classList.remove('hidden');

    cardContainer.innerHTML = '';

    // Establece la posición de la carta correcta
    const correctCardIndex = Math.floor(Math.random() * 3);

    // Agregamos las tres cartas
    for (let i = 0; i < 3; i++) {
        const card = document.createElement('div');
        card.classList.add('card');
        
        const img = document.createElement('img');
        
        // Si es la carta correcta, se asigna la imagen correcta
        if (i === correctCardIndex) {
            img.src = correctImages[currentLevel - 1];  // Selecciona la imagen según el nivel actual
            img.alt = 'Correcto';
        } else {
            img.src = incorrectImages[Math.floor(Math.random() * incorrectImages.length)];
            img.alt = 'Incorrecto';
        }
        
        card.appendChild(img);
        card.addEventListener('click', () => handleCardClick(i === correctCardIndex));
        cardContainer.appendChild(card);
    }
}

function handleCardClick(isCorrect) {
    if (isCorrect) {
        score += 100;
        if (currentLevel < 3) {
            currentLevel++;
            animateCards();
        } else {
            displayVictoryMessage();
        }
    } else {
        showPopup();
    }
}

function animateCards() {
    const cards = document.querySelectorAll('.card');
    cards.forEach(card => {
        card.style.animation = 'fadeOut 0.5s forwards';
    });
    setTimeout(() => {
        showLevel();
    }, 500);
}

function displayVictoryMessage() {
    const cardContainer = document.getElementById('card-container');
    const levelDisplay = document.getElementById('level-display');
    
    cardContainer.innerHTML = '';
    levelDisplay.classList.add('hidden');

    const victoryMessage = document.createElement('h2');
    victoryMessage.textContent = '¡Campeón invicto!';
    victoryMessage.style.color = '#01579b';
    cardContainer.appendChild(victoryMessage);
}

function showPopup() {
    const randomIndex = Math.floor(Math.random() * incorrectMessages.length);
    const popupContent = document.querySelector('#popup-content p');
    popupContent.textContent = incorrectMessages[randomIndex];
    document.getElementById('popup').style.display = 'flex';
}

function closePopup() {
    document.getElementById('popup').style.display = 'none';
}
