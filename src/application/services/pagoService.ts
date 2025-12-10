import { procesarPago } from "../../application/usecases/pagos/procesarPago";
import { confirmarPago } from "../../application/usecases/pagos/confirmarPago";
import { obtenerResultadoPago } from "../../application/usecases/pagos/obtenerResultadoPago";
import { MetodoPago } from "../../domain/pagos/MetodoPago";

export const pagoServices = {
  pagar: async (pago: MetodoPago, usuarioId: string, items: any[], total: number) => {
    const resultado = await procesarPago(pago);

    if (resultado === "ok") {
      await confirmarPago(usuarioId, items, total);
    }

    return obtenerResultadoPago(resultado);
  }
};
