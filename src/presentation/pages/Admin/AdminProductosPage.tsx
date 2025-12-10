import React, { useEffect, useState } from "react";
import { Juego } from "../../../domain/juegos/Juego";
import JuegosRepository from "../../../infrastructure/repositories/juegosRepository";
import Card from "../../components/Card";
import Modal from "../../components/Modal";
import ConfirmModal from "../../components/ConfirmModal";
import ProductoForm from "../../components/ProductoForm";
import { getImageUrl } from "../../../domain/shared/utils/imageUtils"; 
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
      } catch (error) {
        console.error("Error al eliminar el juego:", error);
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
      } else {
        await JuegosRepository.crear(valores);
      }
      await cargarJuegos();
      handleCloseModals();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <Card className="admin-container border-0 bg-transparent shadow-none p-0">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h3 className="mb-0 text-white fw-bold">Gestión de Productos</h3>
          <button
            className="btn btn-primary d-flex align-items-center gap-2"
            onClick={() => handleOpenFormModal(null)}
          >
            <i className="bi bi-plus-lg" />
            <span className="d-none d-md-inline">Nuevo Producto</span>
          </button>
        </div>

        {cargando ? (
          <div className="text-center py-5">
            <div className="spinner-border text-primary" role="status"></div>
          </div>
        ) : (
          <div className="admin-grid">
            {juegos.map((j) => (
              <div key={j.id} className="admin-card">
                <div className="admin-card-img">
                  <img src={getImageUrl(j.imgFile)} alt={j.titulo} />
                  {j.destacado && <span className="badge-destacado"><i className="bi bi-star-fill"></i></span>}
                </div>
                
                <div className="admin-card-body">
                  <div className="d-flex justify-content-between align-items-start mb-2">
                    <h5 className="admin-card-title text-truncate" title={j.titulo}>{j.titulo}</h5>
                    <span className="badge bg-dark border border-secondary">{j.plataforma}</span>
                  </div>
                  
                  <div className="admin-card-info">
                    <div className="info-item">
                      <span className="label">Precio</span>
                      <span className="value text-success">S/ {Number(j.precio || 0).toFixed(2)}</span>
                    </div>
                    <div className="info-item">
                      <span className="label">Stock</span>
                      <span className={`value ${j.stock < 5 ? 'text-danger' : 'text-white'}`}>
                        {j.stock}
                      </span>
                    </div>
                  </div>

                  <div className="admin-card-actions">
                    <button
                      className="btn btn-outline-warning btn-sm flex-grow-1"
                      onClick={() => handleOpenFormModal(j)}
                    >
                      <i className="bi bi-pencil-fill me-1" /> Editar
                    </button>
                    <button
                      className="btn btn-outline-danger btn-sm"
                      onClick={() => handleRequestDelete(j.id)}
                    >
                      
                      <i className="bi bi-trash-fill" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
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
        title="Eliminar Producto"
        body={`¿Estás seguro de eliminar "${juegos.find(j => j.id === juegoAEliminarId)?.titulo}"?`}
      />
    </>
  );
};

export default AdminProductosPage;