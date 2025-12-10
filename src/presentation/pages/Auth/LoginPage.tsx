console.log("PADRE DEL FORM:", document.querySelector("form")?.parentElement);
console.log("TODOS LOS FORM DEL DOM:", document.querySelectorAll("form"));

import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "../../../application/validators/loginSchema";
import { useAuth } from "../../hooks/useAuth";
import { Navigate, useNavigate, Link } from "react-router-dom";
import Card from "../../components/Card";

type LoginForm = z.infer<typeof loginSchema>;

const LoginPage: React.FC = () => {
  const { usuario, iniciarSesion } = useAuth();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
    reset,
  } = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
  });

 
  React.useEffect(() => {
    reset({
      correo: "",
      password: "",
    });
  }, [reset]);

  const onSubmit = async (data: LoginForm) => {
    try {
      const user = await iniciarSesion(
        data.correo.trim(),
        data.password.trim()
      );

      if (!user) {
        setError("password", {
          type: "manual",
          message: "Correo o contraseña incorrectos",
        });
        return;
      }

      navigate(user.rol === "admin" ? "/admin/productos" : "/productos");
    } catch (err) {
      console.error(err);
      setError("correo", {
        type: "manual",
        message: "Error al iniciar sesión. Inténtalo más tarde.",
      });
    }
  };

  if (usuario) {
    return (
      <Navigate
        to={usuario.rol === "admin" ? "/admin/productos" : "/productos"}
        replace
      />
    );
  }

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-md-6 col-lg-5">
          <Card>
            <h2 className="text-center mb-4">Iniciar sesión</h2>

            <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
              <div className="mb-3">
                <label>Correo</label>
                <input
                  type="email"
                  autoComplete="off"
                  className={`form-control ${
                    errors.correo ? "is-invalid" : ""
                  }`}
                  {...register("correo")}
                />
                {errors.correo && (
                  <div className="invalid-feedback">
                    {errors.correo.message}
                  </div>
                )}
              </div>

              <div className="mb-3">
                <label>Contraseña</label>
                <input
                  type="password"
                  autoComplete="new-password"
                  className={`form-control ${
                    errors.password ? "is-invalid" : ""
                  }`}
                  {...register("password")}
                />
                {errors.password && (
                  <div className="invalid-feedback">
                    {errors.password.message}
                  </div>
                )}
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="btn btn-primary"
              >
                {isSubmitting ? "Ingresando..." : "Ingresar"}
              </button>
            </form>
            <div
              className="mt-3 p-3 rounded"
              style={{
                backgroundColor: "var(--surface-color-light)",
                fontSize: "0.875rem",
              }}
            >
              <p className="mb-1" style={{ color: "var(--text-secondary)" }}>
                Usuarios de prueba:
              </p>
              <ul className="list-unstyled mb-0">
                <li>
                  <strong>Admin:</strong> admin@gamevault.com / 123456
                </li>
                <li>
                  <strong>Cliente:</strong> cliente@gamevault.com / 123456
                </li>
              </ul>
            </div>
            <p
              className="text-center mt-3 mb-0"
              style={{ color: "var(--text-secondary)" }}
            >
              ¿No tienes una cuenta? <Link to="/auth/registro">Regístrate</Link>
            </p>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
