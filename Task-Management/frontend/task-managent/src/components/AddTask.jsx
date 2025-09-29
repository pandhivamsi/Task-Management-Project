import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BsEmojiSmile, BsPaperclip, BsAt } from "react-icons/bs";
import { IoIosAddCircleOutline } from "react-icons/io";
import { ThemeContext } from "./ThemeContext";
import { useAppData } from "./DataContext";
import axios from "axios";

const AddTask = () => {
  const navigate = useNavigate();
  const themeCtx = useContext(ThemeContext);
  const { projects, peoples, fetchCards, cards, setCards } = useAppData();
  const theme = themeCtx?.theme ?? { header: "#0d6efd" };
  const token = sessionStorage.getItem("token");

  const [activeTab, setActiveTab] = useState("details");
  const [showModal, setShowModal] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    priority: "",
    dueDate: "",
    estimate: "", 
    size: "",
    release: "",
    status: "Ready",
    sprint: "",
    projectId: "", 
    personId: "",  
  });

  const [comments, setComments] = useState([]);
  const [commentInput, setCommentInput] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddComment = () => {
    if (commentInput.trim()) {
      setComments([
        ...comments,
        { text: commentInput, user: "User", time: new Date().toLocaleString() },
      ]);
      setCommentInput("");
    }
  };

  const handleSave = async () => {
    const selectedProject = projects.find(p => p.id === parseInt(formData.projectId));
    const selectedPerson = peoples.find(p => p.id === parseInt(formData.personId));

    const payload = {
      title: formData.title,
      description: formData.description,
      priority: formData.priority,
      status: formData.status,
      dueDate: formData.dueDate || null,
      estimateDate: formData.estimate || null,
      projectName: selectedProject?.projName || "",
      personName: selectedPerson?.name || "",
      size: formData.size,
      sprint: formData.sprint,
      release: formData.release,
    };

    try {
      const res = await axios.post("http://localhost:8080/auth/cards", payload, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setCards([...cards, res.data]);
      fetchCards();
      setShowModal(false);
      navigate("/dashboard");
    } catch (error) {
      console.error("Error saving card:", error);
    }
  };

  return (
    <div className="container padding-top: 70px">
      <div className="d-flex justify-content-end mt-3">
        <button
          className="btn btn-primary"
          style={{ backgroundColor: theme.header }}
          onClick={() => setShowModal(true)}
        >
          <IoIosAddCircleOutline fontSize={17} /> Create Task
        </button>
      </div>

      {showModal && (
        <div className="modal show d-block" tabIndex="-1" style={{ backgroundColor: "rgba(0,0,0,0.5)" }}>
          <div className="modal-dialog modal-xl">
            <div className="modal-content">
              <div className="modal-header text-white" style={{ backgroundColor: theme.header }}>
                <h5 className="modal-title">Create Task</h5>
                <button className="btn-close btn-close-white" onClick={() => setShowModal(false)}></button>
              </div>

              {/* Tabs */}
              <ul className="nav nav-tabs">
                <li className="nav-item">
                  <button
                    className={`nav-link ${activeTab === "details" ? "active" : ""}`}
                    onClick={() => setActiveTab("details")}
                  >
                    Card Details
                  </button>
                </li>
                <li className="nav-item">
                  <button
                    className={`nav-link ${activeTab === "comments" ? "active" : ""}`}
                    onClick={() => setActiveTab("comments")}
                  >
                    Comments
                  </button>
                </li>
              </ul>

              {/* Modal Body */}
              <div className="modal-body" style={{ maxHeight: "500px", overflowY: "auto" }}>
                {activeTab === "details" && (
                  <form>
                    <div className="mb-2">
                      <label className="form-label fw-bold">Title</label>
                      <input
                        type="text"
                        className="form-control"
                        name="title"
                        value={formData.title}
                        onChange={handleInputChange}
                      />
                    </div>

                    <div className="mb-2">
                      <label className="form-label fw-bold">Description</label>
                      <textarea
                        className="form-control"
                        name="description"
                        rows="4"
                        value={formData.description}
                        onChange={handleInputChange}
                      />
                    </div>

                    <div className="row">
                      <div className="col-md-6 mb-2">
                        <label className="form-label">Priority</label>
                        <select className="form-select" name="priority" value={formData.priority} onChange={handleInputChange}>
                          <option value="">Select</option>
                          <option value="High">High</option>
                          <option value="Medium">Medium</option>
                          <option value="Low">Low</option>
                        </select>
                      </div>

                      <div className="col-md-6 mb-2">
                        <label className="form-label">Status</label>
                        <select className="form-select" name="status" value={formData.status} onChange={handleInputChange}>
                          <option value="Ready">Ready</option>
                          <option value="In Progress">In Progress</option>
                          <option value="Done">Done</option>
                        </select>
                      </div>

                      <div className="col-md-6 mb-2">
                        <label className="form-label">Due Date</label>
                        <input
                          type="date"
                          className="form-control"
                          name="dueDate"
                          value={formData.dueDate}
                          onChange={handleInputChange}
                        />
                      </div>

                      <div className="col-md-6 mb-2">
                        <label className="form-label">Estimate (Days)</label>
                        <input
                          type="date"
                          className="form-control"
                          name="estimate"
                          value={formData.estimate}
                          onChange={handleInputChange}
                        />
                      </div>

                      <div className="col-md-6 mb-2">
                        <label className="form-label">Project</label>
                        <select
                          className="form-select"
                          name="projectId"
                          value={formData.projectId}
                          onChange={handleInputChange}
                        >
                          <option value="">-- Select Project --</option>
                          {projects.map((p) => (
                            <option key={p.id} value={p.id}>
                              {p.projName}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div className="col-md-6 mb-2">
                        <label className="form-label">Assigned Person</label>
                        <select
                          className="form-select"
                          name="personId"
                          value={formData.personId}
                          onChange={handleInputChange}
                        >
                          <option value="">-- Select Person --</option>
                          {peoples.map((person) => (
                            <option key={person.id} value={person.id}>
                              {person.name}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div className="col-md-6 mb-2">
                        <label className="form-label">Size</label>
                        <input
                          type="text"
                          className="form-control"
                          name="size"
                          value={formData.size}
                          onChange={handleInputChange}
                        />
                      </div>

                      <div className="col-md-6 mb-2">
                        <label className="form-label">Release</label>
                        <input
                          type="text"
                          className="form-control"
                          name="release"
                          value={formData.release}
                          onChange={handleInputChange}
                        />
                      </div>

                      <div className="col-md-6 mb-2">
                        <label className="form-label">Sprint</label>
                        <input
                          type="text"
                          className="form-control"
                          name="sprint"
                          value={formData.sprint}
                          onChange={handleInputChange}
                        />
                      </div>
                    </div>
                  </form>
                )}

                {activeTab === "comments" && (
                  <div>
                    <textarea
                      className="form-control mb-2"
                      rows="2"
                      placeholder="Add a comment..."
                      value={commentInput}
                      onChange={(e) => setCommentInput(e.target.value)}
                    />
                    <div className="d-flex justify-content-between align-items-center mb-3">
                      <div className="d-flex gap-3 text-muted fs-5">
                        <BsEmojiSmile />
                        <BsPaperclip />
                        <BsAt />
                      </div>
                      <div>
                        <button className="btn btn-light btn-sm me-2" onClick={() => setCommentInput("")}>
                          Cancel
                        </button>
                        <button className="btn btn-success btn-sm" style={{ backgroundColor: theme.header }} onClick={handleAddComment}>
                          Save
                        </button>
                      </div>
                    </div>

                    <h6 className="mb-2">Comments</h6>
                    <div className="list-group">
                      {comments.length === 0 ? (
                        <div className="list-group-item text-muted">No comments yet.</div>
                      ) : (
                        comments.map((c, i) => (
                          <div key={i} className="list-group-item">
                            <div className="d-flex justify-content-between">
                              <strong>{c.user}</strong>
                              <small className="text-muted">{c.time}</small>
                            </div>
                            <p className="mb-1">{c.text}</p>
                            <button className="btn btn-link btn-sm p-0">Reply</button>
                          </div>
                        ))
                      )}
                    </div>
                  </div>
                )}
              </div>

              {activeTab === "details" && (
                <div className="modal-footer py-2">
                  <button className="btn btn-secondary btn-sm" onClick={() => setShowModal(false)}>
                    Cancel
                  </button>
                  <button className="btn btn-primary btn-sm" style={{ backgroundColor: theme.header }} onClick={handleSave}>
                    Save
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddTask;
