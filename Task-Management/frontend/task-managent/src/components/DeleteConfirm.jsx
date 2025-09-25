import React, { useState } from "react";

const DeleteConfirm = ({ handleDelete, onClose,showToast }) => {

  const handleConfirmDelete = () => {
    handleDelete(); 
    onClose();
  };

  return (
    <div>
      <div
        className="modal show d-block"
        tabIndex="-1"
        style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
      >
        <div
          className="modal-dialog modal-dialog-centered"
          style={{ maxWidth: "700px", width: "90%" }}
        >
          <div className="modal-content">
            <div className="modal-header bg-danger text-white">
              <h5 className="modal-title">Confirm Delete</h5>
              <button
                type="button"
                className="btn-close btn-close-white"
                onClick={onClose}
              ></button>
            </div>
            <div className="modal-body">
              <p>Are you sure you want to delete this record?</p>
            </div>
            <div className="modal-footer">
              <button className="btn btn-secondary btn-sm" onClick={onClose}>
                Cancel
              </button>
              <button
                className="btn btn-danger btn-sm"
                onClick={handleConfirmDelete}
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirm;