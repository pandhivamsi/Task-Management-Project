import React, { useState } from "react";
import { FaFilter } from "react-icons/fa";

const Filter = () => {
  const categories = [
    { name: "Status", options: ["Open", "In Progress", "Closed"] },
    { name: "Priority", options: ["High", "Medium", "Low"] },
  ];

  const [activeCategory, setActiveCategory] = useState(null);
  const [filters, setFilters] = useState({
    Status: [],
    Priority: [],
  });
  const openSubFilter = (cat) => {
    setActiveCategory(cat);
    const subOffcanvas = new window.bootstrap.Offcanvas(
      document.getElementById("subFilterOffcanvas")
    );
    subOffcanvas.show();
  };

  const openMainFilter = () => {
    const mainOffcanvas = new window.bootstrap.Offcanvas(
      document.getElementById("mainFilterOffcanvas")
    );
    mainOffcanvas.show();
  };

  const handleCheckboxChange = (category, option) => {
    setFilters((prev) => {
      const updated = { ...prev };
      if (updated[category].includes(option)) {
        updated[category] = updated[category].filter((o) => o !== option);
      } else {
        updated[category] = [...updated[category], option];
      }
      return updated;
    });
    setSelectedOption(option);
  };

  return (
    <>
      <div>
        <button
          className="btn border-0 text-dark bg-transparent fs-7 fw-bold me-2 mt-0 py-1"
          type="button"
          data-bs-toggle="offcanvas"
          data-bs-target="#mainFilterOffcanvas"
          aria-controls="mainFilterOffcanvas"
        >
          <FaFilter className="me-2" />
          Filters
        </button>
      </div>
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
          <h5
            className="offcanvas-title ms-auto me-0"
            id="subFilterOffcanvasLabel"
          >
            {activeCategory ? activeCategory.name : "Options"}
          </h5>
          <button
            type="button"
            className="btn-close text-reset"
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
    </>
  );
};

export default Filter;
