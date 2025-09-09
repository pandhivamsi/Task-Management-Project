import React, { useEffect, useState } from "react";
import Header from "./Header";
import { IoMdAddCircleOutline } from "react-icons/io";

const PeopleListing = () => {
  const [peoples, setPeoples] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [newPerson, setNewPerson] = useState({
    firstName: "",
    lastName: "",
    loginId: "",
    email: "",
    primaryRole: "Member",
    status: "Active",
  });

  useEffect(() => {
    fetch("http://localhost:8081/peoples")
      .then((res) => res.json())
      .then((data) => setPeoples(data))
      .catch((err) => console.error(err));
  }, []);

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this person?")) {
      fetch(`http://localhost:8081/peoples/${id}`, {
        method: "DELETE",
      })
        .then(() => {
          setPeoples(peoples.filter((person) => person.id !== id));
        })
        .catch((err) => console.error(err));
    }
  };

  const handleEdit = (id) => {
    alert("Edit person with ID: " + id);
  };

  const handleView = (id) => {
    alert("View details of person with ID: " + id);
  };

  // open modal
  const handleAdd = () => {
    setShowModal(true);
  };

  // close modal
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
    fetch("http://localhost:8081/peoples", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newPerson),
    })
      .then((res) => res.json())
      .then((data) => {
        setPeoples([...peoples, data]);
        handleClose();
      })
      .catch((err) => console.error(err));
  };

  return (
    <div>
      <Header />
      <div className="container show shadow mt-4 pb-4">
        {/* Header + Add Button */}
        <div className="d-flex justify-content-between align-items-center mb-2">
          <h6 className="dropdown-header">Peoples List</h6>
          <button
            className="btn btn-primary btn-sm m-3 ms-3"
            onClick={handleAdd}
          >
            <IoMdAddCircleOutline className="me-1" /> Add User
          </button>
        </div>

        {/* Table */}
        <table className="table table-large table-bordered m-0">
          <thead>
            <tr>
              <th>S.No</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Login ID</th>
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
                <td>{person.status}</td>
                <td>{person.primaryRole}</td>
                <td>
                  <button
                    className="btn btn-sm btn-warning me-1"
                    onClick={() => handleEdit(person.id)}
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

      {/* Modal */}
      {showModal && (
        <div
          className="modal fade show d-block"
          tabIndex="-1"
          style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
        >
          <div className="modal-dialog modal-lg">
            <div className="modal-content">
              {/* Modal Header */}
              <div className="modal-header">
                <h5 className="modal-title">Create and Invite Member</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={handleClose}
                ></button>
              </div>

              {/* Modal Body with Form */}
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

              {/* Modal Footer */}
              <div className="modal-footer">
                <button className="btn btn-primary" onClick={handleSave}>
                  Add
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
