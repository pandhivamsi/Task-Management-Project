import React, { useContext, useState } from "react";
import { ThemeContext } from "./ThemeContext";
import { BsEmojiSmile, BsPaperclip, BsAt } from "react-icons/bs";

const CardEdit = ({ user, onClose, fromComment = false }) => {
  const { theme } = useContext(ThemeContext);
  const [activeTab, setActiveTab] = useState(fromComment ? "comments" : "details");
  const [comments, setComments] = useState([]);
  const [commentInput, setCommentInput] = useState("");

  const handleAddComment = () => {
    if (commentInput.trim()) {
      setComments([...comments, { text: commentInput, user: "User", time: new Date().toLocaleString() }]);
      setCommentInput("");
    }
  };

  return (
    <div className="modal show d-block" tabIndex="-1" style={{ backgroundColor: "rgba(0,0,0,0.5)" }}>
      <div className="modal-dialog modal-xl">
        <div className="modal-content">
          <div className="modal-header text-white" style={{ backgroundColor: theme.header }}>
            <h5 className="modal-title">{user.taskId}: {user.title}</h5>
            <button type="button" className="btn-close btn-close-white" onClick={onClose}></button>
          </div>

          <div className="modal-body">
            <ul className="nav nav-tabs mb-3">
              <li className="nav-item">
                <button className={`nav-link ${activeTab === "details" ? "active" : ""}`} onClick={() => setActiveTab("details")}>Card Details</button>
              </li>
              <li className="nav-item">
                <button className={`nav-link ${activeTab === "comments" ? "active" : ""}`} onClick={() => setActiveTab("comments")}>Comments</button>
              </li>
            </ul>

            {activeTab === "details" && (
              <form className="row g-3">
                <div className="col-12">
                  <label className="form-label">Title</label>
                  <input type="text" className="form-control" defaultValue={user.title} />
                </div>
                <div className="col-12">
                  <label className="form-label">Description</label>
                  <textarea className="form-control" rows="3" defaultValue={user.description}></textarea>
                </div>
                <div className="col-md-6">
                  <label className="form-label">Priority</label>
                  <select className="form-select" defaultValue={user.priority}>
                    <option>Select</option>
                    <option>Low</option>
                    <option>Medium</option>
                    <option>High</option>
                  </select>
                </div>
                <div className="col-md-6">
                  <label className="form-label">Status</label>
                  <select className="form-select" defaultValue={user.status}>
                    <option>Ready</option>
                    <option>In Progress</option>
                    <option>Done</option>
                  </select>
                </div>
                <div className="col-md-6">
                  <label className="form-label">Due Date</label>
                  <input type="date" className="form-control" defaultValue={user.dueDate} />
                </div>

                <div className="col-md-6 mb-2">
                          <label className="form-label">ProjectList</label>
                          <select
                          className="form-select"
                          name="projectList"
                          defaultvalue={user.projectList}
                      >
                        <option value="">Select Project</option>
                        {/* {projects && projects.length > 0 ? (
                        projects.map((p) => (
                        <option key={p.id} value={p.projectName}>
                        {p.projectName}
                      </option>
                           ))
                              ) : (
                    <option disabled>No Projects Available</option>
                  )} */}
                  </select>
                  </div>

                <div className="col-md-6">
                  <label className="form-label">Estimate (Days)</label>
                  <input type="number" className="form-control" defaultValue={user.estimate} />
                </div>

                <div className="col-md-6 mb-2">
                          <label className="form-label">PeopleList</label>
                          <select
                          className="form-select"
                          name="peopleList"
                          defaultvalue={user.peopleList}
                         
                      >
                        <option value="">Select People</option>
                        {/* {peoples && peoples.length > 0 ? (
                        peoples.map((x) => (
                        <option key={x.id} value={x.firstName}>
                        {x.firstName}
                      </option>
                    ))
              ) : (
                    <option disabled>No People Available</option>
                  )} */}
                  </select>
                  </div>


                <div className="col-md-6">
                  <label className="form-label">Size</label>
                  <input type="text" className="form-control" defaultValue={user.size} />
                </div>
                <div className="col-md-6">
                  <label className="form-label">Release</label>
                  <input type="text" className="form-control" defaultValue={user.release} />
                </div>
                <div className="col-12">
                  <label className="form-label">Sprint</label>
                  <input type="text" className="form-control" defaultValue={user.sprint} />
                </div>
              </form>
            )}

            {activeTab === "comments" && (
              <div>
                <div className="mb-3">
                  <textarea className="form-control" rows="2" placeholder="Add a comment..." value={commentInput} onChange={(e) => setCommentInput(e.target.value)}></textarea>
                  <div className="d-flex justify-content-between align-items-center mt-2">
                    <div className="d-flex gap-3 text-muted fs-5">
                      <BsEmojiSmile />
                      <BsPaperclip />
                      <BsAt />
                    </div>
                    <div>
                      <button className="btn btn-light btn-sm me-2" onClick={() => setCommentInput("")}>Cancel</button>
                      <button className="btn btn-primary btn-sm" onClick={handleAddComment}>Save</button>
                    </div>
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
            <div className="modal-footer">
              <button className="btn btn-secondary btn-sm" onClick={onClose}>Cancel</button>
              <button className="btn btn-primary btn-sm">Save</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CardEdit;
