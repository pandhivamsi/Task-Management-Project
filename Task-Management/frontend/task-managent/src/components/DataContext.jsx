import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const AppDataContext = createContext();

export const useAppData = () => useContext(AppDataContext);

export const AppDataProvider = ({ children }) => {
  const [cards, setCards] = useState([]);
  const [projects, setProjects] = useState([]);
  const [peoples, setPeoples] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedProject, setSelectedProject] = useState("");
  const [authError, setAuthError] = useState(false); 

  const API_BASE = "http://localhost:8080/auth";

  const getAuthHeaders = () => {
    const token = sessionStorage.getItem("token");
    return {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
  };

  const handleAuthError = (err) => {
    if (err.response && err.response.status === 401) {
      setAuthError(true); 
      sessionStorage.clear();
    } else {
      console.error(err);
    }
  };

  const fetchCards = async () => {
    try {
      const res = await axios.get(`${API_BASE}/cards`, getAuthHeaders());
      setCards(res.data);
    } catch (err) {
      handleAuthError(err);
    }
  };

  const fetchProjectsAndPeoples = async () => {
    try {
      const [projRes, peopleRes] = await Promise.all([
        axios.get(`${API_BASE}/projects`, getAuthHeaders()),
        axios.get(`${API_BASE}/peoples`, getAuthHeaders()),
      ]);
      setProjects(projRes.data);
      setPeoples(peopleRes.data);
    } catch (err) {
      handleAuthError(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCards();
    fetchProjectsAndPeoples();
  }, []);

  useEffect(() => {
    if (projects.length > 0 && !selectedProject) {
      setSelectedProject(projects[0].projName);
    }
  }, [projects, selectedProject]);

  return (
    <AppDataContext.Provider
      value={{
        cards,
        setCards,
        fetchCards,
        projects,
        setProjects,
        peoples,
        setPeoples,
        loading,
        setSelectedProject,
        selectedProject,
        authError, 
      }}
    >
      {children}
    </AppDataContext.Provider>
  );
};
