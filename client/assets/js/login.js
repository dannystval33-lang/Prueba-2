document.addEventListener('DOMContentLoaded', () => {

    const loginForm = document.getElementById('loginForm')
    const emailInput = document.getElementById('email')
    const passwordInput = document.getElementById('password')
    const emailError = document.getElementById('emailError')
    const passwordError = document.getElementById('passwordError')
    const globalMessage = document.getElementById('globalMessage')

    const USUARIO = 'admin@mail.com';
    const PASSWORD = '123asd';
    const nombreUsuario = 'Dany';

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    const showError = (inputElement, errorElement, message) => {
        inputElement.classList.add('input-error');
        errorElement.textContent = message;
        errorElement.classList.add('visible');
    }

    const clearError = (inputElement, errorElement) => {
        inputElement.classList.remove('input-error');
        errorElement.textContent = '';
        errorElement.classList.remove('visible');
    }

    const clearGlobaleMessage = () => {
        globalMessage.textContent = '';
        globalMessage.className = 'global-message';
    };

    emailInput.addEventListener('input', () => {
        clearError(emailInput, emailError);
        clearGlobaleMessage();
    });

    passwordInput.addEventListener('input', () => {
        clearError(passwordInput, passwordError);
        clearGlobaleMessage();
    });

    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const emailValue = emailInput.value.trim();
        const passwordValue = passwordInput.value.trim();

        let isFormValid = true;

        // Validar correo
        if (emailValue === '') {
            showError(emailInput, emailError, 'El correo es obligatorio');
            isFormValid = false;
        } 
        else if (!emailRegex.test(emailValue)) {
            showError(emailInput, emailError, 'Ingresa un formato de correo válido');
            isFormValid = false;
        }
        else {
            clearError(emailInput, emailError);
        }

        // Validar contraseña
        if (passwordValue === '') {
            showError(passwordInput, passwordError, 'La contraseña es obligatoria');
            isFormValid = false;
        } else {
            clearError(passwordInput, passwordError);
        }

        if (!isFormValid) {
            return;
        }

        if (emailValue === USUARIO && passwordValue === PASSWORD) {
            globalMessage.textContent = '¡Inicio de sesión exitoso! Redirigiendo...';
            globalMessage.classList.add('success');

            localStorage.setItem("nombreUsuario", nombreUsuario);

            setTimeout(() => { 
                window.location.href = '../pages/dashboard.html'; 
            }, 500);
        } else {
            globalMessage.textContent = 'Correo o contraseña incorrectos.';
            globalMessage.classList.add('error');
        }
    });

});
