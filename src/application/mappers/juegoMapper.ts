import { Juego } from '../../domain/juegos/Juego';



interface JuegoDTO {
  id: string;
  titulo: string;
  descripcion: string;
  precio: number;
  stock: number;
  plataforma: string;
  genero: string;
  desarrollador: string;
  lanzamiento: string;
  imgFile: string;
  destacado: boolean;
}

const toDomain = (dto: JuegoDTO): Juego => {
  return {
    ...dto,
    id: String(dto.id)
  };
};

const toDTO = (domain: Juego): JuegoDTO => {
  return {
    ...domain
  };
};

export const juegoMapper = {
  toDomain,
  toDTO,
};