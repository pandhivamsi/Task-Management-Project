import React, { useState } from "react";
import CardIcons from "./CardIcons";
import CardEdit from "./CardEdit";
import DeleteConfirmation from "./DeleteConfirmation";
import Toaster from "./Toaster";

const Card = ({ card, handleUpdateCard }) => {
  const [showModal, setShowModal] = useState(false);
  const [openCommentsTab, setOpenCommentsTab] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [openToast, setToaster] = useState(false);

  const img = `https://api.dicebear.com/9.x/avataaars/svg?seed=${card.person_name}`;

  const handleOpenModal = (fromComment = false) => {
    setOpenCommentsTab(fromComment);
    setShowModal(true);
  };

  const handleSave = (updatedCard) => {
    if (handleUpdateCard) {
      handleUpdateCard(updatedCard);
    }
    setShowModal(false);
  };

  return (
    <>
      <div
        className="card shadow-sm border-0 mb-3 position-relative"
        style={{ width: 250, borderRadius: 8, cursor: "pointer" }}
        onClick={() => handleOpenModal(false)}
      >
        {/* Avatar and Card ID */}
        <div className="d-flex align-items-center p-2">
          <img
            src={img}
            alt="Avatar"
            className="rounded-circle border border-2"
            style={{ width: 30, height: 30, marginRight: 8 }}
          />
          <span className="fw-bold small text-secondary">{card.card_id}</span>
        </div>

        {/* Title and Details */}
        <div className="card-body p-2">
          <p className="card-text mb-1 small fw-semibold">{card.title}</p>
          
          {/* Additional card info */}
          <div className="mb-1">
            <span className="badge bg-light text-dark me-1">
              Dept: {card.department}
            </span>
            <span className="badge bg-light text-dark me-1">
              Role: {card.role}
            </span>
          </div>
        </div>

        {/* Action Icons */}
        <CardIcons
          onCommentClick={() => handleOpenModal(true)}
          onDeleteClick={() => setShowDeleteConfirm(true)}
        />

        {/* Bottom Accent Bar */}
        <div
          style={{
            height: "5px",
            backgroundColor:
              card.priority === "High"
                ? "#dc3545"
                : card.priority === "Medium"
                ? "#ffc107"
                : "#198754",
            borderBottomLeftRadius: "4px",
            borderBottomRightRadius: "4px",
          }}
        ></div>
      </div>

      {/* Modal for editing card */}
      {showModal && (
        <CardEdit
          card={card}
          onClose={() => setShowModal(false)}
          onSave={handleSave}
          fromComment={openCommentsTab}
        />
      )}

      {/* Delete Confirmation */}
      {showDeleteConfirm && (
        <DeleteConfirmation
          id={card.id}
          openToaster={() => setToaster(true)}
        />
      )}

      {/* Toast */}
      {openToast && <Toaster />}
    </>
  );
};

export default Card;