import React, { use, useEffect, useState } from "react";
import { brandpost, brandget } from "../service/brandapi";

const brandhooks = () => {
  const [form, setform] = useState(false);
  const [image, setimage] = useState(null);
  const [getdata, setgetdata] = useState([]);
  const [fromdata, setfromdata] = useState({
    name: "",
    status: "",
  });

  const resetfrom = () => {
    setfromdata({
      name: "",
      status: "",
    });
    setimage(null);
  };

  const brandcreate = async () => {
    try {
      const data = new FormData();
      data.append("name", fromdata.name);
      data.append("status", fromdata.status);
      data.append("Img", image);
      const res = await brandpost(data);
      if (res.status == 200 || res.status === 201) {
        alert("scuess");
        setform(false);
        resetfrom();
      }

      console.log(res.status);
    } catch (error) {
      console.log({
        error: error.response?.data,
        sataus: error.response?.status,
      });
    }
  };

  const brandshow = async () => {
    try {
      const res = await brandget();
      setgetdata(res.data.data);
      console.log("show the brand data", res.data.data);
      console.log("show the brand data", res.data);
    } catch (error) {
      console.log({
        error: error.response?.data,
        status: error.response?.status,
      });
    }
  };

  useEffect(() => {
    brandshow();
  }, []);
  return {
    form,
    setform,
    fromdata,
    setfromdata,
    image,
    setimage,
    brandcreate,
    getdata,
    setgetdata,
  };
};

export default brandhooks;
