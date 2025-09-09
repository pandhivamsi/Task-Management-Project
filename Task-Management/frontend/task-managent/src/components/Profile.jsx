import React, { useContext, useState } from "react";
import { CgProfile } from "react-icons/cg";
import { FaPaintBrush } from "react-icons/fa";
import { ThemeContext } from "./ThemeContext";  // ✅ make sure you have ThemeContext.jsx

const Profile = () => {
  const { setTheme } = useContext(ThemeContext);
  const [showColors, setShowColors] = useState(false);

  // Only 4 predefined colors
  const colorOptions = [
    { name: "Blue", value: "#070c12ff" },
    { name: "Green", value: "#4f6c5fff" },
    { name: "Purple", value: "#2a1552ff" },
    { name: "Orange", value: "#164146ff" }
  ];

  // When clicked → apply theme
  const applyTheme = (color) => {
    setTheme({
      header: color,
      dashboard: "#f8f9fa",
      card: "#ffffff"
    });
  };

  return (
    <div className="dropdown">
      <button
        className="btn text-light bg-transparent ms-0"
        type="button"
        data-bs-toggle="dropdown"
        aria-expanded="false"
      >
        <CgProfile size={28} />
      </button>

      <ul className="dropdown-menu dropdown-menu-end dropdown-menu shadow">
        {/* Profile Info */}
        <li className="px-3 py-2 border-bottom">
          <div className="d-flex align-items-center">
            <CgProfile size={32} className="me-2 text-primary" />
            <div>
              <h6 className="mb-0">John Doe</h6>
              <small className="text-dark-50">Admin</small>
            </div>
          </div>
        </li>

        <li><a className="dropdown-item ms-0" href="#">Edit Details</a></li>
        <li><a className="dropdown-item ms-0" href="#">Reset Password</a></li>

        {/* 🎨 Theme Option */}
          
     <li className="px-3 py-2 d-flex align-items-center" style={{ gap: "8px" }}>
     <button
    className="btn p-0"
    style={{
      width: "28px",
      height: "28px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      cursor: "default", // optional: shows it's not clickable
    }}
  >
    <FaPaintBrush size={18} />
  </button>

  <div
    className="d-flex"
    style={{
      gap: "6px",
    }}
  >
    {colorOptions.map((c) => (
      <button
        key={c.name}
        onClick={() => applyTheme(c.value)}
        style={{
          width: "24px",
          height: "24px",
          borderRadius: "50%",
          border: "2px solid #fff",
          backgroundColor: c.value,
          cursor: "pointer",
          }}
           ></button>
         ))}
        </div>
     </li>
        <li><hr className="dropdown-divider border-secondary-subtle" /></li>
        <li><a className="dropdown-item text-danger ms-0" href="#">Log Out</a></li>
      </ul>
    </div>
  );
};

export default Profile;
