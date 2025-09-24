
import React, { useState, useEffect } from "react";
import Toaster from "./Toaster";
import { useAppData } from "./DataContext";
import axios from "axios";

const DeleteConfirmation = ({id}) => {

    const [isDeleted, setIsDeleted] = useState(false);
    const {fetchCards} = useAppData()
    const [showToast, setShowToast] = useState(false);
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(true);

    // const handleConfirmDelete = () => {
    //     setIsDeleted(true);
    //     setShowDeleteConfirm(false);
    //     setShowToast(true);
    // };

    const handleConfirmDelete = () => {
    if (!id) return;
    axios
      .delete(`http://localhost:8080/cards/${id}`)
      .then(() => {
        setShowToast(true);
        setShowDeleteConfirm(false);
        fetchCards()
      })
      .catch((err) => console.error(err));
  };
    if (isDeleted && !showToast) return null;
    return (
        <div>
            {showDeleteConfirm &&
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
                                    onClick={() => setShowDeleteConfirm(false)}
                                ></button>
                            </div>
                            <div className="modal-body">
                                <p>Are you sure you want to delete this card?</p>
                            </div>
                            <div className="modal-footer">
                                <button
                                    className="btn btn-secondary btn-sm"
                                    onClick={() => setShowDeleteConfirm(false)}
                                >
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
}
            {showToast && (
                <Toaster />
            )}
        </div>
    )
}

export default DeleteConfirmation