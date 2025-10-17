import React from "react";

interface SearchInputProps {
  value: string;
  placeholder?: string;
  loading?: boolean;
  onChange: (val: string) => void;
  onClear: () => void;
}

const getResponsiveWidth = () => {
  if (window.innerWidth <= 600) return "90vw"; // mobile
  if (window.innerWidth <= 1024) return "55vw"; // tablet
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
        padding: "6px 12px",
        width: inputWidth,
        maxWidth: "95vw",
        minWidth: "200px",
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
          padding: "8px",
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
