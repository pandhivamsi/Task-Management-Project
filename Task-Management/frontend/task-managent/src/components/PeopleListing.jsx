import React, { useEffect, useState } from "react";
import Header from "./Header";
import { IoMdAddCircleOutline } from "react-icons/io";
import axios from "axios";
import { useAppData } from "./DataContext";

const PeopleListing = () => {
  const {peoples, setPeoples}= useAppData;
  const [showModal, setShowModal] = useState(false);
  const [editingPersonId, setEditingPersonId] = useState(null);
  const [newPerson, setNewPerson] = useState({
    firstName: "",
    lastName: "",
    loginId: "",
    email: "",
    primaryRole: "Member",
    status: "Active",
  });

  useEffect(() => {
    axios
      .get("http://localhost:8080/peoples")
      .then((res) => {setPeoples(res.data)
      console.log(res.data)
  })
      .catch((err) => console.error(err));
  }, []);

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this person?")) {
      axios
        .delete(`http://localhost:8080/peoples/${id}`)
        .then(() => {
          setPeoples(peoples.filter((person) => person.id !== id));
        })
        .catch((err) => console.error(err));
    }
  };

  const handleEdit = (person) => {
    setEditingPersonId(person.id);
    setNewPerson({
      firstName: person.firstName,
      lastName: person.lastName,
      loginId: person.loginId,
      email: person.email,
      primaryRole: person.primaryRole,
      status: person.status,
    });
    setShowModal(true);
  };

  // const handleView = (id) => {
  //   alert("View details of person with ID: " + id);
  // };

  const handleAdd = () => {
    setEditingPersonId(null);
    setNewPerson({
      firstName: "",
      lastName: "",
      loginId: "",
      email: "",
      primaryRole: "Member",
      status: "Active",
    });
    setShowModal(true);
  };

  const handleClose = () => {
    setShowModal(false);
    setNewPerson({
      firstName: "",
      lastName: "",
      loginId: "",
      email: "",
      primaryRole: "Member",
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
        .post("http://localhost:8080/peoples", newPerson)
        .then((res) => {
          setPeoples([...peoples, res.data]);
          handleClose();
        })
        .catch((err) => console.error(err));
    }
  };

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
              <th>First Name</th>
              <th>Last Name</th>
              <th>Login ID</th>
              <th>Email</th>
              <th>Status</th>
              <th>Primary Role</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {peoples.map((person, index) => (
              <tr key={person.id}>
                <td>{index + 1}</td>
                <td>{person.firstName}</td>
                <td>{person.lastName}</td>
                <td>{person.loginId}</td>
                <td>{person.email}</td>
                <td>{person.status}</td>
                <td>{person.primaryRole}</td>
                <td>
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
                </td>
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
                      <th>S.No</th>
                      <th>First Name</th>
                      <th>Last Name</th>
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
                          name="firstName"
                          value={newPerson.firstName}
                          onChange={handleChange}
                          className="form-control"
                        />
                      </td>
                      <td>
                        <input
                          type="text"
                          name="lastName"
                          value={newPerson.lastName}
                          onChange={handleChange}
                          className="form-control"
                        />
                      </td>
                      <td>
                        <input
                          type="text"
                          name="loginId"
                          value={newPerson.loginId}
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
                          name="primaryRole"
                          value={newPerson.primaryRole}
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
    </div>
  );
};

export default PeopleListing;
