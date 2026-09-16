// importamos React y useState para manejar el estado del formulario
import { useState } from 'react';
import { loginRequest } from '../services/empresaServices'; // Importamos la función para realizar la solicitud de inicio de sesión

// Componente que constrola el formulario de inicio de sesión y la autenticación del usuario
export const Login = ({ onLoginSuccess }) => {
  const [correo, setCorreo] = useState('');
  const [contraseña, setContraseña] = useState('');
  const [error, setError] = useState('');
  const [cargando, setCargando] = useState(false);

  // Función que se ejecuta al enviar el formulario
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setCargando(true);

    try {
      // Enviamos las credenciales a la API
      const respuesta = await loginRequest(correo, contraseña);

      // Guardamos el token en localStorage para mantener la sesión
      localStorage.setItem('token', respuesta.token);

      // Notificamos al componente que la autenticación fue exitosa
      if (onLoginSuccess) {
        onLoginSuccess(respuesta.usuario);
      }
    } catch (err) {
      // Axios captura la respuesta de error del backend (ej. 401 Contraseña incorrecta)
      const mensajeError = err.response?.data?.error || 'Error al conectar con el servidor';
      setError(mensajeError);
    } finally {
      setCargando(false);
    }
  };

  // Renderizamos el formulario de inicio de sesión
  return (
    <div style={{ maxWidth: '400px', margin: '50px auto', padding: '20px', border: '1px solid #ccc', borderRadius: '8px' }}>
      <h2>Iniciar Sesión</h2>

      {error && (
        <div style={{ color: 'red', marginBottom: '15px', padding: '8px', backgroundColor: '#ffe6e6', borderRadius: '4px' }}>
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px' }}>Correo electrónico:</label>
          <input
            type="correo"
            value={correo}
            onChange={(e) => setCorreo(e.target.value)}
            required
            placeholder="profesor@correo.com"
            style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
          />
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px' }}>Contraseña:</label>
          <input
            type="contraseña"
            value={contraseña}
            onChange={(e) => setContraseña(e.target.value)}
            required
            placeholder="••••••••"
            style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
          />
        </div>

        <button 
          type="submit" 
          disabled={cargando}
          style={{ width: '100%', padding: '10px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
        >
          {cargando ? 'Ingresando...' : 'Ingresar'}
        </button>
      </form>
    </div>
  );
};