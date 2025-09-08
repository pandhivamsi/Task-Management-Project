import React from "react";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import Support from "./components/Support";
import Dashboard from "./components/Dashboard";
import ProjectForm from "./components/Projectform";
import Edit from "./components/Edit";
import "./App.css";

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/support" element={<Support />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/projectform" element={<ProjectForm />} />
          <Route path="/edit/:userid" element={<Edit />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
