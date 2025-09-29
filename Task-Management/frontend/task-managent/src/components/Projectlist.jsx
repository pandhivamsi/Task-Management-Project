import React, { useState } from "react";
import ProjectForm from "./ProjectForm";
import { useNavigate } from "react-router-dom";
import { useAppData } from "./DataContext";

const ProjectList = () => {
   const { projects, selectedProject, setSelectedProject } = useAppData();
  const [showForm, setShowForm] = useState(false);
  const navigate = useNavigate();

  const handleSelectProject = (projName) => {
    setSelectedProject(projName);
    navigate("/dashboard");
    setShowForm(false);
  };

  return (
    <>
      <div className="dropdown">
        <button
          className="btn btn-light dropdown-toggle text-uppercase ms-1 py-2 px-1 fw-bold fs-6 border-0"
          style={{ backgroundColor: "transparent", color: "white" }}
          type="button"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          {selectedProject || "Select Project"}
        </button>
        <ul className="dropdown-menu">
          {projects
            .filter((p) => p.projName !== selectedProject)
            .map((p) => (
              <li key={p.id}>
                <button
                  className="dropdown-item text-uppercase"
                  onClick={() => handleSelectProject(p.projName)}
                >
                  {p.projName}
                </button>
              </li>
            ))}
          <li>
            <hr className="dropdown-divider" />
          </li>
          <li>
            <button className="dropdown-item text-primary" onClick={() => setShowForm(true)}>
              + Add Project
            </button>
          </li>
        </ul>
      </div>

      {showForm && <ProjectForm onClose={() => setShowForm(false)} />}
    </>
  );
};

export default ProjectList;
