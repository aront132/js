import React, { useEffect, useState } from "react";
import { Juego } from "../../domain/juegos/Juego";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { juegoSchema, JuegoSchema } from "../../application/validators/juegoSchema";
import { getImageUrl } from "../../domain/shared/utils/imageUtils"; 

interface ProductoFormProps {
  onSubmit: (data: Omit<Juego, "id">) => void;
  onCancel: () => void;
  juegoToEdit: Juego | null;
}

const GENEROS = [
  "Acción",
  "Aventura",
  "RPG",
  "Indie",
  "Mundo abierto",
  "Survival Horror",
  "Simulación",
  "Estrategia",
  "Deportes",
  "Carreras",
  "RPG de acción", 
  "Roguelike"
];

const PLATAFORMAS = [
  "Steam",
  "PlayStation"
];

const ProductoForm: React.FC<ProductoFormProps> = ({
  onSubmit,
  onCancel,
  juegoToEdit,
}) => {
  const [preview, setPreview] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<JuegoSchema>({
    resolver: zodResolver(juegoSchema),
    defaultValues: {
      titulo: "",
      plataforma: "",
      genero: "",
      precio: 0,
      stock: 0,
      descripcion: "",
      imgFile: "",
      destacado: false,
      desarrollador: "",
      lanzamiento: "",
    },
  });

  useEffect(() => {
    if (juegoToEdit) {
      reset(juegoToEdit);
      setPreview(getImageUrl(juegoToEdit.imgFile));
    } else {
      reset();
      setPreview(null);
    }
  }, [juegoToEdit, reset]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        setPreview(base64String);
        setValue("imgFile", base64String);
      };
      reader.readAsDataURL(file);
    }
  };

  const onSubmitForm = (data: JuegoSchema) => {
    onSubmit({
      ...data,
      destacado: data.destacado ?? false,
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmitForm)}>
      {/* Previsualización de imagen */}
      <div className="mb-4 text-center">
        <div 
          className="d-inline-block border border-secondary rounded overflow-hidden position-relative"
          style={{ width: "150px", height: "200px", backgroundColor: "#000" }}
        >
          {preview ? (
            <img src={preview} alt="Previsualización" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          ) : (
            <div className="d-flex align-items-center justify-content-center h-100 text-muted">
              <i className="bi bi-image fs-1"></i>
            </div>
          )}
        </div>
      </div>

     
      <div className="mb-3">
        <label className="form-label">Subir Imagen (Portada)</label>
        <input 
          type="file" 
          accept="image/*" 
          className="form-control" 
          onChange={handleFileChange} 
        />
        <input type="hidden" {...register("imgFile")} />
        {errors.imgFile && <small className="text-danger">La imagen es requerida</small>}
      </div>

      <div className="row">
        <div className="mb-3 col-md-6">
          <label className="form-label">Título</label>
          <input className="form-control" {...register("titulo")} />
          {errors.titulo && <small className="text-danger">{errors.titulo.message}</small>}
        </div>

        {/* SELECT PARA PLATAFORMA */}
        <div className="mb-3 col-md-6">
          <label className="form-label">Plataforma</label>
          <select className="form-select" {...register("plataforma")}>
            <option value="">Seleccionar...</option>
            {PLATAFORMAS.map((p) => (
              <option key={p} value={p}>{p}</option>
            ))}
          </select>
          {errors.plataforma && <small className="text-danger">{errors.plataforma.message}</small>}
        </div>
      </div>

      <div className="row">
        <div className="mb-3 col-md-6">
          <label className="form-label">Género</label>
          <select className="form-select" {...register("genero")}>
            <option value="">Seleccionar...</option>
            {GENEROS.map((g) => (
              <option key={g} value={g}>{g}</option>
            ))}
          </select>
          {errors.genero && <small className="text-danger">{errors.genero.message}</small>}
        </div>

        <div className="mb-3 col-md-3">
          <label className="form-label">Precio (S/)</label>
          <input type="number" step="0.01" className="form-control" {...register("precio", { valueAsNumber: true })} />
          {errors.precio && <small className="text-danger">{errors.precio.message}</small>}
        </div>
        <div className="mb-3 col-md-3">
          <label className="form-label">Stock</label>
          <input type="number" className="form-control" {...register("stock", { valueAsNumber: true })} />
          {errors.stock && <small className="text-danger">{errors.stock.message}</small>}
        </div>
      </div>

      <div className="mb-3">
        <label className="form-label">Descripción</label>
        <textarea className="form-control" rows={3} {...register("descripcion")} />
        {errors.descripcion && <small className="text-danger">{errors.descripcion.message}</small>}
      </div>

      <div className="row">
        <div className="mb-3 col-md-6">
          <label className="form-label">Desarrollador</label>
          <input className="form-control" {...register("desarrollador")} />
          {errors.desarrollador && <small className="text-danger">{errors.desarrollador.message}</small>}
        </div>
        <div className="mb-3 col-md-6">
          <label className="form-label">Lanzamiento</label>
          <input type="date" className="form-control" {...register("lanzamiento")} />
          {errors.lanzamiento && <small className="text-danger">{errors.lanzamiento.message}</small>}
        </div>
      </div>

      <div className="form-check mb-4">
        <input type="checkbox" className="form-check-input" id="destacadoCheck" {...register("destacado")} />
        <label className="form-check-label" htmlFor="destacadoCheck">Producto destacado</label>
      </div>

      <div className="modal-footer d-flex justify-content-end mt-3 p-0">
        <button type="button" className="btn btn-secondary me-2" onClick={onCancel} disabled={isSubmitting}>Cancelar</button>
        <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
          {juegoToEdit ? "Actualizar" : "Guardar"}
        </button>
      </div>
    </form>
  );
};

export default ProductoForm;