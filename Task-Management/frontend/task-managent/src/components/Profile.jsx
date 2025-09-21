import React, { useContext, useState } from "react";
import { CgProfile } from "react-icons/cg";
import { useNavigate } from "react-router-dom";
import ResetPassword from "./ResetPassword";
import { ThemeContext } from "./ThemeContext";
import { FaPaintBrush } from "react-icons/fa";

const Profile = ({ user = {} }) => {
  const navigate = useNavigate();
  const [showReset, setShowReset] = useState(false);
  const { setTheme } = useContext(ThemeContext);

  const colorOptions = [
    { name: "Blue", value: "#0952bfff" },
    { name: "Green", value: "#40407A" },
    { name: "Purple", value: "#2C3E50" },
    { name: "Orange", value: "#b0335dff" },
    { name: "Pink", value: "#660578ff" },
  ];

  const applyTheme = (color) => {
    setTheme({
      header: color,
      dashboard: "#f8f9fa",
      card: "#ffffff",
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
              <h6 className="mb-0">{user.name || "John Doe"}</h6>
              <small className="text-white-50">{user.role || "Admin"}</small>
            </div>
          </div>
        </li>

        {/* Edit Details */}
        <li>
          <button
            className="dropdown-item ms-0"
            onClick={() => navigate(`/edit/${user.id || 1}`)}
          >
            Edit Details
          </button>
        </li>

        {/* Reset Password */}
        <li>
          <button
            className="dropdown-item ms-0"
            onClick={() => setShowReset(true)}
          >
            Reset Password
          </button>
        </li>

        {/* Theme Color Options */}
        <li
          className="px-3 py-2 d-flex align-items-center"
          style={{ gap: "8px" }}
        >
          <button
            className="btn p-0"
            style={{
              width: "28px",
              height: "28px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "default",
            }}
          >
            <FaPaintBrush size={18} />
          </button>

          <div className="d-flex" style={{ gap: "6px" }}>
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

        <li>
          <hr className="dropdown-divider border-secondary-subtle" />
        </li>

        {/* Logout */}
        <li>
          <a className="dropdown-item text-danger ms-0" href="/">
            Log Out
          </a>
        </li>
      </ul>

      {showReset && (
        <ResetPassword userid={user.id || 1} onClose={() => setShowReset(false)} />
      )}
    </div>
  );
};

export default Profile;
