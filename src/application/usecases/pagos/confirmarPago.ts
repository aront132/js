import { createOrder } from "../orders/createOrder";
import { CarritoItem } from "../../../domain/carrito/CarritoItem";

export const confirmarPago = async (
  usuarioId: string,
  items: CarritoItem[],
  total: number
) => {
  return createOrder({
    usuarioId,
    items,
    total,
    estado: "pagado",
  });
};
