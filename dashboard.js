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
        title: "Donde todo empezó",
        text: "Todo comenzó cuando tomé el valor de hablarte en aquel lugar donde muchas veces cruzamos caminos. <br>Deseaba tanto conocerte...<br>" +
            "Me sentía nervioso, quería que pareciera algo casual, pero me fue difícil disimularlo, no sentía esa emoción desde hacía mucho tiempo. Y me dio tanta felicidad cuando dijiste que sí. <br>" +
            "Aún guardo ese recuerdo con mucho cariño, al final de la cita, aunque para ti fue rara, para mí fue especial. Terminó cambiando mi mundo... <br>" +
            "Recordar esos primeros momentos siempre me traerá una sonrisa.<br>" +
            "Fue para mí el inicio de una historia bonita que disfruté vivir.",
        image: "assets/0.jpg"
    },
    {
        title: "Lo hermoso que encontré en ti",
        text: "Vi cómo nuestro amor crecía día tras día, llenando mi vida de felicidad. Cada conversación, cada momento, " +
            "cada mirada, las risas, los abrazos, tus ocurrencias y los sueños compartidos fueron sembrando ilusión en mí, " +
            "porque en ti vi a una gran persona, una gran mujer y la posibilidad de un futuro juntos.<br>" +
            "Aunque lo hablábamos sin que fuera algo serio, me diste la ilusión de que algún día podría tener una familia a tu lado, " +
            "y lo deseaba de verdad. Aún deseaba vivir y experimentar muchas cosas contigo: viajes, nuevos momentos, " +
            "etapas bonitas y todo lo que la vida nos hubiera permitido compartir.<br>" +
            "Amarte me encantó, y todos esos recuerdos quedarán en mí como tesoros en el tiempo.",
        image: "assets/1.jpg",
        image2: "assets/2.jpg"
    },
    {
        title: "Lo bonito de recordarte",
        text: "Sé que me perseguirán los pequeños detalles: las canciones que escuchábamos, las actividades que compartimos, " +
            "los lugares que recorrimos de la mano, ciertas palabras y conversaciones, las bromas que solo nosotros entendíamos, " +
            "algunas fechas, incluso objetos y momentos que me traerán tu recuerdo sin avisar. Extrañaré todo eso y más: tus caritas, tus gestos, " +
            "tus risas y esa forma tuya de alegrar mis días. Eras mi motivación para iniciar cada día; verte y saludarte en las mañanas " +
            "era de lo más bonito. Recuerdo hacer tiempo en el parqueadero solo para verte un instante... " +
            "Y finalizar el día recibiendo tu mensaje de buenas noches me encantaba... <br>" +
            "Cada vez que algo me recuerde a ti, lo haré con cariño, con una sonrisa desde el corazón por haber compartido una parte de mi vida contigo.",
        image: "assets/3.jpg",
        image2: "assets/4.jpg",
        image3: "assets/5.jpg",
    },
    {
        title: "Intentarlo contigo valía la pena",
        text: "No todo fue perfecto. Hubo cosas que no me gustaban del todo, situaciones que a veces me costaba entender o aceptar, pero nunca fueron algo determinante para dejar atrás todo lo que estábamos construyendo. Tampoco quería sobrepensar las cosas demasiado ni actuar basándome en suposiciones. Al contrario, pensaba que eran situaciones que podían manejarse, y poco a poco sentía que me iba acoplando, aprendiendo a vivir una relación distinta a cualquier otra que había tenido antes, porque para mí valía la pena intentarlo contigo. <br>" +
            "Algunas veces también me sentí confundido, porque llegué a sentir que ciertas cosas que hacía o decía eran tomadas de una manera distinta a la intención con la que realmente las hacía. A veces sentía que entraba en comparaciones o que cargaba con expectativas, heridas o experiencias que otra persona dejó en ti, no lo sé, tal vez solo eran impresiones mías pero en ocasiones eso me hacía cohibirme para no lastimarte ni generar malestar. <br>" +
            "También sé que yo no soy alguien perfecto. Tengo mis errores, mis maneras y muchas cosas por mejorar, pero de verdad quería cambiar y ser una mejor versión de mí para ti. Lamento si no fue suficiente; créeme que lo intentaba de corazón. <br>" +
            "Agradezco tu cariño, tu apoyo y tus consejos cuando los necesitaba. En tus palabras y en tu forma de ser encontraba paz, tranquilidad, ilusión y felicidad. A tu lado me sentía bien. <br>" +
            "Yo también quería que sintieras lo mismo conmigo en cada detalle, al cuidarte, apoyarte y darte todo el cariño y el amor posible. <br>" +
            "Recuerdo aquel día en que me pediste que siempre siguiera siendo así, y te prometí hacerlo. Espero haber cumplido esa promesa, no solo por haberla dicho, sino porque de verdad contigo me nacía ser así y dar lo mejor de mí. <br>" +
            "En ti vi a la mujer que siempre quise tener a mi lado, alguien con quien podía formar una familia y compartir lo hermoso de la vida. <br>" +
            "Te adoré y decidí amarte por encima de muchas cosas...<br>" +
            "<b>Quería una vida contigo.</b>",
        image: "assets/6.jpg",
        image2: "assets/7.jpg",
        image3: "assets/8.jpg",
        image4: "assets/9.png",
        image5: "assets/10.jpg",
        image6: "assets/11.png",
        image7: "assets/12.jpg"

    },
    {
        title: "Cuando todo tomó otro rumbo",
        text: "...al final las cosas no se dieron como esperaba. <br>" +
            "Quedaron muchas cosas que aún deseaba vivir contigo. <br>" +
            "Aun así, fue algo bonito, fugaz y lo suficientemente especial para mí.",
        image: "assets/12.jpg"
    },
    {
        title: "Gracias por todo",
        text: "...Ante mis ojos fuiste arte, una verdadera obra de arte. <br>" +
            "Gracias por todos los momentos vividos, por las sonrisas, por los sueños compartidos y por cada instante que vivimos juntos. <br>" +
            "Te deseo de corazón que todas tus metas, tus sueños y cada objetivo que tengas se cumplan, porque mereces cosas bonitas y una vida llena de felicidad. Que Dios te bendiga y te acompañe siempre en cada paso que des. <br>" +
            "Voy a extrañarte, mi linda, extrañaré tu presencia, tus risas y todo eso especial que llevabas contigo. <br>" +
            "Siempre te recordaré con cariño y con gratitud por todo lo bonito que dejaste en mi vida.",
        image: "assets/13.jpg",
        image2: "assets/14.jpg",
        image3: "assets/15.jpg",
        image4: "assets/16.jpg"
    },
    {
        title: "Fin",
        text: "Mi linda, mi hermosa, mi preciosa, mi cosita divina, mi amor bonita..." +
            "<br><br><br><br><b>Adiós.</b>" +
            "<br><br><br><br><br>NOTA: aléjate de OnlyFans 🤭",
        image: "assets/17.png"
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
        explanation: "¡Correcto! Nuestro primer encuentro fue en aquel lugar y, aunque para ti fue una cita rara, para mí fue algo distinto; lo recuerdo con mucho cariño."
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
        explanation: "¡Exacto! Todas esas cualidades me encantan de ti y hacen que seas alguien muy especial para mí."
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
        explanation: "¡Correcto! Tus hermosos ojazos me encantan me pierdo en ellos y por supuesto también tus NALGUITAS, tu sonrisa y toda todita tuuuuuuuuuuu me encantas!!!."
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
        explanation: "¡Siií! Todo me gusta, pero nuestros momentos viendo películas y series en casa son de mis favoritos, por la tranquilidad, la cercanía y la conexión especial que compartimos."
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
        // Hacer la imagen clickeable para zoom
        const revealImage = document.getElementById('revealImage');
        revealImage.style.cursor = 'zoom-in';
        revealImage.title = 'Haz clic para ampliar';
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

    // Ocultar el contenedor de progreso en la Fase 2
    const progressContainer = document.querySelector('.progress-container');
    if (progressContainer) {
        progressContainer.style.display = 'none';
    }

    updatePhaseTwoContent();
}

function updatePhaseTwoContent() {
    const phaseTwoContainer = document.getElementById('phaseTwoContainer');
    const message = phaseTwoMessages[currentPhaseTwoIndex];

    const imageContainer = document.querySelector('.image-container');
    imageContainer.innerHTML = ''; // Limpiar contenedor

    // Obtener todas las imágenes disponibles
    const images = [message.image, message.image2, message.image3, message.image4, message.image5, message.image6].filter(img => img);

    // Activar modo collage si hay más de una imagen
    if (images.length > 1) {
        imageContainer.classList.add('collage-mode');
    } else {
        imageContainer.classList.remove('collage-mode');
    }

    images.forEach((imgSrc, index) => {
        if (images.length > 1) {
            // Estilo collage (fotos desordenadas)
            const frame = document.createElement('div');
            frame.className = 'photo-frame extra-phase-image';

            // Rotación aleatoria entre -6 y 6 grados
            const rot = (Math.random() * 12 - 6).toFixed(2);
            frame.style.transform = `rotate(${rot}deg)`;

            const img = document.createElement('img');
            img.src = imgSrc;
            img.style.cursor = 'zoom-in';
            img.title = 'Haz clic para ampliar';
            img.addEventListener('click', () => openZoom(imgSrc));

            frame.appendChild(img);
            imageContainer.appendChild(frame);
        } else {
            // Estilo normal (una sola imagen)
            const img = document.createElement('img');
            img.id = 'revealImage';
            img.src = imgSrc;
            img.className = 'reveal-image';
            img.style.cursor = 'zoom-in';
            img.title = 'Haz clic para ampliar';
            img.addEventListener('click', () => openZoom(imgSrc));
            imageContainer.appendChild(img);

            // Mantener el overlay (oculto) para compatibilidad
            const overlay = document.createElement('div');
            overlay.id = 'imageOverlay';
            overlay.className = 'image-overlay';
            overlay.style.display = 'none';
            imageContainer.appendChild(overlay);
        }
    });

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
        // Ejecutar API de finalización
        const currentUser = JSON.parse(localStorage.getItem('currentUser'));
        if (currentUser && currentUser.role !== 'admin') {
            fetch('https://argott.up.railway.app/api/end-date')
                .catch(err => console.error('Error al llamar al API de finalización:', err));
        }

        Swal.fire({
            title: 'Gracias por tanto...<br><b>Mi amor bonita</b>',
            html: 'Esta fue mi última carta para ti<br>con todo mi amor y cariño...<br><br><b>Tu ex-vecino 😊</b>',
            confirmButtonText: 'Terminar',
            confirmButtonColor: '#2c3e50'
        }).then(() => {
            localStorage.removeItem('currentUser');
            setTimeout(() => {
                window.location.href = 'index.html';
            }, 2000);
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

    // Mostrar el contenedor de progreso al reiniciar
    const progressContainer = document.querySelector('.progress-container');
    if (progressContainer) {
        progressContainer.style.display = 'block';
    }

    // Resetear progreso e imagen
    document.getElementById('progressFill').style.width = '0%';
    document.getElementById('progressText').textContent = '0%';

    // Restaurar estructura original de imagen
    const imageContainer = document.querySelector('.image-container');
    imageContainer.classList.remove('collage-mode');
    imageContainer.innerHTML = `
        <img id="revealImage" src="assets/mi_linda.png" alt="Imagen Especial" class="reveal-image">
        <div class="image-overlay" id="imageOverlay"></div>
    `;

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

function openZoom(src) {
    const zoomModal = document.getElementById('imageZoomModal');
    const zoomedImg = document.getElementById('zoomedImage');
    if (zoomModal && zoomedImg) {
        zoomModal.style.display = "block";
        zoomedImg.src = src;
        document.body.style.overflow = 'hidden';
    }
}

// === EVENT LISTENERS ===
document.addEventListener('DOMContentLoaded', function () {
    // Verificar si estamos en dashboard
    if (!window.location.pathname.includes('dashboard.html')) {
        return;
    }

    initializeDashboard();

    // ... (filtros y otros botones)

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

    // Funcionalidad de Zoom de Imagen
    const revealImage = document.getElementById('revealImage');
    const zoomModal = document.getElementById('imageZoomModal');
    const closeZoom = document.querySelector('.close-zoom');

    if (revealImage && zoomModal) {
        revealImage.addEventListener('click', function () {
            // Solo permitir zoom si el progreso es 100% o estamos en fase 2
            const progress = (correctAnswers / shuffledQuestions.length) * 100;
            if (progress >= 100 || gameCompleted) {
                openZoom(this.src);
            }
        });

        closeZoom.addEventListener('click', function () {
            zoomModal.style.display = "none";
            document.body.style.overflow = 'auto';
        });

        zoomModal.addEventListener('click', function (e) {
            if (e.target === zoomModal) {
                zoomModal.style.display = "none";
                document.body.style.overflow = 'auto';
            }
        });
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