import Header from './Header'
import AddTask from './AddTask'
import React, { useContext, useEffect, useState } from "react";
import { FaFilter } from "react-icons/fa";
import Filter from './Filter';
import KanbanBoard from './KanbanBoard';
import { ThemeContext } from './ThemeContext';
import axios from 'axios';

const Dashboard = () => {
  const [selectedOption, setSelectedOption] = useState("Select cards");
  const[projects,setProjects]=useState("");
  const[peoples,setPeoples]=useState("");
  const { theme } = useContext(ThemeContext);

  const handleSelect = (option) => {
    setSelectedOption(option);
  };
  useEffect(()=>{
    axios.get("http://localhost:8080/projects")
    .then((res)=>{
      setProjects(res.data)
      
    })
    .catch((err)=>console.error(err));
  },[]);

    useEffect(()=>{
    axios.get("http://localhost:8081/peoples")
    .then((res)=>{
      setPeoples(res.data)
      
    })
    .catch((err)=>console.error(err));
  },[]);

  return (
    <div style={{ backgroundColor: theme.dashboard, minHeight: "100vh" }}>
      <Header />
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
        <AddTask  projects={projects} peoples={peoples}/>
        <Filter />
      </div>
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
        <KanbanBoard />
      </div>
    </div>
  );
};

export default Dashboard;
