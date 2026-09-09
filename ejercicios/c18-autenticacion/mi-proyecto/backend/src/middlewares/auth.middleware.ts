import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config/env";

interface UsuarioPayload {
  id: number;
  rol: "ADMIN" | "CLIENTE";
}

export function authenticate(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Token no provisto o formato inválido" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const payload = jwt.verify(token, JWT_SECRET) as UsuarioPayload;
    req.usuario = payload;
    next();
  } catch {
    return res.status(401).json({ error: "Token inválido o expirado" });
  }
}

export function authorize(...roles: Array<"ADMIN" | "CLIENTE">) {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.usuario) {
      return res.status(401).json({ error: "No autenticado" });
    }

    if (!roles.includes(req.usuario.rol)) {
      return res.status(403).json({ error: "No tenés permiso para esta operación" });
    }

    next();
  };
}