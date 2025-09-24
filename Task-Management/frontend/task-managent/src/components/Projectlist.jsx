import React, { useEffect, useState } from "react";
import axios from "axios";
import ProjectForm from "./Projectform";
import { useNavigate } from "react-router-dom";

const Projectlist = () => {
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState("");
  const [showForm, setShowForm] = useState(false);
  const navigate = useNavigate()


 useEffect(() => {
  axios.get("http://localhost:8080/projects")
    .then((res) => {
      console.log(res);
      setProjects(res.data);
      if (res.data.length > 0) {
        setSelectedProject(res.data[0].projName); 
      }
    })
    .catch((err) => console.error("Error fetching projects:", err));
}, []);


  const handleSelectProject = (projName) => {
    setSelectedProject(projName);
    setShowForm(false);
  };

  const handleProjectSaved = (newProject) => {
    setProjects((prev) => [...prev, newProject]);
    setShowForm(false)
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
          {projects.length > 1 && projects
            .filter((p) => p.projName !== selectedProject).map((p) => (
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
