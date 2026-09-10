import pool from "../config/db.js";

// Obtener todas las empresas
export const obtenerTodasLasEmpresas = async () => {

    const [rows] = await pool.query(
        "SELECT * FROM empresas"
    );

    return rows;
};


// Obtener una empresa por ID
export const obtenerEmpresaPorId = async (id) => {

    const [rows] = await pool.query(
        "SELECT * FROM empresas WHERE id = ?",
        [id]
    );

    return rows[0] || null;
};


// Crear una empresa
export const crearEmpresa = async (datos) => {

    const {
        nombre,
        nit,
        direccion,
        telefono,
        correo
    } = datos;

    const [resultado] = await pool.query(
        `INSERT INTO empresas
        (nombre, nit, direccion, telefono, correo)
        VALUES (?, ?, ?, ?, ?)`,
        [
            nombre,
            nit,
            direccion,
            telefono,
            correo
        ]
    );

    return {
        id: resultado.insertId,
        nombre,
        nit,
        direccion,
        telefono,
        correo
    };
};


// Actualizar una empresa
export const actualizarEmpresa = async (id, datos) => {

    const {
        nombre,
        nit,
        direccion,
        telefono,
        correo
    } = datos;

    const [resultado] = await pool.query(
        `UPDATE empresas
        SET
            nombre = ?,
            nit = ?,
            direccion = ?,
            telefono = ?,
            correo = ?
        WHERE id = ?`,
        [
            nombre,
            nit,
            direccion,
            telefono,
            correo,
            id
        ]
    );

    if (resultado.affectedRows === 0) {
        return null;
    }

    return obtenerEmpresaPorId(id);
};


// Eliminar una empresa
export const eliminarEmpresa = async (id) => {

    const empresa = await obtenerEmpresaPorId(id);

    if (!empresa) {
        return null;
    }

    await pool.query(
        "DELETE FROM empresas WHERE id = ?",
        [id]
    );

    return empresa;
};