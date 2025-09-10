import React, { useState, useEffect } from "react";
import img1 from "../assets/image1.jpeg"
import img2 from "../assets/image2.jpeg"
import img3 from "../assets/image3.jpeg"

const ProfileRow = () => {
  const users = [
    { id: 1, name: "gojo", img: img1 },
    { id: 2, name: "john snow", img: img2},
    { id: 3, name: "lufy", img: img3 }
  ];

  const [activeUserId, setActiveUserId] = useState(null);
  const [countdown, setCountdown] = useState(null);
  

  const handleProfileClick = (id) => {
    setActiveUserId(id);
    setCountdown(120); 
  };

  useEffect(() => {
    if (countdown === null) return;
    if (countdown <= 0) return;

    const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
    return () => clearTimeout(timer);
  }, [countdown]);

  return (
    <div className="d-flex ms-5">
      {users.map((user) => (
        <div
          key={user.id}
          className="ms-2 position-relative"
          onClick={() => handleProfileClick(user.id)}
          style={{ cursor: "pointer" }}
        >
          <img
            src={user.img}
            alt={user.name}
            className="rounded-circle border ms-1"
            width="40"
            height="40"
          />
          {activeUserId === user.id && countdown !== null && countdown > 0 && (
            <span
              className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
              style={{ fontSize: "0.75rem" }}
            >
              {countdown}
            </span>
          )}
        </div>
      ))}
    </div>
  );
};

export default ProfileRow;
