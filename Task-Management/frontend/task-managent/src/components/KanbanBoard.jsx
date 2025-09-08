import React, { useState } from "react";
import Card from "./Card";

const KanbanBoard = () => {
  const [users] = useState([
    { id: 1, name: "Alice", status: "Ready" },
    { id: 2, name: "Bob", status: "In Progress" },
    { id: 3, name: "Charlie", status: "Done" },
    { id: 4, name: "David", status: "Done" },
    { id: 5, name: "Vamsi", status: "In Progress" }
  ]);

  const columns = [
    { name: "Ready", color: "#e3f2fd" },       
    { name: "In Progress", color: "#fff3cd" },  
    { name: "Done", color: "#d4edda" },         
  ];

  return (
    <div className="container mt-4">
      <div className="row g-3">
        {columns.map((col) => (
          <div className="col-md-4" key={col.name}>
            <div
              className="p-3 border rounded shadow-sm"
              style={{ backgroundColor: col.color, minHeight: "80vh" }}
            >
              <h5 className="text-center mb-3">{col.name}</h5>
              <div className="d-flex flex-column gap-3">
                {users
                  .filter((user) => user.status === col.name)
                  .map((user) => (
                    <Card key={user.id} user={user} />
                  ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default KanbanBoard;
