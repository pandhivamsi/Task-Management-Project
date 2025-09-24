import React, { useEffect, useState } from "react";
import Card from "./Card";
import axios from "axios";

const KanbanBoard = () => {
const [cards,setCards]=useState([])

   useEffect(() => {
    axios
      .get("http://localhost:8080/cards")
      .then((res) => {
        setCards(res.data)
        console.log(res.data)})
      .catch((err) => console.error(err));
  }, []);
  const columns = [
    { name: "Ready", color: "#e3f2fd" },       
    { name: "In Progress", color: "#fff3cd" },  
    { name: "Done", color: "#d4edda" },         
  ];
  return (
    <div className="container mt-4  ">
      <div className="row g-3">
        
        {columns.map((col) => (
          <div className="col-md-4" key={col.name}>
            <div
              className="p-3 border rounded shadow-sm"
              style={{ backgroundColor: col.color, minHeight: "80vh" }}
            >
              <h5 className="text-center mb-3">{col.name}</h5>
              <div className="d-flex flex-column gap-3">
                {cards
                  .filter((user) => user.status === col.name)
                  .map((card) => (
                    <Card key={card.id} card={card} />
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
