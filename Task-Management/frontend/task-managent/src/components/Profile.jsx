import React, { useContext, useEffect, useState } from "react";
import { CgProfile } from "react-icons/cg";
import { useNavigate } from "react-router-dom";
import ResetPassword from "./ResetPassword";
import { ThemeContext } from "./ThemeContext";
import { FaPaintBrush } from "react-icons/fa";
import axios from "axios";

const Profile = () => {
  const navigate = useNavigate();
  const [showReset, setShowReset] = useState(false);
  const { setTheme } = useContext(ThemeContext);
  const [user, setUser] = useState({ name: "", role: "" });
  const userId = sessionStorage.getItem("id");
  const token = sessionStorage.getItem("token");

  useEffect(() => {
    const fetchUser = async () => {
      if (!userId || !token) return; // safety check

      try {
        const res = await axios.get(`http://localhost:8080/auth/people/${userId}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setUser(res.data);
      } catch (err) {
        console.error("Error fetching user:", err);

        if (err.response?.status === 401) {
          // session expired
          sessionStorage.clear();
          navigate("/login");
        } else if (err.response?.status === 403) {
          console.warn("Access forbidden: insufficient permissions.");
          setUser(null);
        }
      }
    };

    fetchUser();
  }, [userId, token, navigate, setUser]);

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
        <img
      src={
        user.profileImg
          ? `http://localhost:8080/uploads/${user.profileImg}`
          : 'http://localhost:8080/uploads/default.png'
      }
      alt="Profile"
      style={{
        width: '36px',
        height: '36px',
        borderRadius: '50%',
        objectFit: 'cover',
        border: '1px solid #fff',
      }}
    />
      </button>

      <ul className="dropdown-menu dropdown-menu-end dropdown-menu shadow">
        <li className="px-3 py-2 border-bottom">
          <div className="d-flex align-items-center">
            <CgProfile size={32} className="me-2 text-primary " />
            <div>
              <h6 className="mb-0">{user.name || "Loading..."}</h6>
              <small className="text-black-50">{user.role || "Fetching..."}</small>
            </div>
          </div>
        </li>
        <li>
          <button className="dropdown-item ms-0" onClick={() => navigate(`/edit/${userId}`)}>
            Edit Details
          </button>
        </li>
        <li>
          <button className="dropdown-item ms-0" onClick={() => setShowReset(true)}>
            Reset Password
          </button>
        </li>
        <li className="px-3 py-2 d-flex align-items-center" style={{ gap: "8px" }}>
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
        <li>
          <button onClick={()=>{navigate("/");sessionStorage.clear()}} className="dropdown-item text-danger ms-0 text-center">
            Log Out
          </button>
        </li>
      </ul>

      {showReset && <ResetPassword userid={1} onClose={() => setShowReset(false)} />}
    </div>
  );
};

export default Profile;
