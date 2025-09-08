import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import img from "../assets/image2.jpg"

const Edit = () => {
  const { userid } = useParams();
  const navigate = useNavigate();

  const [user, setUser] = useState({
    id: "",
    name: "",
    title: "",
    organization: "",
    workPhone: "",
    mobilePhone: "",
    email: "",
    photo: img,
  });

  useEffect(() => {
    if (userid) {
      axios
        .get(`http://localhost:8081/users/${userid}`)
        .then((res) => setUser(res.data))
        .catch((err) => console.error("Error fetching user:", err));
    }
  }, [userid]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:8081/users/${userid}`, user);
      alert("Profile updated successfully!");
      navigate(-1);
    } catch (err) {
      console.error("Error updating user:", err);
      alert("Failed to update profile!");
    }
  };

  return (
    <div className="container mt-4">
      <h3>Edit Profile</h3>
      <form onSubmit={handleSave}>
        <div className="d-flex">
          <div className="me-4 text-center">
            <img
              src={user.photo}
              alt="Profile"
              className="rounded-circle"
              width="100"
              height="100"
            />
            <br />
            <button
              type="button"
              className="btn btn-sm btn-outline-primary mt-2"
              onClick={() => alert("Change photo feature coming soon!")}
            >
              Change Photo
            </button>
          </div>

          <div className="flex-grow-1">
            <div className="form-group mb-2">
              <label>Name</label>
              <input
                type="text"
                name="name"
                value={user.name}
                onChange={handleChange}
                className="form-control"
              />
            </div>

            <div className="form-group mb-2">
              <label>Title</label>
              <input
                type="text"
                name="title"
                value={user.title}
                onChange={handleChange}
                className="form-control"
              />
            </div>

            <div className="form-group mb-2">
              <label>Organization</label>
              <input
                type="text"
                name="organization"
                value={user.organization}
                onChange={handleChange}
                className="form-control"
              />
            </div>

            <div className="form-group mb-2">
              <label>Work Phone</label>
              <input
                type="text"
                name="workPhone"
                value={user.workPhone}
                onChange={handleChange}
                className="form-control"
              />
            </div>

            <div className="form-group mb-2">
              <label>Mobile Phone</label>
              <input
                type="text"
                name="mobilePhone"
                value={user.mobilePhone}
                onChange={handleChange}
                className="form-control"
              />
            </div>

            <div className="form-group mb-2">
              <label>Email</label>
              <input
                type="email"
                name="email"
                value={user.email}
                onChange={handleChange}
                className="form-control"
              />
            </div>
          </div>
        </div>

        <div className="d-flex justify-content-end mt-3">
          <button
            type="button"
            className="btn btn-secondary me-2"
            onClick={() => navigate(-1)}
          >
            Cancel
          </button>
          <button type="submit" className="btn btn-primary">
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default Edit;
