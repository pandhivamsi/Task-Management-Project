import React, { useState } from "react";
import axios from "axios";
import Header from "./Header";

const ProjectForm = ({ onProjectSaved, onClose }) => {
  const [formData, setFormData] = useState({ projectName: "" });

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:8080/projects", formData)
      .then((res) => {
        onProjectSaved(res.data); 
        setFormData({ projectName: "" });
        onClose();
      })
      .catch((err) => console.error("Error saving project:", err));
  };

  return (
    <div>
         <Header/>
    
    <div className="container mt-3">
      <div className="mx-auto" style={{ maxWidth: "400px" }}>
        <form
          className="border p-3 bg-light rounded shadow-sm"
          onSubmit={handleSubmit}
        >
          <input
            className="form-control mb-2"
            type="text"
            name="projectName"
            placeholder="Project Name"
            value={formData.projectName}
            onChange={handleChange}
            required
          />
          <button className="btn btn-success w-100" type="submit">
            Save Project
          </button>
        </form>
      </div>
    </div>
    </div>
  );
};

export default ProjectForm;
