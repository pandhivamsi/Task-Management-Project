import React, { useState } from "react";
import { FaFilter } from "react-icons/fa";

const Filter = ({ onFiltersChange }) => {
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
    const empty = {
      Department: [],
      Role: [],
      Priority: [],
    };
    setFilters(empty);
    setDraftFilters(empty);
    if (onFiltersChange) {
      onFiltersChange(empty, []);
    }
  };

  const saveFilters = () => {
    setFilters({ ...draftFilters });
    if (onFiltersChange) {
      const applied = Object.entries(draftFilters)
        .flatMap(([category, values]) =>
          values.map((val) => `${category}: ${val}`)
        );
      onFiltersChange(draftFilters, applied);
    }
  };

  return (
    <>
      <button
        className="btn border rounded-pill shadow-sm text-dark bg-white fs-7 fw-bold d-flex align-items-center mt-3 px-3 py-1"
        type="button"
        data-bs-toggle="offcanvas"
        data-bs-target="#mainFilterOffcanvas"
        aria-controls="mainFilterOffcanvas"
      >
        <FaFilter className="me-2" />
        Filters
      </button>

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
          <button className="btn btn-link text-danger" onClick={clearFilters}>
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
                          checked={draftFilters[activeCategory]?.includes(
                            option
                          )}
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
              data-bs-dismiss="offcanvas"
            >
              Cancel
            </button>
            <button
              className="btn btn-primary"
              data-bs-dismiss="offcanvas"
              onClick={saveFilters}
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Filter;
