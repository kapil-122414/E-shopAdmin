import { useState } from "react";
import { createuser } from "../service/loginapi";
import Cookie from "js-cookie";

const useLoginform = () => {
    
  const [editfrom, setEditfrom] = useState(false);
  const [islogin, setIslogin] = useState(!!Cookie.get("Token"));
  const [formData, setFormData] = useState({
    // username: "",
    Email: "",
    Password: "",
  });

  const register = async () => {
    try {
      const res = await createuser(formData);

      console.log("scucces", res.data);
      if (res.data.Role === "admin") {
        console.log("res.data:", res.data);
        Cookie.set("Token", res.data.token);

        Cookie.set("Role", res.data.Role);

        setIslogin(true);
        console.log("islogin set to true");
        
      }
    } catch (error) {
      console.log(error);
      console.log(error.response);
    }
  };

  return {
    editfrom,
    setEditfrom,
    islogin,
    setIslogin,

    formData,
    setFormData,
    register,
  };
};

export default useLoginform;
