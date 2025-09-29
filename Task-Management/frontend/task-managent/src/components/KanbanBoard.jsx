import React from "react";
import Card from "./Card";
import { useAppData } from "./DataContext";

const KanbanBoard = ({ cards, setCards }) => {
  const { selectedProject } = useAppData(); 

  const columns = [
    { name: "Ready", color: "#e3f2fd" },
    { name: "In Progress", color: "#fff3cd" },
    { name: "Done", color: "#d4edda" },
  ];

  const handleUpdateCard = (updatedCard) => {
    setCards((prev) =>
      prev.map((card) => (card.id === updatedCard.id ? updatedCard : card))
    );
  };

  const filteredCards = selectedProject
    ? cards.filter((card) => card.projectName === selectedProject)
    : cards;

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
                {filteredCards
                  .filter((card) => card.status === col.name)
                  .map((card) => (
                    <Card
                      key={card.id}
                      card={card}
                      handleUpdateCard={handleUpdateCard}
                    />
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
