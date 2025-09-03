import Profile from "./Profile";
import logo from '../assets/tasklogo.png'
import { BsThreeDotsVertical } from "react-icons/bs";

const Header = () => {
  return (
    <nav className="navbar" style={{ backgroundColor: "#003366" }}>
      <div className="container-fluid">
        <a className="navbar-brand text-white fw-bold" href="#">
           <img
            src={logo}
            alt="Logo"
            width="40"
            height="40"
            className="d-inline-block align-text-top me-2 rounded-circle"
          />
          Tasker
        </a>
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
