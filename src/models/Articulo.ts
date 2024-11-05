import { DataTypes, Model } from "sequelize";
import sequelize from "../config/dbConfig";
import {
  IAtributos,
  IAtributosCreacionArticulo,
} from "../interfaces/articuloModel.interface";

class Articulo
  extends Model<IAtributos, IAtributosCreacionArticulo>
  implements IAtributos
{
  id!: string;
  estadoActivacion!: boolean;
  fechaModificacion!: Date;
  nombre!: string;
  marca!: string;
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
    fechaModificacion: {
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
  {
    sequelize,
    modelName: "articulo",
    timestamps: true,
    // Para que updatedAt de sequelize tome el campo fechaModificacion del modelo.
    // Por lo que al actualizar, este campo se va a modificar automaticamente.
    updatedAt: "fechaModificacion",
    createdAt: "fechaCreacion",
  }
);

export default Articulo;
