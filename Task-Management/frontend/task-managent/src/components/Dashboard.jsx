import React, { useState } from "react";
import { BsFilterRight } from "react-icons/bs";

const Dashboard = () => {
  const [selectedOption, setSelectedOption] = useState("Select cards");

  const handleSelect = (option) => {
    setSelectedOption(option);
  };

  return (
    <div className="d-flex justify-content-between align-items-center mt-3 px-3 ">
      <div className="dropdown">
        <button
          className="btn dropdown-toggle border border-light rounded-pill shadow-none text-dark bg-transparent fs-6 fw-bold" 
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
       <div className="me-2px">
          <button className="btn  border border-light rounded-pill shadow-none text-dark bg-transparent fs-6  fw-bold me-5 "><BsFilterRight className="me-2" /> 
          <span>Filter</span></button>
        </div>
    </div>
    
  );
};

export default Dashboard;
