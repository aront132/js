import { z } from "zod";

export const juegoSchema = z.object({
  titulo: z.string().min(2, "Título requerido"),
  descripcion: z.string().min(10, "Debe tener al menos 10 caracteres"),
  precio: z.number().min(0.1, "Precio inválido"),
  stock: z.number().int().min(0, "Stock inválido"),
  plataforma: z.string().min(2, "Plataforma requerida"),
  genero: z.string().min(2, "Género requerido"),
  desarrollador: z.string().min(2, "Desarrollador requerido"),
  lanzamiento: z.string().min(4, "Fecha inválida"),
  imgFile: z.string().min(3, "Nombre de imagen requerido"),
  destacado: z.boolean().optional(),
});

export type JuegoSchema = z.infer<typeof juegoSchema>;