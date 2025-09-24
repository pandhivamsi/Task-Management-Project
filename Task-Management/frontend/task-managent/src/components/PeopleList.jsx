import React, { useState, useEffect, useRef } from 'react';
import { BsThreeDotsVertical } from "react-icons/bs";
import { useNavigate } from 'react-router-dom';

const PeopleList = () => {
  const [showMenu, setShowMenu] = useState(false);
  const [showTable, setShowTable] = useState(false);
  const [showProjTable,setProjTable] = useState(false);
  const menuRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setShowMenu(false);
        setShowTable(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  return (
    <div ref={menuRef} className="position-relative ms-3">
      <button className="btn btn-link text-white p-0" onClick={(e) => {
        e.stopPropagation();
        setShowMenu(prev => !prev);
      }}>
        <BsThreeDotsVertical size={22} />
      </button>

      {showMenu && (
        <div className="dropdown-menu show shadow" style={{ position: "absolute", right: 0 }}>
          <button className="dropdown-item" onClick={()=>setShowTable(true)}>
            Peoples
          </button>
          <hr />
          <button className="dropdown-item" onClick={()=>setProjTable(true)}>
            Projects
          </button>
        </div>
        
      )}
      {showTable && navigate("/peoplelist")}
      {showProjTable && navigate("/projectlist")}
    </div>
  );
};

export default PeopleList;
