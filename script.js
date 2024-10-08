document.getElementById('start-btn').addEventListener('click', startGame);
document.getElementById('close-popup').addEventListener('click', closePopup);
document.getElementById('next-level-btn').addEventListener('click', startNextLevel); // Botón para ir al próximo nivel

let currentLevel = 1;
let score = 0;
let timer;
const timeLimit = 20; // Tiempo límite para las preguntas

const incorrectMessages = [
    "Una mala postura puede causar dolor de espalda, cuello y hombros.",
    "Mantener una postura incorrecta puede provocar problemas de circulación.",
    "Una postura deficiente afecta negativamente tu respiración y digestión.",
    "La mala postura puede causar fatiga muscular y dolor crónico."
];

// Rutas de las imágenes para las cartas correctas e incorrectas
const correctImages = ['img/correcto1.jpg', 'img/correcto2.jpg', 'img/correcto4.png'];
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
        if (currentLevel < 2) { // Solo hay 1 nivel inicial
            currentLevel++;
            animateCards();
        } else {
            displayNextLevelButton();
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

function displayNextLevelButton() {
    document.getElementById('next-level-btn').classList.remove('hidden');
}

function startNextLevel() {
    currentLevel++;
    score = 0; // Reiniciar la puntuación si es necesario
    document.getElementById('next-level-btn').classList.add('hidden');
    startQuestionLevel();
}

function startQuestionLevel() {
    // Aquí puedes implementar el nuevo nivel de preguntas
    const cardContainer = document.getElementById('card-container');
    cardContainer.innerHTML = ''; // Limpiar el contenedor de cartas

    // Aquí puedes definir tus preguntas y respuestas
    const questions = [
        { question: "¿Cuál es una buena postura al sentarse?", options: ["Espalda recta", "Cuerpo encorvado", "Cabeza hacia abajo"], answer: 0 },
        { question: "¿Qué puede causar una mala postura?", options: ["Ninguno", "Dolores", "Beneficios"], answer: 1 },
        { question: "¿Cómo debes mantener la pantalla de la computadora?", options: ["A la altura de los ojos", "Muy baja", "Demasiado alta"], answer: 0 }
    ];

    let questionIndex = 0;
    let timeRemaining = timeLimit;
    displayQuestion(questions[questionIndex]);

    // Iniciar temporizador
    timer = setInterval(() => {
        timeRemaining--;
        if (timeRemaining <= 0) {
            clearInterval(timer);
            // Mostrar mensaje de tiempo agotado
            showPopupMessage("¡Tiempo agotado! Respuesta incorrecta.");
            questionIndex++;
            if (questionIndex < questions.length) {
                displayQuestion(questions[questionIndex]);
                timeRemaining = timeLimit; // Reiniciar el temporizador
            } else {
                endQuestionLevel();
            }
        }
    }, 1000);
}

function displayQuestion(question) {
    const cardContainer = document.getElementById('card-container');
    cardContainer.innerHTML = `<h2>${question.question}</h2>`;
    question.options.forEach((option, index) => {
        const button = document.createElement('button');
        button.textContent = option;
        button.addEventListener('click', () => handleAnswerClick(index, question.answer));
        cardContainer.appendChild(button);
    });
}

function handleAnswerClick(selectedIndex, correctIndex) {
    clearInterval(timer); // Detener el temporizador
    if (selectedIndex === correctIndex) {
        score += 100;
        showPopupMessage("¡Respuesta correcta!");
    } else {
        showPopupMessage("Respuesta incorrecta.");
    }

    // Mover a la siguiente pregunta o finalizar el nivel
    if (score >= 300) { // Si la puntuación alcanza un límite, termina el nivel
        endQuestionLevel();
    } else {
        startQuestionLevel(); // Repite el nivel
    }
}

function endQuestionLevel() {
    clearInterval(timer);
    const cardContainer = document.getElementById('card-container');
    cardContainer.innerHTML = `<h2>Has completado el nivel de preguntas. Puntuación final: ${score}</h2>`;
    // Puedes agregar aquí lógica para avanzar a otro nivel o finalizar el juego
}

function showPopupMessage(message) {
    const popupContent = document.querySelector('#popup-content p');
    popupContent.textContent = message;
    document.getElementById('popup').style.display = 'flex';
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
