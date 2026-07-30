document.addEventListener('DOMContentLoaded', () => {
    
    const userNameElement = document.getElementById('userName');
    const nombreUsuario = localStorage.getItem("nombreUsuario");

    if (!nombreUsuario) {
        window.location.href = '../indexx.html'; 
        return;
    }

    userNameElement.textContent = nombreUsuario;

});