// ../middleware/variables.ts
import { Request, Response, NextFunction } from "express";

export const validateVariables = (variables: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    // Verificar si todas las variables están presentes en el cuerpo de la solicitud
    for (const variable of variables) {
      if (!req.body.hasOwnProperty(variable)) {
        // Si falta alguna variable, devolver un error al cliente
        return res.status(400).json({
          estado: false,
          mensaje: `Falta la variable '${variable}' en el cuerpo de la solicitud`,
        });
      }
    }

    // Si todas las variables están presentes, continuar con el siguiente middleware
    next();
  };
};
