import api from "../api/apiClient";
import { DetallePedido } from "../../domain/pedidos/DetallePedido";

const normalizeDetalle = (detalle: any): DetallePedido => ({
  ...detalle,
  id: String(detalle.id),
  pedidoId: String(detalle.pedidoId),
  juegoId: String(detalle.juegoId),
});

const DetallePedidosRepository = {
  crear: async (
    detalle: Omit<DetallePedido, "id">
  ): Promise<DetallePedido> => {
    const res = await api.post<any>("/detallePedidos", detalle);
    return normalizeDetalle(res.data);
  },

  obtenerPorPedido: async (pedidoId: string): Promise<DetallePedido[]> => {
    const res = await api.get<any[]>(
      `/detallePedidos?pedidoId=${pedidoId}`
    );
    return res.data.map(normalizeDetalle);
  },
};

export default DetallePedidosRepository;
