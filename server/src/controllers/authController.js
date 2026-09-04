import * as authService from '../services/authService.js'; // Importamos los servicios de autenticación
import jwt from 'jsonwebtoken'; // Importamos jsonwebtoken para generar tokens

export const login = async (req, res,) => {
    const { correo, contraseña } = req.body;

    // Validar que se proporcionen correo y contraseña
    if (!correo || !contraseña) {
        return res.status(400).json({ mensaje: 'Correo y contraseña son requeridos' });
    }

    try {
        const resultado = await authService.autenticarUsuario(correo, contraseña);

        if (!resultado.exito) {
            return res.status(401).json({ mensaje: resultado.mensaje });
        }

    // Aquí puedes generar un token JWT si la autenticación es exitosa
        const token = jwt.sign(
            { id: resultado.usuario.id, correo: resultado.usuario.correo },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        // Devolver la respuesta con el token y la información del usuario
        res.json({
            mensaje: 'Autenticación exitosa',
            usuario: resultado.usuario,
            token: `Bearer ${token}`
        });

    } 
    catch (error) {
        res.status(500).json({ mensaje: error.message });
    }

};