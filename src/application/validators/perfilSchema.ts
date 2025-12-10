import { z } from "zod";

export const perfilSchema = z.object({
  nombre: z.string().min(1, "Nombre requerido"),
  apellido: z.string().min(1, "Apellido requerido"),
  edad: z.number().int().min(0, "Edad inválida").optional(),
  pais: z.string().min(1, "País requerido"),
  departamento: z.string().min(1, "Departamento requerido"),
});

export type PerfilSchema = z.infer<typeof perfilSchema>;
