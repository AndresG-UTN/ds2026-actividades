import { Prisma } from "../generated/prisma/client";

export type { LibroModel as Libro } from "../generated/prisma/models";
export type { AutorModel as Autor } from "../generated/prisma/models";
export type { CategoriaModel as Categoria } from "../generated/prisma/models";

export type LibroConAutor = Prisma.LibroGetPayload<{
  include: { autor: true };
}>;

export type LibroDetalle = Prisma.LibroGetPayload<{
  include: { autor: true; categorias: true };
}>;