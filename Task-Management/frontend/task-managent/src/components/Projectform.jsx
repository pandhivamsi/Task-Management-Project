// ProjectForm.jsx
import React, { useState } from "react";

const ProjectForm = ({ onClose, onProjectSaved }) => {
  const [projectName, setProjectName] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (projectName.trim()) {
      onProjectSaved({ projectName: projectName });
      setProjectName("");
      onClose(); 
    }
  };

  return (
    <div
      className="modal show d-block"
      tabIndex="-1"
      style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Create Project</h5>
            <button
              type="button"
              className="btn-close"
              onClick={onClose}
            ></button>
          </div>

          <div className="modal-body">
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                className="form-control mb-3"
                placeholder="Project Name"
                value={projectName}
                onChange={(e) => setProjectName(e.target.value)}
              />
              <button type="submit" className="btn btn-primary" style={{ marginLeft: "21rem" }}>
                Save Project
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectForm;
