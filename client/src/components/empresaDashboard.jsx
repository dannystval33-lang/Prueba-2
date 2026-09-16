// Importamos React y funciones necesarias cargar las fichas desde el backend
import { useEffect, useState } from 'react';
import { obtenerEmpresasRequest } from '../services/empresaServices';

// Componente que muestra el dashboard de empresas y permite cerrar sesión
export const EmpresasDashboard = ({ usuario, onLogout }) => {
  const [empresas, setEmpresas] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState('');

  // Cargamos las empresas al montar el componente
  useEffect(() => {
    cargarEmpresas();
  }, []);

  const cargarEmpresas = async () => {
    try {
      setCargando(true);
      setError('');
      // Ejecutamos la petición protegida (el token se envía automáticamente por Axios)
      const datos = await obtenerEmpresasRequest();
      setEmpresas(datos);
    } catch (err) {
      const mensajeError = err.response?.data?.error || 'Error al obtener las empresas';
      setError(mensajeError);
    } finally {
      setCargando(false);
    }
  };

  const handleLogout = () => {
    // Eliminamos el token guardado en el cliente
    localStorage.removeItem('token');
    if (onLogout) {
      onLogout();
    }
  };

  // Renderizamos el dashboard con la lista de fichas y el botón de cerrar sesión
  return (
    <div style={{ maxWidth: '800px', margin: '30px auto', padding: '20px' }}>
      {/* Encabezado del Dashboard */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h2>Dashboard de empresas</h2>
        <div>
          <span style={{ marginRight: '15px' }}>
            Bienvenido, <strong>{usuario?.nombre || 'Usuario'}</strong>
          </span>
          <button 
            onClick={handleLogout}
            style={{ padding: '8px 12px', backgroundColor: '#dc3545', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
          >
            Cerrar Sesión
          </button>
        </div>
      </div>

      {/* Mensaje de Error */}
      {error && (
        <div style={{ color: 'red', marginBottom: '15px', padding: '10px', backgroundColor: '#ffe6e6', borderRadius: '4px' }}>
          {error}
        </div>
      )}

      {/* Estado de Carga */}
      {cargando ? (
        <p>Cargando empresas desde el servidor...</p>
      ) : (
        /* Tabla de Empresas */
        <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '10px' }}>
          <thead>
            <tr style={{ backgroundColor: '#f2f2f2', textAlign: 'left' }}>
              <th style={{ padding: '10px', border: '1px solid #ddd' }}>ID</th>
              <th style={{ padding: '10px', border: '1px solid #ddd' }}>Número de Ficha</th>
              <th style={{ padding: '10px', border: '1px solid #ddd' }}>Programa</th>
              <th style={{ padding: '10px', border: '1px solid #ddd' }}>Estado Alerta</th>
            </tr>
          </thead>
          <tbody>
            {empresas.length > 0 ? (
              empresas.map((empresa) => (
                <tr key={empresa.id}>
                  <td style={{ padding: '10px', border: '1px solid #ddd' }}>{empresa.id}</td>
                  <td style={{ padding: '10px', border: '1px solid #ddd' }}>{empresa.numeroFicha}</td>
                  <td style={{ padding: '10px', border: '1px solid #ddd' }}>{empresa.programa}</td>
                  <td style={{ padding: '10px', border: '1px solid #ddd' }}>
                    {empresa.tieneAlerta ? '⚠️ Con Alerta' : '✅ Normal'}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" style={{ padding: '15px', textAlign: 'center' }}>
                  No hay empresas registradas.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      )}
    </div>
  );
};