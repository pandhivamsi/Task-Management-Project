import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

export const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [projects, setProjects] = useState([]);
  const [peoples, setPeoples] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [projRes, peopleRes] = await Promise.all([
          axios.get("http://localhost:8080/projects"),
          axios.get("http://localhost:8080/peoples"),
        ]);
        setProjects(projRes.data);
        setPeoples(peopleRes.data);
      } catch (err) {
        console.error("Error fetching data:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <DataContext.Provider value={{ projects, peoples, loading }}>
      {children}
    </DataContext.Provider>
  );
};
