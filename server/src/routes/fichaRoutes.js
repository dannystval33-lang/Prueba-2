import { Router } from "express";
import {
    getIncidencias,
    crearIncidencia,
    actualizarIncidencia,
    eliminarIncidencia
} from "../controller/fichaController.js";

const router = Router();

router.get("/", getIncidencias);
router.post("/", crearIncidencia);
router.put("/:id", actualizarIncidencia);
router.delete("/:id", eliminarIncidencia);

export default router;