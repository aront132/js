import api from "../api/apiClient";
import { Usuario } from "../../domain/usuarios/Usuario";

const AuthRepository = {
  login: async (correo: string, password: string): Promise<Usuario | null> => {
    try {
      // ❌ Evita pedir al servidor si los campos están vacíos
      if (!correo.trim() || !password.trim()) {
        return null;
      }

      const res = await api.get<Usuario[]>(
        `/usuarios?correo=${encodeURIComponent(correo)}&password=${encodeURIComponent(password)}`
      );

      console.log("AuthRepository.login → respuesta:", res.data);

      if (!Array.isArray(res.data) || res.data.length === 0) return null;

      const user = res.data[0];

      return {
        ...user,
        id: user.id, // 🔧 normalizamos el tipo
      };
    } catch (err) {
      console.error("Error en login:", err);
      return null; // ❗ evita que LoginPage se quede colgado
    }
  },

  crear: async (usuario: Omit<Usuario, "id" | "rol">): Promise<Usuario> => {
    const nuevoUsuario = { ...usuario, rol: "cliente" as const };

    try {
      const res = await api.post<Usuario>("/usuarios", nuevoUsuario);
      const data = res.data;

      return {
        ...data,
        id: data.id,
      };
    } catch (err) {
      console.error("Error al registrar:", err);
      throw err;
    }
  },
};

export default AuthRepository;
