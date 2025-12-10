import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import JuegosRepository from "../../../infrastructure/repositories/juegosRepository";
import { Juego } from "../../../domain/juegos/Juego";
import { useCarrito } from "../../hooks/useCarrito";
import ProductoCard from "../../components/ProductoCard";
import Card from "../../components/Card";

const ProductoDetallePage: React.FC = () => {
  const { id } = useParams();
  const [juego, setJuego] = useState<Juego | null>(null);
  const [relacionados, setRelacionados] = useState<Juego[]>([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [mensaje, setMensaje] = useState<string | null>(null);
  const { agregarAlCarrito } = useCarrito();

  useEffect(() => {
    const cargar = async () => {
      try {
        if (!id) return;
        setCargando(true);
        setError(null);
        setMensaje(null);

        const [juegoData, todosLosJuegos] = await Promise.all([
          JuegosRepository.obtenerPorId(String(id)),
          JuegosRepository.obtenerTodos(),
        ]);

        setJuego(juegoData);

        const relacionadosData = todosLosJuegos
          .filter(
            (j) => j.genero === juegoData.genero && j.id !== juegoData.id
          )
          .slice(0, 4);

        setRelacionados(relacionadosData);
      } catch {
        setError("No se pudo cargar el producto");
      } finally {
        setCargando(false);
      }
    };
    cargar();
    window.scrollTo(0, 0); 
  }, [id]);

  if (cargando)
    return (
      <div className="container py-5 text-center">Cargando producto...</div>
    );
  if (error || !juego)
    return <div className="container py-5 text-center text-danger">{error ?? "Sin datos"}</div>;

  const imgUrl = new URL(
    `../../../assets/img/Producto/${juego.imgFile}`,
    import.meta.url
  ).href;

  const handleAgregar = () => {
    agregarAlCarrito(juego, 1);
    setMensaje("¡Producto agregado al carrito!");
    setTimeout(() => setMensaje(null), 3000);
  };

  return (
    <div className="container py-5">
      <Card>
        <div className="row">
          <div className="col-lg-5 mb-4 mb-lg-0">
            <img
              src={imgUrl}
              className="img-fluid rounded shadow-lg"
              alt={juego.titulo}
            />
          </div>
          <div className="col-lg-7">
            <h1 className="display-5">{juego.titulo}</h1>
            <p className="h5" style={{ color: "var(--bs-primary-light)" }}>
              {juego.plataforma} · {juego.genero}
            </p>
            <p className="lead my-4">{juego.descripcion}</p>
            <div
              className="p-3 rounded mb-4"
              style={{ backgroundColor: "var(--surface-color-dark)" }}
            >
              <div className="row">
                <div className="col-6">
                  <strong>Desarrollador:</strong> {juego.desarrollador}
                </div>
                <div className="col-6">
                  <strong>Lanzamiento:</strong> {juego.lanzamiento}
                </div>
              </div>
            </div>
            <div className="d-flex justify-content-between align-items-center">
              <span
                className="display-4"
                style={{ color: "var(--bs-success)" }}
              >
                S/ {juego.precio}
              </span>
              <div>
                <button
                  className="btn btn-primary btn-lg"
                  onClick={handleAgregar}
                  disabled={juego.stock <= 0}
                >
                  <i className="bi bi-cart-plus-fill me-2" />
                  Agregar al carrito
                </button>
                <p
                  className="mt-2 text-end"
                  style={{ color: "var(--text-secondary)" }}
                >
                  Stock: {juego.stock > 0 ? juego.stock : "Agotado"}
                </p>
              </div>
            </div>
            {mensaje && (
              <div className="alert alert-success mt-3">{mensaje}</div>
            )}
          </div>
        </div>
      </Card>

      {relacionados.length > 0 && (
        <div className="mt-5">
          <h2 className="mb-4">También te podría interesar</h2>
          <div className="row">
            {relacionados.map((rel) => (
              <div className="col-md-3 mb-4" key={rel.id}>
                <ProductoCard juego={rel} />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductoDetallePage;
