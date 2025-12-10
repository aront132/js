import React from "react";
import { useCarrito } from "../../hooks/useCarrito";
import { useAuth } from "../../hooks/useAuth";
import { createOrder } from "../../../application/usecases/orders/createOrder";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const CheckoutPage: React.FC = () => {
  const { items, total, vaciarCarrito } = useCarrito();
  const { usuario } = useAuth();
  const navigate = useNavigate();

  const pagoSchema = z.object({
    cardName: z.string().min(2, "Nombre en la tarjeta requerido"),
    cardNumber: z
      .string()
      .transform((v) => v.replace(/\s+/g, ""))
      .refine((v) => /^[0-9]{12,19}$/.test(v), "Número de tarjeta inválido"),
    expiry: z
      .string()
      .refine(
        (v) => /^(0[1-9]|1[0-2])\/(\d{2})$/.test(v),
        "Expiración inválida (MM/AA)"
      ),
    cvv: z.string().refine((v) => /^[0-9]{3,4}$/.test(v), "CVV inválido"),
  });

  type PagoForm = z.infer<typeof pagoSchema>;

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<PagoForm>({
    resolver: zodResolver(pagoSchema),
    defaultValues: {
      cardName: "",
      cardNumber: "",
      expiry: "",
      cvv: "",
    },
  });

  if (!usuario)
    return (
      <p className="alert alert-warning">Debes iniciar sesión para pagar.</p>
    );
  if (items.length === 0)
    return <p className="text-muted">No tienes artículos en el carrito.</p>;

  const handlePay = async (data: PagoForm) => {
    void data;
    if (!usuario) return;
    try {
      await createOrder({
        usuarioId: usuario.id,
        items,
        total,
        estado: "pagado",
      });

      vaciarCarrito();
      alert("Pago simulado: pedido pagado correctamente.");
      navigate("/cliente/historial");
    } catch (err) {
      console.error(err);
      alert("Error al procesar el pago.");
    }
  };

  const handleCancel = async () => {
    if (!usuario) return;
    if (
      !confirm(
        "¿Confirmas cancelar este pedido? Se registrará como CANCELADO en tu historial."
      )
    )
      return;
    try {
      await createOrder({
        usuarioId: usuario.id,
        items,
        total,
        estado: "cancelado",
      });

      vaciarCarrito();
      alert("Pedido cancelado y registrado en tu historial.");
      navigate("/cliente/historial");
    } catch (err) {
      console.error(err);
      alert("No se pudo cancelar el pedido.");
    }
  };

  const onInvalid = () => {
    return;
  };

  return (
    <div className="container py-4">
      <h3 className="mb-4">Finalizar pago</h3>
      <div className="row">
        <div className="col-md-6">
          <form onSubmit={handleSubmit(handlePay, onInvalid)}>
            <div className="mb-3">
              <label className="form-label">Nombre en la tarjeta</label>
              <input className="form-control" {...register("cardName")} />
              {errors.cardName && (
                <small className="text-danger">
                  {String(errors.cardName.message)}
                </small>
              )}
            </div>
            <div className="mb-3">
              <label className="form-label">Número de tarjeta</label>
              <input
                className="form-control"
                {...register("cardNumber")}
                placeholder="1234 5678 9012 3456"
              />
              {errors.cardNumber && (
                <small className="text-danger">
                  {String(errors.cardNumber.message)}
                </small>
              )}
            </div>
            <div className="row">
              <div className="col-6 mb-3">
                <label className="form-label">Expiración</label>
                <input
                  className="form-control"
                  {...register("expiry")}
                  placeholder="MM/AA"
                />
                {errors.expiry && (
                  <small className="text-danger">
                    {String(errors.expiry.message)}
                  </small>
                )}
              </div>
              <div className="col-6 mb-3">
                <label className="form-label">CVV</label>
                <input
                  className="form-control"
                  {...register("cvv")}
                  placeholder="123"
                />
                {errors.cvv && (
                  <small className="text-danger">
                    {String(errors.cvv.message)}
                  </small>
                )}
              </div>
            </div>
            <div className="d-flex justify-content-between">
              <button
                type="button"
                className="btn btn-outline-danger"
                onClick={handleCancel}
                disabled={isSubmitting}
              >
                Cancelar pedido
              </button>
              <button
                type="submit"
                className="btn btn-primary"
                disabled={isSubmitting}
              >
                {isSubmitting
                  ? "Procesando..."
                  : `Pagar S/ ${total.toFixed(2)}`}
              </button>
            </div>
          </form>
        </div>
        <div className="col-md-6">
          <h5>Resumen</h5>
          <ul className="list-group mb-3">
            {items.map((it) => (
              <li
                key={it.juego.id}
                className="list-group-item d-flex justify-content-between align-items-center"
              >
                <div>
                  <strong>{it.juego.titulo}</strong>
                  <div className="small text-muted">
                    Cantidad: {it.cantidad}
                  </div>
                </div>
                <div className="fw-bold">
                  S/ {(it.cantidad * it.juego.precio).toFixed(2)}
                </div>
              </li>
            ))}
          </ul>
          <div className="d-flex justify-content-between align-items-center">
            <h5>Total</h5>
            <h5 className="fw-bold">S/ {total.toFixed(2)}</h5>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
