import { loginRequest } from "../../../application/services/authService";
import { Usuario } from "../../../domain/usuarios/Usuario";

export const login = async (
  correo: string,
  password: string
): Promise<Usuario | null> => {
  return loginRequest(correo, password);
};