import React, { useState, useEffect, useRef } from "react";
import "./smartSearch.css";
import type { SearchResult } from "./types";
import SearchInput from "./SearchInput";
import SearchDropdown from "./SearchDropdown";

interface SmartSearchProps {
  placeholder?: string;
  theme?: "light" | "dark";
  onSearch?: (query: string) => Promise<SearchResult[]>;
  onSelect?: (result: SearchResult) => void;
}

const SmartSearch: React.FC<SmartSearchProps> = ({
  placeholder = "Search...",
  theme = "light",
  onSearch,
  onSelect,
}) => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  
  const containerRef = useRef<HTMLDivElement>(null);

  // Debounce effect
  useEffect(() => {
    const handler = setTimeout(async () => {
      if (query.trim() && onSearch) {
        setLoading(true);
        const res = await onSearch(query);
        setResults(res);
        setOpen(true);
        setLoading(false);
      } else {
        setResults([]);
        setOpen(false);
      }
    }, 300);

    return () => clearTimeout(handler);
  }, [query, onSearch]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const handleSelect = (item: SearchResult) => {
    setQuery(item.label);
    setOpen(false);
    onSelect?.(item);
  };

  return (
    <div className={`smart-search`} data-theme={theme} ref={containerRef}>
      <SearchInput
        value={query}
        placeholder={placeholder}
        loading={loading}
        onChange={setQuery}
        onClear={() => setQuery("")}
      />
      {open && (
        <SearchDropdown results={results} onSelect={handleSelect} />
      )}
    </div>
  );
};

export default SmartSearch;
