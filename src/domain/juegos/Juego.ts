import { Identificador } from '../shared/value-objects/Identificador';
import { Fecha } from '../shared/value-objects/Fecha';
import { Imagen } from '../shared/value-objects/Imagen';
import { Dinero } from '../shared/value-objects/Dinero';

export interface Juego {
  id: Identificador;
  titulo: string;
  descripcion: string;
  precio: Dinero;
  stock: number;
  plataforma: string;
  genero: string;   
  desarrollador: string;
  lanzamiento: Fecha;
  imgFile: Imagen;
  destacado: boolean;
}
