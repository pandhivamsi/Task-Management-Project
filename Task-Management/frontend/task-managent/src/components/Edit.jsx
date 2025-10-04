import React, { useEffect, useState, useRef, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Header from "./Header";
import { ThemeContext } from "./ThemeContext";

const Edit = () => {
  const { userid } = useParams();
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  const { theme } = useContext(ThemeContext);

  const [user, setUser] = useState({
    id: "",
    name: "",
    title: "",
    organization: "",
    workPhone: "",
    mobile: "",
    email: "",
    photo: "",
  });

  const token = sessionStorage.getItem("token")

  useEffect(() => {
  if (userid && token) {
    axios.get(`http://localhost:8080/auth/people/${userid}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then(res => setUser(res.data))
    .catch(err => {
      console.error("Error fetching user:", err);

      if (err.response?.status === 401) {
        sessionStorage.clear();
        navigate("/");
      }
    });
  }
}, [userid, token]);


  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUser({ ...user, photo: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

 const handleSave = async (e) => {
  e.preventDefault();

  const formData = new FormData();
  formData.append("name", user.name);
  formData.append("title", user.title);
  formData.append("organization", user.organization);
  formData.append("workPhone", user.workPhone);
  formData.append("mobile", user.mobile);
  formData.append("email", user.email);

  if (fileInputRef.current?.files[0]) {
    formData.append("photo", fileInputRef.current.files[0]);
  }

  try {
    await axios.put(`http://localhost:8080/auth/peoples/${userid}`, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    });
    console.log(formData)
    alert("Profile updated successfully!");
    navigate("/dashboard");
  } catch (err) {
    console.error("Error updating user:", err);
    if (err.response?.status === 401) {
      sessionStorage.clear();
      navigate("/");
    } else if (err.response?.status === 403) {
      alert("You are not allowed to update this profile.");
    } else {
      alert("Failed to update profile. Please try again.");
    }
  }
};


  return (
    <div>
      <Header />
      <div className="container modal-dialog mt-5 pt-4 h-100">
        <div className="modal-content h-100">
          <div className="card shadow-fullscreen border-0 rounded-0 ">
            <div className="card-header  text-white " style={{ backgroundColor: theme.header }}>
              <h3 className="mb-1">Edit Profile</h3>
            </div>

            <form onSubmit={handleSave}>
              <div className="card-body bg-light ">
                <div className="row ">
                  <div className="col-md-4 text-center mb-3">
                    <div
                      className="mx-auto mt-4"
                      style={{ width: "190px", height: "190px" }}
                    >
                      <div className="rounded-circle overflow-hidden border border-3 border-primary w-100 h-100">
                        <img
                            src={user.profileImg ? `http://localhost:8080/uploads/${user.profileImg}` : '/uploads/default.png'}
                          alt="Profile"
                          className="w-100 h-100"
                          style={{ objectFit: "cover" }}
                        />
                      </div>
                    </div>

                    <br />
                    <button
                      type="button"
                      className="btn btn-sm btn-outline-primary fs-5 overflow-hidden"
                      onClick={() => fileInputRef.current.click()}
                    >
                      Change Photo
                    </button>

                    <input
                      type="file"
                      accept="image/*"
                      ref={fileInputRef}
                      style={{ display: "none" }}
                      onChange={handlePhotoChange}
                    />
                  </div>

                  <div className="col-md-8">
                    <div className="mb-3">
                      <label className="form-label fw-semibold">Name</label>
                      <input
                        type="text"
                        name="name"
                        value={user.name}
                        onChange={handleChange}
                        className="form-control"
                        placeholder="Enter full name"
                      />
                    </div>

                    <div className="mb-3">
                      <label className="form-label fw-semibold">Title</label>
                      <input
                        type="text"
                        name="title"
                        value={user.title}
                        onChange={handleChange}
                        className="form-control"
                        placeholder="e.g. Software Engineer"
                      />
                    </div>

                    <div className="mb-3">
                      <label className="form-label fw-semibold">
                        Organization
                      </label>
                      <input
                        type="text"
                        name="organization"
                        value={user.organization}
                        onChange={handleChange}
                        className="form-control"
                        placeholder="Company / Organization"
                      />
                    </div>

                    <div className="row">
                      <div className="col-md-6 mb-3">
                        <label className="form-label fw-semibold">
                          Work Phone
                        </label>
                        <input
                          type="text"
                          name="workPhone"
                          value={user.workPhone}
                          onChange={handleChange}
                          className="form-control"
                          placeholder="Work phone"
                        />
                      </div>
                      <div className="col-md-6 mb-3">
                        <label className="form-label fw-semibold">
                          Mobile Phone
                        </label>
                        <input
                          type="text"
                          name="mobile"
                          value={user.mobile}
                          onChange={handleChange}
                          className="form-control"
                          placeholder="Mobile number"
                        />
                      </div>
                    </div>

                    <div className="mb-3">
                      <label className="form-label fw-semibold">Email</label>
                      <input
                        type="email"
                        name="email"
                        value={user.email}
                        onChange={handleChange}
                        className="form-control"
                        placeholder="example@email.com"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="card-footer d-flex justify-content-end bg-light mt-5">
                <button
                  type="button"
                  className="btn btn-secondary me-2"
                  onClick={() => navigate(-1)}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn text-white px-4" style={{ backgroundColor: theme.header }}
                  onClick={handleSave}
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Edit;
