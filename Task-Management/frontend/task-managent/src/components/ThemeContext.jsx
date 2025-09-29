import React, { createContext, useState, useEffect } from "react";
export const ThemeContext = createContext();

const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem("appTheme");
    return savedTheme
      ? JSON.parse(savedTheme)
      : {
          header: "#002B5B", 
        };
  });

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
