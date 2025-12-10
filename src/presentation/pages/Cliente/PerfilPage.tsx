import { useAuth } from "../../hooks/useAuth";
import { Link } from "react-router-dom";

const PerfilPage = () => {
  const { usuario } = useAuth();

  if (!usuario)
    return (
      <div className="alert alert-warning">
        <i className="bi bi-exclamation-triangle-fill me-2"></i>
        Debes <Link to="/auth/login">iniciar sesión</Link> para ver tu perfil.
      </div>
    );

  const listStyle: React.CSSProperties = {
    backgroundColor: "var(--surface-color-light)",
    borderColor: "var(--bs-border-color)",
    color: "var(--bs-body-color)",
  };

  return (
    <>
      <h3 className="mb-4">Datos del Perfil</h3>
      <ul className="list-group">
        <li className="list-group-item" style={listStyle}>
          <i className="bi bi-person-fill me-2"></i>
          <strong>Nombre:</strong> {usuario.nombre} {usuario.apellido}
        </li>
        {usuario.edad && (
          <li className="list-group-item" style={listStyle}>
            <i className="bi bi-calendar-event-fill me-2"></i>
            <strong>Edad:</strong> {usuario.edad}
          </li>
        )}
        <li className="list-group-item" style={listStyle}>
          <i className="bi bi-globe-americas me-2"></i>
          <strong>País:</strong> {usuario.pais}
        </li>
        <li className="list-group-item" style={listStyle}>
          <i className="bi bi-geo-alt-fill me-2"></i>
          <strong>Departamento:</strong> {usuario.departamento}
        </li>
        <li className="list-group-item" style={listStyle}>
          <i className="bi bi-envelope-fill me-2"></i>
          <strong>Correo:</strong> {usuario.correo}
        </li>
      </ul>
    </>
  );
};

export default PerfilPage;
