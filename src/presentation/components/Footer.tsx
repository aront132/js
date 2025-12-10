import { Link } from "react-router-dom";
import "./Footer.css";
const Footer = () => {
  return (
    <footer className="gv-footer mt-auto text-light">
      <div className="container py-5">
        <div className="row g-4">


          <div className="col-lg-4 col-md-6">
            <Link to="/" className="d-flex align-items-center mb-3 text-decoration-none">
              <i className="bi bi-controller fs-3 me-2" style={{ color: "var(--bs-primary)" }}></i>
              <span className="fs-4 fw-bold text-uppercase text-white tracking-wider">GameVault</span>
            </Link>
            <p className="text-secondary mb-4">
              Tu portal definitivo para juegos digitales.
              Explora, compra y juega al instante con la mejor seguridad y soporte del mercado.
            </p>
          </div>


          <div className="col-lg-2 col-md-6">
            <h5 className="text-white fw-bold mb-3">Explorar</h5>
            <ul className="list-unstyled">
              <li className="mb-2">
                <Link to="/" className="footer-link">Inicio</Link>
              </li>
              <li className="mb-2">
                <Link to="/productos" className="footer-link">Catálogo</Link>
              </li>
              <li className="mb-2">
                <Link to="/nosotros" className="footer-link">Nosotros</Link>
              </li>
              <li className="mb-2">
                <Link to="/auth/login" className="footer-link">Mi Cuenta</Link>
              </li>
            </ul>
          </div>

          <div className="col-lg-2 col-md-6">
            <h5 className="text-white fw-bold mb-3">Legal</h5>
            <ul className="list-unstyled">
              <li className="mb-2">
                <a href="#" className="footer-link">Términos</a>
              </li>
              <li className="mb-2">
                <a href="#" className="footer-link">Privacidad</a>
              </li>
              <li className="mb-2">
                <a href="#" className="footer-link">Reembolsos</a>
              </li>
              <li className="mb-2">
                <a href="#" className="footer-link">Cookies</a>
              </li>
            </ul>
          </div>


          <div className="col-lg-4 col-md-6">
            <h5 className="text-white fw-bold mb-3">Síguenos</h5>
            <p className="text-secondary mb-3">¡Únete a nuestra comunidad gamer!</p>
            <div className="d-flex gap-3">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="social-btn facebook">
                <i className="bi bi-facebook"></i>
              </a>
              <a href="https://tiktok.com" target="_blank" rel="noopener noreferrer" className="social-btn tiktok">
                <i className="bi bi-tiktok"></i>
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="social-btn instagram">
                <i className="bi bi-instagram"></i>
              </a>
              <a href="https://whatsapp.com" target="_blank" rel="noopener noreferrer" className="social-btn whatsapp">
                <i className="bi bi-whatsapp"></i>
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="footer-bottom py-3 border-top border-secondary border-opacity-25">
        <div className="container text-center">
          <small className="text-secondary">
            &copy; {new Date().getFullYear()} <strong>GameVault S.A.C.</strong> Todos los derechos reservados.
          </small>
        </div>
      </div>
    </footer>
  );
};

export default Footer;