
import { EstadoPago } from './EstadoPago';

export interface ComprobantePago {
  id: string;
  monto: number;
  fecha: string;
  estado: EstadoPago;
  metodo: {
    cardName: string;
    last4: string;
  };
}