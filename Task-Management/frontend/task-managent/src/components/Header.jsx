import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Profile from "./Profile";
import Projectlist from "./Projectlist";
import logo from "../assets/tasklogo.png";
import { BsThreeDotsVertical, BsQuestionCircle } from "react-icons/bs";
import { IoMdSearch } from "react-icons/io";

const Header = () => {
  const [showSearch, setShowSearch] = useState(false);
  const [showCalendly, setShowCalendly] = useState(false);
  const navigate = useNavigate();

  const openCalendly = () => {
    setShowCalendly(true);
    navigate("/support");
  };

  return (
    <nav className="navbar px-4 sticky-top " style={{ backgroundColor: "#003366" }}>
      <div className="container-fluid d-flex align-items-center justify-content-between">
        {/* Left: Logo + Project List */}
        <div className="d-flex align-items-center gap-3">
          <a
            className="navbar-brand text-white fw-bold d-flex align-items-center ms-0"
            href="#"
          >
            <img
              src={logo}
              alt="Logo"
              width="40"
              height="40"
              className="rounded-circle"
            />
            Tasker
          </a>
          <Projectlist />
        </div>

        {/* Right: Support, Search, Profile */}
        <div className="d-flex align-items-center position-relative">
          {/* Support Button */}
          <button
            onClick={openCalendly}
            className="btn bg-transparent border-0 text-light p-2 me-1"
          >
            <BsQuestionCircle size={22} />
          </button>

          {/* Search Bar */}
          <div
            className="d-flex align-items-center"
            onMouseEnter={() => setShowSearch(true)}
            onMouseLeave={() => setShowSearch(false)}
          >
            {showSearch ? (
              <div className="input-group" style={{ width: "200px" }}>
                <span className="input-group-text bg-white border-0">
                  <IoMdSearch size={18} />
                </span>
                <input
                  type="text"
                  placeholder="Search..."
                  className="form-control form-control-sm"
                  autoFocus
                />
              </div>
            ) : (
              <IoMdSearch size={22} className="text-white cursor-pointer" />
            )}
          </div>

          {/* Menu + Profile */}
          <button className="btn bg-transparent border-0 text-light p-0 ms-2">
            <BsThreeDotsVertical size={22} />
          </button>
          <Profile />
        </div>
      </div>
    </nav>
  );
};

export default Header;
