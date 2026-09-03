import React, { useEffect, useState } from "react";

import { getapi } from "./api";
const useOrders = () => {
  const [showdata, setshowdata] = useState([]);
  const [search, setsearch] = useState("");
  const [status, setstatus] = useState("");
  const [loading, setloading] = useState(false);
  const [page, setpage] = useState(1);
  const [totalPages, settotalPages] = useState(1);
  const [total, settotal] = useState(0);
  
  const orderdata = async (sort = "-createdAt", startDate, endDate) => {
    try {
      setloading(true);
      const res = await getapi(search, status, page, 4, sort, startDate, endDate);

      setshowdata(res.data.allorder);
      settotalPages(res.data.totalPages || 1);
      settotal(res.data.total || 0);
    } catch (error) {
      console.log({ error: error.response?.allorder });
      console.log({ error: error.response?.status });
    } finally {
      setloading(false);
    }
  };
  useEffect(() => {
    orderdata();
  }, [search, status, page]);
  return { showdata, setshowdata, search, setsearch, status, setstatus, loading, page, setpage, totalPages, total };
};

export default useOrders;
