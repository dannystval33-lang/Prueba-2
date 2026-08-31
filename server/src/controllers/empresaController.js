import {
    obtenerTodasLasEmpresas,
    obtenerEmpresaPorId,
    crearEmpresa,
    actualizarEmpresa,
    eliminarEmpresa
} from "../services/empresaService.js";


export const getEmpresas = (req, res) => {

    const empresas = obtenerTodasLasEmpresas();

    res.status(200).json(empresas);
};


export const getEmpresaById = (req, res) => {

    const empresa = obtenerEmpresaPorId(req.params.id);

    if (!empresa) {
        return res.status(404).json({
            mensaje: "Empresa no encontrada"
        });
    }

    res.status(200).json(empresa);
};


export const postEmpresa = (req, res) => {

    const {
        nombre,
        nit,
        direccion,
        telefono,
        correo
    } = req.body;

    if (!nombre || !nit) {
        return res.status(400).json({
            mensaje: "El nombre y el NIT son obligatorios"
        });
    }

    const nuevaEmpresa = crearEmpresa({
        nombre,
        nit,
        direccion,
        telefono,
        correo
    });

    res.status(201).json({
        mensaje: "Empresa creada correctamente",
        empresa: nuevaEmpresa
    });
};


export const putEmpresa = (req, res) => {

    const empresaActualizada = actualizarEmpresa(
        req.params.id,
        req.body
    );

    if (!empresaActualizada) {
        return res.status(404).json({
            mensaje: "Empresa no encontrada"
        });
    }

    res.status(200).json({
        mensaje: "Empresa actualizada correctamente",
        empresa: empresaActualizada
    });
};


export const deleteEmpresa = (req, res) => {

    const empresaEliminada = eliminarEmpresa(req.params.id);

    if (!empresaEliminada) {
        return res.status(404).json({
            mensaje: "Empresa no encontrada"
        });
    }

    res.status(200).json({
        mensaje: "Empresa eliminada correctamente",
        empresa: empresaEliminada
    });
};