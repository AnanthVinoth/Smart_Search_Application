import React, { useState, useEffect } from "react";
import type { SearchResult } from "../../type/types";

interface SearchDropdownProps {
  results: SearchResult[];
  onSelect: (result: SearchResult) => void;
}

const SearchDropdown: React.FC<SearchDropdownProps> = ({ results, onSelect }) => {
  const [highlightIndex, setHighlightIndex] = useState(-1);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (results.length === 0) return;

      if (e.key === "ArrowDown") {
        setHighlightIndex((prev) => (prev + 1) % results.length);
      } else if (e.key === "ArrowUp") {
        setHighlightIndex((prev) =>
          prev <= 0 ? results.length - 1 : prev - 1
        );
      } else if (e.key === "Enter" && highlightIndex >= 0) {
        onSelect(results[highlightIndex]);
      } else if (e.key === "Escape") {
        setHighlightIndex(-1);
      }
    };

    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [results, highlightIndex, onSelect]);

  return (
    <ul className="search-dropdown" role="listbox">
      {results.length === 0 ? (
        <li className="no-results">No results found</li>
      ) : (
        results.map((r, i) => (
          <li
            key={r.id}
            role="option"
            aria-selected={highlightIndex === i}
            className={highlightIndex === i ? "highlighted" : ""}
            data-type={r.type}
            onClick={() => onSelect(r)}
            onMouseEnter={() => setHighlightIndex(i)}
          >
            <strong>{r.label}</strong>
            {r.description && <div className="desc">{r.description}</div>}
          </li>
        ))
      )}
    </ul>
  );
};

export default SearchDropdown;
