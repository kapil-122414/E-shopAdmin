import React, { useEffect, useState } from "react";
import {
  categoryget,
  categorypost,
  categorydelete,
} from "../service/categoryapi";
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
  const postdata = async () => {
    try {
      const data = new FormData();
      data.append("Categoryname", formdata.cartegoryname);
      data.append("Slug", formdata.slug);
      data.append("Status", formdata.status);
      data.append("Img", formdata.Img);

      console.log("FORM DATA :", formdata);
      const res = await categorypost(data);
      console.log("POST RESPONSE :", res.data);

      await getdata();
    } catch (error) {
      console.log();
    }
  };

  const deletedata = async (id) => {
    try {
      const data = await categorydelete(id);
      await getdata();
    } catch (error) {
      console.log("not delete category", error);
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
    postdata,
    deletedata,
  };
};

export default categoryhooks;
