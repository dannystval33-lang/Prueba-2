import pool from "../config/db.js";


// Obtener todas las incidencias
export const obtenerTodasLasIncidencias = async () => {

    const [rows] = await pool.query(
        "SELECT * FROM incidencias"
    );

    return rows;
};


// Obtener una incidencia por ID
export const obtenerIncidenciaPorId = async (id) => {

    const [rows] = await pool.query(
        "SELECT * FROM incidencias WHERE id = ?",
        [id]
    );

    return rows[0] || null;
};


// Crear una incidencia
export const crearIncidencia = async (datosIncidencia) => {

    const {
        empresa_id,
        titulo,
        descripcion,
        prioridad,
        ubicacion
    } = datosIncidencia;

    const [resultado] = await pool.query(
        `INSERT INTO incidencias
        (
            empresa_id,
            titulo,
            descripcion,
            ubicacion,
            prioridad,
            estado,
            fecha_incidente
        )
        VALUES (?, ?, ?, ?, ?, ?, NOW())`,
        [
            empresa_id,
            titulo,
            descripcion,
            ubicacion,
            prioridad,
            "Abierta"
        ]
    );

    return {
        id: resultado.insertId,
        empresa_id,
        titulo,
        descripcion,
        prioridad,
        ubicacion,
        estado: "Abierta"
    };
};


// Actualizar una incidencia
export const actualizarIncidencia = async (id, datosIncidencia) => {

    const incidencia = await obtenerIncidenciaPorId(id);

    if (!incidencia) {
        throw new Error("Incidencia no encontrada.");
    }

    const {
        titulo,
        descripcion,
        prioridad,
        ubicacion,
        estado
    } = datosIncidencia;

    const nuevaIncidencia = {
        titulo: titulo ?? incidencia.titulo,
        descripcion: descripcion ?? incidencia.descripcion,
        prioridad: prioridad ?? incidencia.prioridad,
        ubicacion: ubicacion ?? incidencia.ubicacion,
        estado: estado ?? incidencia.estado
    };

    await pool.query(
        `UPDATE incidencias
        SET
            titulo = ?,
            descripcion = ?,
            prioridad = ?,
            ubicacion = ?,
            estado = ?
        WHERE id = ?`,
        [
            nuevaIncidencia.titulo,
            nuevaIncidencia.descripcion,
            nuevaIncidencia.prioridad,
            nuevaIncidencia.ubicacion,
            nuevaIncidencia.estado,
            id
        ]
    );

    return obtenerIncidenciaPorId(id);
};


// Eliminar una incidencia
export const eliminarIncidencia = async (id) => {

    const incidencia = await obtenerIncidenciaPorId(id);

    if (!incidencia) {
        throw new Error("Incidencia no encontrada.");
    }

    await pool.query(
        "DELETE FROM incidencias WHERE id = ?",
        [id]
    );

    return incidencia;
};