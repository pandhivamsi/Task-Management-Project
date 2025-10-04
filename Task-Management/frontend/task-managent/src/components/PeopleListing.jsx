import React, { useEffect, useState } from "react";
import Header from "./Header";
import { IoMdAddCircleOutline } from "react-icons/io";
import axios from "axios";
import { useAppData } from "./DataContext";
import DeleteConfirm from "./DeleteConfirm";
import Toaster from "./Toaster";

const PeopleListing = () => {
  const {peoples, setPeoples}= useAppData();
  const [showModal, setShowModal] = useState(false);
  const [editingPersonId, setEditingPersonId] = useState(null);
  const [personToDelete, setPersonToDelete] = useState(null); 
  const [showDeleteModal, setShowDeleteModal] = useState(false); 
  const [showToast,setShowToast] = useState(false)
  const [newPerson, setNewPerson] = useState({
    firstName: "",
    lastName: "",
    userId: "",
    email: "",
    role: "Member",
    status: "Active",
  });

  const confirmDelete = () => {
    if (!personToDelete) return;
    axios
      .delete(`http://localhost:8080/peoples/${personToDelete}`)
      .then(() => {
        setPeoples(peoples.filter((person) => person.id !== personToDelete));
        setPersonToDelete(null);
        setShowDeleteModal(false);
        setShowToast(true)
      })
      .catch((err) => console.error(err));
  };

  const handleDelete = (id) => {
    setPersonToDelete(id);   
    setShowDeleteModal(true); 
  };

  const handleEdit = (person) => {
    setEditingPersonId(person.id);
    setNewPerson({
      name: person.name,
      userId: person.userId,
      email: person.email,
      role: person.role,
      status: person.status,
    });
    setShowModal(true);
  };

  const handleAdd = () => {
    setEditingPersonId(null);
    setNewPerson({
      name:"",
      userId: "",
      email: "",
      role: "Member",
      status: "Active",
    });
    setShowModal(true);
  };

  const handleClose = () => {
    setShowModal(false);
    setNewPerson({
      name:"",
      userId: "",
      email: "",
      role: "Member",
      status: "Active",
    });
  };

  const handleChange = (e) => {
    setNewPerson({ ...newPerson, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    if (editingPersonId) {
    
      axios
        .put(`http://localhost:8080/peoples/${editingPersonId}`, newPerson)
        .then((res) => {
          const updatedPeoples = peoples.map((person) =>
            person.id === editingPersonId ? res.data : person
          );
          setPeoples(updatedPeoples);
          handleClose();
        })
        .catch((err) => console.error(err));
    } else {
    
      axios
        .post("http://localhost:8080/register", newPerson)
        .then((res) => {
          setPeoples([...peoples, res.data]);
          handleClose();
        })
        .catch((err) => console.error(err));
    }
  };

  const role = sessionStorage.getItem("role");

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
            <IoMdAddCircleOutline className="me-1" /> Add User
          </button>
        </div>

        <table className="table table-large table-bordered m-0">
          <thead>
            <tr>
              <th>S.No</th>
              <th>Name</th>
              <th>Login ID</th>
              <th>Email</th>
              <th>Status</th>
              <th>Primary Role</th>
              {role === "admin" &&
              <th>Actions</th>}
            </tr>
          </thead>
          <tbody>
            {peoples.map((person, index) => (
              <tr key={person.id}>
                <td>{index + 1}</td>
                <td>{person.name}</td>
                <td>{person.userId}</td>
                <td>{person.email}</td>
                <td>{person.status}</td>
                <td>{person.role}</td>
                {role === "admin" && <td>
                  <button
                    className="btn btn-sm btn-warning me-1"
                    onClick={() => handleEdit(person)}
                  >
                    ✏️
                  </button>
                  <button
                    className="btn btn-sm btn-danger"
                    onClick={() => handleDelete(person.id)}
                  >
                    🗑
                  </button>
                </td>}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      {showDeleteModal && (
        <DeleteConfirm
          handleDelete={confirmDelete}
          onClose={() => setShowDeleteModal(false)}
        />
      )}
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
                      <th>S.No</th>
                      <th>Name</th>
                      <th>Login ID</th>
                      <th>Email</th>
                      <th>Primary Role</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>1</td>
                      <td>
                        <input
                          type="text"
                          name="name"
                          value={newPerson.name}
                          onChange={handleChange}
                          className="form-control"
                        />
                      </td>
                      <td>
                        <input
                          type="text"
                          name="userId"
                          value={newPerson.userId}
                          onChange={handleChange}
                          className="form-control"
                        />
                      </td>
                      <td>
                        <input
                          type="email"
                          name="email"
                          value={newPerson.email}
                          onChange={handleChange}
                          className="form-control"
                        />
                      </td>
                      <td>
                        <select
                          name="role"
                          value={newPerson.role}
                          onChange={handleChange}
                          className="form-select"
                        >
                          <option value="Member">Member</option>
                          <option value="Admin">Admin</option>
                        </select>
                      </td>
                      <td>
                        <select
                          name="status"
                          value={newPerson.status}
                          onChange={handleChange}
                          className="form-select"
                        >
                          <option value="Active">Active</option>
                          <option value="Inactive">Inactive</option>
                        </select>
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
      {
        showToast && <Toaster/>
      }
    </div>
  );
};

export default PeopleListing;
