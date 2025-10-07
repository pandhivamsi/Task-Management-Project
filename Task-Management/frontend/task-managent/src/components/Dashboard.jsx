import React, { useContext, useEffect, useState } from "react";
import Header from "./Header";
import AddTask from "./AddTask";
import Filter from "./Filter";
import KanbanBoard from "./KanbanBoard";
import StandupWizard from "./StandupWizard";
import ProfileRow from "./ProfileRow";
import { ThemeContext } from "./ThemeContext";
import { FaTimes } from "react-icons/fa";
import AppliedFilters from "./AppliedFilters";
import { useAppData } from "./DataContext";
import CardEdit from "./CardEdit";

const Dashboard = () => {
  const [selectedOption, setSelectedOption] = useState("All Cards");
  const [isFullscreen, setIsFullscreen] = useState(false);
  const { cards, setCards, peoples, fetchProjectsAndPeoples, fetchCards } = useAppData();
  const [loading, setLoading] = useState(true);
  const [showUsers, setShowUsers] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [filters, setFilters] = useState({ Department: [], Role: [], Priority: [] });
  const [appliedFiltersList, setAppliedFiltersList] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCard, setSelectedCard] = useState(null);
  const { theme } = useContext(ThemeContext);

  const handleSelect = (option) => setSelectedOption(option);

  const handleExitFullscreen = () => {
    setIsFullscreen(false);
    setShowUsers(false);
    setSelectedUserId(null);

    if (document.fullscreenElement) {
      document.exitFullscreen().catch(err => console.error(err));
    }
  };

  // Fetch dashboard data
  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      try {
        await Promise.all([fetchProjectsAndPeoples(), fetchCards()]);
      } catch (err) {
        console.error("Failed to fetch dashboard data:", err);
      } finally {
        setLoading(false);
      }
    };

    if (cards.length === 0 || peoples.length === 0) {
      loadData();
    } else {
      setLoading(false);
    }
  }, [cards.length, peoples.length, fetchProjectsAndPeoples, fetchCards]);

  // Handle Esc key and fullscreen change
  useEffect(() => {
    const handleEsc = (event) => {
      if (event.key === "Escape") {
        handleExitFullscreen();
      }
    };

    const handleFullscreenChange = () => {
      if (!document.fullscreenElement) {
        handleExitFullscreen();
      }
    };

    window.addEventListener("keydown", handleEsc);
    document.addEventListener("fullscreenchange", handleFullscreenChange);

    return () => {
      window.removeEventListener("keydown", handleEsc);
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
    };
  }, []);

  // Spinner while loading
  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <div className="text-center">
          <div className="spinner-border text-primary" role="status"></div>
          <p className="mt-2 text-muted">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  // Filtered cards
  let filteredCards = cards.filter((card) => {
  // Search & filter logic
  const matchDepartment = filters.Department.length === 0 || filters.Department.includes(card.department);
  const matchRole = filters.Role.length === 0 || filters.Role.includes(card.role);
  const matchPriority = filters.Priority.length === 0 || filters.Priority.includes(card.priority);
  const matchSearch = searchQuery === "" || card.title.toLowerCase().includes(searchQuery.toLowerCase());

  let matchOption = true;
  if (selectedOption === "My cards") {
    const userId = sessionStorage.getItem("id"); 
    matchOption = card.person_id == userId || card.personName === peoples.find(p => p.id == userId)?.name;
  }

  return matchDepartment && matchRole && matchPriority && matchSearch && matchOption;
});


  if (selectedUserId) {
    filteredCards = filteredCards.filter((card) =>
      card.person_id ? card.id === selectedUserId : card.personName === peoples.find((p) => p.id === selectedUserId)?.name
    );
  }

  return (
    <div style={{ backgroundColor: theme.dashboard, minHeight: "80vh" }}>
      {isFullscreen ? (
        <div className="d-flex justify-content-between align-items-center bg-light p-2">
          <div className="d-flex align-items-center ms-5">
            <button className="btn btn-success mt-2 rounded-pill px-4" onClick={() => setShowUsers(true)}>
              Start
            </button>
            {showUsers && <ProfileRow activeUserId={selectedUserId} onUserSelect={setSelectedUserId} />}
          </div>
          <button className="btn btn-outline-dark shadow-lg btn-lg rounded-pill me-2 px-2 py-1" onClick={handleExitFullscreen}>
            <FaTimes />
          </button>
        </div>
      ) : (
        <>
          <Header cards={cards} onSearchSelect={(card) => setSelectedCard(card)} />
          <div className="d-flex justify-content-between align-items-center mt-5 px-2 pt-4">
            <div className="d-flex align-items-center ms-1">
              <div className="dropdown ms-1">
                <button className="btn dropdown-toggle border rounded-pill shadow-sm bg-white text-dark bg-transparent fs-7 fw-bold px-4 ms-1" type="button" data-bs-toggle="dropdown">
                  {selectedOption}
                </button>
                <ul className="dropdown-menu">
                  <li><button className="dropdown-item" onClick={() => handleSelect("All cards")}>All cards</button></li>
                  <li><button className="dropdown-item" onClick={() => handleSelect("My cards")}>My cards</button></li>
                </ul>
              </div>
              <AppliedFilters
                appliedFiltersList={appliedFiltersList}
                onClear={() => { setFilters({ Department: [], Role: [], Priority: [] }); setAppliedFiltersList([]); }}
              />
            </div>

            <AddTask />
            <StandupWizard setIsFullscreen={setIsFullscreen} />
            <Filter onFiltersChange={(raw, applied) => { setFilters(raw); setAppliedFiltersList(applied); }} />
          </div>
        </>
      )}

      <div className="m-3 p-3 border">
        <div className="p-2 text-white" style={{ backgroundColor: theme.header }}>
          <input className="p-0 ms-3 bg-transparent border-0 text-white" type="text" value={selectedOption} readOnly />
        </div>
        <KanbanBoard setCards={setCards} cards={filteredCards} />
      </div>

      {selectedCard && (
        <CardEdit
          card={selectedCard}
          onClose={() => setSelectedCard(null)}
          onSave={(updated) => {
            setCards((prev) => prev.map((c) => (c.id === updated.id ? updated : c)));
            setSelectedCard(null);
          }}
        />
      )}
    </div>
  );
};

export default Dashboard;
