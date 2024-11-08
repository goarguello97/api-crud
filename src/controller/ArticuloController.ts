import { Request, Response } from "express";
import { IObtenerArticulo } from "../interfaces/articuloService.interface";
import ArticuloService from "../service/ArticuloService";

// Controladores que consumen su respectivo servicio, aqui simplemente se verifica que exista o no errores.
// Se retornara la respuesta correspondiente de acuerdo a ello o no.
// Utilizando este patrón controllador para manegar las solicitudes HTTP, podremos modificar el servicio sin alterar el resto del código.
class ArticuloController {
  static async obtenerArticulos(
    req: Request,
    res: Response
  ): Promise<Response> {
    const { error, data } = await ArticuloService.obtenerArticulos();

    if (error) return res.status(400).json(data);

    return res.status(200).json(data);
  }

  static async obtenerArticulo(req: Request, res: Response): Promise<Response> {
    const { nombre, estadoActivacion, busquedaExacta }: IObtenerArticulo =
      req.query;
    const { error, data } = await ArticuloService.obtenerArticulo({
      nombre,
      estadoActivacion,
      busquedaExacta,
    });

    if (error) return res.status(400).json(data);

    return res.status(200).json(data);
  }

  static async crearArticulo(req: Request, res: Response): Promise<Response> {
    const body = req.body;

    const { error, data } = await ArticuloService.crearArticulo(body);

    if (error) return res.status(400).json(data);

    return res.status(200).json(data);
  }

  static async modificarArticulo(
    req: Request,
    res: Response
  ): Promise<Response> {
    const { id } = req.params;
    const body = req.body;

    const { error, data } = await ArticuloService.modificarArticulo({
      ...body,
      id,
    });

    if (error) return res.status(400).json(data);

    return res.status(200).json(data);
  }

  static async eliminarArticulo(
    req: Request,
    res: Response
  ): Promise<Response> {
    const { id } = req.params;

    const { error, data } = await ArticuloService.eliminarArticulo(id);

    if (error) return res.status(400).json(data);

    return res.status(200).json(data);
  }
}

export default ArticuloController;
