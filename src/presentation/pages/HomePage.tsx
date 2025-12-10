import React, { useEffect, useState } from "react";
import { Juego } from "../../domain/juegos/Juego";
import JuegosRepository from "../../infrastructure/repositories/juegosRepository";
import { Link } from "react-router-dom";
import ProductoCard from "../components/ProductoCard";
import "../../App.css"; 


const shuffleArray = (array: any[]) => {
  return array
    .map(value => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value);
};

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
      
        const soloDestacados = data.filter((j) => j.destacado);
        
        const randomDestacados = shuffleArray(soloDestacados);

        setDestacados(randomDestacados);
    
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
          <div className="hero-content p-4 rounded-3" style={{background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(5px)'}}>
            <i
              className="bi bi-controller mb-3 d-block"
              style={{ fontSize: "4rem", color: "var(--bs-primary)", textShadow: "0 0 15px var(--bs-primary)" }}
            />
            <h1 className="display-4 fw-bold text-uppercase">Bienvenido a GameVault</h1>
            <p className="lead text-light">
              Tu tienda de <strong>juegos digitales</strong> con títulos para
              Steam, PlayStation y más. Explora nuestro catálogo y encuentra tu
              próxima aventura.
            </p>
            <Link to="/productos" className="btn btn-primary btn-lg mt-3 px-5 py-3 rounded-pill">
              Ver catálogo completo
            </Link>
          </div>
        </div>
      </section>

      <section className="container py-5">
        <div className="d-flex align-items-center justify-content-center mb-5">
            <h2 className="text-white fw-bold text-uppercase mb-0 me-3">Juegos Destacados</h2>
            <div style={{height: "2px", width: "100px", background: "var(--bs-primary)", boxShadow: "0 0 10px var(--bs-primary)"}}></div>
        </div>

        {cargando ? (
          <div className="text-center py-5">
             <div className="spinner-border text-primary" role="status"></div>
          </div>
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