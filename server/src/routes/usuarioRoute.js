import express from 'express';

import {
    crearUsuario,
    obtenerUsuarios
} from '../controllers/usuarioController.js';


const router = express.Router();


// =====================================================
// RUTAS DEL MÓDULO DE USUARIOS
// =====================================================

// GET: Obtener todos los usuarios
router.get(
    '/',
    obtenerUsuarios
);


// POST: Crear un nuevo usuario
router.post(
    '/',
    crearUsuario
);


// =====================================================
// EXPORTAR ROUTER
// =====================================================

export default router;