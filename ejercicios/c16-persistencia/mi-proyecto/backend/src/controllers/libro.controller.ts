import { Request, Response } from "express";
import * as libroService from "../services/libro.services";

export function getAll(req: Request, res: Response) {
  const disponible = req.query.disponible !== undefined 
    ? req.query.disponible === "true" 
    : undefined;
  const libros = libroService.findAll(disponible);
  return res.json(libros);
}

export function getById(req: Request, res: Response) {
  const libro = libroService.findById(Number(req.params.id));
  if (!libro) {
    return res.status(404).json({ error: "Libro no encontrado" });
  }
  return res.json(libro);
}

export function create(req: Request, res: Response) {
  const nuevo = libroService.create(req.body);
  return res.status(201).json(nuevo);
}

export function update(req: Request, res: Response) {
  const actualizado = libroService.update(Number(req.params.id), req.body);
  if (!actualizado) {
    return res.status(404).json({ error: "Libro no encontrado" });
  }
  return res.json(actualizado);
}

export function remove(req: Request, res: Response) {
  const eliminado = libroService.remove(Number(req.params.id));
  if (!eliminado) {
    return res.status(404).json({ error: "Libro no encontrado" });
  }
  return res.status(204).send();
}