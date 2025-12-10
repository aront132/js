interface Props {
  titulo?: string;
  mensaje?: string;
}

const PageFound: React.FC<Props> = ({
  titulo = "Acción realizada correctamente",
  mensaje = "Tu operación se completó con éxito.",
}) => {
  return (
    <div className="container py-5 text-center text-light">
      <h1 className="h3 mb-3">{titulo}</h1>
      <p>{mensaje}</p>
    </div>
  );
};

export default PageFound;
