import React from 'react';
import './modal.css';  // Import the modal styles

type ModalProps = {
  message: string;
  onClose: () => void;
};

const Modal: React.FC<ModalProps> = ({ message, onClose }) => {
  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>Error</h2>
        <p>{message}</p>
        <button onClick={onClose} className="close-button">Close</button>
      </div>
    </div>
  );
};

export default Modal;