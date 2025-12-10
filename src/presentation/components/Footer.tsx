const Footer = () => {
  return (
    <footer
      className="py-4 mt-auto"
      style={{
        backgroundColor: "var(--surface-color-dark, #1a1a1a)",
        borderTop: "1px solid var(--bs-border-color, #333)",
      }}
    >
      <div className="container text-center">
        <small style={{ color: "var(--text-secondary, #a0a0a0)" }}>
          © {new Date().getFullYear()} GameVault – Tienda de juegos digitales.
          Todos los derechos reservados.
        </small>
      </div>
    </footer>
  );
};

export default Footer;
