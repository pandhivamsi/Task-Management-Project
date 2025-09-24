import React, { useState } from "react";
import CardIcons from "./CardIcons";
import CardEdit from "./CardEdit";
import DeleteConfirmation from "./DeleteConfirmation";

const Card = ({ user }) => {
  const [showModal, setShowModal] = useState(false);
  const [openCommentsTab, setOpenCommentsTab] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const img = `https://api.dicebear.com/9.x/avataaars/svg?seed=${user.name}`;
  
  const handleOpenModal = (fromComment = false) => {
    setOpenCommentsTab(fromComment);
    setShowModal(true);
  };

  return (
    <>
      <div
        className="card shadow-sm border-0 mb-3 position-relative"
        style={{ width: 220, borderRadius: 8, cursor: "pointer" }}
        onClick={() => handleOpenModal(false)}
      >
        <div className="d-flex align-items-center p-2">
          <img
            src={img}
            alt="Avatar"
            className="rounded-circle border border-2"
            style={{ width: 30, height: 30, marginRight: 8 }}
          />
          <span className="fw-bold small text-secondary">{user.taskId}</span>
        </div>
        <div className="card-body p-2">
          <p className="card-text mb-2 small">{user.title}</p>
        </div>
        <CardIcons
          onCommentClick={() => handleOpenModal(true)}
          onDeleteClick={() => setShowDeleteConfirm(true)}
        />
        <div
        style={{
          height: "5px",
          backgroundColor: "#11BE11",
          borderBottomLeftRadius: "4px",
          borderBottomRightRadius: "4px",
        }}
      ></div>
      </div>

      {/* EDIT MODAL */}
      {showModal && (
        <CardEdit
          user={user}
          onClose={() => setShowModal(false)}
          fromComment={openCommentsTab}
        />
      )}
      {/* DELETE CONFIRMATION */}
      {showDeleteConfirm && <DeleteConfirmation />}
    </>
  );
};

export default Card;
