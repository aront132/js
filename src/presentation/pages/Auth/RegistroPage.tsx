import React from "react";
import AuthRepository from "../../../infrastructure/repositories/authRepository";
import { useNavigate, Link } from "react-router-dom";
import Card from "../../components/Card";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { registroSchema } from "../../../application/validators/registroSchema";

type RegistroForm = z.infer<typeof registroSchema>;

const RegistroPage: React.FC = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegistroForm>({
    resolver: zodResolver(registroSchema),
    defaultValues: {
      nombre: "",
      apellido: "",
      edad: undefined,
      pais: "",
      departamento: "",
      correo: "",
      password: "",
      confirmarPassword: "",
    },
  });

  const onSubmit = async (values: RegistroForm) => {
    try {
      await AuthRepository.crear({
        nombre: values.nombre,
        apellido: values.apellido,
        edad: values.edad,
        pais: values.pais,
        departamento: values.departamento,
        correo: values.correo,
        password: values.password,
      });

      alert("¡Usuario registrado con éxito!");
      navigate("/auth/login");
    } catch (err) {
      console.error(err);
      alert("Error al registrar el usuario.");
    }
  };

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-md-8 col-lg-7">
          <Card>
            <h2 className="text-center mb-4">Crear una cuenta</h2>

            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="row">
                <div className="mb-3 col-md-6">
                  <label className="form-label">Nombre</label>
                  <input className="form-control" {...register("nombre")} />
                  {errors.nombre && (
                    <small className="text-danger">{errors.nombre.message}</small>
                  )}
                </div>

                <div className="mb-3 col-md-6">
                  <label className="form-label">Apellido</label>
                  <input className="form-control" {...register("apellido")} />
                  {errors.apellido && (
                    <small className="text-danger">{errors.apellido.message}</small>
                  )}
                </div>
              </div>

              <div className="row">
                <div className="mb-3 col-md-4">
                  <label className="form-label">Edad</label>
                  <input type="number" className="form-control" {...register("edad")} />
                  {errors.edad && (
                    <small className="text-danger">{errors.edad.message}</small>
                  )}
                </div>

                <div className="mb-3 col-md-4">
                  <label className="form-label">País</label>
                  <input className="form-control" {...register("pais")} />
                  {errors.pais && (
                    <small className="text-danger">{errors.pais.message}</small>
                  )}
                </div>

                <div className="mb-3 col-md-4">
                  <label className="form-label">Departamento</label>
                  <input className="form-control" {...register("departamento")} />
                  {errors.departamento && (
                    <small className="text-danger">
                      {errors.departamento.message}
                    </small>
                  )}
                </div>
              </div>

              <div className="mb-3">
                <label className="form-label">Correo electrónico</label>
                <input type="email" className="form-control" {...register("correo")} />
                {errors.correo && (
                  <small className="text-danger">{errors.correo.message}</small>
                )}
              </div>

              <div className="mb-3">
                <label className="form-label">Contraseña</label>
                <input type="password" className="form-control" {...register("password")} />
                {errors.password && (
                  <small className="text-danger">{errors.password.message}</small>
                )}
              </div>

              <div className="mb-3">
                <label className="form-label">Confirmar contraseña</label>
                <input
                  type="password"
                  className="form-control"
                  {...register("confirmarPassword")}
                />
                {errors.confirmarPassword && (
                  <small className="text-danger">
                    {errors.confirmarPassword.message}
                  </small>
                )}
              </div>

              <div className="d-grid">
                <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
                  {isSubmitting ? "Registrando..." : "Registrarse"}
                </button>
              </div>
            </form>

            <p className="text-center mt-3 mb-0" style={{ color: "var(--text-secondary)" }}>
              ¿Ya tienes una cuenta? <Link to="/auth/login">Inicia sesión</Link>
            </p>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default RegistroPage;
