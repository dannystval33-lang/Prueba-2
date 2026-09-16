import api from './api';

// Función para iniciar sesión
export const loginRequest = async (correo, contraseña) => {
    const response = await api.post('/auth/login', {
        correo,
        contraseña
    });

    return response.data;
};

// Función para obtener las empresas
export const obtenerEmpresasRequest = async () => {
    const response = await api.get('/empresas');

    return response.data;
};