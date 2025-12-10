import { Usuario } from '../../domain/usuarios/Usuario';



interface UsuarioDTO {
  id: string;
  rol: 'admin' | 'cliente';
  nombre: string;
  apellido: string;
  edad?: number;
  pais?: string;
  departamento?: string;
  correo: string;
  password: string;
}

const toDomain = (dto: any): Usuario => {
  return {
    id: String(dto.id),
    rol: dto.rol,
    nombre: dto.nombre,
    apellido: dto.apellido,
    edad: dto.edad,
    pais: dto.pais,
    departamento: dto.departamento,
    correo: dto.correo,
    password: dto.password,
  };
};
const toDTO = (domain: Usuario): UsuarioDTO => {
  return {
    ...domain
  };
};

export const usuarioMapper = {
  toDomain,
  toDTO,
};
