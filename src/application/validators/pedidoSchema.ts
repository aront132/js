import { z } from "zod";

export const pedidoSchema = z.object({
  usuarioId: z.string().min(1, "El ID de usuario es obligatorio"),
  fecha: z.string().datetime("Formato de fecha inválido"),
  total: z.number().min(0, "El total no puede ser negativo"),
  estado: z.enum(["pendiente", "pagado", "cancelado", "completado"]),
});

export type PedidoSchema = z.infer<typeof pedidoSchema>;