import * as incidenciaService from "../services/incidenciaService.js";


// Obtener todas las incidencias
export const getIncidencias = async (req, res) => {

    try {

        console.log("[Controlador]: Han solicitado la lista de incidencias.");

        const incidencias =
            await incidenciaService.obtenerTodasLasIncidencias();

        res.status(200).json({
            mensaje: "Lista de incidencias recuperada correctamente.",
            total: incidencias.length,
            datos: incidencias
        });

    } catch (error) {

        console.error("Error al obtener las incidencias:", error);

        res.status(500).json({
            mensaje: "Error al obtener las incidencias."
        });
    }
};


// Crear una incidencia
export const crearIncidencia = async (req, res) => {

    try {

        console.log(
            "[Controlador]: Recibida petición para crear una incidencia."
        );

        const {
            empresa_id,
            titulo,
            descripcion,
            prioridad,
            ubicacion
        } = req.body;


        // Validamos los datos obligatorios
        if (
            !empresa_id ||
            !titulo ||
            !descripcion ||
            !prioridad ||
            !ubicacion
        ) {

            return res.status(400).json({
                mensaje:
                    "Error de validación: 'empresa_id', 'titulo', 'descripcion', 'prioridad' y 'ubicacion' son obligatorios."
            });
        }


        const nuevaIncidencia =
            await incidenciaService.crearIncidencia(req.body);


        res.status(201).json({
            mensaje: "Incidencia registrada correctamente.",
            incidenciaCreada: nuevaIncidencia
        });

    } catch (error) {

        console.error("Error al crear la incidencia:", error);

        res.status(500).json({
            mensaje: "Error interno del servidor al crear la incidencia."
        });
    }
};


// Actualizar una incidencia
export const actualizarIncidencia = async (req, res) => {

    try {

        console.log(
            "[Controlador]: Solicitud para actualizar una incidencia."
        );

        const incidenciaActualizada =
            await incidenciaService.actualizarIncidencia(
                req.params.id,
                req.body
            );

        res.status(200).json({
            mensaje: "Incidencia actualizada correctamente.",
            incidenciaActualizada
        });

    } catch (error) {

        console.error(
            "Error al actualizar la incidencia:",
            error
        );

        res.status(404).json({
            mensaje: error.message
        });
    }
};


// Eliminar una incidencia
export const eliminarIncidencia = async (req, res) => {

    try {

        console.log(
            "[Controlador]: Solicitud para eliminar una incidencia."
        );

        const incidenciaEliminada =
            await incidenciaService.eliminarIncidencia(
                req.params.id
            );

        res.status(200).json({
            mensaje: "Incidencia eliminada correctamente.",
            incidenciaEliminada
        });

    } catch (error) {

        console.error(
            "Error al eliminar la incidencia:",
            error
        );

        res.status(404).json({
            mensaje: error.message
        });
    }
};