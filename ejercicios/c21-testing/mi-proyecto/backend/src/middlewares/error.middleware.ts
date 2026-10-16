import { Request, Response, NextFunction } from "express";
import { ZodError } from "zod";

export const errorHandler = (
  err: any,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {

  if (err instanceof ZodError) {
    return res.status(400).json({
      error: "Datos inválidos",
      detalles: err.issues.map((i) => ({
        campo: i.path.join("."),
        mensaje: i.message,
      })),
    });
  }


  const prismaCode = err?.code;

  if (prismaCode === "P2002") {

    return res.status(409).json({ error: "Ya existe un registro con ese valor" });
  }

  if (prismaCode === "P2025") {

    return res.status(404).json({ error: "No encontrado" });
  }

  if (prismaCode === "P2003") {

    return res.status(409).json({ error: "Hay registros relacionados" });
  }


  console.error("Error no controlado capturado por errorHandler:", err);
  return res.status(500).json({ error: "Error interno del servidor" });
};