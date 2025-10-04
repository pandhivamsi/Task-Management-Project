import React, { useState, useEffect } from "react";
import { IoTimer } from "react-icons/io5";
import { useAppData } from "./DataContext";

const ProfileRow = ({ activeUserId, onUserSelect }) => {
  const [countdown, setCountdown] = useState(null);
  const { peoples } = useAppData();

  const handleProfileClick = (id) => {
    onUserSelect(id); 
    setCountdown(0);
  };

  useEffect(() => {
    if (countdown === null) return;
    if (countdown >= 120) return;

    const timer = setTimeout(() => setCountdown((c) => c + 1), 1000);
    return () => clearTimeout(timer);
  }, [countdown]);

  return (
    <div>
      {activeUserId !== null && countdown !== null && (
        <div className="d-flex justify-content-center align-items-center ms-5 mt-2 fs-5 p-1 text-primary rounded-pill px-2">
          <IoTimer className="spinner-border me-2" />
          {countdown}
        </div>
      )}

      <div className="d-flex flex-column position-absolute start-50 shadow-sm hover-shadow end-50 top-0 align-items-center mt-3">
        <div className="d-flex mb-1 ms-5 me-5">
          {peoples.map((user) => (
            <div
              key={user.id}
              className="mx-2 text-center"
              onClick={() => handleProfileClick(user.id)}
              style={{ cursor: "pointer" }}
            >
              <img
                src={
                  user.profileImg
                    ? `http://localhost:8080/uploads/${user.profileImg}`
                    : "/uploads/default.png"
                }
                alt={user.name}
                className={`rounded-circle border ${
                  activeUserId === user.id
                    ? " border-4 border-primary shadow"
                    : "border-1"
                }`}
                width="50"
                height="50"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProfileRow;
