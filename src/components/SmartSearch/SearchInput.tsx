import React from "react";

interface SearchInputProps {
  value: string;
  placeholder?: string;
  loading?: boolean;
  onChange: (val: string) => void;
  onClear: () => void;
}

const getResponsiveWidth = () => {
  if (window.innerWidth <= 375) return "82vw"; // mobile
  if (window.innerWidth <= 414) return "84vw"; // mobile
  if (window.innerWidth <= 430) return "85vw"; // mobile
  if (window.innerWidth <= 540) return "78vw"; // mobile
  if (window.innerWidth <= 600) return "90vw"; // mobile
  if (window.innerWidth <= 1024) return "50vw"; // tablet
  return "25vw"; // desktop
};

const SearchInput: React.FC<SearchInputProps> = ({
  value,
  placeholder,
  loading,
  onChange,
  onClear,
}) => {
  const [inputWidth, setInputWidth] = React.useState(getResponsiveWidth());

  React.useEffect(() => {
    const handleResize = () => setInputWidth(getResponsiveWidth());
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div
      className="search-input"
      style={{
        display: "flex",
        alignItems: "center",
        background: "#fff",
        borderRadius: "24px",
        boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
        padding: window.innerWidth <= 375 ? "4px 8px" : window.innerWidth <= 414 ? "5px 10px" : window.innerWidth <= 430 ? "5px 11px" : window.innerWidth <= 720 ? "6px 14px" : window.innerWidth <= 1366 ? "8px 16px" : window.innerWidth <= 1434 ? "7px 15px" : "6px 12px",
        width: inputWidth,
        maxWidth: "95vw",
        minWidth: window.innerWidth <= 375 ? "280px" : window.innerWidth <= 414 ? "320px" : window.innerWidth <= 430 ? "340px" : window.innerWidth <= 720 ? "380px" : window.innerWidth <= 1366 ? "400px" : window.innerWidth <= 1434 ? "420px" : "200px",
        transition: "width 0.2s",
      }}
    >
      <input
        type="text"
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        aria-label="Search"
        style={{
          flex: 1,
          border: "none",
          outline: "none",
          fontSize: "16px",
          background: "transparent",
          padding: window.innerWidth <= 375 ? "6px" : window.innerWidth <= 414 ? "7px" : window.innerWidth <= 430 ? "7.5px" : window.innerWidth <= 720 ? "8px" : window.innerWidth <= 1366 ? "10px" : window.innerWidth <= 1434 ? "9px" : "8px",
        }}
      />
      {loading ? (
        <span className="loader"></span>
      ) : value ? (
        <button
          className="clear-btn"
          onClick={onClear}
          aria-label="Clear"
          style={{
            background: "none",
            border: "none",
            fontSize: "18px",
            cursor: "pointer",
            marginLeft: "8px",
          }}
        >
          ✖
        </button>
      ) : null}
    </div>
  );
};

export default SearchInput;
