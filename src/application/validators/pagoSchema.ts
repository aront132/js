import { z } from "zod";

export const pagoSchema = z.object({
  cardName: z.string().min(2),
  cardNumber: z.string().regex(/^[0-9]{12,19}$/, "Número inválido"),
  expiry: z.string().regex(/^(0[1-9]|1[0-2])\/(\d{2})$/, "Formato MM/AA"),
  cvv: z.string().regex(/^[0-9]{3,4}$/, "CVV inválido"),
});

export type PagoSchema = z.infer<typeof pagoSchema>;
