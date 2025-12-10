import { pagoServices } from "../../application/services/pagoService";
import { MetodoPago } from "../../domain/pagos/MetodoPago";

export const usePago = () => {
  const procesar = async (
    metodo: MetodoPago,
    usuarioId: string,
    items: any[],
    total: number
  ) => {
    return await pagoServices.pagar(metodo, usuarioId, items, total);
  };

  return { procesar };
};
