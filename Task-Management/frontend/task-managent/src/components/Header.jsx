import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import Profile from "./Profile";
import Projectlist from "./Projectlist";
import logo from "../assets/tasklogo.png";
import { BsQuestionCircle } from "react-icons/bs";
import { IoMdSearch } from "react-icons/io";
import PeopleList from "./PeopleList";
import { ThemeContext } from "./ThemeContext";

const Header = ({ cards, onSearchSelect }) => {
  const [searchMode, setSearchMode] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const { theme } = useContext(ThemeContext);
  const navigate = useNavigate();

  const openCalendly = () => {
    navigate("/support");
  };

  const isLoggedIn = sessionStorage.getItem("isLoggedIn");

  const matchedCards =
    searchValue.trim() === ""
      ? []
      : cards.filter((c) =>
          c.title.toLowerCase().includes(searchValue.toLowerCase())
        );

  return (
    <nav
      className="navbar px-4 fixed-top"
      style={{ backgroundColor: theme.header }}
    >
      <div className="container-fluid d-flex align-items-center justify-content-between">
        
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
          {isLoggedIn && <Projectlist />}
        </div>

        
        {isLoggedIn && (
          <div className="d-flex align-items-center position-relative">
            
            <button
              onClick={openCalendly}
              className="btn bg-transparent border-0 text-light p-2 me-1"
            >
              <BsQuestionCircle size={22} />
            </button>

          
            {searchMode ? (
              <div className="position-relative">
                <input
                  type="text"
                  className="form-control form-control-sm"
                  placeholder="Search..."
                  autoFocus
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
                  style={{ width: "200px" }}
                />
  
                {matchedCards.length > 0 && (
                  <ul
                    className="list-group position-absolute mt-1"
                    style={{ width: "200px", zIndex: 2000 }}
                  >
                    {matchedCards.map((card) => (
                      <li
                        key={card.id}
                        className="list-group-item list-group-item-action"
                        style={{ cursor: "pointer" }}
                        onClick={() => {
                          onSearchSelect(card);
                          setSearchValue("");
                          setSearchMode(false);
                        }}
                      >
                        {card.title}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ) : (
              <button
                className="btn bg-transparent border-0 text-light p-2 me-1"
                onClick={() => setSearchMode(true)}
              >
                <IoMdSearch size={22} />
              </button>
            )}

            <PeopleList />
            <Profile />
          </div>
        )}
      </div>
    </nav>
  );
};

export default Header;
