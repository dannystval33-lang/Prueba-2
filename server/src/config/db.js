import mysql from 'mysql2/promise';

// Creamos un pool de conexiones utilizando las variables de entorno
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT || 3306,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Prueba de conexión
try {
  const connection = await pool.getConnection();
  console.log('Conexión exitosa a la base de datos');
  connection.release();
} catch (error) {
  console.error('Error al conectar a la base de datos:', error);
}

export default pool;