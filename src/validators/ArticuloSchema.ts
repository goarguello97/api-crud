import { Schema } from "express-validator";
import nombreUnico from "../helpers/nombreUnico";

export const ArticuloSchema: Schema = {
  nombre: {
    notEmpty: { errorMessage: "El nombre es obligatorio." },
    isLength: {
      errorMessage: "Minimo 1 caracter y maximo 80",
      options: { min: 1, max: 80 },
    },
    // Validación custom para verificar que el nombre del producto no se encuentre en uso.
    // Por lo que, si ya existe un producto con ese nombre va a arrojar un error.
    custom: { options: nombreUnico },
  },
  marca: {
    notEmpty: { errorMessage: "La marca es obligatoria." },
    isLength: {
      errorMessage: "Minimo 1 caracter y maximo 80",
      options: { min: 1, max: 80 },
    },
  },
};

export default ArticuloSchema;
