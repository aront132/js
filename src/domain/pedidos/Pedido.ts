import { Identificador } from '../shared/value-objects/Identificador';
import { PedidoID } from '../shared/value-objects/PedidoID';
import { Fecha } from '../shared/value-objects/Fecha';
import { TotalPedido } from '../shared/value-objects/TotalPedido';
import { EstadoPedido } from './EstadoPedido';

export interface Pedido {
  id: PedidoID;
  usuarioId: Identificador;
  fecha: Fecha;
  total: TotalPedido;
  estado: EstadoPedido;
}
