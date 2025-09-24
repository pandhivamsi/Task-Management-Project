import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

// Create the context
const AppDataContext = createContext();

// Custom hook for consuming
export const useAppData = () => useContext(AppDataContext);

// Provider
export const AppDataProvider = ({ children }) => {
  // Cards state
  const [cards, setCards] = useState([]);
  // Projects & people state
  const [projects, setProjects] = useState([]);
  const [peoples, setPeoples] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch all data
  const fetchCards = () => {
    axios
      .get("http://localhost:8080/cards")
      .then((res) => setCards(res.data))
      .catch((err) => console.error(err));
  };

  const fetchProjectsAndPeoples = async () => {
    try {
      const [projRes, peopleRes] = await Promise.all([
        axios.get("http://localhost:8080/projects"),
        axios.get("http://localhost:8080/peoples"),
      ]);
      setProjects(projRes.data);
      setPeoples(peopleRes.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCards();
    fetchProjectsAndPeoples();
  }, []);

  return (
    <AppDataContext.Provider
      value={{
        cards,
        setCards,
        fetchCards,
        projects,
        setProjects, // ✅ Add this
        peoples,
        loading,
      }}
    >
      {children}
    </AppDataContext.Provider>
  );
};
