import PedidosRepository from "../../../infrastructure/repositories/pedidosRepository";
import DetallePedidosRepository from "../../../infrastructure/repositories/detallePedidosRepository";
import JuegosRepository from "../../../infrastructure/repositories/juegosRepository";
import { Pedido } from "../../../domain/pedidos/Pedido";
import { EstadoPedido } from "../../../domain/pedidos/EstadoPedido";

type CreateOrderParams = {
  usuarioId: string;
  items: any[]; // Usamos 'any[]' temporalmente o 'ItemCarrito[]' si no da error de importación
  total: number;
  estado?: "pagado" | "cancelado";
};

export const createOrder = async ({
  usuarioId,
  items,
  total,
  estado = "pagado",
}: CreateOrderParams): Promise<Pedido> => {

  // CORRECCIÓN: Convertimos el string literal al tipo Enum 'EstadoPedido' usando 'as'
  const pedido = await PedidosRepository.crear({
    usuarioId,
    fecha: new Date().toISOString(),
    total,
    estado: estado as EstadoPedido, 
  });

  await Promise.all(
    items.map(async (item) => {
      await DetallePedidosRepository.crear({
        pedidoId: pedido.id,
        juegoId: item.juego.id,
        cantidad: item.cantidad,
        precioUnitario: item.juego.precio,
        subtotal: item.juego.precio * item.cantidad,
      });

      if (estado === "pagado") {
        try {
          const nuevoStock = (Number(item.juego.stock) || 0) - item.cantidad;
          await JuegosRepository.actualizar(String(item.juego.id), {
            stock: Math.max(0, nuevoStock),
          });
        } catch (err) {
          console.warn("No se pudo actualizar stock para juego", item.juego.id, err);
        }
      }
    })
  );

  return pedido;
};

export default createOrder;