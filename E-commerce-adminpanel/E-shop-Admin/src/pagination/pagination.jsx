import React from "react";

const pagination = ({ page, setpage }) => {
  return (
    <div className=" bg-white py-4 flex justify-start gap-4 ">
      <button
        className="px-4 py-2 border rounded"
        disabled={page === 1}
        onClick={() => setpage(page - 1)}
      >
        pre
      </button>
      <h5>page {page}</h5>
      <button
        className="px-4 py-2 border rounded"
        onClick={() => setpage(page + 1)}
      >
        next
      </button>
    </div>
  );
};

export default pagination;
