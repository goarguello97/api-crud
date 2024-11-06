import { Op, WhereOptions } from "sequelize";
import {
  ICrearArticulo,
  IModificarArticulo,
  IObtenerArticulo,
} from "../interfaces/articuloService.interface";
import { IErrorMessage } from "../interfaces/errorMessage.interface";
import Articulo from "../models/Articulo";

// Utilizo el patrón de servicio para aislar la lógica del negocio del resto.
class ArticuloService {
  static async obtenerArticulos() {
    try {
      // Solamente buscara los que estan activos
      const respuesta = await Articulo.findAll({
        where: {
          estadoActivacion: true,
        },
      });

      // Si no existen articulos lo avisa
      if (respuesta.length === 0)
        return {
          error: false,
          data: {
            message: "No hay articulos que mostrar.",
            articulos: respuesta,
          },
        };

      // Si existe algun error lo avisa
      if (!respuesta) throw new Error("Error al obtener artículos.");

      return {
        error: false,
        data: {
          message: "Articulos obtenidos correctamente.",
          articulos: respuesta,
        },
      };
    } catch (error: unknown) {
      if (error instanceof Error) {
        const respuesta: IErrorMessage = {
          message: error.message,
          error,
        };
        return { error: true, data: respuesta };
      }
      return { error: true, data: { message: "Error desconocido", error } };
    }
  }

  static async obtenerArticulo(data: IObtenerArticulo) {
    const { nombre, estadoActivacion, busquedaExacta } = data;
    const where: WhereOptions = {};

    // Si elegimos busqueda exacta entra en el primer bloque
    // Sino, entra en el else if y busca por nombre sin ser exacto
    if (busquedaExacta) {
      where.nombre = { [Op.iLike]: busquedaExacta };
    } else if (nombre) {
      where.nombre = { [Op.iLike]: `%${nombre}%` };
    }

    // Filtra por estado de activación, si es true lo activa, sino no.
    if (estadoActivacion) where.estadoActivacion = estadoActivacion === "true";

    try {
      const respuesta = await Articulo.findAll({
        where,
      });

      if (respuesta.length === 0)
        return {
          error: false,
          data: { message: "No hubo concidencias.", articulo: respuesta },
        };
      if (!respuesta) throw new Error("Error al obtener artículos.");
      return {
        error: false,
        data: { message: "Articulo/s encontrado/s.", articulo: respuesta },
      };
    } catch (error: unknown) {
      if (error instanceof Error) {
        const respuesta: IErrorMessage = {
          message: error.message,
          error,
        };
        return { error: true, data: respuesta };
      }
      return { error: true, data: { message: "Error desconocido", error } };
    }
  }

  static async crearArticulo(data: ICrearArticulo) {
    const { nombre } = data;
    try {
      const articulo = await Articulo.findOne({
        where: { nombre },
      });

      // Si existe algún error lo avisa
      if (articulo) throw new Error("Error al crear artículo - Ya existe.");

      const respuesta = await Articulo.create(data);

      return {
        error: false,
        data: {
          message: "Articulo creado correctamente.",
          articulo: respuesta,
        },
      };
    } catch (error: unknown) {
      if (error instanceof Error) {
        const respuesta: IErrorMessage = {
          message: error.message,
          error,
        };
        return { error: true, data: respuesta };
      }
      return { error: true, data: { message: "Error desconocido", error } };
    }
  }

  static async modificarArticulo(data: IModificarArticulo) {
    const { id } = data;
    try {
      const articulo = await Articulo.findByPk(id);

      // Si el articulo a modificar no existe, arroja un error avisando
      if (!articulo) throw new Error("No existe el artículo a modificar.");

      const respuesta = await Articulo.update(data, { where: { id } });

      const articuloModificado = await Articulo.findByPk(id);

      return {
        error: false,
        data: {
          message: "Articulo modificado correctamente.",
          articuloModificado,
        },
      };
    } catch (error: unknown) {
      if (error instanceof Error) {
        const respuesta: IErrorMessage = {
          message: error.message,
          error,
        };
        return { error: true, data: respuesta };
      }
      return { error: true, data: { message: "Error desconocido", error } };
    }
  }

  // Se hace un soft delete, se desactiva el articulo y no se lo destruye realmente
  static async eliminarArticulo(id: string) {
    try {
      const articulo = await Articulo.findByPk(id);

      // Si el articulo a eliminar ya esta desactivado, arroja un error avisando "que no existe el articulo", pero en realidad ya esta desactivado
      if (!articulo?.estadoActivacion)
        throw new Error("No existe el artículo a eliminar.");

      // Si el articulo a eliminar no existe, arroja un error avisando
      if (!articulo) throw new Error("No existe el artículo a eliminar.");

      const respuesta = await Articulo.update(
        { estadoActivacion: false },
        { where: { id } }
      );

      const articuloEliminado = await Articulo.findByPk(id);

      return {
        error: false,
        data: {
          message: "Articulo eliminado correctamente",
          articuloEliminado,
        },
      };
    } catch (error: unknown) {
      if (error instanceof Error) {
        const respuesta: IErrorMessage = {
          message: error.message,
          error,
        };
        return { error: true, data: respuesta };
      }
      return { error: true, data: { message: "Error desconocido", error } };
    }
  }
}

export default ArticuloService;
