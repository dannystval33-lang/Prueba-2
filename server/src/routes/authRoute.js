import { Router } from 'express'; // Importamos el router de express
import { login } from '../controllers/authController.js'; // Importamos el controlador de autenticación

const router = Router(); // Creamos un router de express

router.post("/login", login); // Ruta para el login de usuarios
export default router; // Exportamos el router para usarlo en otros archivos