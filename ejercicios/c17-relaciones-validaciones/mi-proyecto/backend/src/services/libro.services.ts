import { prisma } from "../config/prisma/prisma";
import { Prisma } from "../generated/prisma/client";

export type LibroConAutor = Prisma.LibroGetPayload<{
  include: { autor: true };
}>;

export async function findAll(disponible?: boolean): Promise<LibroConAutor[]> {
  return prisma.libro.findMany({
    where: disponible !== undefined ? { disponible } : undefined,
    include: { autor: true },
  });
}

export async function findById(id: number): Promise<LibroConAutor | null> {
  return prisma.libro.findUnique({
    where: { id },
    include: { autor: true },
  });
}

export async function create(datos: {
  titulo: string;
  precio: number;
  imagen: string;
  disponible?: boolean;
  autorId: number;
}): Promise<LibroConAutor> {
  const { autorId, ...resto } = datos;
  return prisma.libro.create({
    data: {
      ...resto,
      autor: { connect: { id: autorId } },
    },
    include: { autor: true },
  });
}

export async function update(
  id: number,
  datos: {
    titulo?: string;
    precio?: number;
    imagen?: string;
    disponible?: boolean;
    autorId?: number;
  }
): Promise<LibroConAutor> {
  const { autorId, ...resto } = datos;
  return prisma.libro.update({
    where: { id },
    data: {
      ...resto,
      ...(autorId ? { autor: { connect: { id: autorId } } } : {}),
    },
    include: { autor: true },
  });
}

export async function remove(id: number): Promise<LibroConAutor> {
  return prisma.libro.delete({
    where: { id },
    include: { autor: true }, // <-- FALTABA ESTO
  });
}