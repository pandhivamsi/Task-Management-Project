import React, { useContext, useEffect, useState } from "react";
import Header from './Header';
import AddTask from './AddTask';
import Filter from './Filter';
import KanbanBoard from './KanbanBoard';
import StandupWizard from './StandupWizard';
import ProfileRow from './ProfileRow';
import { ThemeContext } from './ThemeContext';
import { FaTimes } from "react-icons/fa";
import AppliedFilters from "./AppliedFilters";
import axios from 'axios';

const Dashboard = () => {
  const [selectedOption, setSelectedOption] = useState("Select cards");
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showUsers, setShowUsers] = useState(false);
  const [filters, setFilters] = useState(null);
  const [projects, setProjects] = useState("");
  const [peoples, setPeoples] = useState("");
  const [appliedFiltersList, setAppliedFiltersList] = useState([]);

  const { theme } = useContext(ThemeContext);

  const handleSelect = (option) => {
    setSelectedOption(option);
  };

  useEffect(() => {
    axios.get("http://localhost:8080/projects")
      .then((res) => {
        setProjects(res.data);
      })
      .catch((err) => console.error(err));
  }, []);

  useEffect(() => {
    axios.get("http://localhost:8081/peoples")
      .then((res) => {
        setPeoples(res.data);
      })
      .catch((err) => console.error(err));
  }, []);

  const handleExitFullscreen = () => {
    setIsFullscreen(false);
    setShowUsers(false);
  };

  useEffect(() => {
    const handleEsc = (event) => {
      if (event.key === "Escape") {
        handleExitFullscreen();
      }
    };

    window.addEventListener("keydown", handleEsc);

    return () => {
      window.removeEventListener("keydown", handleEsc);
    };
  }, []);

  return (
    <div style={{ backgroundColor: theme.dashboard, minHeight: "80vh" }}>
      {isFullscreen && (
        <div className="d-flex justify-content-between align-items-center bg-light p-2">
          <div className="d-flex align-items-center ms-5">
            <button
              className="btn btn-success mt-2 rounded-pill px-4"
              onClick={() => setShowUsers(true)}
            >
              Start
            </button>
            {showUsers && <ProfileRow />}
          </div>
          <button
            className="btn btn-outline-dark shadow-lg btn-lg rounded-pill me-2 px-2 py-1"
            onClick={handleExitFullscreen}
          >
            <FaTimes />
          </button>
        </div>
      )}

      {!isFullscreen && (
        <div>
          <Header />

          <div className="d-flex justify-content-between align-items-center mt-2 px-2">
            <div className="d-flex align-items-center ms-1">
              <div className="dropdown ms-1">
                <button
                  className="btn dropdown-toggle border rounded-pill shadow-sm bg-white text-dark bg-transparent fs-7 fw-bold px-4 ms-1"
                  type="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  {selectedOption}
                </button>
                <ul className="dropdown-menu">
                  <li>
                    <button
                      className="dropdown-item"
                      onClick={() => handleSelect("All cards")}
                    >
                      All cards
                    </button>
                  </li>
                  <li>
                    <button
                      className="dropdown-item"
                      onClick={() => handleSelect("My cards")}
                    >
                      My cards
                    </button>
                  </li>
                </ul>
              </div>

              <AppliedFilters
                appliedFiltersList={appliedFiltersList}
                onClear={() => {
                  setFilters({ Department: [], Role: [], Priority: [] });
                  setAppliedFiltersList([]);
                }}
              />
            </div>
          </div>

          <AddTask projects={projects} peoples={peoples} />

          <StandupWizard setIsFullscreen={setIsFullscreen} />

          <Filter
            onFiltersChange={(raw, applied) => {
              setFilters(raw);
              setAppliedFiltersList(applied);
            }}
          />
        </div>
      )}

      <div className="m-3 p-3 border">
        <div
          className="p-2 text-white"
          style={{ backgroundColor: theme.header }}
        >
          <input
            className="p-0 ms-3 bg-transparent border-0 text-white"
            type="text"
            value={selectedOption}
            readOnly
          />
        </div>

        <KanbanBoard />
      </div>
    </div>
  );
};

export default Dashboard;
