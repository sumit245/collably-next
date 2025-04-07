"use client"

import React from "react";
import styles from "../blogs/modal.module.css";  // Add your modal styles here

const Modal = ({ isVisible, onConfirm, onCancel }) => {
  if (!isVisible) return null; // Don't render the modal if it's not visible

  return (
    <div className={styles.modalBackdrop}>
      <div className={styles.modal}>
        <h2>Are you sure you want to delete this blog?</h2>
        <div className={styles.modalActions}>
          <button onClick={onCancel} className={styles.cancelButton}>Cancel</button>
          <button onClick={onConfirm} className={styles.confirmButton}>Delete</button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
