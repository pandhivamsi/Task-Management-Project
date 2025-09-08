import React, { useState } from "react";
import { FaFilter } from "react-icons/fa";
import Header from "./Header";

const Dashboard = () => {
  const [selectedOption, setSelectedOption] = useState("Select cards");
  const [filters, setFilters] = useState({
    Department: [],
    Role: [],
    Priority: [],
  });
  const [draftFilters, setDraftFilters] = useState({
    Department: [],
    Role: [],
    Priority: [],
  });
  const [activeCategory, setActiveCategory] = useState(null);

  const categories = [
    { name: "Department", options: ["HR", "Engineering", "Sales"] },
    { name: "Role", options: ["Manager", "Developer", "Intern"] },
    { name: "Priority", options: ["High", "Medium", "Low"] },
  ];

  const handleSelect = (option) => {
    setSelectedOption(option);
  };

  const handleCheckboxChange = (category, value) => {
    setDraftFilters((prev) => {
      const updated = { ...prev };
      if (updated[category].includes(value)) {
        updated[category] = updated[category].filter((v) => v !== value);
      } else {
        updated[category] = [...updated[category], value];
      }
      return updated;
    });
  };

  const clearFilters = () => {
    setDraftFilters({
      Department: [],
      Role: [],
      Priority: [],
    });
  };

  const openOffcanvas = () => {
    setDraftFilters({ ...filters }); // load current filters into draft
  };

  const saveFilters = () => {
    setFilters({ ...draftFilters }); // apply draft filters
  };

  const appliedFiltersList = Object.entries(filters)
    .flatMap(([category, values]) => values.map((val) => `${category}: ${val}`));

  return (
    <div>
      <Header />

      <div className="d-flex justify-content-between align-items-center mt-2 px-2">
        <div className="d-flex align-items-center">

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

          {appliedFiltersList.length > 0 && (
            <div
              className="d-flex align-items-center border rounded-pill px-2 bg-light ms-2"
              style={{
                maxWidth: "420px",
                overflowX: "auto",
                whiteSpace: "nowrap",
                scrollbarWidth: "none",
              }}
              onWheel={(e) => {
                e.currentTarget.scrollLeft += e.deltaY;
              }}
            >
              <style>
                {`
                  div::-webkit-scrollbar {
                    display: none;
                  }
                `}
              </style>
              <span className="small text-muted me-2 flex-grow-1">
                Filter: {appliedFiltersList.join(", ")}
              </span>
              <button
                className="btn-close btn-sm flex-shrink-0"
                aria-label="Clear filters"
                onClick={() =>
                  setFilters({ Department: [], Role: [], Priority: [] })
                }
              ></button>
            </div>
          )}
        </div>

        <button
          className="btn border rounded-pill shadow-sm text-dark bg-transparent fs-7 fw-bold me-2 mt-0 py-1"
          type="button"
          data-bs-toggle="offcanvas"
          data-bs-target="#mainFilterOffcanvas"
          aria-controls="mainFilterOffcanvas"
          onClick={openOffcanvas}
        >
          <FaFilter className="me-2" />
          Filters
        </button>
      </div>

      {/* Offcanvas */}
      <div
        className="offcanvas offcanvas-end w-25 mt-5"
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
            className="btn btn-link text-danger"
            onClick={clearFilters}
          >
            Clear Filters
          </button>
          <button
            type="button"
            className="btn-close text-reset"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          ></button>
        </div>

        <div className="offcanvas-body d-flex flex-column p-0">
          <div className="d-flex flex-grow-1">
            <div
              className="list-group flex-shrink-0 p-3"
              style={{ width: "180px" }}
            >
              {categories.map((cat) => (
                <button
                  key={cat.name}
                  className={`list-group-item list-group-item-action ${
                    activeCategory === cat.name ? "active" : ""
                  }`}
                  onClick={() => setActiveCategory(cat.name)}
                >
                  {cat.name}
                </button>
              ))}
            </div>

            <div className="flex-grow-1 ps-1">
              {activeCategory ? (
                <>
                  <h6>{activeCategory}</h6>
                  {categories
                    .find((c) => c.name === activeCategory)
                    ?.options.map((option) => (
                      <div className="form-check" key={option}>
                        <input
                          className="form-check-input"
                          type="checkbox"
                          id={`${activeCategory}-${option}`}
                          checked={draftFilters[activeCategory]?.includes(option)}
                          onChange={() =>
                            handleCheckboxChange(activeCategory, option)
                          }
                        />
                        <label
                          className="form-check-label"
                          htmlFor={`${activeCategory}-${option}`}
                        >
                          {option}
                        </label>
                      </div>
                    ))}
                </>
              ) : (
                <p className="text-muted">Select a category</p>
              )}
            </div>
          </div>

          <div className="p-3 border-top mt-auto d-flex justify-content-end">
            <button
              className="btn btn-secondary me-2"
              data-bs-dismiss="offcanvas"  // closes offcanvas automatically
            >
              Cancel
            </button>
            <button
              className="btn btn-primary"
              data-bs-dismiss="offcanvas"  // closes offcanvas automatically
              onClick={saveFilters}
            >
              Save
            </button>
          </div>
        </div>
      </div>

      {/* Example extra UI */}
      <div className="bg-primary w-80 h-25 p-2 text-white m-1 mx-4">
        <input
          className="p-1 mx-5 bg-transparent border-0 text-white"
          type="text"
          value={selectedOption}
          readOnly
        />
      </div>
    </div>
  );
};

export default Dashboard;
