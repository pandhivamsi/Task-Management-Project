import React, { useState } from "react";
import CardIcons from "./CardIcons";
import CardEdit from "./CardEdit";
import DeleteConfirmation from "./DeleteConfirmation";
import Toaster from "./Toaster";
import { useAppData } from "./DataContext";

const Card = ({ card, handleUpdateCard }) => {
  const [showModal, setShowModal] = useState(false);
  const [openCommentsTab, setOpenCommentsTab] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [openToast, setToaster] = useState(false);

  // const img = `https://api.dicebear.com/9.x/avataaars/svg?seed=${card.person_name}`;

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

  const { peoples } = useAppData();

  // find the assigned person from peoples list
  const assignedPerson = peoples.find(
    (p) => p.name.toLowerCase() === card.personName.toLowerCase()
  );

  // if person exists and has profileImg, use it, otherwise fallback
  const img = assignedPerson?.profileImg
    ? `http://localhost:8080/uploads/${assignedPerson.profileImg}`
    : "/uploads/default.png";

  return (
    <>
      <div
        className="card shadow-sm border-0 mb-3 position-relative"
        style={{ width: 250, borderRadius: 8, cursor: "pointer" }}
        onClick={() => handleOpenModal(false)}
      >
        
        <div className="d-flex align-items-center p-2">
          <img
            src={img}
            alt="Avatar"
            className="rounded-circle border border-2"
            style={{ width: 30, height: 30, marginRight: 8 }}
          />
          <span className="fw-bold small text-secondary">{card.card_id}</span>
        </div>

        
        <div className="card-body p-2">
          <p className="card-text mb-1 small fw-semibold">{card.title}</p>
          
          
          <div className="mb-1">
            <span className="badge bg-light text-dark me-1">
              Dept: {card.department}
            </span>
            <span className="badge bg-light text-dark me-1">
              Role: {card.role}
            </span>
          </div>
        </div>

        
        <CardIcons
          onCommentClick={() => handleOpenModal(true)}
          onDeleteClick={() => setShowDeleteConfirm(true)}
        />

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

      {showModal && (
        <CardEdit
          card={card}
          onClose={() => setShowModal(false)}
          onSave={handleSave}
          fromComment={openCommentsTab}
        />
      )}

      {showDeleteConfirm && (
        <DeleteConfirmation
          id={card.id}
          openToaster={() => setToaster(true)}
        />
      )}

      {openToast && <Toaster />}
    </>
  );
};

export default Card;