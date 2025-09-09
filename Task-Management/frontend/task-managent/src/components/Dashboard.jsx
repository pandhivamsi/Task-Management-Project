import Header from './Header';
import AddTask from './AddTask';
import React, { useState, useContext } from "react";
import { FaFilter } from "react-icons/fa";
import Filter from './Filter';
import { ThemeContext } from "./ThemeContext";   // import theme context

const Dashboard = () => {
  const [selectedOption, setSelectedOption] = useState("Select cards");
  const [filters, setFilters] = useState({
    Department: [],
    Role: [],
    Priority: []
  });
  const [activeCategory, setActiveCategory] = useState(null);

  const { theme } = useContext(ThemeContext); // use theme from context

  const categories = [
    { name: "Department", options: ["HR", "Engineering", "Sales"] },
    { name: "Role", options: ["Manager", "Developer", "Intern"] },
    { name: "Priority", options: ["High", "Medium", "Low"] }
  ];

  const handleSelect = (option) => {
    setSelectedOption(option);
  };

  const handleCheckboxChange = (category, value) => {
    setFilters((prev) => {
      const updated = { ...prev };
      if (updated[category].includes(value)) {
        updated[category] = updated[category].filter((v) => v !== value);
      } else {
        updated[category] = [...updated[category], value];
      }
      return updated;
    });
  };

  const openMainFilter = () => {
    const mainCanvas = document.getElementById("mainFilterOffcanvas");
    const subCanvas = document.getElementById("subFilterOffcanvas");
    if (subCanvas) {
      const bsSub = window.bootstrap.Offcanvas.getInstance(subCanvas);
      if (bsSub) bsSub.hide();
    }
    if (mainCanvas) {
      const bsMain = window.bootstrap.Offcanvas.getOrCreateInstance(mainCanvas);
      bsMain.show();
    }
  };

  const openSubFilter = (category) => {
    setActiveCategory(category);
    const mainCanvas = document.getElementById("mainFilterOffcanvas");
    const subCanvas = document.getElementById("subFilterOffcanvas");
    if (mainCanvas) {
      const bsMain = window.bootstrap.Offcanvas.getInstance(mainCanvas);
      if (bsMain) bsMain.hide();
    }
    if (subCanvas) {
      const bsSub = window.bootstrap.Offcanvas.getOrCreateInstance(subCanvas);
      bsSub.show();
    }
  };

  return (
    <div style={{ backgroundColor: theme.dashboard, minHeight: "100vh" }}>
      {/* Header */}
      <Header />

      <div className="d-flex justify-content-between align-items-center mt-2 px-2">
        {/* Dropdown for selecting cards */}
        <div className="dropdown">
          <button
            className="btn dropdown-toggle border rounded-pill shadow-sm bg-white text-dark bg-transparent fs-7 fw-bold py-1"
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
        <AddTask />
        <Filter />
      </div>

      {/* Cards Section */}
      <div
        className="m-3 p-3 border"
        style={{ minHeight: "90vh", backgroundColor: theme.card }}
      >
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
      </div>
    </div>
  );
};

export default Dashboard;
