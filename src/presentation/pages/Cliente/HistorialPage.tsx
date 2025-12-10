import React, { useEffect, useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import { Pedido } from "../../../domain/pedidos/Pedido";
import PedidosRepository from "../../../infrastructure/repositories/pedidosRepository";
import { cancelOrder } from "../../../application/usecases/orders/cancelOrder";
import DetallePedidosRepository from "../../../infrastructure/repositories/detallePedidosRepository";
import { DetallePedido } from "../../../domain/pedidos/DetallePedido";
import JuegosRepository from "../../../infrastructure/repositories/juegosRepository";
import { Juego } from "../../../domain/juegos/Juego";
import Card from "../../components/Card";
import { Link } from "react-router-dom";

interface PedidoConDetalles extends Pedido {
  detalles: (DetallePedido & { juego: Juego })[];
}

const HistorialPage: React.FC = () => {
  const { usuario } = useAuth();
  const [pedidos, setPedidos] = useState<PedidoConDetalles[]>([]);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    const cargar = async () => {
      if (!usuario) {
        setCargando(false);
        return;
      }
      try {
        const pedidosUsuario = await PedidosRepository.obtenerPorUsuario(usuario.id);
        const completos: PedidoConDetalles[] = [];
        for (const p of pedidosUsuario.sort((a, b) => new Date(b.fecha).getTime() - new Date(a.fecha).getTime())) {
          const detalles = await DetallePedidosRepository.obtenerPorPedido(p.id);
          const detallesConJuego = await Promise.all(
            detalles.map(async (d) => {
              const juego = await JuegosRepository.obtenerPorId(d.juegoId);
              return { ...d, juego };
            })
          );
          completos.push({ ...p, detalles: detallesConJuego });
        }
        setPedidos(completos);
      } catch (error) {
        console.error("Error al cargar el historial:", error);
      } finally {
        setCargando(false);
      }
    };
    cargar();
  }, [usuario]);

  if (cargando)
    return (
      <div className="text-center">Cargando historial de pedidos...</div>
    );

  if (!usuario)
    return (
      <div className="alert alert-warning">
        <i className="bi bi-exclamation-triangle-fill me-2"></i>
        Debes <Link to="/auth/login">iniciar sesión</Link> para ver tu
        historial.
      </div>
    );

  const imprimirBoleta = (pedido: PedidoConDetalles) => {
    alert(`Aquí se mostraría/imprimiría la boleta del pedido #${pedido.id}`);
  };

  const handleCancelarPedido = async (pedidoId: string) => {
    if (!confirm("¿Confirmas cancelar este pedido?")) return;
    try {
      const actualizado = await cancelOrder(pedidoId);
      setPedidos((prev) => prev.map((p) => (p.id === pedidoId ? { ...p, estado: actualizado.estado } : p)));
      alert("Pedido marcado como cancelado.");
    } catch (err) {
      console.error(err);
      alert("No se pudo cancelar el pedido.");
    }
  };

  const getEstadoBadge = (estado: string) => {
    switch (estado) {
      case "pagado":
        return "bg-success";
      case "pendiente":
        return "bg-warning text-dark";
      case "cancelado":
        return "bg-danger";
      default:
        return "bg-secondary";
    }
  };

  return (
    <>
      <h3 className="mb-4">Historial de pedidos</h3>
      {pedidos.length === 0 ? (
        <div className="text-center text-muted py-5">
          <i className="bi bi-receipt fs-1"></i>
          <p className="mt-3">Aún no tienes pedidos registrados.</p>
        </div>
      ) : (
        pedidos.map((p) => (
          <Card key={p.id} className="mb-3">
            <div className="d-flex justify-content-between align-items-start mb-2">
              <div>
                <h5 className="mb-1">Pedido #{p.id}</h5>
                <p className="small" style={{ color: "var(--text-secondary)" }}>
                  Fecha: {new Date(p.fecha).toLocaleString()}
                </p>
              </div>
              <span className={`badge ${getEstadoBadge(p.estado)}`}>
                {p.estado.toUpperCase()}
              </span>
            </div>
            <ul className="list-group list-group-flush mb-3">
              {p.detalles.map((d) => (
                <li
                  key={d.id}
                  className="list-group-item bg-transparent d-flex justify-content-between align-items-center px-0"
                >
                  <div>
                    {d.juego.titulo}
                    <span
                      className="small d-block"
                      style={{ color: "var(--text-secondary)" }}
                    >
                      Cantidad: {d.cantidad}
                    </span>
                  </div>
                  <span className="fw-bold">
                    S/ {(d.cantidad * d.precioUnitario).toFixed(2)}
                  </span>
                </li>
              ))}
            </ul>
            <div className="d-flex justify-content-between align-items-center">
              <div>
                <button
                  className="btn btn-sm btn-outline-secondary me-2"
                  onClick={() => imprimirBoleta(p)}
                >
                  <i className="bi bi-printer me-1"></i>
                  Boleta
                </button>
                {p.estado === "pendiente" && (
                  <button className="btn btn-sm btn-danger" onClick={() => handleCancelarPedido(p.id)}>
                    <i className="bi bi-x-circle me-1"></i>
                    Cancelar pedido
                  </button>
                )}
              </div>
              <p className="fw-bold mb-0 h5">
                Total: S/ {p.total.toFixed(2)}
              </p>
            </div>
          </Card>
        ))
      )}
    </>
  );
};

export default HistorialPage;
