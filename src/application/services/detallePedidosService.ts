import DetallePedidosRepository from "../../infrastructure/repositories/detallePedidosRepository";
import { DetallePedido } from "../../domain/pedidos/DetallePedido";

export const crearDetallePedido = async (
  detalle: Omit<DetallePedido, "id">
): Promise<DetallePedido> => {
  return DetallePedidosRepository.crear(detalle);
};

export const obtenerDetallesPorPedido = async (
  pedidoId: string
): Promise<DetallePedido[]> => {
  return DetallePedidosRepository.obtenerPorPedido(pedidoId);
};
