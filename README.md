# 🐼💕 Juego Especial - Preguntas Románticas

Un juego de preguntas personalizado creado con amor para poner a prueba qué tanto conoces a tu pareja.

## 🎮 ¿Qué es esto?

Es una aplicación web interactiva donde tu novia/novio debe responder preguntas sobre vuestra relación para revelar una imagen especial. Solo las respuestas correctas permiten avanzar en el progreso.

## ✨ Características

- 🔐 **Acceso protegido** - Solo quien conoce las credenciales puede entrar
- 🎯 **5 preguntas** personalizables sobre vuestra relación
- 🖼️ **Imagen progresiva** - Se revela gradualmente con cada respuesta correcta
- 🔄 **Preguntas aleatorias** - El orden cambia en cada partida
- ❌ **No avance con errores** - Solo las respuestas correctas cuentan
- 📱 **Responsive** - Funciona perfectamente en móviles y tablets
- 🎨 **Tema adorable** - Diseño con pandas y colores románticos

## 🚀 Cómo usar

1. **Abre `index.html`** en tu navegador
2. **Ingresa las credenciales:**
   - Usuario: `LoMasLindo`
   - Contraseña: La fecha de vuestra primera cita
3. **Responde las preguntas** una por una
4. **Disfruta** viendo la imagen revelarse con cada acierto
5. **¡Celebra!** cuando completes el 100%

## 🛠️ Estructura del proyecto

```
app/
├── index.html          # Página de login
├── dashboard.html      # Juego principal
├── styles.css          # Estilos responsive
├── auth.js            # Sistema de autenticación
├── dashboard.js       # Lógica del juego
├── assets/
│   └── mi_linda.png   # Imagen a revelar
└── README.md          # Este archivo
```

## 🔧 Personalizar el juego

### Cambiar preguntas
Edita el array `questions` en `dashboard.js`:

```javascript
const questions = [
    {
        id: 1,
        question: "Tu pregunta aquí?",
        options: {
            A: "Opción A",
            B: "Opción B", 
            C: "Opción C",
            D: "Opción D"
        },
        correct: "B",
        explanation: "Explicación de la respuesta correcta"
    }
    // Agregar más preguntas...
];
```

### Cambiar credenciales
Modifica `auth.js` en la función de validación:

```javascript
if (username === 'TuUsuario' && password === 'TuPassword') {
    // Acceso permitido
}
```

### Cambiar imagen
Reemplaza `assets/mi_linda.png` con tu imagen especial.

## 💝 Creado con amor

Este proyecto fue desarrollado como un regalo romántico personalizado. ¡Siéntete libre de usarlo como inspiración para crear tu propia versión!

---

*"El amor está en los pequeños detalles"* 🐼💕