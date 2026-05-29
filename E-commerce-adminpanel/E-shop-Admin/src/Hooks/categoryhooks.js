import React, { useEffect, useState } from "react";

import {
  categoryget,
  categorypost,
  categorydelete,
  categoryupdate,
} from "../service/categoryapi";
const categoryhooks = () => {
  const [from, setFrom] = useState(false);
  const [categoryies, setcategoryies] = useState([]);
  const [editdata, seteditdata] = useState(null);
  const [loading, setloading] = useState(false);
  const [page, setpage] = useState(1);
  const [formdata, setFormdata] = useState({
    cartegoryname: "",
    slug: "",
    status: "",
    Img: "",
  });

  const getdata = async () => {
    try {
      setloading(true);
      const res = await categoryget(page);
      setcategoryies(res.data.data);

      console.log(res.data.data);
    } catch (error) {
      console.log();
    } finally {
      setloading(false);
    }
  };
  useEffect(() => {
    getdata();
  }, [page]);
  const postdata = async () => {
    try {
      setloading(true);
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
    } finally {
      setloading(false);
    }
  };

  const deletedata = async (id) => {
    try {
      setloading(true);
      const data = await categorydelete(id);
      await getdata();
    } catch (error) {
      console.log("not delete category", error);
    } finally {
      setloading(false);
    }
  };

  const updatedata = async (id) => {
    try {
      setloading(true);
      const data = new FormData();

      data.append("Categoryname", formdata.cartegoryname);
      data.append("Slug", formdata.slug);
      data.append("Status", formdata.status);

      if (formdata.Img instanceof File) {
        data.append("Img", formdata.Img);
      }

      const res = await categoryupdate(id, data);

      console.log(res.data);

      await getdata();
    } catch (error) {
      console.log("not update category", error);
    } finally {
      setloading(false);
    }
  };

  return {
    from,
    setFrom,
    formdata,
    setFormdata,
    categoryies,
    getdata,
    postdata,
    deletedata,
    updatedata,
    editdata,
    seteditdata,
    loading,
    page,
    setpage,
  };
};

export default categoryhooks;
