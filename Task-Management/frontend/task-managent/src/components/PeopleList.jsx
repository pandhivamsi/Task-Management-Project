import React, { useState, useEffect, useRef } from 'react';
import { BsThreeDotsVertical } from "react-icons/bs";

const PeopleList = () => {
  const [showMenu, setShowMenu] = useState(false);
  const [showTable, setShowTable] = useState(false);
  const [peoples, setPeoples] = useState([]);
  const menuRef = useRef(null);

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

  const handlePeoplesClick = () => {
    if (!showTable) {
      fetch("http://localhost:8081/peoples")
        .then((res) => res.json())
        .then((data) => setPeoples(data))
        .catch((err) => console.error(err));
    }
    setShowTable(true);
  };

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
          <button className="dropdown-item" onClick={handlePeoplesClick}>
            Peoples
          </button>
        </div>
      )}

      {showTable && (
        <div className="dropdown-menu show shadow mt-2" style={{
          position: "absolute",
          right: 0,
          maxHeight: "300px",
          overflowY: "auto",
          minWidth: "700px"
        }}>
          <h6 className="dropdown-header">Peoples List</h6>
          <table className="table table-large table-bordered m-0">
            <thead>
              <tr>
                <th>s.no</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Login ID</th>
                <th>Status</th>
                <th>Primary Role</th>
              </tr>
            </thead>
            <tbody>
              {peoples.map((person, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{person.firstName}</td>
                  <td>{person.lastName}</td>
                  <td>{person.loginId}</td>
                  <td>{person.status}</td>
                  <td>{person.primaryRole}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default PeopleList;
