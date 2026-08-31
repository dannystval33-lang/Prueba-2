import express from "express";

import {
    getEmpresas,
    getEmpresaById,
    postEmpresa,
    putEmpresa,
    deleteEmpresa
} from "../controllers/empresaController.js";

const router = express.Router();

router.get("/", getEmpresas);

router.get("/:id", getEmpresaById);

router.post("/", postEmpresa);

router.put("/:id", putEmpresa);

router.delete("/:id", deleteEmpresa);

export default router;