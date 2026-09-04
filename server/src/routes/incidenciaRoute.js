import { Router } from "express";
import {
    getIncidencias,
    crearIncidencia,
    actualizarIncidencia,
    eliminarIncidencia
} from "../controllers/incidenciaController.js";
import { verificarAutenticacion } from "../middlewares/authMiddleware.js"; // Importamos el middleware de autenticación

const router = Router();

router.get("/", verificarAutenticacion, getIncidencias);
router.post("/", verificarAutenticacion, crearIncidencia);
router.put("/:id", verificarAutenticacion, actualizarIncidencia);
router.delete("/:id", verificarAutenticacion, eliminarIncidencia);

export default router;