import { Router } from "express";
import articuloRouter from "./articulo.routes";

const router = Router();

router.use("/articulos", articuloRouter);

export default router;
