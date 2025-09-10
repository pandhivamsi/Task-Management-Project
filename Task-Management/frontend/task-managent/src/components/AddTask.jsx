import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { BsEmojiSmile, BsPaperclip, BsAt } from "react-icons/bs";
import { IoIosAddCircleOutline  } from "react-icons/io";

const AddTask = () => {
  const navigate = useNavigate();
  const [savedData, setSavedData] = useState(null);
  const [activeTab, setActiveTab] = useState("details");
  const users = {name:"vamsi",email:"sdsfad.com",phone:868899238,website:"io.vom"}
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    priority: "",
    dueDate: "",
    estimate: "",
    size: "",
    rank: "",
    release: "",
    status:"",
    sprint: "",
  });

  const [comments, setComments] = useState([]);
  const [commentInput, setCommentInput] = useState("");
  const [showModal, setShowModal] = useState(false);

  // handle input change
  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // add comment
  const handleAddComment = () => {
    if (commentInput.trim() !== "") {
      setComments([
        ...comments,
        {
          text: commentInput,
          user: "User",
          time: new Date().toLocaleString(),
        },
      ]);
      setCommentInput("");
    }
  };

  // save data
  const handleSave = () => {
    setSavedData({ ...formData });
    setShowModal(false);
    navigate("/");
  };

  return (
    <div className="container">
      <div className="d-flex justify-content-end mt-0">
        <button className="btn btn-primary" onClick={() => setShowModal(true)}>
          <IoIosAddCircleOutline fontSize={17}/> Create Task
        </button>
      </div>
      {showModal && (
        <div
          className="modal show d-block"
          tabIndex="-1"
          style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
        >
          <div className="modal-dialog modal-xl">
            <div className="modal-content">
              <div className="modal-header bg-primary text-white">
                <h5 className="modal-title">
                  EPIC11: Enhance the Card Modal window
                </h5>
                <button
                  type="button"
                  className="btn-close btn-close-white"
                  onClick={() => setShowModal(false)}
                ></button>
              </div>
              <ul className="nav nav-tabs">
                <li className="nav-item">
                  <button
                    className={`nav-link ${
                      activeTab === "details" ? "active" : ""
                    }`}
                    onClick={() => setActiveTab("details")}
                  >
                    Card Details
                  </button>
                </li>
                <li className="nav-item">
                  <button
                    className={`nav-link ${
                      activeTab === "comments" ? "active" : ""
                    }`}
                    onClick={() => setActiveTab("comments")}
                  >
                    Comments
                  </button>
                </li>
              </ul>
              <div
                className="modal-body"
                style={{ maxHeight: "500px", overflowY: "auto" }}
              >
                {activeTab === "details" && (
                  <form>
                    <div className="">
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
                        rows="4"
                        name="description"
                        value={formData.description}
                        onChange={handleInputChange}
                      ></textarea>
                    </div>
                    <div className="row">
                      <div className="col-md-6 mb-2">
                        <label className="form-label">Priority</label>
                        <select
                          className="form-select"
                          name="priority"
                          value={formData.priority}
                          onChange={handleInputChange}
                        >
                          <option value="">Select</option>
                          <option value="High">High</option>
                          <option value="Medium">Medium</option>
                          <option value="Low">Low</option>
                        </select>
                      </div>
                      <div className="col-md-6 mb-2">
                        <label className="form-label">Status</label>
                        <select
                          className="form-select"
                          name="status"
                          value={formData.status}
                          onChange={handleInputChange}
                        >
                          <option value="Ready">Ready</option>
                          <option value="In-Progress">In-Progress</option>
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
                          type="number"
                          className="form-control"
                          name="estimate"
                          value={formData.estimate}
                          onChange={handleInputChange}
                        />
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
                    {/* Add Comment */}
                    <div className="mb-3">
                      <textarea
                        className="form-control"
                        rows="2"
                        placeholder="Add a comment..."
                        value={commentInput}
                        onChange={(e) => setCommentInput(e.target.value)}
                      ></textarea>

                      <div className="d-flex justify-content-between align-items-center mt-2">
                        <div className="d-flex gap-3 text-muted fs-5">
                          <BsEmojiSmile />
                          <BsPaperclip />
                          <BsAt />
                        </div>
                        <div>
                          <button
                            className="btn btn-light btn-sm me-2"
                            onClick={() => setCommentInput("")}
                          >
                            Cancel
                          </button>
                          <button
                            className="btn btn-success btn-sm"
                            onClick={handleAddComment}
                          >
                            Save
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Comment List */}
                    <h6 className="mb-2">Comments</h6>
                    <div className="list-group">
                      {comments.length === 0 ? (
                        <div className="list-group-item text-muted">
                          No comments yet.
                        </div>
                      ) : (
                        comments.map((c, i) => (
                          <div key={i} className="list-group-item">
                            <div className="d-flex justify-content-between">
                              <strong>{c.user}</strong>
                              <small className="text-muted">{c.time}</small>
                            </div>
                            <p className="mb-1">{c.text}</p>
                            <button className="btn btn-link btn-sm p-0">
                              Reply
                            </button>
                          </div>
                        ))
                      )}
                    </div>
                  </div>
                )}
              </div>

              {/* Footer only for details tab */}
              {activeTab === "details" && (
                <div className="modal-footer py-2">
                  <button
                    className="btn btn-secondary btn-sm"
                    onClick={() => setShowModal(false)}
                  >
                    Cancel
                  </button>
                  <button
                    className="btn btn-primary btn-sm"
                    onClick={handleSave}
                  >
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
