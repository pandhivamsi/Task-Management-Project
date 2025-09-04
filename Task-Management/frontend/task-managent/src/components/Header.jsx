import React from "react";
import logo from "../assets/tasklogo.png";
import { BsThreeDotsVertical } from "react-icons/bs";
import Profile from "./Profile";
import Projectlist from "./Projectlist"; // Import the dropdown

const Header = () => {
  return (
    <nav className="navbar px-4" style={{ backgroundColor: "#003366" }}>
      <div className="container-fluid d-flex align-items-center justify-content-between">

        {/* LEFT SIDE: Logo + Projectlist */}
        <div className="d-flex align-items-center gap-3">
          <a className="navbar-brand text-white fw-bold d-flex align-items-center ms-0" href="#">
            <img
              src={logo}
              alt="Logo"
              width="40"
              height="40"
              className="  rounded-circle "
            />
            Tasky
          </a>

          {/* Projectlist dropdown inside header, after logo */}
          <Projectlist />
        </div>

        {/* RIGHT SIDE: Dots + Profile */}
        <div className="d-flex align-items-center">
          <button className="btn bg-transparent border-0 text-light p-0 me-2">
            <BsThreeDotsVertical size={22} />
          </button>
          <Profile />
        </div>
      </div>
    </nav>
  );
};

export default Header;
