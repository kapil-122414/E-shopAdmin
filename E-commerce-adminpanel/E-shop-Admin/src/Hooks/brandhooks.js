import React, { useEffect, useState } from "react";
import {
  brandpost,
  brandget,
  branddelete,
  brandget_byid,
  brandupdate,
} from "../service/brandapi";

const brandhooks = () => {
  const [form, setform] = useState(false);
  const [image, setimage] = useState(null);
  const [getdata, setgetdata] = useState([]);
  const [preview, setPreview] = useState("");
  const [totalpage, settotalpage] = useState(1);
  const [search, setSearch] = useState("");
  const [page, setpage] = useState(1);
  const [fromdata, setfromdata] = useState({
    name: "",
    status: "",
  });

  const [loading, setloading] = useState(false);
  const [getedit, setgetedit] = useState(null);

  const resetfrom = () => {
    setfromdata({
      name: "",
      status: "",
    });
    setimage(null);
    setPreview("");
    setgetedit(null);
  };

  const brandcreate = async () => {
    try {
      setloading(true);
      const data = new FormData();
      data.append("name", fromdata.name);
      data.append("status", fromdata.status);
      data.append("Img", image);
      const res = await brandpost(data);
      if (res.status == 200 || res.status === 201) {
        setform(false);
        resetfrom();
        brandshow();
      }

      console.log(res.status);
    } catch (error) {
      console.log({
        error: error.response?.data,
        sataus: error.response?.status,
      });
    } finally {
      setloading(false);
    }
  };

  const brandshow = async () => {
    try {
      setloading(true);
      const res = await brandget(page, search);

      setpage(res.data.page);
      settotalpage(res.data.totalPages);
      setgetdata(res.data.data);
    } catch (error) {
      console.log({
        error: error.response?.data,
        status: error.response?.status,
      });
    } finally {
      setloading(false);
    }
  };
  const brand_delete = async (id) => {
    try {
      setloading(true);
      console.log("hello bro");
      const res = await branddelete(id);
      if (res.status === 200) {
        brandshow();
      }
    } catch (error) {
      console.log({
        error: error.response?.error,
        status: error.response?.status,
      });
    } finally {
      setloading(false);
    }
  };

  const editid = async (id) => {
    try {
      setgetedit(id);
      const res = await brandget_byid(id);

      const branddata = res.data.data;
      setfromdata({
        name: branddata.name,
        status: branddata.status,
      });
      setPreview(branddata.Img.url);
      setimage(null);
      setform(true);
    } catch (error) {
      console.log({ error: error.response?.data });
    }
  };

  const update_brand = async (id) => {
    try {
      setloading(true);
      const data = new FormData();
      data.append("name", fromdata.name);
      data.append("status", fromdata.status);
      data.append("Img", image);
      const res = await brandupdate(id, data);
      if (res.status === 200) {
        setform(false);
        resetfrom();
        brandshow();
      }
    } catch (error) {
      console.log({ error: error.response?.data });
    } finally {
      setloading(false);
    }
  };
  useEffect(() => {
    brandshow();
  }, [page, search]);
  return {
    form,
    setform,
    fromdata,
    setfromdata,
    resetfrom,
    image,
    setimage,
    brandcreate,
    getdata,
    setgetdata,
    brand_delete,
    loading,
    setloading,
    editid,
    preview,
    setPreview,
    update_brand,
    getedit,
    page,
    setpage,
    totalpage,
    settotalpage,
    search,
    setSearch,
  };
};

export default brandhooks;
