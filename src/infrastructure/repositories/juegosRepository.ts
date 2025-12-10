import api from "../api/apiClient";
import { Juego } from "../../domain/juegos/Juego";

const JuegosRepository = {
  obtenerTodos: async (): Promise<Juego[]> => {
    const res = await api.get<any[]>("/juegos");
    return res.data.map((juego) => ({ ...juego, id: String(juego.id) }));
  },

  obtenerPorId: async (id: string): Promise<Juego> => {
    const res = await api.get<any>(`/juegos/${id}`);
    return { ...res.data, id: String(res.data.id) };
  },

  crear: async (juego: Omit<Juego, "id">): Promise<Juego> => {
    const res = await api.post<any>("/juegos", juego);
    return { ...res.data, id: String(res.data.id) };
  },


  actualizar: async (id: string, juego: Partial<Juego>): Promise<Juego> => {
    const res = await api.patch<any>(`/juegos/${id}`, juego);
    return { ...res.data, id: String(res.data.id) };
  },

  eliminar: async (id: string): Promise<void> => {
    await api.delete(`/juegos/${id}`);
  },
};

export default JuegosRepository;