import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "./Header";
import "bootstrap/dist/css/bootstrap.min.css";

const Login = () => {
  const uname = useRef();
  const upwd = useRef();
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const login = (e) => {
    e.preventDefault();
    if (!uname.current.value || !upwd.current.value) {
      setError("Username and Password are required");
      return;
    }

    fetch("http://localhost:9000/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: uname.current.value,
        password: upwd.current.value,
      }),
    })
      .then((res) => {
        if (!res.ok) throw new Error("Invalid username or password");
        return res.json();
      })
      .then((data) => {
        sessionStorage.setItem("token", data.token);
        sessionStorage.setItem("role", data.role);
        sessionStorage.setItem("id", data.id);

        if (data.role === "ROLE_USER") navigate("/dashboard");
        else if (data.role === "ROLE_ADMIN") navigate("/admin-dashboard");
        else setError("Unknown user role");
      })
      .catch((err) => setError(err.message));
  };

  const register = () => navigate("/register");

  return (
    <div className="bg-light min-vh-100 d-flex flex-column">
      <Header />

      <div className="flex-grow-1 d-flex align-items-center justify-content-center">
        <div className="p-4 rounded shadow bg-white" style={{ width: 400, maxWidth: "90%" }}>
          <h2 className="text-center mb-4 text-primary">User Login</h2>

          {error && <div className="alert alert-danger py-2">{error}</div>}

          <form onSubmit={login} autoComplete="off">
            <div className="mb-3">
              <input
                ref={uname}
                type="text"
                className="form-control"
                placeholder="Enter username"
                autoFocus
              />
            </div>

            <div className="mb-3">
              <input
                ref={upwd}
                type="password"
                className="form-control"
                placeholder="Enter password"
              />
            </div>

            {/* Buttons centered inside the card */}
            <div className="d-grid gap-2">
  <button
    type="submit"
    className="btn text-white w-75 mx-auto"
    style={{ backgroundColor: "#002B5B" }}
  >
    Login
  </button>
  <button
    type="button"
    className="btn text-white w-75 mx-auto"
    style={{ backgroundColor: "#002B5B" }}
    onClick={register}
  >
    New? Register
  </button>
</div>


          </form>
        </div>
      </div>
    </div>
  );
};

export default Login
