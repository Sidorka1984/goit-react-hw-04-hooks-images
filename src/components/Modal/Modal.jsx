import { useEffect } from "react";
import { createPortal } from 'react-dom';
// import PropTypes from "prop-types";
import styles from './Modal.module.css';


const modalRoot = document.querySelector('#modal-root')

export default function Modal({ onClose, children }) {
  useEffect(() => {
    window.addEventListener('keydown', closeModalEsc)
    return () => window.removeEventListener('keydown', closeModalEsc)
    
  })

  const closeModalEsc = (e) => {
    if (e.code === 'Escape') {
      onClose();
    }
  };
  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return createPortal(
    <div className={styles.Overlay} onClick={handleBackdropClick}>
      <div className={styles.Modal}>{children}</div>
    </div>,
    modalRoot,
  )
}

