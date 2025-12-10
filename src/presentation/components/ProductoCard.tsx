import React from "react";
import { Link } from "react-router-dom";
import { Juego } from "../../domain/juegos/Juego";
import { getImageUrl } from "../../domain/shared/utils/imageUtils"; 
interface Props {
  juego: Juego;
}

const ProductoCard: React.FC<Props> = ({ juego }) => {
  // Usamos la función helper para obtener la URL correcta
  const imgUrl = getImageUrl(juego.imgFile);

  return (
    <div className="card h-100 bg-dark text-light border-secondary product-card">
      <div className="card-img-top-wrapper">
        <img src={imgUrl} className="card-img-top product-img" alt={juego.titulo} />
      </div>
      <div className="card-body d-flex flex-column">
        <h5 className="card-title text-truncate">{juego.titulo}</h5>
        <p className="card-text text-muted mb-2">{juego.genero}</p>
        <p className="card-text fw-bold text-success mb-3">S/ {Number(juego.precio).toFixed(2)}</p>
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
