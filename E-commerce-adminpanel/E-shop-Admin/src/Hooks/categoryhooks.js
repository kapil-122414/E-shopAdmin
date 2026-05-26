import React, { useState } from "react";

const categoryhooks = () => {
  const [from, setFrom] = useState(false);
  return { from, setFrom };
};

export default categoryhooks;
