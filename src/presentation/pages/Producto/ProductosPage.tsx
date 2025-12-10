import React, { useEffect, useMemo, useState } from "react";
import JuegosRepository from "../../../infrastructure/repositories/juegosRepository";
import { Juego } from "../../../domain/juegos/Juego";
import { useLocation } from "react-router-dom";
import ProductoCard from "../../components/ProductoCard";
import Card from "../../components/Card";

const ProductosPage: React.FC = () => {
  const [juegos, setJuegos] = useState<Juego[]>([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filtroPlataforma, setFiltroPlataforma] = useState("todos");
  const [filtroGenero, setFiltroGenero] = useState("todos");
  const location = useLocation();

  const params = new URLSearchParams(location.search);
  const busqueda = (params.get("buscar") || "").toLowerCase();

  useEffect(() => {
    const cargar = async () => {
      try {
        const data = await JuegosRepository.obtenerTodos();
        setJuegos(data);
      } catch {
        setError("No se pudieron cargar los productos");
      } finally {
        setCargando(false);
      }
    };
    cargar();
  }, []);


  const plataformas = useMemo(
    () =>
      Array.from(new Set(juegos.map((j) => j.plataforma).filter(Boolean))),
    [juegos]
  );

  const generos = useMemo(
    () => Array.from(new Set(juegos.map((j) => j.genero).filter(Boolean))),
    [juegos]
  );

  const juegosFiltrados = juegos.filter((j) => {
    // Protección adicional por si la plataforma/genero viene undefined en la data
    const plataformaJuego = j.plataforma ? j.plataforma.toLowerCase() : "";
    const generoJuego = j.genero ? j.genero.toLowerCase() : "";

    if (
      filtroPlataforma !== "todos" &&
      plataformaJuego !== filtroPlataforma.toLowerCase()
    )
      return false;
    if (
      filtroGenero !== "todos" &&
      generoJuego !== filtroGenero.toLowerCase()
    )
      return false;
    
    if (!busqueda) return true;
    
    const texto = `${j.titulo} ${plataformaJuego} ${generoJuego}`.toLowerCase();
    return texto.includes(busqueda);
  });

  return (
    <div className="container py-5">
      <h1 className="mb-4">Catálogo de juegos</h1>

      <Card className="mb-4">
        <div className="row align-items-end">
          <div className="col-md-5 mb-3 mb-md-0">
            <label className="form-label">Filtrar por plataforma</label>
            <select
              className="form-select"
              value={filtroPlataforma}
              onChange={(e) => setFiltroPlataforma(e.target.value)}
            >
              <option value="todos">Todas</option>
              {plataformas.map((p) => (
                <option key={p} value={p}>
                  {p}
                </option>
              ))}
            </select>
          </div>
          <div className="col-md-5 mb-3 mb-md-0">
            <label className="form-label">Filtrar por género</label>
            <select
              className="form-select"
              value={filtroGenero}
              onChange={(e) => setFiltroGenero(e.target.value)}
            >
              <option value="todos">Todos</option>
              {generos.map((g) => (
                <option key={g} value={g}>
                  {g}
                </option>
              ))}
            </select>
          </div>
          <div className="col-md-2 text-md-end">
            <small className="text-muted">
              {juegosFiltrados.length} resultados
            </small>
          </div>
        </div>
      </Card>

      {cargando && <div className="text-center">Cargando productos...</div>}
      {error && <div className="alert alert-danger">{error}</div>}

      {!cargando && !error && (
        <>
          <div className="row">
            {juegosFiltrados.length > 0 ? (
              juegosFiltrados.map((j) => (
                <div className="col-sm-6 col-md-4 col-lg-3 mb-4" key={j.id}>
                  <ProductoCard juego={j} />
                </div>
              ))
            ) : (
              <div className="col-12">
                <div className="text-center text-muted py-5">
                  <i className="bi bi-emoji-frown fs-1"></i>
                  <p className="mt-3">
                    No se encontraron juegos con los filtros seleccionados.
                  </p>
                </div>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default ProductosPage;