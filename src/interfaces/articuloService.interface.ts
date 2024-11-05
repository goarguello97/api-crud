import { CreationAttributes } from "sequelize";
import Articulo from "../models/Articulo";

export interface IObtenerArticulo {
  nombre?: string | undefined;
  estadoActivacion?: string | undefined;
  busquedaExacta?: string | undefined;
}

export interface ICrearArticulo extends CreationAttributes<Articulo> {
  nombre: string;
  marca: string;
}

export interface IModificarArticulo extends CreationAttributes<Articulo> {
  id: string;
  nombre: string;
  marca: string;
  fechaModificación: Date;
}
