import React, { useEffect } from "react";
import { Juego } from "../../domain/juegos/Juego";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  juegoSchema,
  JuegoSchema,
} from "../../application/validators/juegoSchema";

interface ProductoFormProps {
  onSubmit: (data: Omit<Juego, "id">) => void;
  onCancel: () => void;
  juegoToEdit: Juego | null;
}

const ProductoForm: React.FC<ProductoFormProps> = ({
  onSubmit,
  onCancel,
  juegoToEdit,
}) => {
  const {
    register,
    handleSubmit,
    reset,
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
    } else {
      reset();
    }
  }, [juegoToEdit, reset]);

  const onSubmitForm = (data: JuegoSchema) => {
    onSubmit({
      ...data,
      destacado: data.destacado ?? false, // ← garantiza boolean
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmitForm)}>
      <div className="row">
        <div className="mb-3 col-md-6">
          <label className="form-label">Título</label>
          <input className="form-control" {...register("titulo")} />
          {errors.titulo && (
            <small className="text-danger">{errors.titulo.message}</small>
          )}
        </div>

        <div className="mb-3 col-md-6">
          <label className="form-label">Plataforma</label>
          <input className="form-control" {...register("plataforma")} />
          {errors.plataforma && (
            <small className="text-danger">{errors.plataforma.message}</small>
          )}
        </div>
      </div>

      <div className="row">
        <div className="mb-3 col-md-6">
          <label className="form-label">Género</label>
          <input className="form-control" {...register("genero")} />
          {errors.genero && (
            <small className="text-danger">{errors.genero.message}</small>
          )}
        </div>

        <div className="mb-3 col-md-3">
          <label className="form-label">Precio (S/)</label>
          <input
            type="number"
            className="form-control"
            {...register("precio", { valueAsNumber: true })}
          />
          {errors.precio && (
            <small className="text-danger">{errors.precio.message}</small>
          )}
        </div>

        <div className="mb-3 col-md-3">
          <label className="form-label">Stock</label>
          <input
            type="number"
            className="form-control"
            {...register("stock", { valueAsNumber: true })}
          />
          {errors.stock && (
            <small className="text-danger">{errors.stock.message}</small>
          )}
        </div>
      </div>

      <div className="mb-3">
        <label className="form-label">Descripción</label>
        <textarea
          className="form-control"
          rows={3}
          {...register("descripcion")}
        />
        {errors.descripcion && (
          <small className="text-danger">{errors.descripcion.message}</small>
        )}
      </div>

      <div className="mb-3">
        <label className="form-label">Desarrollador</label>
        <input className="form-control" {...register("desarrollador")} />
        {errors.desarrollador && (
          <small className="text-danger">{errors.desarrollador.message}</small>
        )}
      </div>

      <div className="mb-3">
        <label className="form-label">Fecha de lanzamiento</label>
        <input
          type="date"
          className="form-control"
          {...register("lanzamiento")}
        />
        {errors.lanzamiento && (
          <small className="text-danger">{errors.lanzamiento.message}</small>
        )}
      </div>

      <div className="mb-3">
        <label className="form-label">Nombre de archivo de imagen</label>
        <input
          className="form-control"
          {...register("imgFile")}
          placeholder="ej: hollow_knight.jpg"
        />
        {errors.imgFile && (
          <small className="text-danger">{errors.imgFile.message}</small>
        )}
      </div>

      <div className="form-check mb-4">
        <input
          type="checkbox"
          className="form-check-input"
          id="destacadoCheckForm"
          {...register("destacado")}
        />
        <label className="form-check-label" htmlFor="destacadoCheckForm">
          Producto destacado
        </label>
      </div>

      <div className="modal-footer d-flex justify-content-end mt-3 p-0">
        <button
          type="button"
          className="btn btn-secondary me-2"
          onClick={onCancel}
          disabled={isSubmitting}
        >
          Cancelar
        </button>

        <button
          type="submit"
          className="btn btn-primary"
          disabled={isSubmitting}
        >
          {juegoToEdit ? "Actualizar Producto" : "Guardar Producto"}
        </button>
      </div>
    </form>
  );
};

export default ProductoForm;
