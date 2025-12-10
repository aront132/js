import React from "react";
import Modal from "./Modal";

interface ConfirmModalProps {
  show: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  body: string;
}

const ConfirmModal: React.FC<ConfirmModalProps> = ({
  show,
  onClose,
  onConfirm,
  title,
  body,
}) => {
  if (!show) {
    return null;
  }

  return (
    <Modal show={show} onClose={onClose} title={title}>
      <p>{body}</p>
      <div className="d-flex justify-content-end mt-4">
        <button type="button" className="btn btn-secondary me-2" onClick={onClose}>
          Cancelar
        </button>
        <button type="button" className="btn btn-danger" onClick={onConfirm}>
          Confirmar
        </button>
      </div>
    </Modal>
  );
};

export default ConfirmModal;
