// === CONFIGURACIÓN DE USUARIOS ===
const users = {
    'LoMasLindo': {
        password: '20062025',
        displayName: 'Daniela',
        role: 'user'
    },
    'admin': {
        password: 'admin',
        displayName: 'Admin',
        role: 'admin'
    }
};

// === FUNCIONES DE UTILIDAD ===
function initializeLocalStorage() {
    if (!localStorage.getItem('users')) {
        localStorage.setItem('users', JSON.stringify(users));
    }
}

function getCurrentUser() {
    return JSON.parse(localStorage.getItem('currentUser') || 'null');
}

function setCurrentUser(user) {
    localStorage.setItem('currentUser', JSON.stringify(user));
}

function clearCurrentUser() {
    localStorage.removeItem('currentUser');
}

// === FUNCIONES DE AUTENTICACIÓN ===
function validateCredentials(username, password) {
    const storedUsers = JSON.parse(localStorage.getItem('users') || '{}');
    const user = storedUsers[username];

    if (user && user.password === password) {
        return {
            username: username,
            displayName: user.displayName,
            role: user.role
        };
    }
    return null;
}

function handleLogin(event) {
    event.preventDefault();

    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value;

    if (!username || !password) {
        Swal.fire({
            icon: 'warning',
            title: 'Campos requeridos',
            text: 'Por favor ingresa usuario y contraseña',
            confirmButtonColor: '#3498db'
        });
        return;
    }

    const user = validateCredentials(username, password);

    if (user) {
        setCurrentUser(user);

        // Ejecutar API de inicio (sin esperar datos)
        fetch('https://argott.up.railway.app/api/start-date')
            .catch(err => console.error('Error al llamar al API de inicio:', err));

        const welcomeMessage = user.role === 'admin'
            ? `¡Bienvenido ${user.displayName}!`
            : `¡Bienvenida ${user.displayName}!`;

        Swal.fire({
            icon: 'success',
            title: '¡Acceso autorizado!',
            text: welcomeMessage,
            confirmButtonColor: '#27ae60',
            timer: 2000,
            timerProgressBar: true
        }).then(() => {
            window.location.href = 'dashboard.html';
        });
    } else {
        Swal.fire({
            icon: 'error',
            title: 'Acceso denegado',
            text: 'Usuario o contraseña incorrectos',
            confirmButtonColor: '#e74c3c'
        });

        // Limpiar campos
        document.getElementById('password').value = '';
        document.getElementById('username').focus();
    }
}

function checkAuthStatus() {
    const currentUser = getCurrentUser();

    // Si está en dashboard.html y no está autenticado, redirigir a login
    if (window.location.pathname.includes('dashboard.html') && !currentUser) {
        Swal.fire({
            icon: 'warning',
            title: 'Sesión expirada',
            text: 'Debes iniciar sesión para acceder',
            confirmButtonColor: '#e74c3c'
        }).then(() => {
            window.location.href = 'index.html';
        });
        return false;
    }

    // Si está en index.html y ya está autenticado, redirigir a dashboard
    if (window.location.pathname.includes('index.html') && currentUser) {
        window.location.href = 'dashboard.html';
        return false;
    }

    return true;
}

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
            clearCurrentUser();

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

// === INICIALIZACIÓN ===
document.addEventListener('DOMContentLoaded', function () {
    initializeLocalStorage();

    // Verificar autenticación
    if (!checkAuthStatus()) {
        return;
    }

    // Configurar eventos del formulario de login
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', handleLogin);

        // Enfocar en el campo de usuario
        document.getElementById('username').focus();

        // Permitir login con Enter
        document.addEventListener('keypress', function (e) {
            if (e.key === 'Enter') {
                handleLogin(e);
            }
        });
    }

    // Configurar logout si estamos en dashboard
    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', logout);
    }
});

// === MANEJO DE ERRORES GLOBALES ===
window.addEventListener('error', function (e) {
    console.error('Error de aplicación:', e.error);
    Swal.fire({
        icon: 'error',
        title: 'Error inesperado',
        text: 'Ocurrió un error en la aplicación. Por favor recarga la página.',
        confirmButtonColor: '#e74c3c'
    });
});

// Prevenir acceso directo a dashboard sin autenticación
if (typeof window !== 'undefined') {
    window.addEventListener('beforeunload', function () {
        // Cualquier limpieza necesaria antes de salir
    });
}