import { useEffect } from "react";
// import PropTypes from "prop-types";
import styles from './Modal.module.css';

export default function Modal({ onClose, children }) {
  useEffect(() => {
    window.addEventListener('keydown', closeModalEsc)
    return () => {
      window.removeEventListener('keydown', closeModalEsc)
    }
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

  return (
    <div className={styles.Overlay} onClick={handleBackdropClick}>
      <div className={styles.Modal}>{children}</div>
    </div>
  )
}

// через createPortal выдает ошибку: Error: Target container is not a DOM element
// import React, { Component } from 'react';
// import { createPortal } from 'react-dom';
// import PropTypes from 'prop-types';
// import styles from './Modal.module.css';
// 
// 
// const modalRoot = document.querySelector('#modal-root');
// 
// export default func Modal() {
// useEffect(() => {
  // window.addEventListener('keydown', closeModalEsc)
  // return () => {
    // window.removeEventListener('keydown', closeModalEsc)
  // }
// })
  // const closeModalEsc = (e)=> {
    // if (e.code === 'Escape') {
      // console.log('tach ESC, close modal');
      // onClose();
    // }
  // };
// 
  // const heandleBackDropClick = event => {
    // console.log('click on backdrop');
    // console.log('currentTarget:', event.currentTarget);
    // console.log('target', event.target);
    // if (event.currentTarget === event.target) {
      // onClose();
    // }
  // };
// 

    // return createPortal(
      // <div className={styles.Overlay} onClick={heandleBackDropClick}>
        // {/* <div className={styles.Modal}>{ children }</div>  */}
      // {/* </div>,  */}
      // modalRoot
    // )
// 

// }
// 
// Modal.defaultProps = {
  // onClose: () => null,
  // children: null,
// }
// 
// Modal.propTypes = {
  // onClose: PropTypes.func,
  // children: PropTypes.node,
// }
// 