import React, { useEffect, useState } from "react";

import { getapi } from "./api";
const useOrders = () => {
  const [showdata, setshowdata] = useState([]);
  const [search, setsearch] = useState("");
  const [status, setstatus] = useState("");
  const [loading, setloading] = useState(false);
  const orderdata = async () => {
    try {
      setloading(true);
      const res = await getapi(search, status);

      setshowdata(res.data.allorder);
    } catch (error) {
      console.log({ error: error.response?.allorder });
      console.log({ error: error.response?.status });
    } finally {
      setloading(false);
    }
  };
  useEffect(() => {
    orderdata();
  }, [search, status]);
  return { showdata, setshowdata, search, setsearch, status, setstatus, loading };
};

export default useOrders;
