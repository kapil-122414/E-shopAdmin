import React from "react";

const Pagination = ({ page, setpage, totalpage }) => {
  return (
    <div className="pagination flex justify-center gap-4 py-4">
      <button 
        disabled={page === 1} 
        onClick={() => setpage(page - 1)}
        className="px-4 py-2 bg-[#e8521a] text-white rounded-lg hover:bg-[#dc4a1a] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Prev
      </button>
      <span className="flex items-center text-gray-600 dark:text-gray-300">
        Page {page} of {totalpage}
      </span>
      {page < totalpage && (
        <button 
          onClick={() => setpage(page + 1)}
          className="px-4 py-2 bg-[#e8521a] text-white rounded-lg hover:bg-[#dc4a1a] transition-colors"
        >
          Next
        </button>
      )}
    </div>
  );
};

export default Pagination;
