import React, { useState, useEffect } from "react";
import img1 from "../assets/image1.jpeg";
import img2 from "../assets/image2.jpeg";
import img3 from "../assets/image3.jpeg";
import img4 from "../assets/image4.jpeg";
import img5 from "../assets/image5.jpeg";
import { IoTimer } from "react-icons/io5";

const ProfileRow = () => {
  const users = [
    { id: 1, name: "gojo", img: img1 },
    { id: 2, name: "john snow", img: img2 },
    { id: 3, name: "lufy", img: img3 },
    { id: 4, name: "zenitsu", img: img4 },
    { id: 5, name: "ronaldo", img: img5 }
  ];

  const [activeUserId, setActiveUserId] = useState(null);
  const [countdown, setCountdown] = useState(null);

  const handleProfileClick = (id) => {
    setActiveUserId(id);
    setCountdown(0); 
  };

  useEffect(() => {
    if (countdown === null) return;
    if (countdown >= 120) return;

    const timer = setTimeout(() => setCountdown(countdown + 1), 1000);
    return () => clearTimeout(timer);
  }, [countdown]);

 

  return (
    <div>
       {activeUserId !== null && countdown !== null && (
  <div
    className="d-flex justify-content-center align-items-center ms-5 mt-2 fs-5 p-1 text-primary rounded-pill px-2"
    
  >
    <IoTimer className="spinner-border me-2 " />{countdown}
  </div>
)}
    <div className="d-flex flex-column position-absolute start-50 shadow-sm hover-shadow end-50 top-0 align-items-center mt-3">
      <div className="d-flex  mb-1 ms-5 me-5">
        {users.map((user) => (
          <div
            key={user.id}
            className="mx-2 text-center"
            onClick={() => handleProfileClick(user.id)}
            style={{ cursor: "pointer" }}
          >
            <img
              src={user.img}
              alt={user.name}
              className={`rounded-circle border ${activeUserId === user.id ?   " border-4 border-primary shadow" : "border-1"}  `}
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
