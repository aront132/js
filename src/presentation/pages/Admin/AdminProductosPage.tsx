import React, { useEffect, useState } from "react";
import { Juego } from "../../../domain/juegos/Juego";
import JuegosRepository from "../../../infrastructure/repositories/juegosRepository";
import Card from "../../components/Card";
import Modal from "../../components/Modal";
import ConfirmModal from "../../components/ConfirmModal";
import ProductoForm from "../../components/ProductoForm";
import "./AdminProductosPage.css";

const AdminProductosPage: React.FC = () => {
  const [juegos, setJuegos] = useState<Juego[]>([]);
  const [juegoAEditar, setJuegoAEditar] = useState<Juego | null>(null);
  const [showFormModal, setShowFormModal] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [juegoAEliminarId, setJuegoAEliminarId] = useState<string | null>(null);
  const [cargando, setCargando] = useState(true);

  const cargarJuegos = async () => {
    try {
      setCargando(true);
      const data = await JuegosRepository.obtenerTodos();
      setJuegos(data);
    } catch (error) {
      console.error("Error al cargar juegos:", error);
    } finally {
      setCargando(false);
    }
  };

  useEffect(() => {
    cargarJuegos();
  }, []);

  const handleRequestDelete = (id: string) => {
    setJuegoAEliminarId(id);
    setShowConfirmModal(true);
  };

  const handleConfirmDelete = async () => {
    if (juegoAEliminarId) {
      try {
        await JuegosRepository.eliminar(juegoAEliminarId);
        await cargarJuegos();
        console.log("Juego eliminado correctamente");
      } catch (error) {
        console.error("Error al eliminar el juego:", error);
        console.log("Error al eliminar el juego");
      } finally {
        setJuegoAEliminarId(null);
        setShowConfirmModal(false);
      }
    }
  };

  const handleOpenFormModal = (juego: Juego | null) => {
    setJuegoAEditar(juego);
    setShowFormModal(true);
  };

  const handleCloseModals = () => {
    setJuegoAEditar(null);
    setShowFormModal(false);
    setJuegoAEliminarId(null);
    setShowConfirmModal(false);
  };

  const handleFormSubmit = async (valores: Omit<Juego, "id">) => {
    try {
      if (juegoAEditar) {
        await JuegosRepository.actualizar(juegoAEditar.id, valores);
        console.log("Juego actualizado correctamente");
      } else {
        await JuegosRepository.crear(valores);
        console.log("Juego creado correctamente");
      }
      await cargarJuegos();
      handleCloseModals();
    } catch {
      console.log(`Error al ${juegoAEditar ? "actualizar" : "crear"} el juego`);
    }
  };

  return (
    <>
      <Card>
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h3 className="mb-0">Listado de productos</h3>
          <button
            className="btn btn-primary"
            onClick={() => handleOpenFormModal(null)}
          >
            <i className="bi bi-plus-circle me-2" />
            Nuevo Producto
          </button>
        </div>
        <div className="table-responsive">
          <table className="table table-striped align-middle">
            <thead>
              <tr>
                <th>ID</th>
                <th>Título</th>
                <th>Plataforma</th>
                <th>Género</th>
                <th className="text-end">Precio</th>
                <th className="text-center">Stock</th>
                <th className="text-center">Destacado</th>
                <th className="text-center">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {cargando ? (
                <tr>
                  <td colSpan={8} className="text-center py-5">
                    <div className="spinner-border" role="status">
                      <span className="visually-hidden">Cargando...</span>
                    </div>
                  </td>
                </tr>
              ) : (
                juegos.map((j) => (
                  <tr key={j.id}>
                    <td><code>{j.id}</code></td>
                    <td>{j.titulo}</td>
                    <td>{j.plataforma}</td>
                    <td>{j.genero}</td>
                    <td className="text-end">S/ {j.precio.toFixed(2)}</td>
                    <td className="text-center">{j.stock}</td>
                    <td className="text-center">{j.destacado ? "✔️" : "❌"}</td>
                    <td className="text-center">
                      <button
                        className="btn btn-warning btn-sm me-2"
                        title="Editar"
                        onClick={() => handleOpenFormModal(j)}
                      >
                        <i className="bi bi-pencil-fill" />
                        Editar
                      </button>
                      <button
                        className="btn btn-danger btn-sm"
                        title="Eliminar"
                        onClick={() => handleRequestDelete(j.id)}
                      >
                        <i className="bi bi-trash-fill" />
                        Eliminar
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </Card>

      <Modal
        show={showFormModal}
        onClose={handleCloseModals}
        title={juegoAEditar ? "Editar Producto" : "Nuevo Producto"}
      >
        <ProductoForm
          onSubmit={handleFormSubmit}
          onCancel={handleCloseModals}
          juegoToEdit={juegoAEditar}
        />
      </Modal>

      <ConfirmModal
        show={showConfirmModal}
        onClose={handleCloseModals}
        onConfirm={handleConfirmDelete}
        title="Confirmar Eliminación"
        body="¿Estás seguro de que quieres eliminar este producto? Esta acción no se puede deshacer."
      />
    </>
  );
};

export default AdminProductosPage;
