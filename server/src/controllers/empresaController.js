import {
    obtenerTodasLasEmpresas,
    obtenerEmpresaPorId,
    crearEmpresa,
    actualizarEmpresa,
    eliminarEmpresa
} from "../services/empresaService.js";


// Obtener todas las empresas
export const getEmpresas = async (req, res) => {

    try {

        const empresas = await obtenerTodasLasEmpresas();

        res.status(200).json(empresas);

    } catch (error) {

        console.error("Error al obtener empresas:", error);

        res.status(500).json({
            mensaje: "Error al obtener las empresas"
        });

    }
};


// Obtener una empresa por ID
export const getEmpresaById = async (req, res) => {

    try {

        const empresa = await obtenerEmpresaPorId(req.params.id);

        if (!empresa) {
            return res.status(404).json({
                mensaje: "Empresa no encontrada"
            });
        }

        res.status(200).json(empresa);

    } catch (error) {

        console.error("Error al obtener la empresa:", error);

        res.status(500).json({
            mensaje: "Error al obtener la empresa"
        });

    }
};


// Crear una empresa
export const postEmpresa = async (req, res) => {

    try {

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

        const nuevaEmpresa = await crearEmpresa({
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

    } catch (error) {

        console.error("Error al crear empresa:", error);

        res.status(500).json({
            mensaje: "Error al crear la empresa"
        });

    }
};


// Actualizar una empresa
export const putEmpresa = async (req, res) => {

    try {

        const empresaActualizada = await actualizarEmpresa(
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

    } catch (error) {

        console.error("Error al actualizar empresa:", error);

        res.status(500).json({
            mensaje: "Error al actualizar la empresa"
        });

    }
};


// Eliminar una empresa
export const deleteEmpresa = async (req, res) => {

    try {

        const empresaEliminada = await eliminarEmpresa(req.params.id);

        if (!empresaEliminada) {
            return res.status(404).json({
                mensaje: "Empresa no encontrada"
            });
        }

        res.status(200).json({
            mensaje: "Empresa eliminada correctamente",
            empresa: empresaEliminada
        });

    } catch (error) {

        console.error("Error al eliminar empresa:", error);

        res.status(500).json({
            mensaje: "Error al eliminar la empresa"
        });

    }
};