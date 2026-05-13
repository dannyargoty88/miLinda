// === VARIABLES GLOBALES DEL JUEGO ===
let currentQuestionIndex = 0;
let correctAnswers = 0;
let selectedOption = null;
let gameCompleted = false;
let shuffledQuestions = [];
let correctlyAnsweredQuestions = []; // Array para rastrear preguntas respondidas correctamente
let availableQuestions = []; // Array de preguntas disponibles para mostrar

// === CONFIGURACIÓN FASE 2 ===
let currentPhaseTwoIndex = 0;
const phaseTwoMessages = [
    {
        title: "💝 Un mensaje para ti 💝",
        text: "Eres la persona más maravillosa que ha llegado a mi vida. Cada momento a tu lado es un regalo que atesoro con todo mi corazón. Gracias por ser tú, por tu amor y por compartir este camino conmigo.",
        image: "assets/1.jpg"
    },
    {
        title: "✨ Nuestra Felicidad ✨",
        text: "A tu lado he descubierto lo que significa ser verdaderamente feliz. Tu sonrisa ilumina mis días más oscuros y tu amor me da la fuerza para enfrentar cualquier desafío.",
        image: "assets/2.jpg"
    },
    {
        title: "🛡️ Mi Lugar Seguro 🛡️",
        text: "Eres mi confidente, mi mayor apoyo y mi lugar seguro. En tus brazos encuentro la paz que tanto buscaba, y en tus ojos veo el futuro que quiero construir.",
        image: "assets/3.jpg"
    },
    {
        title: "💎 Tesoros Compartidos 💎",
        text: "Cada risa, cada abrazo y cada pequeño detalle que compartimos son tesoros que guardo en lo más profundo de mi ser. Eres mi complemento perfecto.",
        image: "assets/4.jpg"
    },
    {
        title: "🚀 Nuestro Futuro 🚀",
        text: "No puedo esperar para seguir construyendo nuestro futuro juntos, lleno de aventuras, sueños cumplidos y, sobre todo, de este amor infinito que nos une.",
        image: "assets/5.png"
    }
];

// === PREGUNTAS DEL JUEGO ===
const questions = [
    {
        id: 1,
        question: "¿Cuál fue el primer lugar al que fuimos juntos en nuestra primera cita?",
        options: {
            A: "Un restaurante de pizza",
            B: "El parque del perro",
            C: "El cine del unicentro",
            D: "Un restaurante cerca de la unidad"
        },
        correct: "A",
        explanation: "¡Correcto! Nuestro primer encuentro fue en ese lugar aunque para ti fue rara la cita para mi fue distinto la recuerdo con mucho cariño."
    },
    {
        id: 2,
        question: "¿Qué me encanta de ti?",
        options: {
            A: "La alegria que me transmites",
            B: "Tus ocurrencias",
            C: "Tu sinceridad y forma de expresarte",
            D: "Todas las anteriores"
        },
        correct: "D",
        explanation: "¡Exacto! Todas esas cualidades me encantan de ti."
    },
    {
        id: 3,
        question: "¿Qué es lo que más me gusta físicamente de ti?",
        options: {
            A: "Tus ojos",
            B: "Tu sonrisa",
            C: "Tus nalguitas",
            D: "Tu cabello"
        },
        correct: "A",
        explanation: "¡Correcto! Tus hermosos ojazos me encantan me pierdo en ellos y por su puesto también tus NALGUITAS, tu sonrisa y toda todita tuuuuuuuuuuu me encantas!!!."
    },
    {
        id: 4,
        question: "¿Qué es lo que más me gusta hacer contigo en nuestros fines de semana?",
        options: {
            A: "Salir y conocer nuevos lugares",
            B: "Ir de compras al centro comercial",
            C: "Ver películas y series en casa",
            D: "Cocinar juntos algo nuevo"
        },
        correct: "C",
        explanation: "¡Siiií! Todo me gusta, pero nuestros momentos viendo películas y series en casa son de mis favoritos, por la tranquilidad y la cercanía que compartimos."
    },
    {
        id: 5,
        question: "¿Como te suelo llamar más cariñosamente?",
        options: {
            A: "Mi amor",
            B: "Mi linda",
            C: "Mi bebe",
            D: "Mi vida"
        },
        correct: "B",
        explanation: "Perfecto! Me encanta llamarte así porque refleja todo lo hermoso que veo en ti: tus sentimientos, tu esencia, tu forma de ser… todo lo lindo que hay en ti."
    }
];

// === FUNCIÓN PARA MEZCLAR PREGUNTAS ===
function shuffleArray(array) {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
}

// === UTILIDADES ===
function getCurrentDate() {
    const now = new Date();
    const options = {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    };
    return now.toLocaleDateString('es-ES', options);
}

// === FUNCIÓN DE LOGOUT ===
function logout() {
    Swal.fire({
        title: '¿Cerrar sesión?',
        text: 'Debes iniciar sesión nuevamente para acceder',
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#e74c3c',
        cancelButtonColor: '#95a5a6',
        confirmButtonText: 'Sí, cerrar sesión',
        cancelButtonText: 'Cancelar'
    }).then((result) => {
        if (result.isConfirmed) {
            localStorage.removeItem('currentUser');

            Swal.fire({
                icon: 'success',
                title: 'Sesión cerrada',
                text: 'Has cerrado sesión exitosamente',
                confirmButtonColor: '#27ae60',
                timer: 1500,
                timerProgressBar: true
            }).then(() => {
                window.location.href = 'index.html';
            });
        }
    });
}

// === LÓGICA DEL JUEGO ===
function loadQuestion() {
    // Filtrar preguntas que aún no han sido respondidas correctamente
    availableQuestions = shuffledQuestions.filter(q => !correctlyAnsweredQuestions.includes(q.id));

    if (availableQuestions.length === 0) {
        completeGame();
        return;
    }

    // Seleccionar una pregunta aleatoria de las disponibles
    const randomIndex = Math.floor(Math.random() * availableQuestions.length);
    const question = availableQuestions[randomIndex];

    // Encontrar el índice en shuffledQuestions para mostrar el progreso
    currentQuestionIndex = shuffledQuestions.findIndex(q => q.id === question.id);

    // Actualizar información de la pregunta
    document.getElementById('questionNumber').textContent = correctAnswers + 1;
    document.getElementById('totalQuestions').textContent = shuffledQuestions.length;
    document.getElementById('questionText').textContent = question.question;

    // Cargar opciones
    document.getElementById('optionA').textContent = question.options.A;
    document.getElementById('optionB').textContent = question.options.B;
    document.getElementById('optionC').textContent = question.options.C;
    document.getElementById('optionD').textContent = question.options.D;

    // Limpiar selecciones previas
    clearSelections();
    selectedOption = null;
    document.getElementById('confirmBtn').disabled = true;
}

function clearSelections() {
    const options = document.querySelectorAll('.option');
    options.forEach(option => {
        option.classList.remove('selected', 'correct', 'incorrect');
    });
}

function selectOption(optionLetter) {
    if (gameCompleted) return;

    clearSelections();
    selectedOption = optionLetter;

    const optionElement = document.querySelector(`[data-option="${optionLetter}"]`);
    optionElement.classList.add('selected');

    document.getElementById('confirmBtn').disabled = false;
}

function confirmAnswer() {
    if (!selectedOption) return;

    // Obtener la pregunta actual de las disponibles
    const randomIndex = Math.floor(Math.random() * availableQuestions.length);
    const currentQuestion = availableQuestions.find(q => q.id === shuffledQuestions[currentQuestionIndex].id);
    const isCorrect = selectedOption === currentQuestion.correct;

    // Marcar respuesta correcta/incorrecta
    const selectedElement = document.querySelector(`[data-option="${selectedOption}"]`);
    const correctElement = document.querySelector(`[data-option="${currentQuestion.correct}"]`);

    if (isCorrect) {
        selectedElement.classList.add('correct');
        correctAnswers++;

        // Agregar pregunta a las respondidas correctamente
        correctlyAnsweredQuestions.push(currentQuestion.id);

        // Desactivar opciones
        document.querySelectorAll('.option').forEach(option => {
            option.style.pointerEvents = 'none';
        });

        // Actualizar progreso
        updateProgress();

        // Mostrar resultado y avanzar
        setTimeout(() => {
            showQuestionResult(isCorrect, currentQuestion.explanation);
        }, 1000);
    } else {
        selectedElement.classList.add('incorrect');
        correctElement.classList.add('correct');

        // Mostrar resultado y cargar otra pregunta
        setTimeout(() => {
            showIncorrectResult(currentQuestion.explanation);
        }, 1000);
    }
}

function updateProgress() {
    const progress = (correctAnswers / shuffledQuestions.length) * 100;
    const progressFill = document.getElementById('progressFill');
    const progressText = document.getElementById('progressText');
    const imageOverlay = document.getElementById('imageOverlay');

    progressFill.style.width = progress + '%';
    progressText.textContent = Math.round(progress) + '%';

    // Reducir opacidad de la imagen según el progreso
    const opacity = Math.max(0, 0.9 - (progress / 100) * 0.9);
    imageOverlay.style.background = `rgba(44, 62, 80, ${opacity})`;

    if (progress >= 100) {
        imageOverlay.style.display = 'none';
    }
}

function showQuestionResult(isCorrect, explanation) {
    const title = '¡Correcto! 💕';
    const message = explanation;

    Swal.fire({
        title: title,
        text: message,
        icon: 'success',
        confirmButtonText: correctAnswers >= shuffledQuestions.length ? 'Ver resultado final' : 'Siguiente pregunta',
        confirmButtonColor: '#27ae60',
        allowOutsideClick: false
    }).then(() => {
        nextQuestion();
    });
}

function showIncorrectResult(explanation) {
    Swal.fire({
        title: 'Respuesta incorrecta 😔',
        text: 'No te preocupes, sigamos con otra pregunta.',
        icon: 'error',
        confirmButtonText: 'Continuar',
        confirmButtonColor: '#3498db',
        allowOutsideClick: false
    }).then(() => {
        // Cargar otra pregunta directamente
        loadQuestion();

        // Reactivar opciones
        document.querySelectorAll('.option').forEach(option => {
            option.style.pointerEvents = 'auto';
        });
    });
}

function nextQuestion() {
    // Verificar si quedan preguntas por responder correctamente
    const remainingQuestions = shuffledQuestions.filter(q => !correctlyAnsweredQuestions.includes(q.id));

    if (remainingQuestions.length === 0) {
        completeGame();
    } else {
        loadQuestion();

        // Reactivar opciones
        document.querySelectorAll('.option').forEach(option => {
            option.style.pointerEvents = 'auto';
        });
    }
}

function completeGame() {
    gameCompleted = true;
    const percentage = (correctAnswers / shuffledQuestions.length) * 100;

    let title, message, icon;

    if (percentage === 100) {
        title = '¡Perfecto! 🎉💕';
        message = `¡Respondiste todas las preguntas correctamente! Eres increíble y conoces cada detalle de nuestros momentos especiales. ¡Te adoro mucho mi amor!`;
        icon = 'success';
    } else if (percentage >= 50) {
        title = '¡Muy bien! 😊💖';
        message = `Respondiste correctamente ${correctAnswers} de ${shuffledQuestions.length} preguntas. ¡Conoces muy bien nuestros recuerdos especiales!`;
        icon = 'success';
    } else {
        title = 'Puedes mejorar 🤗💕';
        message = `Respondiste ${correctAnswers} de ${shuffledQuestions.length} preguntas correctamente. ¡Pero no importa, cada día creamos nuevos recuerdos juntos!`;
        icon = 'info';
    }

    Swal.fire({
        title: title,
        text: message,
        icon: icon,
        confirmButtonText: percentage === 100 ? 'Continuar' : 'Jugar de nuevo',
        confirmButtonColor: '#e91e63',
        allowOutsideClick: false
    }).then(() => {
        if (percentage === 100) {
            showCompletionView(true); // Pass true to indicate Phase 2 is available
        } else {
            restartGame();
        }
    });
}

function showCompletionView(isPhaseTwo = false) {
    // Ocultar sección de preguntas
    const questionsSection = document.querySelector('.questions-section');
    questionsSection.style.display = 'none';

    // Crear y mostrar botón de reiniciar o siguiente fase
    createRestartButton(isPhaseTwo);
}

function createRestartButton(isPhaseTwo = false) {
    // Verificar si ya existe el botón
    let restartContainer = document.getElementById('restartContainer');
    if (restartContainer) {
        restartContainer.style.display = 'block';

        // Actualizar texto del botón si es fase 2
        const btn = document.getElementById('restartGameBtn');
        if (isPhaseTwo) {
            btn.innerHTML = '✨ Segunda y última parte';
            btn.onclick = startPhaseTwo;
        } else {
            btn.innerHTML = '🔄 Jugar de Nuevo';
            btn.onclick = restartGame;
        }
        return;
    }

    // Crear contenedor del botón de reiniciar
    restartContainer = document.createElement('div');
    restartContainer.id = 'restartContainer';
    restartContainer.className = 'restart-container';

    const buttonText = isPhaseTwo ? '✨ Segunda y última parte' : '🔄 Jugar de Nuevo';
    const buttonAction = isPhaseTwo ? 'startPhaseTwo()' : 'restartGame()';

    restartContainer.innerHTML = `
        <div class="completion-message">
            <h2>🎉 ¡Felicitaciones! 🎉</h2>
            <p>¡Perfecto! Has completado la primera fase del juego!<br></p>
            <button id="restartGameBtn" class="restart-btn" onclick="${buttonAction}">
                ${buttonText}
            </button>
        </div>
    `;

    // Agregar al contenedor principal antes de la sección de progreso
    const gameContainer = document.querySelector('.game-container');
    const progressSection = document.querySelector('.progress-section');
    gameContainer.insertBefore(restartContainer, progressSection);
}

function startPhaseTwo() {
    // Reiniciar índice de fase 2
    currentPhaseTwoIndex = 0;

    // Ocultar mensaje de felicitaciones
    const restartContainer = document.getElementById('restartContainer');
    if (restartContainer) {
        restartContainer.style.display = 'none';
    }

    // Crear o mostrar contenedor de la Fase 2
    let phaseTwoContainer = document.getElementById('phaseTwoContainer');
    if (!phaseTwoContainer) {
        phaseTwoContainer = document.createElement('div');
        phaseTwoContainer.id = 'phaseTwoContainer';
        phaseTwoContainer.className = 'phase-two-container';

        const gameContainer = document.querySelector('.game-container');
        const progressSection = document.querySelector('.progress-section');
        gameContainer.insertBefore(phaseTwoContainer, progressSection);
    }

    phaseTwoContainer.style.display = 'flex';
    updatePhaseTwoContent();
}

function updatePhaseTwoContent() {
    const phaseTwoContainer = document.getElementById('phaseTwoContainer');
    const message = phaseTwoMessages[currentPhaseTwoIndex];

    // Actualizar imagen de la fase 2
    const revealImage = document.getElementById('revealImage');
    revealImage.src = message.image;

    phaseTwoContainer.innerHTML = `
        <div class="phase-two-content">
            <h2 class="phase-title">${message.title}</h2>
            <p class="phase-text">${message.text}</p>
            <div class="phase-footer">
                <button id="phaseTwoNextBtn" class="next-btn">
                    ${currentPhaseTwoIndex < phaseTwoMessages.length - 1 ? 'Siguiente ✨' : 'Finalizar 💕'}
                </button>
            </div>
        </div>
    `;

    document.getElementById('phaseTwoNextBtn').addEventListener('click', handlePhaseTwoNext);
}

function handlePhaseTwoNext() {
    if (currentPhaseTwoIndex < phaseTwoMessages.length - 1) {
        currentPhaseTwoIndex++;
        updatePhaseTwoContent();
    } else {
        // Ejecutar API de finalización (sin esperar datos)
        fetch('https://argott.up.railway.app/api/end-date')
            .catch(err => console.error('Error al llamar al API de finalización:', err));

        Swal.fire({
            title: '¡Te amo infinitamente! 🐼💕',
            text: 'Espero que te haya gustado esta pequeña sorpresa. Eres mi todo.',
            icon: 'success',
            confirmButtonText: 'Terminar Juego',
            confirmButtonColor: '#e91e63'
        }).then(() => {
            localStorage.removeItem('currentUser');
            setTimeout(() => {
                window.location.href = 'index.html';
            }, 3000);
        });
    }
}

function restartGame() {
    currentQuestionIndex = 0;
    correctAnswers = 0;
    selectedOption = null;
    gameCompleted = false;
    correctlyAnsweredQuestions = []; // Reiniciar preguntas respondidas

    // Mezclar preguntas al reiniciar
    shuffledQuestions = shuffleArray(questions);
    availableQuestions = [...shuffledQuestions]; // Inicializar con todas las preguntas mezcladas

    // Mostrar sección de preguntas
    const questionsSection = document.querySelector('.questions-section');
    questionsSection.style.display = 'block';

    // Ocultar botón de reiniciar y fase 2
    const restartContainer = document.getElementById('restartContainer');
    if (restartContainer) {
        restartContainer.style.display = 'none';
    }

    const phaseTwoContainer = document.getElementById('phaseTwoContainer');
    if (phaseTwoContainer) {
        phaseTwoContainer.style.display = 'none';
    }

    // Resetear progreso e imagen
    document.getElementById('progressFill').style.width = '0%';
    document.getElementById('progressText').textContent = '0%';
    document.getElementById('imageOverlay').style.background = 'rgba(44, 62, 80, 0.9)';
    document.getElementById('imageOverlay').style.display = 'block';
    document.getElementById('revealImage').src = 'assets/mi_linda.png';

    // Reactivar opciones
    document.querySelectorAll('.option').forEach(option => {
        option.style.pointerEvents = 'auto';
    });

    loadQuestion();
}

// === INICIALIZACIÓN DEL DASHBOARD ===
function initializeDashboard() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));

    if (!currentUser) {
        window.location.href = 'index.html';
        return;
    }

    // Configurar información del usuario
    const welcomeMessage = currentUser.role === 'admin'
        ? `Bienvenido ${currentUser.displayName}`
        : `Bienvenida ${currentUser.displayName}`;

    document.getElementById('userWelcome').textContent = welcomeMessage;
    document.getElementById('currentDate').textContent = getCurrentDate();

    // Mezclar preguntas al iniciar
    shuffledQuestions = shuffleArray(questions);
    availableQuestions = [...shuffledQuestions]; // Inicializar preguntas disponibles

    // Inicializar juego
    loadQuestion();
}

// === EVENT LISTENERS ===
document.addEventListener('DOMContentLoaded', function () {
    // Verificar si estamos en dashboard
    if (!window.location.pathname.includes('dashboard.html')) {
        return;
    }

    initializeDashboard();

    // Formulario de inversión
    const investmentForm = document.getElementById('investmentForm');
    if (investmentForm) {
        investmentForm.addEventListener('submit', handleInvestmentCalculation);
    }

    // Botón limpiar
    const clearBtn = document.getElementById('clearBtn');
    if (clearBtn) {
        clearBtn.addEventListener('click', clearAllResults);
    }

    // Botón filtros (placeholder)
    const filterBtn = document.getElementById('filterBtn');
    if (filterBtn) {
        filterBtn.addEventListener('click', function () {
            Swal.fire({
                icon: 'info',
                title: 'Función en desarrollo',
                text: 'Los filtros estarán disponibles próximamente',
                confirmButtonColor: '#3498db'
            });
        });
    }

    // Event listeners para las opciones
    document.querySelectorAll('.option').forEach(option => {
        option.addEventListener('click', function () {
            const optionLetter = this.getAttribute('data-option');
            selectOption(optionLetter);
        });
    });

    // Event listener para el botón de confirmar
    const confirmBtn = document.getElementById('confirmBtn');
    if (confirmBtn) {
        confirmBtn.addEventListener('click', confirmAnswer);
    }

    // Botón de logout
    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', logout);
    }
});

// === MANEJO DE ERRORES ===
window.addEventListener('error', function (e) {
    console.error('Error en dashboard:', e.error);
});

// Prevenir pérdida de datos
window.addEventListener('beforeunload', function () {
    // Cualquier limpieza necesaria antes de salir
});