import { Optional } from "sequelize";

export interface IAtributos {
  id: string;
  nombre: string;
  fechaModificacion: Date;
  marca: string;
  estadoActivacion: boolean;
}

export interface IAtributosCreacionArticulo
  extends Optional<IAtributos, "id"> {}
