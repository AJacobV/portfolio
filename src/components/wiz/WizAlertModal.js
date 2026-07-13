import React from 'react';

function WizAlertModal({ isOpen, onClose, title, message }) {
  if (!isOpen) return null;

  return (
    <div className="wiz-modal-overlay">
      <div className="wiz-modal-content">
        <button className="wiz-modal-close" onClick={onClose}>
          &times;
        </button>
        <h2 className="wiz-modal-title">{title}</h2>
        <p className="wiz-modal-message">{message}</p>
        <div className="wiz-modal-actions">
          <button className="wiz-btn-custom" onClick={onClose}>
            Got it
          </button>
        </div>
      </div>
    </div>
  );
}

export default WizAlertModal;
