let empresas = [
    {
        id: 1,
        nombre: "SECURENET S.A.S.",
        nit: "900123456-1",
        direccion: "Medellín",
        telefono: "6041234567",
        correo: "contacto@securenet.com"
    },
    {
        id: 2,
        nombre: "Tecnología Segura S.A.",
        nit: "901234567-2",
        direccion: "Bogotá",
        telefono: "6017654321",
        correo: "info@tecnologiasegura.com"
    }
];


// Obtener todas las empresas
export const obtenerTodasLasEmpresas = () => {
    return empresas;
};


// Obtener una empresa por ID
export const obtenerEmpresaPorId = (id) => {
    return empresas.find(empresa => empresa.id === Number(id));
};


// Crear una empresa
export const crearEmpresa = (datos) => {

    const nuevaEmpresa = {
        id: empresas.length + 1,
        nombre: datos.nombre,
        nit: datos.nit,
        direccion: datos.direccion,
        telefono: datos.telefono,
        correo: datos.correo
    };

    empresas.push(nuevaEmpresa);

    return nuevaEmpresa;
};


// Actualizar una empresa
export const actualizarEmpresa = (id, datos) => {

    const empresa = empresas.find(
        empresa => empresa.id === Number(id)
    );

    if (!empresa) {
        return null;
    }

    empresa.nombre = datos.nombre ?? empresa.nombre;
    empresa.nit = datos.nit ?? empresa.nit;
    empresa.direccion = datos.direccion ?? empresa.direccion;
    empresa.telefono = datos.telefono ?? empresa.telefono;
    empresa.correo = datos.correo ?? empresa.correo;

    return empresa;
};


// Eliminar una empresa
export const eliminarEmpresa = (id) => {

    const indice = empresas.findIndex(
        empresa => empresa.id === Number(id)
    );

    if (indice === -1) {
        return null;
    }

    const empresaEliminada = empresas.splice(indice, 1);

    return empresaEliminada[0];
};