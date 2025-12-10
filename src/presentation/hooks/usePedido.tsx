import { useState } from "react";
import { Pedido } from "../../domain/pedidos/Pedido";
import PedidoRepository from "../../infrastructure/repositories/pedidosRepository";

export const usePedido = () => {
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // El hook recibe el pedido sin ID y sin Fecha
  const crearPedido = async (pedido: Omit<Pedido, "id" | "fecha">) => {
    setCargando(true);
    setError(null);
    try {
      // CORRECCIÓN 1: Generamos la fecha actual (ISO string) porque el repositorio la requiere
      const pedidoConFecha = {
        ...pedido,
        fecha: new Date().toISOString(),
      };

      // CORRECCIÓN 2: Usamos el método 'crear' que es el que existe en el repositorio
      // (antes estabas llamando a 'createPedido' que no existe)
      const nuevoPedido = await PedidoRepository.crear(pedidoConFecha);
      return nuevoPedido;
    } catch (err) {
      setError("Error al crear el pedido.");
      console.error("Error al crear pedido:", err);
      return null;
    } finally {
      setCargando(false);
    }
  };

  return { crearPedido, cargando, error };
};