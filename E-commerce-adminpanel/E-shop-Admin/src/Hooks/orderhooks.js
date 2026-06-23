import React, { useEffect, useState } from "react";

import { getapi } from "../service/order";
const orderhooks = () => {
  const [showdata, setshowdata] = useState([]);
  const [search, setsearch] = useState("");
  const orderdata = async () => {
    try {
      const res = await getapi(search);

      setshowdata(res.data.allorder);
    } catch (error) {
      console.log({ error: error.response?.allorder });
      console.log({ error: error.response?.status });
    }
  };
  useEffect(() => {
    orderdata();
  }, [search]);
  return { showdata, setshowdata, search, setsearch };
};

export default orderhooks;
