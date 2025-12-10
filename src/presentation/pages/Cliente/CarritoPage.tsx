import { useCarrito } from "../../hooks/useCarrito";
import { useAuth } from "../../hooks/useAuth";
import { Link, useNavigate } from "react-router-dom";

const CarritoPage = () => {
  const { items, total, eliminarDelCarrito, actualizarCantidad } = useCarrito();
  const { usuario } = useAuth();
  const puedeComprar = usuario && items.length > 0;
  const navigate = useNavigate();

  

  return (
    <>
      <h3 className="mb-4">Carrito de compras</h3>
      {items.length === 0 ? (
        <div className="text-center text-muted py-5">
          <i className="bi bi-cart-x fs-1"></i>
          <p className="mt-3">No tienes productos en el carrito.</p>
          <Link to="/productos" className="btn btn-primary">
            Explorar catálogo
          </Link>
        </div>
      ) : (
        <>
          <ul className="list-group mb-3">
            {items.map((item) => (
              <li
                key={item.juego.id}
                className="list-group-item d-flex justify-content-between align-items-center"
                style={{
                  backgroundColor: "var(--surface-color-light)",
                  borderColor: "var(--bs-border-color)",
                  color: "var(--bs-body-color)",
                }}
              >
                <div style={{ maxWidth: "65%" }}>
                  <strong>{item.juego.titulo}</strong>
                  <div className="small d-flex align-items-center" style={{ color: "var(--text-secondary)" }}>
                    <button
                      type="button"
                      className="btn btn-sm btn-outline-secondary me-2"
                      onClick={() => actualizarCantidad(item.juego.id, Math.max(1, item.cantidad - 1))}
                      aria-label="Disminuir cantidad"
                    >
                      -
                    </button>
                    <span className="mx-2">{item.cantidad}</span>
                    <button
                      type="button"
                      className="btn btn-sm btn-outline-secondary ms-2"
                      onClick={() => actualizarCantidad(item.juego.id, item.cantidad + 1)}
                      aria-label="Aumentar cantidad"
                    >
                      +
                    </button>
                    <button
                      type="button"
                      className="btn btn-sm btn-link text-danger ms-3"
                      onClick={() => eliminarDelCarrito(item.juego.id)}
                      aria-label="Eliminar del carrito"
                    >
                      <i className="bi bi-trash" />
                    </button>
                  </div>
                </div>
                <span className="fw-bold">
                  S/ {(item.cantidad * item.juego.precio).toFixed(2)}
                </span>
              </li>
            ))}
          </ul>
          <div className="d-flex justify-content-between align-items-center mt-4 pt-3 border-top border-secondary">
            <h5 className="mb-0">Total:</h5>
            <h5 className="mb-0 fw-bold" style={{ color: "var(--bs-success)" }}>
              S/ {total.toFixed(2)}
            </h5>
          </div>
          <div className="d-grid gap-2 mt-4">
            <button
              className="btn btn-primary btn-lg"
              disabled={!puedeComprar}
              onClick={() => navigate("/cliente/checkout")}
            >
              <i className="bi bi-credit-card-2-front me-2"></i>
              Finalizar compra
            </button>
          </div>
          {!usuario && (
            <div className="alert alert-warning mt-3">
              <i className="bi bi-exclamation-triangle-fill me-2"></i>
              Debes <Link to="/auth/login">iniciar sesión</Link> para poder
              comprar.
            </div>
          )}
        </>
      )}
    </>
  );
};

export default CarritoPage;
