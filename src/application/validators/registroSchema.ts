import { z } from "zod";

export const registroSchema = z
  .object({
    nombre: z.string().min(1, "Nombre requerido"),
    apellido: z.string().min(1, "Apellido requerido"),

    edad: z
      .string()
      .optional()
      .transform((v) => (v ? Number(v) : undefined))
      .pipe(
        z
          .number()
          .int()
          .min(0, "Edad inválida")
          .max(120, "Edad inválida")
          .optional()
      ),

    pais: z.string().min(1, "País requerido"),
    departamento: z.string().min(1, "Departamento requerido"),
    correo: z.string().email("Correo inválido"),
    password: z
      .string()
      .min(6, "La contraseña debe tener al menos 6 caracteres"),
    confirmarPassword: z.string().min(6, "Debes repetir la contraseña"),
  })
  .refine((data) => data.password === data.confirmarPassword, {
    message: "Las contraseñas no coinciden",
    path: ["confirmarPassword"],
  });
