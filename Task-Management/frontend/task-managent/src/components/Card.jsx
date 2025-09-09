import React, { useState } from "react";
import { CiEdit, CiHeart } from "react-icons/ci";
import { FcLike } from "react-icons/fc";
import { MdDelete } from "react-icons/md";
import { FaRegCommentDots, FaPaperclip, FaFlag } from "react-icons/fa";

const Card = ({ user }) => {
  let img = `https://api.dicebear.com/9.x/avataaars/svg?seed=${user.name}`;
  let [like, setLike] = useState(false);

  let isLiked = () => {
    setLike(!like);
  };

  return (
    <div
      className="card shadow-sm border-0 mb-3"
      style={{
        width: "220px",
        borderRadius: "8px",
        cursor: "pointer",
      }}
    >      <div className="d-flex align-items-center p-2">
        <img
          src={img}
          alt="Avatar"
          className="rounded-circle border border-2"
          style={{ width: "30px", height: "30px", marginRight: "0.5rem" }}
        />
        <span className="fw-bold small text-secondary">{user.taskId}</span>
      </div>
      <div className="card-body p-2">
        <p className="card-text mb-2 small">{user.title}</p>
      </div>
      <div
        className="d-flex justify-content-between align-items-center px-2 py-2"
        style={{
          backgroundColor: "#f1f3f4",
        }}
      >
        <div className="d-flex gap-2">
          <FaRegCommentDots className="text-muted" size={14} />
          <FaPaperclip className="text-muted" size={14} />
          <FaFlag className="text-muted" size={14} />
        </div>
        <div className="d-flex gap-2">
          <button
            type="button"
            className="border-0 bg-transparent p-0"
            onClick={isLiked}
          >
            {like ? <FcLike size={16} /> : <CiHeart size={16} />}
          </button>
          <button type="button" className="border-0 bg-transparent p-0">
            <CiEdit size={16} />
          </button>
          <button type="button" className="border-0 bg-transparent p-0">
            <MdDelete size={16} />
          </button>
        </div>
      </div>
      <div
        className="text-center text-white fw-bold"
        style={{
          backgroundColor: "#2ebd35ff", 
          borderBottomLeftRadius: "8px",
          borderBottomRightRadius: "8px",
          padding: "3px",
          fontSize: "12px",
        }}
      >
      </div>
    </div>
  );
};

export default Card;
