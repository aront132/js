import { ResultadoPago } from "../../../domain/pagos/ResultadoPago";

export const obtenerResultadoPago = (estado: "ok" | "error"): ResultadoPago => {
  if (estado === "ok") {
    return {
      exito: true,
      mensaje: "Pago procesado correctamente.",
    };
  }

  return {
    exito: false,
    mensaje: "El pago fue rechazado. Verifica los datos de tu tarjeta.",
  };
};
