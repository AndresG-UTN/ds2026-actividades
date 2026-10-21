import { Request, Response, NextFunction } from "express";
import * as authService from "../services/auth.service";

export async function registrar(req: Request, res: Response, next: NextFunction) {
  try {
    const usuario = await authService.registrar(req.body);
    return res.status(201).json(usuario);
  } catch (error) {
    return next(error);
  }
}

export async function login(req: Request, res: Response, next: NextFunction) {
  try {
    const resultado = await authService.login(req.body);

    if (!resultado) {
      return res.status(401).json({ error: "Credenciales inválidas" });
    }

    return res.json(resultado);
  } catch (error) {
    return next(error);
  }
}

export async function yo(req: Request, res: Response, next: NextFunction) {
  try {
    const usuario = await authService.findById(req.usuario!.id);

    if (!usuario) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }

    return res.json(usuario);
  } catch (error) {
    return next(error);
  }
}