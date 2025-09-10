import React, { createContext, useState, useEffect } from "react";
export const ThemeContext = createContext();

const ThemeProvider = ({ children }) => {
  // Load from localStorage OR fallback to default
  const [theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem("appTheme");
    return savedTheme
      ? JSON.parse(savedTheme)
      : {
          header: "#002B5B",     // default header color
          dashboard: "#002B5B",  // default dashboard bg
          card: "#002B5B"        // default card bg
        };
  });

  // Save to localStorage whenever theme changes
  useEffect(() => {
    localStorage.setItem("appTheme", JSON.stringify(theme));
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;
