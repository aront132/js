
import { EstadoPedido } from './EstadoPedido';

export interface Pedido {
 id: string;        // Antes era PedidoID
  usuarioId: string; // Antes era Identificador
  fecha: string;     // Antes era Fecha
  total: number;     // Antes era TotalPedido
  estado: EstadoPedido;
}
