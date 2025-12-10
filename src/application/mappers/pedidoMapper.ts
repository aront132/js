import { Pedido } from '../../domain/pedidos/Pedido';
import { EstadoPedido } from '../../domain/pedidos/EstadoPedido';
import { Identificador } from '../../domain/shared/value-objects/Identificador';
import { PedidoID } from '../../domain/shared/value-objects/PedidoID';
import { Fecha } from '../../domain/shared/value-objects/Fecha';
import { TotalPedido } from '../../domain/shared/value-objects/TotalPedido';

// DTO for a Pedido
interface PedidoDTO {
  id: string;
  usuarioId: string;
  fecha: string; // ISO date string
  total: number;
  estado: "pendiente" | "pagado" | "cancelado" | "completado";
}

const toDomain = (dto: PedidoDTO): Pedido => {
  return {
    id: PedidoID.create(dto.id),
    usuarioId: Identificador.create(dto.usuarioId),
    fecha: Fecha.create(dto.fecha),
    total: TotalPedido.create(dto.total),
    estado: dto.estado as EstadoPedido,
  };
};

const toDTO = (domain: Pedido): PedidoDTO => {
  return {
    id: domain.id.getValue(),
    usuarioId: domain.usuarioId.getValue(),
    fecha: domain.fecha.toISOString(),
    total: domain.total.getValue(),
    estado: domain.estado,
  };
};

export const pedidoMapper = {
  toDomain,
  toDTO,
};
