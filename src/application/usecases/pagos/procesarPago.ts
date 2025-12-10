import { MetodoPago } from "../../../domain/pagos/MetodoPago";

export const procesarPago = async (pago: MetodoPago): Promise<"ok" | "error"> => {
  await new Promise((r) => setTimeout(r, 800)); // simulación delay

  const tarjetaValida = /^[0-9]{12,19}$/.test(pago.cardNumber.replace(/\s+/g, ""));
  const cvvValido = /^[0-9]{3,4}$/.test(pago.cvv);

  return tarjetaValida && cvvValido ? "ok" : "error";
};
