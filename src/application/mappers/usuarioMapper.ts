import { Usuario } from '../../domain/usuarios/Usuario';
import { Email } from '../../domain/shared/value-objects/Email';
import { Identificador } from '../../domain/shared/value-objects/Identificador';
import { Password } from '../../domain/shared/value-objects/Password';


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

const toDomain = async (dto: any): Promise<Usuario> => {
  return {
    id: Identificador.create(dto.id),
    rol: dto.rol,
    nombre: dto.nombre,
    apellido: dto.apellido,
    edad: dto.edad,
    pais: dto.pais,
    departamento: dto.departamento,
    correo: Email.create(dto.correo),

    password: await Password.create(dto.password, true), 
  };
};

const toDTO = (domain: Usuario): UsuarioDTO => {
  return {
    id: domain.id.getValue(),
    rol: domain.rol,
    nombre: domain.nombre,
    apellido: domain.apellido,
    edad: domain.edad,
    pais: domain.pais,
    departamento: domain.departamento,
    correo: domain.correo.getValue(),
    password: domain.password.getValue(),
  };
};

export const usuarioMapper = {
  toDomain,
  toDTO,
};
