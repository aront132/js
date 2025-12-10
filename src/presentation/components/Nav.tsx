import { NavLink, Link, useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { useAuth } from "../hooks/useAuth";
import { useCarrito } from "../hooks/useCarrito";

const Nav = () => {
  const { usuario, cerrarSesion } = useAuth();
  const { items } = useCarrito();
  const [termino, setTermino] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  const cantidadCarrito = items.reduce((acc, i) => acc + i.cantidad, 0);


  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const buscar = params.get("buscar") || "";
    if (location.pathname.startsWith("/productos")) {
      setTermino(buscar);
    }
  }, [location]);

  const handleBuscar = (e: React.FormEvent) => {
    e.preventDefault();
    navigate(`/productos?buscar=${encodeURIComponent(termino)}`);
  };

  const inicial =
    usuario && usuario.nombre ? usuario.nombre.charAt(0).toUpperCase() : null;

  const [open, setOpen] = useState(false);

  return (
    <nav
      className="navbar navbar-expand-lg navbar-dark gv-navbar"
      style={{
        backgroundColor: "var(--surface-color-dark, #0f1113)",
        borderBottom: "1px solid rgba(255,255,255,0.04)",
      }}
    >
      <div className="container">
        <Link className="navbar-brand fw-bold" to="/" style={{ color: "var(--bs-primary)"}}>
          <i className="bi bi-controller me-2" />
          GameVault
        </Link>

        <button
          className={`navbar-toggler ${open ? "collapsed-open" : ""}`}
          type="button"
          aria-controls="mainNavbar"
          aria-expanded={open}
          aria-label="Toggle navigation"
          onClick={() => setOpen((v) => !v)}
        >
          <span className="navbar-toggler-icon" />
        </button>

        <div
          className={`collapse navbar-collapse ${open ? "show" : ""}`}
          id="mainNavbar"
        >
   
          <ul className="navbar-nav me-3 mb-2 mb-lg-0">
            <li className="nav-item">
              <NavLink className="nav-link" to="/">
                Inicio
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/productos">
                Productos
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/nosotros">
                Nosotros
              </NavLink>
            </li>
          </ul>

      
          <form
            className="d-flex flex-grow-1 me-3"
            role="search"
            onSubmit={handleBuscar}
          >
            <div className="input-group">
              <span
                className="input-group-text border-0"
                style={{
                  backgroundColor: "var(--surface-color-light)",
                  color: "var(--text-secondary)",
                }}
              >
                <i className="bi bi-search" />
              </span>
              <input
                className="form-control border-0"
                type="search"
                placeholder="Buscar juego, plataforma o género..."
                value={termino}
                onChange={(e) => setTermino(e.target.value)}
                style={{
                  backgroundColor: "var(--surface-color-light)",
                  color: "var(--bs-body-color)",
                }}
              />
            </div>
          </form>

     
          <ul className="navbar-nav ms-auto align-items-center">
            <li className="nav-item me-3 position-relative">
              <NavLink className="nav-link" to="/cliente/carrito">
                <i className="bi bi-cart3 fs-5" />
                {cantidadCarrito > 0 && (
                  <span
                    className="badge rounded-pill position-absolute top-0 start-100 translate-middle"
                    style={{ backgroundColor: "var(--bs-primary)" }}
                  >
                    {cantidadCarrito}
                  </span>
                )}
              </NavLink>
            </li>

            {usuario ? (
              <>
       
                <li className="nav-item me-2">
                  <NavLink className="nav-link" to="/cliente/perfil">
                    <div
                      className="rounded-circle d-flex align-items-center justify-content-center"
                      style={{
                        width: 32,
                        height: 32,
                        backgroundColor: "var(--bs-primary)",
                        color: "var(--text-primary)",
                        fontWeight: "bold",
                      }}
                    >
                      {inicial}
                    </div>
                  </NavLink>
                </li>
                <li className="nav-item">
                  <button
                    className="btn btn-outline-danger btn-sm"
                    onClick={cerrarSesion}
                  >
                    Cerrar sesión
                  </button>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/auth/login">
                    Ingresar
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink
                    className="btn btn-primary btn-sm"
                    to="/auth/registro"
                  >
                    Registrarse
                  </NavLink>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Nav;
