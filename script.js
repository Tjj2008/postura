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
    const correctCardIndex = Math.floor(Math.random() * 3);

    for (let i = 0; i < 3; i++) {
        const card = document.createElement('div');
        card.classList.add('card');
        
        
        const img = document.createElement('img');
        img.src = i === correctCardIndex ? '/img/correcto1.jpg' : '/img/incorrecto1.jpg';
        img.alt = i === correctCardIndex ? 'Correcto' : 'Incorrecto';
        
    
        card.appendChild(img);
        
        card.addEventListener('click', () => handleCardClick(i === correctCardIndex));
        cardContainer.appendChild(card);
    }
}


function handleCardClick(isCorrect) {
    if (isCorrect) {
        score += 100;
        if (currentLevel < 4) {
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
