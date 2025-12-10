import React, { useEffect, useState } from "react";
import { Juego } from "../../domain/juegos/Juego";
import JuegosRepository from "../../infrastructure/repositories/juegosRepository";
import { Link } from "react-router-dom";
import ProductoCard from "../components/ProductoCard";
import "../../App.css"; 

const bannerUrl = new URL("../../assets/img/baner/Banner.png", import.meta.url).href;

const HomePage: React.FC = () => {
  const [destacados, setDestacados] = useState<Juego[]>([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const cargar = async () => {
      try {
        setError(null); 
        const data = await JuegosRepository.obtenerTodos();
        setDestacados(data.filter((j) => j.destacado).slice(0, 4));
    
      } catch (err: any) {
       
        setError(err.message || "Ocurrió un error al cargar los datos.");
        console.error("Error detallado:", err); 
      } finally {
        setCargando(false);
      }
    };
    cargar();
  }, []);

  return (
    <>
      <section
        className="hero-section hero-banner d-flex align-items-center"
        style={{ backgroundImage: `url(${bannerUrl})` }}
      >
        <div className="container text-center text-light">
          <div className="hero-content p-4 rounded-3" style={{background: 'rgba(0,0,0,0.45)'}}>
            <i
              className="bi bi-controller"
              style={{ fontSize: "4rem", color: "var(--bs-primary)" }}
            />
            <h1 className="display-4">Bienvenido a GameVault</h1>
            <p className="lead">
              Tu tienda de <strong>juegos digitales</strong> con títulos para
              Steam, PlayStation y más. Explora nuestro catálogo y encuentra tu
              próxima aventura.
            </p>
            <Link to="/productos" className="btn btn-primary btn-lg">
              Ver catálogo
            </Link>
          </div>
        </div>
      </section>

      <section className="container py-5">
        <h2 className="mb-4 text-center">Juegos Destacados</h2>
        {cargando ? (
          <div className="text-center">Cargando...</div>
        ) : error ? (
          <div className="alert alert-danger text-center" role="alert">
            <strong>Error:</strong> {error}
          </div>
        ) : (
          <>
            {destacados.length > 0 ? (
              <div className="row">
                {destacados.map((j) => (
                  <div className="col-sm-6 col-md-4 col-lg-3 mb-4" key={j.id}>
                    <ProductoCard juego={j} />
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center text-muted">
                <p>No hay juegos destacados por el momento.</p>
              </div>
            )}
          </>
        )}
      </section>
    </>
  );
};

export default HomePage;
