import { Identificador } from '../shared/value-objects/Identificador';
import { Dinero } from '../shared/value-objects/Dinero';
import { Fecha } from '../shared/value-objects/Fecha';
import { EstadoPago } from './EstadoPago';

export interface ComprobantePago {
  id: Identificador;
  monto: Dinero;
  fecha: Fecha;
  estado: EstadoPago;
  metodo: {
    cardName: string;
    last4: string;
  };
}
