import PedidosRepository from "../../infrastructure/repositories/pedidosRepository";
import { Pedido } from "../../domain/pedidos/Pedido";

export const crearPedido = async (
  pedido: Omit<Pedido, "id">
): Promise<Pedido> => {
  return PedidosRepository.crear(pedido);
};

export const obtenerPedidosPorUsuario = async (
  usuarioId: string
): Promise<Pedido[]> => {
  return PedidosRepository.obtenerPorUsuario(usuarioId);
};

export const cancelarPedido = async (id: string): Promise<Pedido> => {
  return PedidosRepository.cancelar(id);
};
