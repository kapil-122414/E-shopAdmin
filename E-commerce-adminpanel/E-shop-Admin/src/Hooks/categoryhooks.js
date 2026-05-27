import React, { useEffect, useState } from "react";
import { categoryget } from "../service/categoryapi";
const categoryhooks = () => {
  const [from, setFrom] = useState(false);
  const [formdata, setFormdata] = useState({
    cartegoryname: "",
    slug: "",
    status: "",
    Img: "",
  });

  const getdata = async () => {
    try {
      const res = await categoryget();
      console.log(res.data);
    } catch (error) {
      console.log();
    }
  };

  useEffect(() => {
    getdata();
  }, []);

  return { from, setFrom, formdata, setFormdata, getdata };
};

export default categoryhooks;
