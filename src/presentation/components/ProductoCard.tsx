import React from "react";
import { Link } from "react-router-dom";
import { Juego } from "../../domain/juegos/Juego";

interface Props {
  juego: Juego;
}

const ProductoCard: React.FC<Props> = ({ juego }) => {
  const imgUrl = new URL(
    `../../assets/img/Producto/${juego.imgFile}`,
    import.meta.url
  ).href;

  return (
    <div className="card h-100 bg-dark text-light border-secondary product-card">
      <div className="card-img-top-wrapper">
        <img src={imgUrl} className="card-img-top product-img" alt={juego.titulo} />
      </div>
      <div className="card-body d-flex flex-column">
        <h5 className="card-title">{juego.titulo}</h5>
        <p className="card-text text-muted mb-2">{juego.genero}</p>
        <p className="card-text fw-bold text-success mb-3">S/ {juego.precio}</p>
        <div className="mt-auto">
          <Link to={`/producto/${juego.id}`} className="btn btn-primary w-100">
            Ver detalles
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProductoCard;
