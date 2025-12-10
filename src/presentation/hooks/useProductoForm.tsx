import { useState } from "react";
import { Juego } from "../../domain/juegos/Juego";

type ErroresJuego = Partial<Record<keyof Omit<Juego, "id">, string>>;

const estadoInicial = {
  titulo: "",
  descripcion: "",
  precio: 0,
  stock: 0,
  plataforma: "",
  genero: "",
  desarrollador: "",
  lanzamiento: "",
  imgFile: "",
  destacado: false,
};

export const useProductoForm = (inicial?: Partial<Juego>) => {
  const [valores, setValores] = useState<Omit<Juego, "id">>({
    ...estadoInicial,
    ...inicial,
  });

  const [errores, setErrores] = useState<ErroresJuego>({});


  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    setValores((prev) => ({
      ...prev,
      [name]:
        name === "precio" || name === "stock"
          ? Number(value)
          : value,
    }));
  };


  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setValores((prev) => ({
      ...prev,
      [name]: checked,
    }));
  };

  const validar = (): boolean => {
    const nuevosErrores: ErroresJuego = {};

    if (!valores.titulo) nuevosErrores.titulo = "El título es obligatorio";
    if (!valores.descripcion)
      nuevosErrores.descripcion = "La descripción es obligatoria";
    if (!valores.plataforma)
      nuevosErrores.plataforma = "La plataforma es obligatoria";
    if (!valores.genero) nuevosErrores.genero = "El género es obligatorio";
    if (!valores.imgFile)
      nuevosErrores.imgFile = "Debes indicar el nombre de la imagen";
    if (valores.precio <= 0)
      nuevosErrores.precio = "El precio debe ser mayor a 0";
    if (valores.stock < 0)
      nuevosErrores.stock = "El stock no puede ser negativo";

    setErrores(nuevosErrores);
    return Object.keys(nuevosErrores).length === 0;
  };

  const reset = () => {
    setValores(estadoInicial);
    setErrores({});
  };

  return {
    valores,
    errores,
    handleChange,
    handleCheckboxChange, 
    validar,
    setValores,
    reset,
  };
};
