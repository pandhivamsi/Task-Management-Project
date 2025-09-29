import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const SessionHandler = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    if (token) {
      const expirationTime = 20 * 60 * 1000; // 20 mins
      const timeout = setTimeout(() => {
        sessionStorage.clear();
        navigate("/");
        alert("Session expired. Please login again.");
      }, expirationTime);
      return () => clearTimeout(timeout);
    }
  }, [navigate]);

  return null; 
};

export default SessionHandler;
