import { useState } from 'react';
import { Login } from './components/login.jsx';
import { EmpresasDashboard } from './components/empresaDashboard.jsx';

export default function App() {
  // Comprobamos si ya existe un token en el navegador para iniciar con la sesión activa
  const [token, setToken] = useState(() => localStorage.getItem('token'));
  const [usuario, setUsuario] = useState(null);

  // Manejador cuando el inicio de sesión es correcto
  const handleLoginSuccess = (datosUsuario) => {
    const tokenGuardado = localStorage.getItem('token');
    setToken(tokenGuardado);
    setUsuario(datosUsuario);
  };

  // Manejador para cerrar sesión
  const handleLogout = () => {
    localStorage.removeItem('token');
    setToken(null);
    setUsuario(null);
  };

  return (
    <div>
      {!token ? (
        <Login onLoginSuccess={handleLoginSuccess} />
      ) : (
        <EmpresasDashboard usuario={usuario} onLogout={handleLogout} />
      )}
    </div>
  );
}