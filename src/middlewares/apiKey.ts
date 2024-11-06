import dotenv from "dotenv";
import { NextFunction, Request, Response } from "express";

dotenv.config({ path: ".env" });

//Middleware para proteger las rutas, se solicita una llave que va a ser comparada con la que se determine en el .env
const apiKey = (req: Request, res: Response, next: NextFunction) => {
  const { API_KEY } = process.env;

  const key = req.header("api-key");

  if (!key || key !== API_KEY) {
    return res
      .status(400)
      .json({ message: "Acceso denegado - Llave inválida" });
  }

  next();
};

export default apiKey;
