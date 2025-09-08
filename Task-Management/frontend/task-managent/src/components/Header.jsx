import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Profile from "./Profile";
import Projectlist from "./Projectlist";
import logo from "../assets/tasklogo.png";
import {  BsQuestionCircle } from "react-icons/bs";
import { IoMdSearch } from "react-icons/io";
import PeopleList from "./PeopleList";

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
        <div className="d-flex align-items-center gap-3">
          <a className="navbar-brand text-white fw-bold d-flex align-items-center ms-0" href="#">
            <img src={logo} alt="Logo" width="40" height="40" className="rounded-circle" />
            Tasker
          </a>
          <Projectlist />
        </div>
        <div className="d-flex align-items-center position-relative">
          <button onClick={openCalendly} className="btn btn-link text-white p-2 me-2">
            <BsQuestionCircle size={22} />
          </button>
          <div
            className="d-flex align-items-center"
            onMouseEnter={() => setShowSearch(true)}
            onMouseLeave={() => setShowSearch(false)}
          >
            {showSearch ? (
              <div className="input-group input-group-sm" style={{ width: "200px" }}>
                <span className="input-group-text bg-white border-0">
                  <IoMdSearch size={18} />
                </span>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search..."
                  autoFocus
                />
              </div>
            ) : (
              <IoMdSearch size={22} className="text-white cursor-pointer" />
            )}
          </div>
          <PeopleList/>
          <Profile />
        </div>
      </div>
    </nav>
  );
};

export default Header;
