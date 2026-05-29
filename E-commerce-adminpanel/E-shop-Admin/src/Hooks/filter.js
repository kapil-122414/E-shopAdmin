import React, { useState } from "react";

const Filter = (data, searchkey) => {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const datafilter = (data || []).filter((item) => {
    const matchsearch = item[searchkey]
      ?.toLowerCase()
      .includes(search.toLowerCase());
    const matchStatus = status === "" || item.Status === status;
    return matchsearch && matchStatus;
  });
  return {
    search,
    setSearch,
    status,
    setStatus,
    datafilter,
  };
};

export default Filter;
