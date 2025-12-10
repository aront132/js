import React from "react";
import "./Modal.css";

interface ModalProps {
  show: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ show, onClose, title, children }) => {
  if (!show) {
    return null;
  }

  return (
    <>
      <div 
        className="modal-backdrop fade show" 
        onClick={onClose}
        style={{ zIndex: 1050 }} 
      ></div>

 
      <div
        className="modal fade show"
        style={{ display: "block", zIndex: 1055 }} 
        tabIndex={-1}
        role="dialog"
      >

        <div className="modal-dialog modal-lg mt-5" role="document">
          <div className="modal-content border-0 shadow-lg" style={{ backgroundColor: "#1e1e1e", color: "#fff" }}>
            <div className="modal-header border-bottom border-secondary">
              <h5 className="modal-title fw-bold text-white">{title}</h5>
              <button
                type="button"
                className="btn-close btn-close-white"
                onClick={onClose}
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              {children}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Modal;