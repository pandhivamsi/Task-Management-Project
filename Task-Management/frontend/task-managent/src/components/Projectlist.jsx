import React, { useEffect, useState } from "react";
import axios from "axios";
import ProjectForm from "./Projectform";

const Projectlist = () => {
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState("");
  const [showForm, setShowForm] = useState(false);


  useEffect(() => {
    axios
      .get("http://localhost:8080/projects")
      .then((res) => {
        setProjects(res.data);
        if (res.data.length > 0) {
          setSelectedProject(res.data[0].projectName);
        }
      })
      .catch((err) => console.error("Error fetching projects:", err));
  }, []);

  const handleSelectProject = (projectName) => {
    setSelectedProject(projectName);
    setShowForm(false);
  };

  const handleProjectSaved = (newProject) => {
    setProjects((prev) => [...prev, newProject]);
  };

  return (
    <>
      <div className="dropdown">
        <button
          className="btn btn-light dropdown-toggle text-uppercase ms-1 py-2 px-1 fw-bold fs-6"
          style={{ backgroundColor: "transparent", color: "white" }}
          type="button"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          {selectedProject || "Select Project"}
        </button>
        <ul className="dropdown-menu">
          {projects.length > 1 && projects
            .filter((p) => p.projectName !== selectedProject).map((p) => (
              <li key={p.id}>
                <button
                  className="dropdown-item text-uppercase"
                  onClick={() => handleSelectProject(p.projectName)}
                >
                  {p.projectName}
                </button>
              </li>
            ))}
          <li>
            <hr className="dropdown-divider" />
          </li>
          <li>
            <button
              className="dropdown-item text-primary"
              onClick={() => setShowForm(true)}
            >
              + Add Project
            </button>
          </li>
        </ul>
      </div>
      {showForm &&
        <ProjectForm
          onProjectSaved={handleProjectSaved}
          onClose={() => setShowForm(false)}
        />
      }
    </>
  );
};

export default Projectlist;
