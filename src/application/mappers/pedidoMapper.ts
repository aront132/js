import { Pedido } from '../../domain/pedidos/Pedido';
import { EstadoPedido } from '../../domain/pedidos/EstadoPedido';

interface PedidoDTO {
  id: string;
  usuarioId: string;
  fecha: string; 
  total: number;
  estado: "pendiente" | "pagado" | "cancelado" | "completado";
}

const toDomain = (dto: PedidoDTO): Pedido => {
  return {
    
    id: dto.id,
    usuarioId: dto.usuarioId,
    fecha: dto.fecha,
    total: dto.total,
    estado: dto.estado as EstadoPedido,
  };
};
const toDTO = (domain: Pedido): PedidoDTO => {
 return {
    ...domain
  };
};

export const pedidoMapper = {
  toDomain,
  toDTO,
};
