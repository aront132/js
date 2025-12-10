import api from "../api/apiClient";
import { Pedido } from "../../domain/pedidos/Pedido";

const normalizePedido = (pedido: any): Pedido => ({
  ...pedido,
  id: String(pedido.id),
  usuarioId: String(pedido.usuarioId),
});

const PedidosRepository = {
  crear: async (pedido: Omit<Pedido, "id">): Promise<Pedido> => {
    const res = await api.post<any>("/pedidos", pedido);
    return normalizePedido(res.data);
  },

  obtenerPorUsuario: async (usuarioId: string): Promise<Pedido[]> => {
    const res = await api.get<any[]>(`/pedidos?usuarioId=${usuarioId}`);
    return res.data.map(normalizePedido);
  },

  cancelar: async (id: string): Promise<Pedido> => {
    const res = await api.patch<any>(`/pedidos/${id}`, {
      estado: "cancelado",
    });
    return normalizePedido(res.data);
  },
};

export default PedidosRepository;
