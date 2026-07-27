import * as fichaService from '../services/fichaServices.js';

export const getIncidencias = (req, res) => {

    try {
        console.log("[Controlador]: Han solicitado la lista de incidencias.");
        const incidencias = fichaService.obtenerTodasLasIncidencias();

        res.status(200).json({
            mensaje: "Lista de incidencias recuperada correctamente.",
            total: incidencias.length,
            datos: incidencias
        });

    } catch (error) {

        res.status(500).json({
            mensaje: "Error al obtener las incidencias."
        });
    }
};

export const crearIncidencia = (req, res) => {

    try {
        console.log("[Controlador]: Recibida petición para crear una incidencia.");

        // Validamos los datos obligatorios
        if (
            !req.body.titulo ||
            !req.body.descripcion ||
            !req.body.prioridad ||
            !req.body.ubicacion
        ) {

            return res.status(400).json({
                mensaje: "Error de validación: 'titulo', 'descripcion', 'prioridad' y 'ubicacion' son obligatorios."
            });
        }

        const nuevaIncidencia = fichaService.crearIncidencia(req.body);

        res.status(201).json({
            mensaje: "Incidencia registrada correctamente.",
            incidenciaCreada: nuevaIncidencia
        });

    } catch (error) {
        res.status(500).json({mensaje: "Error interno del servidor al crear la incidencia."});
    }
};

export const actualizarIncidencia = (req, res) => {

    try {
        console.log("[Controlador]: Solicitud para actualizar una incidencia.");
        const incidenciaActualizada = fichaService.actualizarIncidencia(
            req.params.id,
            req.body
        );

        res.status(200).json({
            mensaje: "Incidencia actualizada correctamente.",
            incidenciaActualizada
        });

    } catch (error) {

        res.status(404).json({
            mensaje: error.message
        });

    }
};

export const eliminarIncidencia = (req, res) => {

    try {
        console.log("[Controlador]: Solicitud para eliminar una incidencia.");
        fichaService.eliminarIncidencia(req.params.id);

        res.status(200).json({
            mensaje: "Incidencia eliminada correctamente."
        });

    } catch (error) {
        res.status(404).json({
            mensaje: error.message
        });
        
    }
};