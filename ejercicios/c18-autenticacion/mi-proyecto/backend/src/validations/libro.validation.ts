import { z } from "zod";

export const libroCreateSchema = z.object({
  titulo: z.string().trim().min(1, "El título es obligatorio").max(200),
  precio: z.number().positive("El precio debe ser mayor a 0"),
  imagen: z.string().trim().min(1, "La imagen es obligatoria"),
  autorId: z.number().int().positive("El autor es obligatorio"),
  disponible: z.boolean().optional(),
  categorias: z.array(z.string().trim().min(1)).optional(),
});

export const libroUpdateSchema = libroCreateSchema.partial();

export const idParamSchema = z.object({
  id: z.coerce.number().int().positive("El id debe ser un número positivo"),
});

export const autorCreateSchema = z.object({
  nombre: z.string().trim().min(1, "El nombre del autor es obligatorio").max(100),
  nacionalidad: z.string().trim().min(1, "La nacionalidad es obligatoria").max(100),
});

export const autorUpdateSchema = autorCreateSchema.partial();

export type LibroCreateInput = z.infer<typeof libroCreateSchema>;
export type LibroUpdateInput = z.infer<typeof libroUpdateSchema>;
export type AutorCreateInput = z.infer<typeof autorCreateSchema>;
export type AutorUpdateInput = z.infer<typeof autorUpdateSchema>;