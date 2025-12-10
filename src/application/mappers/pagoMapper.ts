import { ComprobantePago } from '../../domain/pagos/ComprobantePago';
import { EstadoPago } from '../../domain/pagos/EstadoPago';

// DTO for a ComprobantePago (Datos que vienen de la API/JSON)
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
    // CORRECCIÓN: Asignación directa de tipos simples (string/number).
    // Eliminamos Identificador.create(), Dinero.create(), etc.
    id: dto.id,
    monto: dto.monto,
    fecha: dto.fecha,
    estado: dto.estado as EstadoPago,
    metodo: dto.metodo,
  };
};

const toDTO = (domain: ComprobantePago): ComprobantePagoDTO => {
  return {
    ...domain
  };
};

export const pagoMapper = {
  toDomain,
  toDTO,
};