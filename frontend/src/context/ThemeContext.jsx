import React, { createContext, useState, useEffect } from "react";

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [lightMode, setLightMode] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("lightMode");
    if (saved !== null) setLightMode(JSON.parse(saved));
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    localStorage.setItem("lightMode", JSON.stringify(lightMode));

    if (lightMode) {
      document.body.classList.add("light");
      document.body.classList.remove("dark");
    } else {
      document.body.classList.add("dark");
      document.body.classList.remove("light");
    }
  }, [lightMode, mounted]);

  const toggleLightMode = () => setLightMode((prev) => !prev);

  if (!mounted) return null;

  return (
    <ThemeContext.Provider value={{ lightMode, toggleLightMode }}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeContext;