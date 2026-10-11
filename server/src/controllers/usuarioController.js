import db from '../config/db.js';
import bcrypt from 'bcryptjs';


// =====================================================
// 1. CREAR UN NUEVO USUARIO
// =====================================================

export const crearUsuario = async (req, res) => {

    const {
        nombre,
        correo,
        contrasena,
        telefono,
        id_rol
    } = req.body;


    // -------------------------------------------------
    // Validar campos obligatorios
    // -------------------------------------------------

    if (!nombre || !correo || !contrasena || !id_rol) {

        return res.status(400).json({
            mensaje: 'Por favor proporciona nombre, correo, contraseña y rol.'
        });
    }


    try {

        // -------------------------------------------------
        // Verificar si el correo ya está registrado
        // -------------------------------------------------

        const [correoExistente] = await db.query(
            'SELECT id_usuario FROM usuarios WHERE correo = ?',
            [correo]
        );


        if (correoExistente.length > 0) {

            return res.status(400).json({
                mensaje: 'El correo electrónico ya se encuentra registrado.'
            });
        }


        // -------------------------------------------------
        // Generar salt para la contraseña
        // -------------------------------------------------

        const salt = await bcrypt.genSalt(10);


        // -------------------------------------------------
        // Encriptar contraseña
        // -------------------------------------------------

        const contrasenaHash = await bcrypt.hash(
            contrasena,
            salt
        );


        // -------------------------------------------------
        // Insertar usuario en MySQL
        // -------------------------------------------------

        const [resultado] = await db.query(
            `INSERT INTO usuarios
            (nombre, correo, contrasena, telefono, id_rol, estado)
            VALUES (?, ?, ?, ?, ?, 1)`,
            [
                nombre,
                correo,
                contrasenaHash,
                telefono || null,
                id_rol
            ]
        );


        // -------------------------------------------------
        // Respuesta exitosa
        // -------------------------------------------------

        res.status(201).json({
            mensaje: 'Usuario registrado exitosamente',
            id_usuario: resultado.insertId
        });

    } catch (error) {

        console.error(
            'Error al registrar usuario:',
            error
        );

        res.status(500).json({
            mensaje: 'Error interno del servidor al crear usuario'
        });
    }
};


// =====================================================
// 2. OBTENER TODOS LOS USUARIOS
// =====================================================

export const obtenerUsuarios = async (req, res) => {

    try {

        // -------------------------------------------------
        // Consultar usuarios junto con su rol
        // -------------------------------------------------

        const [usuarios] = await db.query(`
            SELECT
                u.id_usuario,
                u.nombre,
                u.correo,
                u.telefono,
                u.estado,
                u.created_at,
                r.nombre AS rol_nombre,
                r.descripcion AS rol_descripcion

            FROM usuarios u

            INNER JOIN roles r
                ON u.id_rol = r.id

            ORDER BY u.id_usuario DESC
        `);


        // -------------------------------------------------
        // Respuesta exitosa
        // -------------------------------------------------

        res.status(200).json({
            total: usuarios.length,
            datos: usuarios
        });

    } catch (error) {

        console.error(
            'Error al obtener usuarios:',
            error
        );

        res.status(500).json({
            mensaje: 'Error interno del servidor al consultar usuarios'
        });
    }
};
