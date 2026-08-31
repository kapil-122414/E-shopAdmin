import React from "react";

const Pagination = ({ page, setpage, totalpage }) => {
  const btnStyle = {
    backgroundColor: "var(--primary-color)",
    color: "white",
    border: "none",
    borderRadius: "8px",
    padding: "8px 16px",
    cursor: "pointer",
    transition: "background-color 0.2s",
  };
  const btnHoverStyle = {
    ...btnStyle,
    backgroundColor: "var(--primary-hover)",
  };

  return (
    <div className="pagination flex justify-center gap-4 py-4">
      <button 
        disabled={page === 1} 
        onClick={() => setpage(page - 1)}
        style={btnStyle}
        onMouseEnter={(e) => Object.assign(e.target.style, btnHoverStyle)}
        onMouseLeave={(e) => Object.assign(e.target.style, btnStyle)}
        className="disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Prev
      </button>
      <span className="flex items-center text-gray-600 dark:text-gray-300">
        Page {page} of {totalpage}
      </span>
      {page < totalpage && (
        <button 
          onClick={() => setpage(page + 1)}
          style={btnStyle}
          onMouseEnter={(e) => Object.assign(e.target.style, btnHoverStyle)}
          onMouseLeave={(e) => Object.assign(e.target.style, btnStyle)}
        >
          Next
        </button>
      )}
    </div>
  );
};

export default Pagination;
