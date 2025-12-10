import Card from "../components/Card";
import "./NosotrosPage.css";

const NosotrosPage = () => {
  return (
    <div className="nosotros-page">


      <section className="hero-nosotros text-center py-5 position-relative">
        <div className="container position-relative z-1">
          <h1 className="display-3 fw-bold mb-3 text-gradient-neon">Sobre GameVault</h1>
          <p className="lead text-light mx-auto" style={{ maxWidth: "700px" }}>
            Más que una tienda, somos tu portal al universo de los videojuegos digitales.
            Pasión, tecnología y la mejor experiencia de usuario en un solo lugar.
          </p>
        </div>

        <div className="hero-bg-overlay"></div>
      </section>


      <section className="py-5">
        <div className="container">
          <div className="row g-4">
            <div className="col-md-6">
              <Card className="h-100 p-4 border-0 shadow-lg card-hover">
                <div className="d-flex align-items-center mb-3">
                  <div className="icon-box bg-primary bg-opacity-25 text-primary rounded-circle me-3">
                    <i className="bi bi-rocket-takeoff-fill fs-4"></i>
                  </div>
                  <h3 className="h4 mb-0 text-white">Nuestra Misión</h3>
                </div>
                <p className="text-secondary">
                  Facilitar el acceso a los mejores títulos del mercado mediante una plataforma
                  segura, rápida y fácil de usar. Creemos que comprar un juego debe ser tan
                  emocionante como jugarlo.
                </p>
              </Card>
            </div>
            <div className="col-md-6">
              <Card className="h-100 p-4 border-0 shadow-lg card-hover">
                <div className="d-flex align-items-center mb-3">
                  <div className="icon-box bg-info bg-opacity-25 text-info rounded-circle me-3">
                    <i className="bi bi-eye-fill fs-4"></i>
                  </div>
                  <h3 className="h4 mb-0 text-white">Nuestra Visión</h3>
                </div>
                <p className="text-secondary">
                  Convertirnos en el referente líder de distribución digital, conectando a
                  desarrolladores y gamers en una comunidad vibrante donde la tecnología
                  potencia la diversión.
                </p>
              </Card>
            </div>
          </div>
        </div>
      </section>


      <section className="py-5 bg-darker">
        <div className="container">
          <h2 className="text-center text-white mb-5">¿Por qué elegir GameVault?</h2>
          <div className="row g-4 text-center">
            <div className="col-md-4">
              <div className="feature-item p-3">
                <i className="bi bi-shield-check display-4 text-success mb-3"></i>
                <h4 className="text-white">Compra Segura</h4>
                <p className="text-secondary">
                  Tus transacciones están protegidas con los más altos estándares de seguridad.
                </p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="feature-item p-3">
                <i className="bi bi-lightning-charge display-4 text-warning mb-3"></i>
                <h4 className="text-white">Entrega Inmediata</h4>
                <p className="text-secondary">
                  Recibe tus códigos digitales al instante tras completar tu compra. Sin esperas.
                </p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="feature-item p-3">
                <i className="bi bi-headset display-4 text-danger mb-3"></i>
                <h4 className="text-white">Soporte 24/7</h4>
                <p className="text-secondary">
                  Nuestro equipo está siempre listo para ayudarte con cualquier duda o problema.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="py-5">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6 mb-4 mb-lg-0">
              <h2 className="mb-4 text-white">Impulsado por Tecnología Moderna</h2>
              <p className="text-secondary mb-4">
                GameVault no es solo una cara bonita. Bajo el capó, utilizamos un stack tecnológico
                robusto para garantizar rendimiento, escalabilidad y una experiencia de desarrollo
                excepcional.
              </p>
              <div className="d-flex flex-wrap gap-3">
                <span className="badge bg-dark border border-secondary p-2 d-flex align-items-center">
                  <i className="bi bi-react me-2 text-info"></i> React 18
                </span>
                <span className="badge bg-dark border border-secondary p-2 d-flex align-items-center">
                  <i className="bi bi-filetype-tsx me-2 text-primary"></i> TypeScript
                </span>
                <span className="badge bg-dark border border-secondary p-2 d-flex align-items-center">
                  <i className="bi bi-bootstrap me-2 text-purple"></i> Bootstrap 5
                </span>
                <span className="badge bg-dark border border-secondary p-2 d-flex align-items-center">
                  <i className="bi bi-hdd-network me-2 text-warning"></i> REST API
                </span>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="tech-illustration p-5 rounded-4 position-relative overflow-hidden">
                <div className="code-snippet">
                  <pre className="m-0 text-success small">
                    {`const GameVault = () => {
  const [fun, setFun] = useState(true);
  
  return (
    <Experience quality="premium">
      <Games infinite={true} />
    </Experience>
  );
};`}
                  </pre>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>


      <section className="cta-section py-5 text-center mt-4">
        <div className="container">
          <Card className="bg-gradient-primary-dark border-0 p-5">
            <h2 className="mb-3 text-white">¿Listo para jugar?</h2>
            <p className="lead text-light mb-4">Explora nuestro catálogo y encuentra tu próxima gran aventura hoy mismo.</p>
            <a href="/productos" className="btn btn-primary btn-lg px-5 rounded-pill shadow-glow">
              Ver Catálogo <i className="bi bi-arrow-right ms-2"></i>
            </a>
          </Card>
        </div>
      </section>

    </div>
  );
};

export default NosotrosPage;