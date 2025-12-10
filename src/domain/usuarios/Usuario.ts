
export type RolUsuario = "admin" | "cliente";

export interface Usuario {
  id: string;
  rol: RolUsuario;
  nombre: string;
  apellido: string;
  edad?: number;
  pais?: string;
  departamento?: string;
  correo: string;
  password: string;
}