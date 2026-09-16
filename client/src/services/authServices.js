import api from './api'; // Funcion para obtener el token de autenticación y realizar la solicitud de inicio de sesión

export const login = async (correo, contraseña) => { 
    // Realizamos el post a la ruta de inicio de sesión de nuestra API, pasando el email y la contraseña como datos
    const response = await api.post('/auth/login', { correo, contraseña });
    // Axios devuelve la respuesta completa, pero solo retornamos { menaje, usuario, token } que es lo que nos interesa, ya que el token lo vamos a guardar en el localStorage para usarlo en futuras solicitudes
    return response.data;
}  
