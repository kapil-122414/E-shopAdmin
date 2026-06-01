import React from "react";

const pagination = ({ page, setpage, totalpage }) => {
  return (
    <div className=" bg-white py-4 flex justify-start gap-4 pagniation ">
      <button disabled={page === 1} onClick={() => setpage(page - 1)}>
        pre
      </button>
      <h5>
        page {page} of {totalpage}
      </h5>
      {page < totalpage && (
        <button onClick={() => setpage(page + 1)}>next</button>
      )}
    </div>
  );
};

export default pagination;
