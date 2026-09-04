import pool from '../config/db.js'; // Importamos la conexión a la base de datos
import bcrypt from 'bcrypt'; // Importamos bcrypt para el hash de contraseñas

// Función pautenticar las credenciales del usuario
export const autenticarUsuario = async (correo, contraseña) => {
    try {
        const [rows] = await pool.query(
            'SELECT id_usuario, nombre, correo, contraseña FROM usuarios WHERE correo = ?',
            [correo]
        );

        //Para usuarios no encontrados arrojamos el mensaje de error
        if (rows.length === 0) {
            return {exito: false, mensaje: 'Usuario no encontrado'};
        }

        const usuario = rows[0];

        //Para cont raseñas incorrectas arrojamos el mensaje de error
        const contraseñaCorrecta = await bcrypt.compare(contraseña, usuario.contraseña);
        if (!contraseñaCorrecta) {
            return {exito: false, mensaje: 'Contraseña incorrecta'};
    }

    return {exito: true, usuario: {
        id: usuario.id_usuario,
        nombre: usuario.nombre,
        correo: usuario.correo
    }
    };
    }
    catch (error) {
        throw new Error('Error al autenticar usuario: ' + error.message);
    }

};
