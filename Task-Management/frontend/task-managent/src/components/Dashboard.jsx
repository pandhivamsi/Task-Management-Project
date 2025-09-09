import Header from './Header'
import AddTask from './AddTask'
import React, { useState } from "react";
import { FaFilter } from "react-icons/fa";
import Filter from './Filter';
import KanbanBoard from './KanbanBoard';

const Dashboard = () => {
  const [selectedOption, setSelectedOption] = useState("Select cards");

  const handleSelect = (option) => {
    setSelectedOption(option);
  };

  return (
    <div>
        <Header/>
      <div className="d-flex justify-content-between align-items-center mt-2 px-2">
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
        <AddTask/>
        <Filter/>  
    </div>
    <div className="bg-light m-3 p-3 border" style={{ minHeight: "90vh" }}>
        <div className="bg-primary p-2 text-white">
          <input
            className="p-0 ms-3 bg-transparent border-0 text-white"
            type="text"
            value={selectedOption}
            readOnly
          />
        </div>
        <KanbanBoard/>
      </div>
    </div>
  );
};

export default Dashboard;