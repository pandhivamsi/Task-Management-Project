import React, { useContext, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "./Header";
import "bootstrap/dist/css/bootstrap.min.css";
import { ThemeContext } from "./ThemeContext";
import axios from "axios";
import { useAppData } from "./DataContext";

const Login = () => {
  const uname = useRef();
  const upwd = useRef();
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const { theme } = useContext(ThemeContext);
  const {projects } = useAppData();

  const login = async (e) => {
    e.preventDefault();

    if (!uname.current.value || !upwd.current.value) {
      setError("Username and Password are required");
      return;
    }

    try {
      const res = await axios.post("http://localhost:8080/auth", {
        username: uname.current.value,
        password: upwd.current.value,
      });
    
      console.log("Login Response:", res.data); // debug
      sessionStorage.setItem("role", res.data.role);
      sessionStorage.setItem("id", res.data.id);
      sessionStorage.setItem("username", res.data.username);
      sessionStorage.setItem("token", res.data.token);
      sessionStorage.setItem("isLoggedIn", res.data.isLoggedIn);

        setTimeout(()=>{
          navigate("/dashboard")
          if(projects){
          window.location.reload()
          }
        },1000)

    } catch (err) {
      
      if (err.response) {
      
        setError(err.response.data || "Invalid username or password");
      } else if (err.request) {
        setError("Server did not respond");
      } else {
        setError(err.message);
      }
    }
  };

  const register = () => navigate("/register");

  return (
    <div className="bg-light min-vh-100 d-flex flex-column "style={{ minHeight: "100vh", maxHeight: "100vh" }}>
      <Header />

      <div className="flex-grow-1 d-flex align-items-center justify-content-center">
        <div className="p-4 rounded shadow bg-white" style={{ width: 400, maxWidth: "90%" }}>
          <h2 className="text-center mb-4 text-primary">Login Page</h2>

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
            <div className="d-grid gap-2">
              <button
                type="submit"
                className="btn text-white w-75 mx-auto"
                style={{ backgroundColor: theme.header }}
              >
                Login
              </button>
              <button
                type="button"
                className="btn text-white w-75 mx-auto"
                style={{ backgroundColor: theme.header }}
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

export default Login;
