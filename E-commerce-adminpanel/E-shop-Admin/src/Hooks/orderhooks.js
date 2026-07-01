import React, { useEffect, useState } from "react";

import { getapi } from "../service/order";
const orderhooks = () => {
  const [showdata, setshowdata] = useState([]);
  const [search, setsearch] = useState("");
  const [status, setstatus] = useState("");
  const orderdata = async () => {
    try {
      const res = await getapi(search, status);

      setshowdata(res.data.allorder);
    } catch (error) {
      console.log({ error: error.response?.allorder });
      console.log({ error: error.response?.status });
    }
  };
  useEffect(() => {
    orderdata();
  }, [search, status]);
  return { showdata, setshowdata, search, setsearch, status, setstatus };
};

export default orderhooks;
