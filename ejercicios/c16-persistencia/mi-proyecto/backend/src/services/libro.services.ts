import { Libro } from "../types/libro.types";

let libros: Libro[] = [
  { id: 1, titulo: "El Aleph", autor: "Jorge Luis Borges", disponible: true },
  { id: 2, titulo: "Ficciones", autor: "Jorge Luis Borges", disponible: false }
];
let proximoId = 3;

export function findAll(disponible?: boolean): Libro[] {
  if (disponible !== undefined) {
    return libros.filter((l) => l.disponible === disponible);
  }
  return libros;
}

export function findById(id: number): Libro | undefined {
  return libros.find((l) => l.id === id);
}

export function create(datos: Omit<Libro, "id">): Libro {
  const nuevoLibro: Libro = { id: proximoId++, ...datos };
  libros.push(nuevoLibro);
  return nuevoLibro;
}

export function update(id: number, datos: Partial<Omit<Libro, "id">>): Libro | null {
  const index = libros.findIndex((l) => l.id === id);
  if (index === -1) return null;
  libros[index] = { ...libros[index], ...datos };
  return libros[index];
}

export function remove(id: number): boolean {
  const index = libros.findIndex((l) => l.id === id);
  if (index === -1) return false;
  libros.splice(index, 1);
  return true;
}