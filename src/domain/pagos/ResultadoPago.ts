import { ComprobantePago } from "./ComprobantePago";

export interface ResultadoPago {
  exito: boolean;
  mensaje: string;
  comprobante?: ComprobantePago;
}