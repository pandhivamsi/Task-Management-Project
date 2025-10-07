import React, { useContext, useState, useEffect } from "react";
import { ThemeContext } from "./ThemeContext";
import { BsEmojiSmile, BsPaperclip, BsAt } from "react-icons/bs";
import axios from "axios";
import { useAppData } from "./DataContext";

const CardEdit = ({ card, onClose, onSave, fromComment = false }) => {
  const { theme } = useContext(ThemeContext);
  const [activeTab, setActiveTab] = useState(fromComment ? "comments" : "details");
  const [comments, setComments] = useState([]);
  const [commentInput, setCommentInput] = useState("");
  const { projects, peoples, loading } = useAppData();
  const token = sessionStorage.getItem("token");

  const [formData, setFormData] = useState({
    id: card.id,
    title: card.title || "",
    description: card.description || "",
    priority: card.priority || "Select",
    status: card.status || "Ready",
    dueDate: card.dueDate || card.estimateDate || "",
    estimateDate: card.estimateDate || card.dueDate || "",
    projectName: card.projectName || card.projectList || "",
    personName: card.personName || card.peopleList || "",
    estimate: card.estimate || "",
    size: card.size || "",
    release: card.release || "",
    sprint: card.sprint || ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddComment = async () => {
    if (!commentInput.trim()) return;

    const newComment = {
      comment: commentInput,
      cardId: card.id,
      cardName: card.title,
      commentedBy: sessionStorage.getItem("username") || "User"
    };

    try {
      const res = await axios.post("http://localhost:8080/auth/comments", newComment, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setComments([...comments, res.data]); // add saved comment to list
      setCommentInput("");
    } catch (err) {
      console.error("Failed to add comment:", err);
    }
  };


  useEffect(() => {
    const fetchComments = async () => {
      try {
        const res = await axios.get(`http://localhost:8080/auth/comments?cardId=${card.id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setComments(res.data);
      } catch (err) {
        console.error("Failed to fetch comments:", err);
      }
    };

    fetchComments();
  }, [card.id, token]);


  const handleSave = () => {
    const updatedCard = {
      ...card,
      id: formData.id,
      title: formData.title,
      description: formData.description,
      priority: formData.priority,
      status: formData.status,
      dueDate: formData.dueDate,
      estimateDate: formData.estimateDate,
      projectName: formData.projectName,
      personName: formData.personName,
      estimate: formData.estimate,
      size: formData.size,
      release: formData.release,
      sprint: formData.sprint
    };

    console.log(updatedCard);

    axios
      .put(`http://localhost:8080/auth/cards/${updatedCard.id}`, updatedCard, {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      })
      .then((res) => {
        if (onSave) onSave(res.data);
        onClose();
      })
      .catch((err) => console.error("Failed to update card:", err));
  };

  return (
    <div className="modal show d-block" tabIndex="-1" style={{ backgroundColor: "rgba(0,0,0,0.5)" }}>
      <div className="modal-dialog modal-xl">
        <div className="modal-content">
          <div className="modal-header text-white" style={{ backgroundColor: theme.header }}>
            <h5 className="modal-title">{card.card_id}: {card.title}</h5>
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
                  <input type="text" name="title" className="form-control" value={formData.title} onChange={handleChange} />
                </div>
                <div className="col-12">
                  <label className="form-label">Description</label>
                  <textarea name="description" className="form-control" rows="3" value={formData.description} onChange={handleChange}></textarea>
                </div>
                <div className="col-md-6">
                  <label className="form-label">Priority</label>
                  <select name="priority" className="form-select" value={formData.priority} onChange={handleChange}>
                    <option>Select</option>
                    <option>Low</option>
                    <option>Medium</option>
                    <option>High</option>
                  </select>
                </div>
                <div className="col-md-6">
                  <label className="form-label">Status</label>
                  <select name="status" className="form-select" value={formData.status} onChange={handleChange}>
                    <option>Ready</option>
                    <option>In Progress</option>
                    <option>Done</option>
                  </select>
                </div>
                <div className="col-md-6">
                  <label className="form-label">Due Date</label>
                  <input type="date" name="dueDate" className="form-control" value={formData.dueDate} onChange={handleChange} />
                </div>

                <div className="col-md-6 mb-2">
                  <label className="form-label">Project List</label>
                  <select
                    className="form-select"
                    name="projectName"
                    value={formData.projectName}
                    onChange={handleChange}
                  >
                    <option value="">-- Select Project --</option>
                    {projects.map((project) => (
                      <option key={project.id} value={project.projName}>
                        {project.projName}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="col-md-6">
                  <label className="form-label">Estimate (Days)</label>
                  <input type="number" name="estimate" className="form-control" value={formData.estimate} onChange={handleChange} />
                </div>

                <div className="col-md-6 mb-2">
                  <label className="form-label">People List</label>
                  <select
                    className="form-select"
                    name="personName"
                    value={formData.personName}
                    onChange={handleChange}
                  >
                    <option value="">-- Select Person --</option>
                    {peoples.map((person) => (
                      <option key={person.id} value={person.name}>
                        {person.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="col-md-6">
                  <label className="form-label">Size</label>
                  <input type="text" name="size" className="form-control" value={formData.size} onChange={handleChange} />
                </div>
                <div className="col-md-6">
                  <label className="form-label">Release</label>
                  <input type="text" name="release" className="form-control" value={formData.release} onChange={handleChange} />
                </div>
                <div className="col-12">
                  <label className="form-label">Sprint</label>
                  <input type="text" name="sprint" className="form-control" value={formData.sprint} onChange={handleChange} />
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
                          <strong>{c.commentedBy}</strong>
                          <small className="text-muted">{c.createdAt ? new Date(c.createdAt).toLocaleString() : `ID: ${c.id}`}</small>
                        </div>
                        <p className="mb-1">{c.comment}</p>
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
              <button type="submit" className="btn btn-primary btn-sm" onClick={handleSave}>Save</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CardEdit;
