
import { useState } from "react";
import Profile from "./Profile";
import logo from "../assets/tasklogo.png";
import { BsThreeDotsVertical, BsQuestionCircle } from "react-icons/bs";
import { IoMdSearch } from "react-icons/io";  
import { Navigate, useNavigate } from "react-router-dom";

const Header = () => {
  const [showSearch, setShowSearch] = useState(false);
  const [showCalendly, setShowCalendly] = useState(false);
  const navigate = useNavigate()
  
  const openCalendly = () => {
    setShowCalendly(true)
    navigate("/support")  
  }
  
  return (
    <nav className="navbar" style={{ backgroundColor: "#003366" }}>
      <div className="container-fluid d-flex justify-content-between align-items-center">
        <a
          className="navbar-brand text-white fw-bold d-flex align-items-center"
          href="#"
        >
          <img
            src={logo}
            alt="Logo"
            width="40"
            height="40"
            className="d-inline-block align-text-top me-2 rounded-circle"
          />
          Tasker
        </a>
        <div className="d-flex align-items-center position-relative">
          <button onClick ={()=> openCalendly()} className="btn bg-transparent border-0 text-light p-2 me-2">
            <BsQuestionCircle size={22} />  
          </button>
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
          <button className="btn bg-transparent border-0 text-light p-0 ms-2 me-2">
            <BsThreeDotsVertical size={22} />
          </button>
          <Profile />
        </div>
      </div>
    </nav>
  );
};

export default Header;
