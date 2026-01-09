// === VARIABLES GLOBALES DEL JUEGO ===
let currentQuestionIndex = 0;
let correctAnswers = 0;
let selectedOption = null;
let gameCompleted = false;
let shuffledQuestions = [];
let correctlyAnsweredQuestions = []; // Array para rastrear preguntas respondidas correctamente
let availableQuestions = []; // Array de preguntas disponibles para mostrar

// === PREGUNTAS DEL JUEGO ===
const questions = [
    {
        id: 1,
        question: "¿Cuál fue el primer lugar al que fuimos juntos en nuestra primera cita?",
        options: {
            A: "Un restaurante italiano",
            B: "El parque central",
            C: "El cine del centro comercial",
            D: "Una cafetería cerca de la universidad"
        },
        correct: "B",
        explanation: "¡Correcto! Nuestro primer encuentro fue en ese hermoso parque donde hablamos por horas."
    },
    {
        id: 2,
        question: "¿Cuál es mi color favorito que siempre mencionas que me queda perfecto?",
        options: {
            A: "Azul cielo",
            B: "Verde esmeralda", 
            C: "Rosado pastel",
            D: "Morado lavanda"
        },
        correct: "A",
        explanation: "¡Exacto! Siempre dices que el azul cielo resalta mis ojos y me hace ver radiante."
    },
    {
        id: 3,
        question: "¿Cuál es mi comida favorita que siempre pido cuando salimos a cenar?",
        options: {
            A: "Pizza margarita",
            B: "Sushi de salmón",
            C: "Pasta carbonara",
            D: "Tacos al pastor"
        },
        correct: "B",
        explanation: "¡Perfecto! El sushi de salmón es mi debilidad y siempre lo elijo cuando vamos a nuestro restaurante japonés favorito."
    },
    {
        id: 4,
        question: "¿Qué es lo que más me gusta hacer contigo en nuestros fines de semana?",
        options: {
            A: "Ver películas románticas en casa",
            B: "Ir de compras al centro comercial",
            C: "Caminar por la playa al atardecer",
            D: "Cocinar juntos algo nuevo"
        },
        correct: "C",
        explanation: "¡Así es! Nuestras caminatas por la playa viendo el atardecer son nuestros momentos más especiales y románticos."
    },
    {
        id: 5,
        question: "¿Cuál es el apodo cariñoso que más me gusta que me digas?",
        options: {
            A: "Mi amor",
            B: "Princesa",
            C: "Corazón",
            D: "Mi vida"
        },
        correct: "B",
        explanation: "¡Correcto! Me derrites cada vez que me dices 'Princesa' con esa sonrisa tuya tan tierna."
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
            showCompletionView();
        } else {
            restartGame();
        }
    });
}

function showCompletionView() {
    // Ocultar sección de preguntas
    const questionsSection = document.querySelector('.questions-section');
    questionsSection.style.display = 'none';
    
    // Crear y mostrar botón de reiniciar
    createRestartButton();
}

function createRestartButton() {
    // Verificar si ya existe el botón
    let restartContainer = document.getElementById('restartContainer');
    if (restartContainer) {
        restartContainer.style.display = 'block';
        return;
    }
    
    // Crear contenedor del botón de reiniciar
    restartContainer = document.createElement('div');
    restartContainer.id = 'restartContainer';
    restartContainer.className = 'restart-container';
    
    restartContainer.innerHTML = `
        <div class="completion-message">
            <h2>🎉 ¡Felicitaciones! 🎉</h2>
            <p>¡Has completado el juego perfectamente!<br>
            Ahora puedes disfrutar de la imagen completa.</p>
            <button id="restartGameBtn" class="restart-btn">
                🔄 Jugar de Nuevo
            </button>
        </div>
    `;
    
    // Agregar al contenedor principal antes de la sección de progreso
    const gameContainer = document.querySelector('.game-container');
    const progressSection = document.querySelector('.progress-section');
    gameContainer.insertBefore(restartContainer, progressSection);
    
    // Agregar event listener al botón
    document.getElementById('restartGameBtn').addEventListener('click', restartGame);
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
    
    // Ocultar botón de reiniciar
    const restartContainer = document.getElementById('restartContainer');
    if (restartContainer) {
        restartContainer.style.display = 'none';
    }
    
    // Resetear progreso
    document.getElementById('progressFill').style.width = '0%';
    document.getElementById('progressText').textContent = '0%';
    document.getElementById('imageOverlay').style.background = 'rgba(44, 62, 80, 0.9)';
    document.getElementById('imageOverlay').style.display = 'block';
    
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
document.addEventListener('DOMContentLoaded', function() {
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
        filterBtn.addEventListener('click', function() {
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
        option.addEventListener('click', function() {
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
window.addEventListener('error', function(e) {
    console.error('Error en dashboard:', e.error);
});

// Prevenir pérdida de datos
window.addEventListener('beforeunload', function() {
    // Cualquier limpieza necesaria antes de salir
});