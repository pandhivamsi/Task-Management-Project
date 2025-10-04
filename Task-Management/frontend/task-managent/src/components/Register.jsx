import React, { useContext, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "./Header";
import { ThemeContext } from "./ThemeContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [uname, setUName] = useState("");
  const [role, setRole] = useState("");
  const [password, setPassword] = useState("");
  const [cpassword, setCPassword] = useState("");
  const { theme } = useContext(ThemeContext);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const register = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!uname || !role || !password || !cpassword) {
      setError("Details not proper");
      return;
    }

    if (password !== cpassword) {
      setError("Password and Confirm password should be same");
      return;
    }

    if (role !== "admin" && role !== "team member") {
      setError("Role is not proper (admin or team member");
      return;
    }

    try {
      await axios.post(
        "http://localhost:8080/auth/register",
        {
          username: uname,
          role: role,
          password: password,
        }
      );

      setSuccess("Registration successful Redirecting...");
      setUName("");
      setRole("");
      setPassword("");
      setCPassword("");

      setTimeout(() => {
        navigate("/");
        sessionStorage.clear();
      }, 2000);

    } catch (err) {
      setError(err.response?.data || "Failed to register");
    }
  };

  return (
    <div>
      <Header />
      <div className="d-flex justify-content-center mt-5 pt-5">
        <div className="card shadow" style={{ width: "350px" }}>
          <div
            className="card-header text-white text-center"
            style={{ backgroundColor: theme.header }}
          >
            <h5 className="mb-0">Register</h5>
          </div>

          {error && <p className="text-danger text-center mt-2">{error}</p>}
          {success && <p className="text-success text-center mt-2">{success}</p>}

          <div className="card-body">
            <form onSubmit={register}>
              <div className="mb-3">
                <label htmlFor="username" className="form-label">Username:</label>
                <input
                  type="text"
                  className="form-control"
                  id="username"
                  placeholder="Enter username"
                  value={uname}
                  onChange={(e) => setUName(e.target.value)}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="role" className="form-label">Role:</label>
                <input
                  type="text"
                  className="form-control"
                  id="role"
                  placeholder="Enter role : team member or admin"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="password" className="form-label">Password:</label>
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  placeholder="Enter password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="confirm-password" className="form-label">Confirm Password:</label>
                <input
                  type="password"
                  className="form-control"
                  id="confirm-password"
                  placeholder="Enter password again"
                  value={cpassword}
                  onChange={(e) => setCPassword(e.target.value)}
                  required
                />
              </div>
              <div className="text-center">
                <button
                  type="submit"
                  onClick={register}
                  className="btn w-50 text-white"
                  style={{ backgroundColor: theme.header }}
                >
                  Register
                </button>
              </div>
              <div className="text-center">
                <button
                onClick={()=>navigate("/")}
                  className="btn mt-2 text-white"
                  style={{ backgroundColor: theme.header }}
                >
                  Have account? Sign in
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
