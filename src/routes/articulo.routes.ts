import { Router } from "express";
import { checkSchema } from "express-validator";
import ArticuloController from "../controller/ArticuloController";
import apiKey from "../middlewares/apiKey";
import validarCampos from "../middlewares/validarCampos";
import ArticuloSchema from "../validators/ArticuloSchema";

const articuloRouter = Router();

// Todas las rutas estan protegidas para que solo se pueda acceder mediante una llave.
// Ademas la ruta para crear un articulo tiene validaciones extras para que no falten los campos obligatorios.

articuloRouter.get("/", apiKey, ArticuloController.obtenerArticulos);
articuloRouter.get("/busqueda", apiKey, ArticuloController.obtenerArticulo);
articuloRouter.post(
  "/",
  apiKey,
  checkSchema(ArticuloSchema),
  validarCampos,
  ArticuloController.crearArticulo
);
articuloRouter.put("/:id", apiKey, ArticuloController.modificarArticulo);
// Utilizo patch porque es un soft delete(es una modificacion de un campo)
articuloRouter.patch("/:id", apiKey, ArticuloController.eliminarArticulo);

export default articuloRouter;
