import React, { useState } from "react";
import axios from "axios";
import { useAppData } from "./DataContext";

const ProjectForm = ({ onClose }) => {
  const [projectName, setProjectName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { projects, setProjects } = useAppData(); // Use context
  const token = sessionStorage.getItem("token");
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!projectName.trim()) return;

    setLoading(true);
    setError("");

    try {
      const newProject = { projName: projectName, createdBy: "vamsi" };
      const res = await axios.post("http://localhost:8080/auth/projects", newProject,{
        headers: {
        Authorization: `Bearer ${token}`,
      }
      });

      
      setProjects([...projects, res.data]);
      setProjectName("");
      onClose();
    } catch (err) {
      console.error("Error saving project:", err);
      setError("Failed to add project");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal show d-block" tabIndex="-1" style={{ backgroundColor: "rgba(0,0,0,0.5)" }}>
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Create Project</h5>
            <button type="button" className="btn-close" onClick={onClose}></button>
          </div>
          <div className="modal-body">
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                className="form-control mb-3"
                placeholder="Project Name"
                value={projectName}
                onChange={(e) => setProjectName(e.target.value)}
                disabled={loading}
              />
              {error && <div className="text-danger mb-2">{error}</div>}
              <button type="submit" className="btn btn-primary" disabled={loading}>
                {loading ? "Saving..." : "Save Project"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectForm;
