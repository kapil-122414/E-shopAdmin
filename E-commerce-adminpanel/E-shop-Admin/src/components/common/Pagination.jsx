import React from "react";

const Pagination = ({ page, setpage, totalpage }) => {
  return (
    <div className=" bg-white py-4 flex justify-start gap-4 pagniation text-center ">
      <button disabled={page === 1} onClick={() => setpage(page - 1)}>
        Prev
      </button>
      <h5>
        Page {page} of {totalpage}
      </h5>
      {page < totalpage && (
        <button onClick={() => setpage(page + 1)}>Next</button>
      )}
    </div>
  );
};

export default Pagination;
