import React, { useEffect, useState } from "react";
import { categoryget } from "../service/categoryapi";
const categoryhooks = () => {
  const [from, setFrom] = useState(false);
  const [categoryies, setcategoryies] = useState([]);
  const [formdata, setFormdata] = useState({
    cartegoryname: "",
    slug: "",
    status: "",
    Img: "",
  });

  const getdata = async () => {
    try {
      const res = await categoryget();
      setcategoryies(res.data.data);
      console.log(res.data.data);
    } catch (error) {
      console.log();
    }
  };

  useEffect(() => {
    getdata();
  }, []);

  return {
    from,
    setFrom,
    formdata,
    setFormdata,
    categoryies,
    getdata,
  };
};

export default categoryhooks;
