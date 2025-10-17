import { useState, useEffect } from "react";
import SmartSearch from "./components/SmartSearch/SmartSearch";
import type { SearchResult } from "./type/types";
import "./App.css";
import mockData from "./constants/data";

function App() {
  const [theme, setTheme] = useState<"light" | "dark">("light");

  // Apply theme to document body
  useEffect(() => {
    document.body.className = `theme-${theme}`;
  }, [theme]);
  // const handleSearch = async (query: string): Promise<SearchResult[]> => {
  //   // simulate API
  //   return mockData.filter((item) =>
  //     item.label.toLowerCase().includes(query.toLowerCase())
  //   );
  // };

  const handleSearch = async (query: string): Promise<SearchResult[]> => {
    await new Promise((r) => setTimeout(r, 300)); // simulate API delay
    return mockData.filter((item) =>
      item.label.toLowerCase().includes(query.toLowerCase())
    );
  };

  const handleSelect = (result: SearchResult) => {
    alert(`Selected: ${result.label}`);
  };

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  return (
    <div className={`app-container theme-${theme}`}>
      <div className="app-content">
        <div className="app-header">
          <h1 className="app-title">Smart Search Application</h1>
          <button
            onClick={toggleTheme}
            className="theme-toggle-btn"
            aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
          >
            {theme === "light" ? "🌙" : "☀️"}
            Switch to {theme === "light" ? "Dark" : "Light"} Mode
          </button>
        </div>
        
        <div className="search-section">
          <h2 className="search-title">Find anything quickly</h2>
          <p className="search-description">
            Search for accounts, customers, transactions, and more
          </p>
          <div className="search-wrapper">
            <SmartSearch onSearch={handleSearch} onSelect={handleSelect} theme={theme} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;