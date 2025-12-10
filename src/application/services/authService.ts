import { API_URL } from "../../infrastructure/api/api";
import { Usuario } from "../../domain/usuarios/Usuario";

export const loginRequest = async (
  correo: string,
  password: string
): Promise<Usuario | null> => {
  const res = await fetch(
    `${API_URL}/usuarios?correo=${encodeURIComponent(
      correo
    )}&password=${encodeURIComponent(password)}`
  );

  if (!res.ok) throw new Error("Error al iniciar sesión");


  const data = await res.json();

  if (!Array.isArray(data) || data.length === 0) return null;

  const usuario = data[0];


  return {
    ...usuario,
    id: String(usuario.id), 
  };
};

export const registrarUsuario = async (
  usuario: Omit<Usuario, "id" | "rol">
): Promise<Usuario> => {
  const nuevoUsuario = {
    ...usuario,
    rol: "cliente" as const,
  };

  const res = await fetch(`${API_URL}/usuarios`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(nuevoUsuario),
  });

  if (!res.ok) throw new Error("Error al registrar usuario");

  const data = await res.json();

  return {
    ...data,
    id: String(data.id)
  };
};
