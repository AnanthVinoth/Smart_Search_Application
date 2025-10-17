import React, { useState, useEffect, useRef, useCallback, useMemo, lazy, Suspense } from "react";
import "./smartSearch.css";
import type { SearchResult } from "../../type/types";
import SearchInput from "./SearchInput";

// Lazy load SearchDropdown for better mobile performance
const SearchDropdown = lazy(() => import("./SearchDropdown"));

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

  // Optimized debounce effect for mobile performance
  useEffect(() => {
    const controller = new AbortController();
    const handler = setTimeout(async () => {
      if (query.trim() && onSearch) {
        setLoading(true);
        try {
          const res = await onSearch(query);
          if (!controller.signal.aborted) {
            setResults(res);
            setOpen(true);
            setLoading(false);
          }
        } catch (error) {
          if (!controller.signal.aborted) {
            setLoading(false);
            setResults([]);
          }
        }
      } else {
        setResults([]);
        setOpen(false);
        setLoading(false);
      }
    }, 300);

    return () => {
      clearTimeout(handler);
      controller.abort();
    };
  }, [query, onSearch]);

  // Optimized event listeners for mobile performance
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && open) {
        setOpen(false);
      }
    };

    // Use passive listeners for better mobile scroll performance
    document.addEventListener("mousedown", handleClick, { passive: true });
    document.addEventListener("keydown", handleKeyDown, { passive: true });
    
    return () => {
      document.removeEventListener("mousedown", handleClick);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [open]);

  // Memoized callback for better mobile performance
  const handleSelect = useCallback((item: SearchResult) => {
    setQuery(item.label);
    setOpen(false);
    onSelect?.(item);
  }, [onSelect]);

  // Memoized clear handler
  const handleClear = useCallback(() => {
    setQuery("");
    setResults([]);
    setOpen(false);
  }, []);

  // Memoized dropdown component to prevent unnecessary re-renders
  const dropdownComponent = useMemo(() => {
    if (!open) return null;
    return (
      <Suspense fallback={<div className="dropdown-loading">Loading...</div>}>
        <SearchDropdown results={results} onSelect={handleSelect} />
      </Suspense>
    );
  }, [open, results, handleSelect]);

  return (
    <div className={`smart-search`} data-theme={theme} ref={containerRef}>
      <SearchInput
        value={query}
        placeholder={placeholder}
        loading={loading}
        onChange={setQuery}
        onClear={handleClear}
      />
      {dropdownComponent}
    </div>
  );
};

export default SmartSearch;
