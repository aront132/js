import { useState } from "react";
import { Pedido } from "../../domain/pedidos/Pedido";
import PedidoRepository from "../../infrastructure/repositories/pedidosRepository";

export const usePedido = () => {
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState<string | null>(null);


  const crearPedido = async (pedido: Omit<Pedido, "id" | "fecha">) => {
    setCargando(true);
    setError(null);
    try {
     
      const pedidoConFecha = {
        ...pedido,
        fecha: new Date().toISOString(),
      };
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