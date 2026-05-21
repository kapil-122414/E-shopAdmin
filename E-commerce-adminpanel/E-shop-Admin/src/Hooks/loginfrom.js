import { useState } from "react";
import { createuser } from "../service/loginapi";

const useLoginform = () => {
  const [editfrom, setEditfrom] = useState(false);

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const register = async () => {
    setEditfrom(false);
    console.log(formData);

    try {
      const res = await createuser(formData);
      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  return {
    editfrom,
    setEditfrom,

    formData,
    setFormData,
    register,
  };
};

export default useLoginform;
