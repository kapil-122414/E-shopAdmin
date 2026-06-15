import React, { useState } from "react";

const brandhooks = () => {
  const [form, setform] = useState(false);
  const [fromdata, setfromdata] = useState({
    name: "",
    status: "",
  });
  const [image, setimage] = useState(null);

  const resetfrom = () => {
    setfromdata({
      name: "",
      status: "",
    });
    setimage(null);
  };

  return {
    form,
    setform,
    fromdata,
    setfromdata,
    image,
    setimage,
  };
};

export default brandhooks;
