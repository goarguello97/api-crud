import Articulo from "../models/Articulo";

//Helper para verificar que el nombre del articulo no se repita.
const nombreUnico = async (nombre: string) => {
  if (!nombre) throw new Error("El nombre es obligatorio.");

  const articulo = await Articulo.findAll({ where: { nombre } });

  if (articulo.length !== 0)
    throw new Error("Error al crear artículo - Ya existe.");
};

export default nombreUnico;
