import React from "react";
import { CgProfile } from "react-icons/cg"; // import profile icon

const Profile = () => {
  return (
    <div className="dropdown">
      <button
        className="btn text-light bg-transparent ms-0"
        type="button"
        data-bs-toggle="dropdown"
        aria-expanded="false"
      >
        <CgProfile size={28} />
      </button>

      <ul className="dropdown-menu dropdown-menu-end dropdown-menu-dark shadow">
        <li className="px-3 py-2 border-bottom">
          <div className="d-flex align-items-center">
            <CgProfile size={32} className="me-2 text-primary" />
            <div>
              <h6 className="mb-0">John Doe</h6>
              <small className="text-white-50">Admin</small>
            </div>
          </div>
        </li>
        <li>
          <a className="dropdown-item ms-0" href="#">
            Edit Details
          </a>
        </li>
        <li>
          <a className="dropdown-item ms-0" href="#">
            Reset Password
          </a>
        </li>
        <li>
          <hr className="dropdown-divider border-secondary-subtle" />
        </li>
        <li>
          <a className="dropdown-item text-danger ms-0" href="#">
            Log Out
          </a>
        </li>
      </ul>
    </div>
  );
};

export default Profile;
