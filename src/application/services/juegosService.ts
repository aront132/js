import JuegosRepository from "../../infrastructure/repositories/juegosRepository";
import { Juego } from "../../domain/juegos/Juego";

export const obtenerJuegos = async (): Promise<Juego[]> => {
  return JuegosRepository.obtenerTodos();
};

export const obtenerJuegoPorId = async (id: string): Promise<Juego> => {
  return JuegosRepository.obtenerPorId(id);
};

export const crearJuego = async (juego: Omit<Juego, "id">): Promise<Juego> => {
  return JuegosRepository.crear(juego);
};

export const actualizarJuego = async (
  id: string,
  juego: Partial<Juego>
): Promise<Juego> => {
  return JuegosRepository.actualizar(id, juego);
};

export const eliminarJuego = async (id: string): Promise<void> => {
  return JuegosRepository.eliminar(id);
};
