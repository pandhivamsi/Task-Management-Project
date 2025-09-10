import React from "react";

const CardEdit = ({ user, onClose }) => {
  return (
    <div
      className="modal show d-block"
      tabIndex="-1"
      style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
    >
      <div className="modal-dialog modal-xl">
        <div className="modal-content">
          {/* HEADER */}
          <div className="modal-header bg-primary text-white">
            <h5 className="modal-title">
              {user.taskId}: {user.title}
            </h5>
            <button
              type="button"
              className="btn-close btn-close-white"
              onClick={onClose}
            ></button>
          </div>

          {/* BODY */}
          <div className="modal-body">
            {/* Tabs */}
            <ul className="nav nav-tabs mb-3">
              <li className="nav-item">
                <button className="nav-link active">Card Details</button>
              </li>
              <li className="nav-item">
                <button className="nav-link">Comments</button>
              </li>
            </ul>

            {/* FORM */}
            <form className="row g-3">
              <div className="col-12">
                <label className="form-label">Title</label>
                <input
                  type="text"
                  className="form-control"
                  defaultValue={user.title}
                />
              </div>

              <div className="col-12">
                <label className="form-label">Description</label>
                <textarea
                  className="form-control"
                  rows="3"
                  defaultValue={user.description}
                ></textarea>
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
                <input
                  type="date"
                  className="form-control"
                  defaultValue={user.dueDate}
                />
              </div>

              <div className="col-md-6">
                <label className="form-label">Estimate (Days)</label>
                <input
                  type="number"
                  className="form-control"
                  defaultValue={user.estimate}
                />
              </div>

              <div className="col-md-6">
                <label className="form-label">Size</label>
                <input
                  type="text"
                  className="form-control"
                  defaultValue={user.size}
                />
              </div>

              <div className="col-md-6">
                <label className="form-label">Release</label>
                <input
                  type="text"
                  className="form-control"
                  defaultValue={user.release}
                />
              </div>

              <div className="col-12">
                <label className="form-label">Sprint</label>
                <input
                  type="text"
                  className="form-control"
                  defaultValue={user.sprint}
                />
              </div>
            </form>
          </div>

          {/* FOOTER */}
          <div className="modal-footer">
            <button className="btn btn-secondary btn-sm" onClick={onClose}>
              Cancel
            </button>
            <button className="btn btn-primary btn-sm">Save</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardEdit;
