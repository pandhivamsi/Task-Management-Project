import React, {  useEffect, useState } from "react";
import Header from "./Header";
import { IoMdAddCircleOutline } from "react-icons/io";
import axios from "axios";
import { useAppData } from "./DataContext";

const ProjectsDetails = () => {
  const {projects, setProjects}= useAppData();
  const [showModal, setShowModal] = useState(false);
  const [editingPersonId, setEditingPersonId] = useState(null);

  const [newProject, setNewProject] = useState({
    projName: "",
    createdBy: "",
  });

  useEffect(() => {
    axios
      .get("http://localhost:8080/projects")
      .then((res) => setProjects(res.data))
      .catch((err) => console.error(err));
  }, []);

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this person?")) {
      axios
        .delete(`http://localhost:8080/projects/${id}`)
        .then(() => {
          setProjects(projects.filter((project) => project.id !== id));
          
        })
        .catch((err) => console.error(err));
    }
  };

  const handleEdit = (person) => {
    setEditingPersonId(person.id);
    setNewProject({
      projName: person.projName,
      createdBy: person.createdBy,
    });
    setShowModal(true);
  };

  const handleAdd = () => {
    setEditingPersonId(null);
    setNewProject({
      projName: "",
      createdBy: "",
    });
    setShowModal(true);
  };

  const handleClose = () => {
    setShowModal(false);
    setNewProject({
      projName: "",
      createdBy: "",
    });
  };

  const handleChange = (e) => {
    setNewProject({ ...newProject, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    if (editingPersonId) {
    
      axios
        .put(`http://localhost:8080/projects/${editingPersonId}`, newProject)
        .then((res) => {
          const updatedPeoples = projects.map((project) =>
            project.id === editingPersonId ? res.data : project
          );
          setProjects(updatedPeoples);
          handleClose();
        })
        .catch((err) => console.error(err));
    } else {
    
      axios
        .post("http://localhost:8080/projects", newProject)
        .then((res) => {
          setProjects([...projects, res.data]);
          handleClose();
        })
        .catch((err) => console.error(err));
    }
  };

  const role = sessionStorage.getItem("role")
  return (
    <div>
      <Header />
      <div style={{ marginTop: "5.5rem"}}className="container show shadow pb-4">
        <div className="d-flex justify-content-between align-items-center mb-2">
          <h6 className="dropdown-header">Peoples List</h6>
          <button
            className="btn btn-primary btn-sm m-3 ms-3"
            onClick={handleAdd}
          >
            <IoMdAddCircleOutline className="me-1" /> Add Project
          </button>
        </div>

        <table className="table table-large table-bordered m-0">
          <thead>
            <tr>
              <th>Project Id</th>
              <th>Project Name</th>
              <th>Created By</th>
              {role === "admin" && <th>Actions</th>}
            </tr>
          </thead>
          <tbody>
            {projects.map((project, index) => (
              <tr key={project.id}>
                <td>{index + 1}</td>
                <td>{project.projName}</td>
                <td>{project.createdBy}</td>
                {role === "admin" && <td>
                  <button
                    className="btn btn-sm btn-warning me-1"
                    onClick={() => handleEdit(project)}
                  >
                    ✏️
                  </button>
                  <button
                    className="btn btn-sm btn-danger"
                    onClick={() => handleDelete(project.id)}
                  >
                    🗑
                  </button>
                </td>}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showModal && (
        <div
          className="modal fade show d-block"
          tabIndex="-1"
          style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
        >
          <div className="modal-dialog modal-lg">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">
                  {editingPersonId ? "Edit Member" : "Create and Invite Member"}
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={handleClose}
                ></button>
              </div>

              <div className="modal-body">
                <table className="table table-bordered">
                  <thead>
                    <tr>
                      <th>Project Id</th>
                      <th>Project Name</th>
                      <th>Created By</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>1</td>
                      <td>
                        <input
                          type="text"
                          name="projName"
                          value={newProject.projName}
                          onChange={handleChange}
                          className="form-control"
                        />
                      </td>
                      <td>
                        <input
                          type="text"
                          name="createdBy"
                          disabled
                          value={newProject.createdBy}
                          onChange={handleChange}
                          className="form-control"
                        />
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="modal-footer">
                <button className="btn btn-primary" onClick={handleSave}>
                  {editingPersonId ? "Save" : "Add"}
                </button>
                <button className="btn btn-secondary" onClick={handleClose}>
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProjectsDetails;
