import { registrarUsuario } from "../../../application/services/authService";
import { Usuario } from "../../../domain/usuarios/Usuario";

export const register = async (
  usuario: Omit<Usuario, "id" | "rol">
): Promise<Usuario> => {
  return registrarUsuario(usuario);
};