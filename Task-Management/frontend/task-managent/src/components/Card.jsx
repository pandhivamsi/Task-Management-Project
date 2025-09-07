import React, { useState } from "react";
import { CiEdit, CiHeart } from "react-icons/ci";
import { FcLike } from "react-icons/fc";
import { MdDelete } from "react-icons/md";

const Card = ({ user }) => {
  let img = `https://api.dicebear.com/9.x/avataaars/svg?seed=${user.name}`;
  let [like, setLike] = useState(false);

  let isLiked = () => {
    setLike(!like);
  };

  return (
    <div className="card shadow-sm border-0 ms-0" style={{ width: "160px" }}>
      {/* Profile Image */}
      <div className="d-flex justify-content-center mt-3">
        <img
          src={img}
          alt="Avatar"
          className="rounded-circle border border-2"
          style={{ width: "60px", height: "60px" }}
        />
      </div>

      {/* Title */}
      <div className="card-body text-center p-2">
        <h6 className="card-title mb-0">{user.name}</h6>
      </div>

      {/* Actions */}
      <div className="card-footer bg-white d-flex justify-content-around p-2">
        <button
          type="button"
          className="border-0 bg-transparent"
          onClick={isLiked}
        >
          {like ? <FcLike /> : <CiHeart />}
        </button>
        <button
          type="button"
          className="border-0 bg-transparent"
        //   onClick={() => onEdit(user.id)}
        >
          <CiEdit />
        </button>
        <button
          type="button"
          className="border-0 bg-transparent"
        //   onClick={() => onDelete(user.id)}
        >
          <MdDelete />
        </button>
      </div>
    </div>
  );
};

export default Card;
