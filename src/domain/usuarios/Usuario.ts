import { Email } from "../shared/value-objects/Email";
import { Identificador } from "../shared/value-objects/Identificador";
import { Password } from "../shared/value-objects/Password";

export type RolUsuario = "admin" | "cliente";

export interface Usuario {
  id: Identificador;
  rol: RolUsuario;
  nombre: string;
  apellido: string;
  edad?: number;
  pais?: string;
  departamento?: string;
  correo: Email;
  password: Password;
}
