import React, { useState } from "react";
import { CiHeart } from "react-icons/ci";
import { FcLike } from "react-icons/fc";
import { MdDelete } from "react-icons/md";
import { FaRegCommentDots, FaPaperclip, FaFlag } from "react-icons/fa";

const CardIcons = ({ onCommentClick, onDeleteClick }) => {
  const [like, setLike] = useState(false);

  const toggleLike = () => setLike(!like);

  return (
    <div
      className="d-flex justify-content-between align-items-center px-2 py-2"
      style={{ backgroundColor: "#f1f3f4" }}
    >
      <div className="d-flex gap-2">
        <FaRegCommentDots
          className="text-muted"
          size={14}
          onClick={(e) => {
            e.stopPropagation();
            onCommentClick();
          }}
          style={{ cursor: "pointer" }}
        />
        <FaPaperclip className="text-muted" size={14} />
        <FaFlag className="text-muted" size={14} />
      </div>
      <div className="d-flex gap-2">
        <button
          type="button"
          className="border-0 bg-transparent p-0"
          onClick={(e) => {
            e.stopPropagation();
            toggleLike();
          }}
        >
          {like ? <FcLike size={16} /> : <CiHeart size={16} />}
        </button>
        <button
          type="button"
          className="border-0 bg-transparent p-0"
          onClick={(e) => {
            e.stopPropagation();
            onDeleteClick();
          }}
        >
          <MdDelete size={16} />
        </button>
      </div>
    </div>
  );
};

export default CardIcons;
