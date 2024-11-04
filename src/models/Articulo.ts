import { DataTypes, Model } from "sequelize";
import sequelize from "../config/dbConfig";

class Articulo extends Model {
  id!: string;
  nombre!: string;
  fechaModificación!: Date;
  marca!: string;
  estadoActivacion!: boolean;
}

Articulo.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    fechaModificación: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    marca: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    estadoActivacion: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
  },
  { sequelize, modelName: "articulo" }
);
