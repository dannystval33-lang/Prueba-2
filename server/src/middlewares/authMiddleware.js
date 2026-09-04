import jwt from 'jsonwebtoken'; // Importamos jsonwebtoken para generar tokens

export const verificarAutenticacion = async (req, res, next) => {
    const authHeader = req.headers['authorization'];

    // Verificar si el encabezado de autorización está presente y es válido
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ error: 'Acceso denegado: Encabezado de autorización ausente o no valido' 
        });
    }

    // Separar el token del encabezado de autorización
    const token = authHeader.split(' ')[1];

    try {
        // Verificar el token usando la clave secreta
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.usuario = decoded; // Almacenar la información del usuario decodificada en la solicitud
        next(); // Continuar con la siguiente función de middleware o ruta
    } 
    catch (error) {
        res.status(403).json({ error: 'Acceso denegado: Token inválido o expirado' });
    }
};