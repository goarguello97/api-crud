import { Router } from "express";
import ArticuloController from "../controller/ArticuloController";

const articuloRouter = Router();

articuloRouter.get("/", ArticuloController.obtenerArticulos);
articuloRouter.get("/busqueda", ArticuloController.obtenerArticulo);
articuloRouter.post("/", ArticuloController.crearArticulo);
articuloRouter.put("/:id", ArticuloController.modificarArticulo);
// Utilizo patch porque es un soft delete(es una modificacion de un campo)
articuloRouter.patch("/:id", ArticuloController.eliminarArticulo);

export default articuloRouter;
