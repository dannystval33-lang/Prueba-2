let incidencias = [
    {
        id: 1,
        titulo: "Acceso no autorizado",
        descripcion: "Se detectó ingreso fuera del horario autorizado.",
        prioridad: "Alta",
        ubicacion: "Oficina Principal",
        estado: "Abierta"
    },
    {
        id: 2,
        titulo: "Falla en cámara de seguridad",
        descripcion: "La cámara del parqueadero dejó de transmitir.",
        prioridad: "Media",
        ubicacion: "Parqueadero",
        estado: "En proceso"
    }
];


export const obtenerTodasLasIncidencias = () => {

    return incidencias;

};

export const obtenerIncidenciaPorId = (id) => {

    return incidencias.find(
        incidencia => incidencia.id === Number(id)
    );

};

export const crearIncidencia = (datosIncidencia) => {

    const nuevaIncidencia = {

        id: incidencias.length + 1,

        titulo: datosIncidencia.titulo,

        descripcion: datosIncidencia.descripcion,

        prioridad: datosIncidencia.prioridad,

        ubicacion: datosIncidencia.ubicacion,

        estado: "Abierta"

    };

    incidencias.push(nuevaIncidencia);

    return nuevaIncidencia;

};

export const actualizarIncidencia = (id, datosIncidencia) => {

    const incidencia = incidencias.find(
        incidencia => incidencia.id === Number(id)
    );

    if (!incidencia) {
        throw new Error("Incidencia no encontrada.");
    }

    incidencia.titulo = datosIncidencia.titulo || incidencia.titulo;
    incidencia.descripcion = datosIncidencia.descripcion || incidencia.descripcion;
    incidencia.prioridad = datosIncidencia.prioridad || incidencia.prioridad;
    incidencia.ubicacion = datosIncidencia.ubicacion || incidencia.ubicacion;
    incidencia.estado = datosIncidencia.estado || incidencia.estado;

    return incidencia;

};

export const eliminarIncidencia = (id) => {

    const indice = incidencias.findIndex(
        incidencia => incidencia.id === Number(id)
    );

    if (indice === -1) {
        throw new Error("Incidencia no encontrada.");
    }

    incidencias.splice(indice, 1);

};