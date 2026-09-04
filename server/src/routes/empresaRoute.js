import express from "express";
import {
    getEmpresas,
    getEmpresaById,
    postEmpresa,
    putEmpresa,
    deleteEmpresa
} from "../controllers/empresaController.js";
import { verificarAutenticacion } from "../middlewares/authMiddleware.js"; // Importamos el middleware de autenticación

const router = express.Router();

router.get("/", verificarAutenticacion, getEmpresas);

router.get("/:id", verificarAutenticacion, getEmpresaById);

router.post("/", verificarAutenticacion,  postEmpresa);

router.put("/:id", verificarAutenticacion, putEmpresa);

router.delete("/:id", verificarAutenticacion, deleteEmpresa);

export default router;