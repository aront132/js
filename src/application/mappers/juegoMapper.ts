import { Juego } from '../../domain/juegos/Juego';
import { Identificador } from '../../domain/shared/value-objects/Identificador';
import { Fecha } from '../../domain/shared/value-objects/Fecha';
import { Imagen } from '../../domain/shared/value-objects/Imagen';
import { Dinero } from '../../domain/shared/value-objects/Dinero';

// DTO for a Juego
interface JuegoDTO {
  id: string;
  titulo: string;
  descripcion: string;
  precio: number;
  stock: number;
  plataforma: string;
  genero: string;
  desarrollador: string;
  lanzamiento: string; // ISO date string
  imgFile: string; // URL or path
  destacado: boolean;
}

const toDomain = (dto: JuegoDTO): Juego => {
  return {
    id: Identificador.create(dto.id),
    titulo: dto.titulo,
    descripcion: dto.descripcion,
    precio: Dinero.create(dto.precio),
    stock: dto.stock,
    plataforma: dto.plataforma,
    genero: dto.genero,
    desarrollador: dto.desarrollador,
    lanzamiento: Fecha.create(dto.lanzamiento),
    imgFile: Imagen.create(dto.imgFile),
    destacado: dto.destacado,
  };
};

const toDTO = (domain: Juego): JuegoDTO => {
  return {
    id: domain.id.getValue(),
    titulo: domain.titulo,
    descripcion: domain.descripcion,
    precio: domain.precio.getValue(),
    stock: domain.stock,
    plataforma: domain.plataforma,
    genero: domain.genero,
    desarrollador: domain.desarrollador,
    lanzamiento: domain.lanzamiento.toISOString(),
    imgFile: domain.imgFile.getValue(),
    destacado: domain.destacado,
  };
};

export const juegoMapper = {
  toDomain,
  toDTO,
};
