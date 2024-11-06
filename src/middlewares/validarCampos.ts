import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";

class ValidacionErrores {
  public service: Function;
  constructor() {
    this.service = validationResult;
  }
}

// Con este middleware verificamos que se respeten los campos pactados en el esquema de express-validator
const validarCampos = (req: Request, res: Response, next: NextFunction) => {
  const { errors } = new ValidacionErrores().service(req);

  if (errors.length !== 0)
    return res.status(400).json({ message: errors[0].msg, error: errors[0] });

  next();
};

export default validarCampos;
