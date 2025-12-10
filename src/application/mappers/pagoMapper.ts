import { ComprobantePago } from '../../domain/pagos/ComprobantePago';
import { EstadoPago } from '../../domain/pagos/EstadoPago';
import { Identificador } from '../../domain/shared/value-objects/Identificador';
import { Dinero } from '../../domain/shared/value-objects/Dinero';
import { Fecha } from '../../domain/shared/value-objects/Fecha';

// DTO for a ComprobantePago
interface ComprobantePagoDTO {
  id: string;
  monto: number;
  fecha: string; // ISO date string
  estado: "aprobado" | "rechazado";
  metodo: {
    cardName: string;
    last4: string;
  };
}

const toDomain = (dto: ComprobantePagoDTO): ComprobantePago => {
  return {
    id: Identificador.create(dto.id),
    monto: Dinero.create(dto.monto),
    fecha: Fecha.create(dto.fecha),
    estado: dto.estado as EstadoPago,
    metodo: dto.metodo,
  };
};

const toDTO = (domain: ComprobantePago): ComprobantePagoDTO => {
  return {
    id: domain.id.getValue(),
    monto: domain.monto.getValue(),
    fecha: domain.fecha.toISOString(),
    estado: domain.estado,
    metodo: domain.metodo,
  };
};

export const pagoMapper = {
  toDomain,
  toDTO,
};
