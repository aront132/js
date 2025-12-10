import PedidosRepository from "../../../infrastructure/repositories/pedidosRepository";
import { Pedido } from "../../../domain/pedidos/Pedido";

export const cancelOrder = async (pedidoId: string): Promise<Pedido> => {
  return PedidosRepository.cancelar(pedidoId);
};

export default cancelOrder;
