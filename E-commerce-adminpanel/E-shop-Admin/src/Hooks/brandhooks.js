import React, { useState } from "react";

const brandhooks = () => {
  const [form, setform] = useState(false);
  const [fromdata, setfromdata] = useState({
    name: "",
    description: "",
    status: "",
  });
  const [image, setimage] = useState(null);

  return {
    form,
    setform,
    fromdata,
    setfromdata,
  };
};

export default brandhooks;
