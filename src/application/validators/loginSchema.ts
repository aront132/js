import { z } from "zod";

export const loginSchema = z.object({
  correo: z
    .string()
    .trim()
    .min(1, "El correo es obligatorio")
    .email("Correo inválido")
    .or(z.literal("")), 

  password: z
    .string()
    .trim()
    .min(1, "La contraseña es obligatoria"),
});