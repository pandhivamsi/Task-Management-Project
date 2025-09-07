import Header from './Header'
import AddTask from './AddTask'
import React, { useState } from "react";
import { FaFilter } from "react-icons/fa";

const Dashboard = () => {
  const [selectedOption, setSelectedOption] = useState("Select cards");
  const [filters, setFilters] = useState({
    Department: [],
    Role: [],
    Priority: []
  });
  const [activeCategory, setActiveCategory] = useState(null);

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
    <div>
        <Header/>
        {/* <AddTask/>   */}
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

        {/* Filter Button */}
        <button
          className="btn border rounded-pill shadow-sm text-dark bg-transparent fs-7 fw-bold me-2 mt-0 py-1"
          type="button"
          data-bs-toggle="offcanvas"
          data-bs-target="#mainFilterOffcanvas"
          aria-controls="mainFilterOffcanvas"
        >
          <FaFilter className="me-2" />
          Filters
        </button>
      </div>

      {/* Main Filter Offcanvas */}
      <div
        className="offcanvas offcanvas-end"
        tabIndex="-1"
        id="mainFilterOffcanvas"
        aria-labelledby="mainFilterOffcanvasLabel"
      >
        <div className="offcanvas-header">
          <h5 className="offcanvas-title" id="mainFilterOffcanvasLabel">
            Filters
          </h5>
          <button
            type="button"
            className="btn-close text-reset"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          ></button>
        </div>
        <div className="offcanvas-body p-0">
          <ul className="list-group list-group-flush">
            {categories.map((cat) => (
              <li
                key={cat.name}
                className="list-group-item d-flex justify-content-between align-items-center"
                onClick={() => openSubFilter(cat)}
                style={{ cursor: "pointer" }}
              >
                {cat.name} <span>&gt;</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Sub Filter Offcanvas */}
      <div
        className="offcanvas offcanvas-end"
        tabIndex="-1"
        id="subFilterOffcanvas"
        aria-labelledby="subFilterOffcanvasLabel"
      >
        <div className="offcanvas-header">
          <button
            className="btn btn-link text-decoration-none ms-0"
            onClick={openMainFilter}
          >
            ◀ Back
          </button>
          <h5 className="offcanvas-title ms-auto me-0" id="subFilterOffcanvasLabel">
            {activeCategory ? activeCategory.name : "Options"}
          </h5>
          <button
            type="button"
            className="btn-close text-reset "
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          ></button>
        </div>
        <div className="offcanvas-body">
          {activeCategory &&
            activeCategory.options.map((option) => (
              <div className="form-check" key={option}>
                <input
                  className="form-check-input"
                  type="checkbox"
                  id={`${activeCategory.name}-${option}`}
                  checked={filters[activeCategory.name].includes(option)}
                  onChange={() =>
                    handleCheckboxChange(activeCategory.name, option)
                  }
                />
                <label
                  className="form-check-label"
                  htmlFor={`${activeCategory.name}-${option}`}
                >
                  {option}
                </label>
              </div>
            ))}
        </div>
      </div>

      {/* Main Content Area */}
      <div
        className="bg-light m-3 p-3 border"
        style={{ minHeight: "90vh" }}
      >
        <div className="bg-primary w-90 h-30 p-2 text-white mx-0 mt-0 ">
          <input
            className="p-0 mx-5 bg-transparent border-0 text-white"
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
